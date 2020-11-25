
window.nquery = window.$$ = function(selector, hanlder) {
    var elems = document.querySelectorAll(selector);

    if (typeof hanlder !== 'undefined') {
        [].forEach.call(elems, hanlder);
    };

    return elems;
}
