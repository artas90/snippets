window.appAutoLogin = window.appAutoLogin || {};

window.appAutoLogin.extentionUtils = window.appAutoLogin.extentionUtils || {

    parseCreds(str) {
        const list = str.split('\n\n').map(block => block.split('\n').filter(Boolean)).filter(el => el.length);

        const creds = list.map(item => ({
            employerCode: item[0] && item[0].trim(),
            username: item[1] && item[1].trim(),
            password: item[2] && item[2].trim(),
        }));

        return creds;
    },

    stringifyCreds(creds) {
        return creds.map(it => `${it.employerCode}\n${it.username}\n${it.password}\n`).join('\n');
    },

    executeScripts(tabId, detailsList) {
        function createCallback(tabId, details, innerCallback) {
            return () => { chrome.tabs.executeScript(tabId, details, innerCallback); };
        }

        let callback = null;
        for (let i = detailsList.length - 1; i >= 0; --i) {
            callback = createCallback(tabId, detailsList[i], callback);
        }

        // execute outermost function
        if (callback !== null) {
            callback();
        }
    }

};