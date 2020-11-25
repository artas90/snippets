document.addEventListener('DOMContentLoaded', () => {
    const { stringifyCreds, parseCreds } = window.appAutoLogin.extentionUtils;
    const storage = chrome.storage.sync;

    const optionsData = document.getElementById("optionsData");
    const optionsSave = document.getElementById("optionsSave");

    storage.get(['creds'], data => {
        optionsData.value = stringifyCreds(data.creds || []);
    });

    optionsSave.addEventListener('click', () => {
        const creds = parseCreds(optionsData.value);
        storage.set({ creds });
    });
});