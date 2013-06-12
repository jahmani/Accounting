define(['durandal/http', 'durandal/app', 'services/logger', 'durandal/plugins/router'], function (http, app,logger,router) {

    return {
        displayName: 'Edit Invoice',
        invoice: ko.observable(),
        invoiceLines: ko.observableArray(),
        accounts: ko.observableArray([]),
        products: ko.observableArray([]),
        formStatus: "EDIT",
        isMetaFetched: false,
        manager : new breeze.EntityManager("api/AccountingHT"),

        activate: function (data) {
            var self = this;
            self.invoice = ko.observable();
            self.invoiceLines = ko.observableArray([]);
            self.accounts = ko.observableArray([]);
            
            if (data.id == undefined)
                return;
            self.manager.executeQuery(new breeze.EntityQuery("Accounts"))
                .then(function (data) {
                    self.accounts(data.results);
                });
            self.manager.executeQuery(new breeze.EntityQuery("Products"))
                .then(function (data) {
                    self.products(data.results);
                });
            if (data.id == 'New') {
                self.formStatus = "ADDNEW";
                if (!self.isMetaFetched) {
                    return self.manager.fetchMetadata().then(function () {
                        var meta = self.manager.metadataStore;
                        self.isMetaFetched = true;
                        var inv = self.manager.createEntity('Invoice', { DateTime: new Date(), Description:"Invoice No. " });
                        self.invoice(inv);
                        self.invoiceLines(self.invoice().InvoiceLines());
                        self.addInvoiceLine();
                        inv.InvoiceType("SalesInvoice");

                    });
                }
                else {
                    //var invLine = self.manager.createEntity('InvoiceLine', { });
                    var inv = self.manager.createEntity('Invoice', { DateTime: new Date() });
                    //inv.InvoiceLines().push(invLine);
                    self.invoice(inv);
                    self.invoiceLines(self.invoice().InvoiceLines());
                    self.addInvoiceLine();
                    //self.invoiceLines(inv.InvoiceLines());
                    inv.InvoiceType("SalesInvoice");
                }

            }
            else {
                self.formStatus = "EDIT";
                var query = new breeze.EntityQuery().from("Invoices").where("Id", "==", data.id)
                .expand("InvoiceLines");
                return self.manager.executeQuery(query).then(
                    function (data) {
                        self.isMetaFetched = true;
                        self.invoice(data.results[0]);
                        self.invoiceLines(self.invoice().InvoiceLines());
                    }).fail(function (e) {
                        logger.logError("Invalid Invoice Id  ");
                    });
            }
        },

        canDeactivate: function ()
        {
            var self = this;
            if (self.manager.hasChanges()) {
            return app.showMessage('Are Your sure you want to Cancel Changes', 'Cancel', ['Yes', 'No'])
            .then(function (result) {
                if (result == 'Yes') {
                    self.manager.rejectChanges();
                    return true
                }
                else {
                    return false;}
      
            });
            }
            return true;
        },

        addInvoiceLine: function () {
            var self = this;
            var invLine = self.manager.createEntity('InvoiceLine', { ProductId: undefined });
            self.invoice().InvoiceLines().push(invLine);
            self.invoiceLines.valueHasMutated();
            //self.invoiceLines.push(invLine);

        },
        deleteInvoiceLine: function (item) {
            var self = this;
            //remove the deleted line from the list
            item.entityAspect.setDeleted();
            //trigger ko array for change
            self.invoiceLines.valueHasMutated();

        },
        close: function () {
            this.modal.close();
        },
        save: function () {
            var self = this;
            //if (self.formStatus == "ADDNEW")
            //    self.manager.addEntity(self.invoice());
            var hc = self.manager.hasChanges();
            var errs = self.invoice().entityAspect.getValidationErrors();
            self.manager.saveChanges().then(function (result) {
                var x = result;
                logger.log('Succesfully saved changes', null, 'Invoice Edit ', true);
                router.navigateTo("#/InvoiceList");
            }).fail(function (e) {
                var errs = self.invoice().entityAspect.getValidationErrors();
                logger.log(e.message);
            });
        },
        deleteAccount: function () {
            var that = this;
            var jsonAccount = ko.toJSON(this.invoice())
            var url = 'api/Invoice/' + that.invoice().Id;
            //var json = JSON.stringify(data)

            $.ajax({
                url: url,
                type: 'DELETE',
                //contentType: "application/json; charset=utf-8",
                //data: jsonAccount,
                success: function (results) {
                    that.modal.close();
                }
            })
            return false;
            //http.post(url, { id: that.invoice().Id, invoice: jsonAccount }).then(function (response) {
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