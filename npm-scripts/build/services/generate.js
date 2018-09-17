const fs = require('fs');
/* eslint import/no-dynamic-require:0 */
const swagger = require(`${__dirname}/swagger.json`);
const { CodeGen } = require('swagger-js-codegen');

const customCode = CodeGen.getCustomCode({
    className: 'WebApi',
    swagger,
    template: {
        class: fs.readFileSync(`${__dirname}/templates/class-template.mustache`, 'utf-8'),
        method: fs.readFileSync(`${__dirname}/templates/method-template.mustache`, 'utf-8')
    }
});
fs.writeFile('./modules/app/state/api.js', customCode);
