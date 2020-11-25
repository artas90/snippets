ReactiveDash = window.ReactiveDash || {};
ReactiveDash.mainPage = ReactiveDash.mainPage || {};

ReactiveDash.mainPage.page = {
    eventHandler: $({}),

    init: function () {
        this.initSidebar();
        this.initHeader();
    },

    initSidebar: function () {
        $(".rd-sidebar-user-status .rd-current-status").on('click', function (e) {
            e.preventDefault();
            var btn = $(this).closest(".rd-sidebar-user-status").find(".rd-status-menu");
            btn.toggle();
        });

        $(".rd-sidebar-user-status .rd-status-menu-item").on('click', function (e) {
            e.preventDefault();
            var menuItem = $(this),
                menu = menuItem.closest(".rd-status-menu"),
                statusBlock = menu.closest(".rd-sidebar-user-status");

            statusBlock.attr('data-status', menuItem.data('new-status'));
            menu.hide();
        });
    },

    initHeader: function () {
        $("#rd-menu-btn").click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });

        $("#rd-header-search-btn").click(function (e) {
            e.preventDefault();
            $("#rd-header-search-input input").focus();
        });
    }
};

$(function () {
    ReactiveDash.mainPage.page.init();
});
