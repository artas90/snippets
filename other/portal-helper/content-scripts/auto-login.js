(async function() {
    const { waitForElement, waitIframeDocument, setInputValue } = window.appAutoLogin.domUtils;

    const ELEMS = {
        EMPLOYER_CODE_INPUT: 'portal-employer-code form input[name=code]',
        EMPLOYER_CODE_SUBMIT: 'portal-employer-code form button[type=submit]',
        USERNAME_INPUT: 'form input[name=txtUsername]',
        USERNAME_SUBMIT: 'form input[name=btnSubmit]',
        PASSWORD_INPUT: 'form input[name=txtPassword]',
        PASSWORD_SUBMIT: 'form input[name=btnSubmit]',
        LOGIN_IFRAME: 'iframe.fbx.fbContent',
    };

    const creds = JSON.parse(atob(window.appAutoLogin.creds));
    console.log(creds);

    // ---- username ----

    const codeInput = await waitForElement(ELEMS.EMPLOYER_CODE_INPUT);
    setInputValue(codeInput, creds.employerCode);

    const codeSubmit = await waitForElement(ELEMS.EMPLOYER_CODE_SUBMIT);
    codeSubmit.click();

    // ---- employer code ----

    const userIframe = await waitIframeDocument(await waitForElement(ELEMS.LOGIN_IFRAME));

    const userInput = await waitForElement(ELEMS.USERNAME_INPUT, userIframe);
    setInputValue(userInput, creds.username);

    const userSubmit = await waitForElement(ELEMS.USERNAME_SUBMIT, userIframe);
    userSubmit.click();

    // ---- password ----

    const passwordIframe = await waitIframeDocument(await waitForElement(ELEMS.LOGIN_IFRAME));

    const passwordInput = await waitForElement(ELEMS.PASSWORD_INPUT, passwordIframe);
    setInputValue(passwordInput, creds.password);

    const passwordSubmit = await waitForElement(ELEMS.PASSWORD_SUBMIT, passwordIframe);
    passwordSubmit.click();

})();