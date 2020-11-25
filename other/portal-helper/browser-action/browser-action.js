const { Component, html, render } = window.htmPreact;
const { executeScripts } = window.appAutoLogin.extentionUtils;

class LoginLine extends Component {
    render = ({
        creds = {}
    }) => html `
    <div class="login-creds">
      <div class="cred">
        <div class="employer-code">${creds.employerCode}</div>
        <div class="username">${creds.username}</div>
      </div>

      <button class="login-btn" onClick=${() => this.login(creds)}>login</button>
    </div>
  `;

    login(creds) {
        const credsStr = btoa(JSON.stringify(creds));

        executeScripts(null, [
            { file: 'utils/dom-utills.js' },
            { code: `window.appAutoLogin.creds = '${credsStr}'` },
            { file: 'content-scripts/auto-login.js' },
        ]);
    }
}

const BrowserAction = ({ credsList = [] }) => html `
  ${credsList.map(creds => html`<${LoginLine} creds=${creds}/>`)}
`;

function browserActionMain(credsList) {
  render(html`<${BrowserAction} credsList="${credsList}"/>`, document.body);
}

chrome.storage.sync.get(['creds'], data => browserActionMain(data.creds || []));