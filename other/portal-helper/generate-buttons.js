#!/usr/bin/env node

/*
  How to use:
    1. Change CREDS_LIST
    2. Run `node generate-buttons.js`
    3. Open http://localhost:7070/
    4. Drag the buttons
    5. Go to login page and press any login button
*/

const CREDS_LIST = [
    { employerCode: '', username: '', password: '' },
];

// -- -- -- --

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const btoa = str => Buffer.from(str).toString('base64');

const FgMagenta = "\x1b[35m"
const ResetColors = '\x1b[0m';

const domUtills = fs.readFileSync('./utils/dom-utills.js').toString();
const autoLogin = fs.readFileSync('./content-scripts/auto-login.js').toString();

// -- -- -- --

const makeBtn = (creds) => {
    const credsEncoded = btoa(JSON.stringify(creds));

    const redrectBtn = btoa([
        domUtills,
        `window.appAutoLogin.creds = '${credsEncoded}';`,
        autoLogin,
    ].join('\n\n'));

    const title = `${creds.employerCode} - ${creds.username}`;
    const code = `eval(atob('${redrectBtn}'))`;

    return `<a href="javascript:${code}">${title}</a><br/><br/>`;
};

const makePage = (credsList) => {
    const buttons = credsList.map(makeBtn).join('\n');

    return redrectDescriptionPage = `
  <html>
  <body>
    <strong>Drag the link to toolbar to create buttons</strong><br/><br/>
    ${buttons}
  </body>
  </html>
  `;
};

// -- -- -- --

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send(makePage(CREDS_LIST))
});

app.listen(7070, () => {
    console.log(`${FgMagenta}Please open http://localhost:7070 and create buttons${ResetColors}\n`);
});