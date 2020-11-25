services = window.services || {};

services.BookService = (function () {
    function BookService () {
    };

    BookService.prototype.URL = '/get_books/Book1:Description1/Book2:AnotherDescription';

    BookService.prototype.getLatestBook = function() {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', this.URL, false);
        xhr.send();

        if (xhr.status != 200) {
            return {error: 'network-error'}
        } else {
            try {
                return JSON.parse(xhr.responseText)
            } catch(e) {
                return {error: 'parse-error'}
            }
        }
    };

    return BookService
})();

