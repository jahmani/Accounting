define(['durandal/http', 'durandal/app', 'services/logger', 'durandal/plugins/router'], function (http, app, logger,router) {

    return {
        displayName: 'Edit Products',
        product: ko.observable(),
        formStatus: "EDIT",
        manager: new breeze.EntityManager('api/AccountingHT'),
        isMetaFetched :false,

        activate: function (data) {
            var self = this;
            if (data.id == undefined)
                return;
            if (data.id == 'New') {
                self.formStatus = "ADDNEW";
                if (!self.isMetaFetched) {
                    return self.manager.fetchMetadata().then(function () {
                        var meta = self.manager.metadataStore;
                        self.isMetaFetched = true;
                        var prod = self.manager.createEntity('Product', {}, breeze.EntityState.Detached);
                        self.product(prod);
                    });
                }
                else {
                    var prod = self.manager.createEntity('Product', {}, breeze.EntityState.Detached);
                    self.product(prod);
                }

            }

            else {
                self.formStatus = "EDIT";
                var query = new breeze.EntityQuery().from("Products").where("Id","==",data.id);
                return self.manager.executeQuery(query).then(
                    function (data) {
                        self.isMetaFetched = true;
                        self.product(data.results[0]);
                    }).fail(function (e) {
                        logger.log("Invalid Product Id  ");
                    });
            }

        },
        close: function () {
            this.modal.close();
        },
        save: function () {
            var self = this;
            if (self.formStatus == "ADDNEW")
                self.manager.addEntity(self.product());
            var hc = self.manager.hasChanges();
            self.manager.saveChanges().then(function (result) {
                var x = result;
                logger.log('Succesfully saved changes', null, 'Product Edit ', true);
                router.navigateTo("#/ProductList");
            }).fail(function (e) {
                logger.log(e.message);
            });
        },
        deleteAccount: function () {
            var that = this;
            var jsonProduct = ko.toJSON(this.invoice())
            var url = 'api/Product/' + that.product().Id;
            //var json = JSON.stringify(data)

            $.ajax({
                url: url,
                type: 'DELETE',
                //contentType: "application/json; charset=utf-8",
                //data: jsonProduct,
                success: function (results) {
                    that.modal.close();
                }
            })
            return false;
            //http.post(url, { id: that.invoice().Id, invoice: jsonProduct }).then(function (response) {
            //  that.modal.close();

            //});
        }
        //,
        //canDeactivate: function () {
        //    //the router's activator calls this function to see if it can leave the screen
        //    return app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
        //}
    };
});