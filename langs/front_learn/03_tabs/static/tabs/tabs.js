tabs = window.tabs || {};

tabs.cTabs = (function () {
    function cTabs () {
        this._mainTabs = document.querySelectorAll('#main-tabs')[0];
        this._init();
    }

    cTabs.prototype._init = function(tabNum) {
        var self = this;
        $$('label', function(el) {
            el.addEventListener('click', function(evt) {
                var myEvent = new CustomEvent('tab-switched', {
                        detail: evt.target.dataset
                    });
                self._mainTabs.dispatchEvent(myEvent);
            }, false);
        });
    };

    cTabs.prototype.switchTo = function(tabNum) {
        $$('.c-label', function(label) {
            var input = label.parentNode.children['c-tab-input'];
            input.checked = false;
        });

        $$('#c-tab-' + tabNum, function(input) {
            input.checked = true;
        });
    };

    cTabs.prototype.on = function(eventName, handler) {
        this._mainTabs.addEventListener(eventName, handler);
    };    

    return cTabs
})();

tabs.jTabs = function () {
    $$('.j-tab', function(el) {
        el.addEventListener('click', function(evt) {
            var tabNum = evt.target.dataset.jTab;

            $$('.j-tab, .j-tab-content', function(cont) {
                cont.classList.remove('current');
            });

            $$('[data-j-tab="' + tabNum + '"], [data-j-content="' + tabNum + '"]', function(cont) {
                cont.classList.add('current');
            });
        }, false);
    });
};

tabs.qTabs =  function() {
    $('.q-tab').on('click', function() {
        var tabNum = $(this).data('qTab');
        $('.q-tab, .q-tab-content').removeClass('current');
        $(this).addClass('current');
        $('[data-q-tab="' + tabNum + '"], [data-q-content="' + tabNum + '"]').addClass('current');  
    });
};
