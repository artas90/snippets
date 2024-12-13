window.appAutoLogin = window.appAutoLogin || {};

window.appAutoLogin.creds = '';

window.appAutoLogin.domUtils = window.appAutoLogin.domUtils || {

    waitForElement(selector, targetDocument = window.document, time = 1000) {
        function _waitElem(resolve) {
            const elem = targetDocument.querySelector(selector);

            if (elem != null) {
                console.log('FOUND', selector);
                resolve(elem);
            } else {
                console.log('TRY-AGAIN ', selector)
                setTimeout(() => _waitElem(resolve), time);
            }
        }

        return new Promise(resolve => _waitElem(resolve));
    },

    waitIframeDocument(iframe) {
        return new Promise(resolve => {
            const resolveDocument = () => resolve(iframe.contentWindow.document);
            iframe.addEventListener("load", resolveDocument, { once: true });
            iframe.addEventListener("error", resolveDocument, { once: true });
        });
    },

    setInputValue(input, val) {
        input.value = val;
        input.dispatchEvent(new Event('input'));
    },

};