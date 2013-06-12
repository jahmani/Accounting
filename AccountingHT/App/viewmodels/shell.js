define(['durandal/system', 'durandal/plugins/router', 'services/logger'],
    function (system, router, logger) {
        var shell = {
            activate: activate,
            router: router
        };
        
        return shell;

        //#region Internal Methods
        function activate() {
            return boot();
        }

        function boot() {
            router.mapNav('home');
            router.mapNav('details');
            router.mapNav('AccountList');
            router.mapNav('ProductList');
            router.mapNav('InvoiceList');
            router.mapRoute('InvoiceEdit/:id', 'viewmodels/InvoiceEdit', "Edit Invoice", false);
            router.mapRoute('AccountEdit/:id', 'viewmodels/AccountEdit', "Edit Account", false);
            router.mapRoute('ProductEdit/:id', 'viewmodels/ProductEdit', "Edit Product", false);
            log('Hot Towel SPA Loaded!', null, true);
            return router.activate('home');
        }

        function log(msg, data, showToast) {
            logger.log(msg, data, system.getModuleId(shell), showToast);
        }
        //#endregion
    });