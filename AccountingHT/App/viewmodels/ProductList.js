define(['require', 'durandal/http', 'durandal/app', 'viewmodels/ProductEdit'], function (require, http, app) {

    return {
        displayName: 'Product List',
        products: ko.observableArray([]),
        manager: new breeze.EntityManager('api/AccountingHT'),
        activate: function () {
            //the router's activator calls this function and waits for it to complete before proceding

            var self = this;
            var query = new breeze.EntityQuery().from("Products");

            return self.manager.executeQuery(query).then(
                function (data) {
                    self.products(data.results);
                }).fail(function(e)
                {
                    alert(e);
                });
        },

        edit: function (item) {

            ////the app model allows easy display of modal dialogs by passing a view model
            ////views are usually located by convention, but you an specify it as well with viewUrl
            //// var that = root();

            var self = this;
            var productViewModel = require('viewmodels/ProductEdit');
            productViewModel.product(item);
            //productViewModel.accounts(self.accounts());
            productViewModel.formStatus = "EDIT";
            app.showModal(productViewModel).then(function () {
                self.activate();
            });

        },
        delete: function (item) {
            //the app model allows easy display of modal dialogs by passing a view model
            //views are usually located by convention, but you an specify it as well with viewUrl
            var self = this;
            app.showMessage('Are Your sure you want to delete the Product', 'Delete Product', ['Yes', 'No'])
            .then(function (result) {
                if (result == 'Yes') {
                    item.entityAspect.setDeleted();
                    self.manager.saveChanges().then(
                    function () {
                        self.products.valueHasMutated();
                    });

                }
            });

        },



        addNew: function () {
            //the app model allows easy display of modal dialogs by passing a view model
            //views are usually located by convention, but you an specify it as well with viewUrl

            var self = this;
            var productViewModel = require('viewmodels/ProductEdit');
            //productViewModel.accounts(self.accounts());

            //get a new empty Invoice object (id:-1 indicate empty objects)
            http.get('api/Product', { id: -1 }).then(function (response) {
                productViewModel.product(response);
                productViewModel.formStatus = "ADDNEW"
                app.showModal(productViewModel).then(function () {
                    self.activate();
                });
            });
        }
        //,
        //canDeactivate: function () {
        //    //the router's activator calls this function to see if it can leave the screen
        //    //return app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
        //}
    };
});