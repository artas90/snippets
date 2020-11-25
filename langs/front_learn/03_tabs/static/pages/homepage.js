homepage = window.homepage || {};

homepage.initRoutes = function () {
    window.globalRouter.add_route('tab', function (tabNum) {
        homepage._ctabs.switchTo(tabNum);
    });

    homepage._ctabs.on('tab-switched', function (evt) {
        window.globalRouter.go('tab', evt.detail.cTab);
    });
};

homepage.initDynamicTabs = function () {
    homepage._ctabs.on('tab-switched', function (evt) {
        if (evt.detail.dynLoad === 'books') {
            var books = homepage._bookService.getLatestBook()
            
            var html = '';
            Object.keys(books).forEach(function (key) {
                html += '- ' + key + ': ' + books[key] + '</br>'; 
            });

            var tabContent = evt.target.querySelectorAll('[data-dyn-load="books"]')[0]
                                .parentNode.querySelectorAll('.c-tab-content')[0];

            tabContent.innerHTML = html;
        };
    });
};

homepage.init = function () {
    this._ctabs = new tabs.cTabs();
    this._bookService = new services.BookService()

    this.initRoutes();
    this.initDynamicTabs();

    tabs.jTabs();
    tabs.qTabs();
    
    window.globalRouter.dispatch();
};
