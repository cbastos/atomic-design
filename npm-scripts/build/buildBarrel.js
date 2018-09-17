const glob = require('glob');
const pathManager = require('path');
const fs = require('fs');

const elements = { components: {} };
const baseModuleFolder = './modules/app/components';
glob('modules/app/components/**/*.js*', { ignore: ['**/*.spec.js', '**/*.barrel.js'] }, (err, files) => {
    fillAliases(elements, files, baseModuleFolder);
    writeModuleBarrel(elements, 'components', baseModuleFolder);
});

function fillAliases(elementsToFill, files, moduleFolder) {
    files.forEach((filePath) => {
        const chunk = fs.readFileSync(filePath, { encoding: 'utf8' });
        const aliasesInfos = getAliasOf(chunk, filePath, moduleFolder);
        if (aliasesInfos.length) {
            aliasesInfos.forEach((a) => {
                const posibleContainerFile = pathManager.join(moduleFolder, pathManager.dirname(a.path), `${a.alias}Container.js`);
                a.hasContainer = fs.existsSync(posibleContainerFile);
            });
        }
        aliasesInfos.forEach((a) => {
            elementsToFill.components[a.alias] = a;
        });
    });
}

function getAliasOf(chunk, filePath, moduleFolder) {
    let components = [];
    getComponentsStrategies.forEach((getComponents) => {
        components = components.concat(getComponents(chunk, filePath, moduleFolder));
    });
    return components.filter(c => c.alias);
}

const getComponentsStrategies = [
    (chunk, filePath, moduleFolder) => {
        let matches = chunk.match(/export\s+class\s+([A-Z]|[a-z]|[0-9])+\s+extends\s+React.Component/);
        const components = [];
        matches = matches ? matches.filter(m => m.split(' ').length === 5) : null;
        if (matches) {
            for (let i = 0, l = matches.length; i < l; ++i) {
                const alias = matches[i].split(' ')[2];
                let path = `.\\${pathManager.relative(moduleFolder, filePath)}`;
                path = path.substring(0, path.length - (path.split('.').pop().length + 1)).split('\\').join('/');
                components.push({ alias, path });
            }
        }
        return components;
    },
    (chunk, filePath, moduleFolder) => {
        const components = [];
        const matches = chunk.match(/export\s+const\s+([A-Z]|[a-z]|[0-9])+\s*=\s*\(\)\s*=>\s*\(\n*\s*</);
        if (matches) {
            for (let i = 0, l = matches.length; i < l; ++i) {
                const alias = matches[i].split(' ')[2];
                let path = `.\\${pathManager.relative(moduleFolder, filePath)}`;
                path = path.substring(0, path.length - (path.split('.').pop().length + 1)).split('\\').join('/');
                components.push({ alias, path });
            }
        }
        return components;
    },
    (chunk, filePath, moduleFolder) => {
        const components = [];
        const matches = chunk.match(/export\s+default\s+\(\)\s*=>\s*\(\n*\s*\n*</);
        if (matches) {
            const alias = pathManager.basename(filePath).split('.')[0];
            let path = `.\\${pathManager.relative(moduleFolder, filePath)}`;
            path = path.substring(0, path.length - (path.split('.').pop().length + 1)).split('\\').join('/');
            components.push({ alias, path });
        }
        return components;
    }
];

function writeModuleBarrel(elementsToFill, moduleFile, moduleFolder) {
    const { imports, list, factory } = getElementsBarrel(elementsToFill.components);
    fs.writeFileSync(`${moduleFolder}/barrel.generated.js`, `
${imports}
export {
${list}
};
export const components = {
${factory}
};\n`, { encoding: 'utf8' });
}

function getElementsBarrel(elementsToFill) {
    let imports = '';
    let list = '';
    let factory = '';
    Object.keys(elementsToFill).forEach((element) => {
        const component = elementsToFill[element];
        if (component.hasContainer) {
            imports += `import ${element}Container from '${component.path}Container';\n`;
            list += `    ${element}Container as ${element},\n`;
            factory += `    ${element}: ${element}Container,\n`;
        } else {
            imports += `import {\n    ${element}\n} from '${component.path}';\n`;
            list += `    ${element},\n`;
            factory += `    ${element},\n`;
        }
    });
    return { imports, list, factory };
}
