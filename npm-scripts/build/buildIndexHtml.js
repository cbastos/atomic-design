console.time('Building index.html');

const fs = require('fs');
const assets = require('./assets.json');
const mkdirp = require('mkdirp');

const randomVersion = Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
const enviroment = process.argv[2];
console.time('Building index.html');
const htmlScriptsTags = assets.scripts[enviroment].map(script =>
    `<script src="${script}?=${randomVersion}"></script>`).join('\n');

const htmlCssLinkTags = assets.css[enviroment].map(css =>
    `<link rel="stylesheet" href="${css}"/>`).join('\n');

mkdirp(`${__dirname}/../../dist/app`, () => {
    fs.writeFile(
        `${__dirname}/../../dist/app/index.html`,
        getIndexHtmlIncluding(htmlCssLinkTags, htmlScriptsTags), () => {
            copyFaviconToDistFolder();
            copyExpressAppToDistFolder();
            console.timeEnd('Building index.html');
        }
    );
});

function getIndexHtmlIncluding(cssLinkTags, scriptsTags) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Application</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.ico?v=${randomVersion}"/>
        ${cssLinkTags}
    </head>
    <body>
        <div id="app"></div>
        ${scriptsTags}
    </body>
    </html>`
}

function copyFaviconToDistFolder() {
    fs.createReadStream(`${__dirname}/favicon.ico`)
        .pipe(fs.createWriteStream(`${__dirname}/../..${assets.favicon}`));
}

function copyExpressAppToDistFolder() {
    fs.createReadStream(`${__dirname}/app.js`)
        .pipe(fs.createWriteStream(`${__dirname}/../../dist/app/app.js`));
}

