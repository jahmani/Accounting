define(['require', 'durandal/http', 'durandal/app'], function (require, http, app) {

    return {
        displayName: 'Invoice List',
        invoices: ko.observableArray([]),
        manager: new breeze.EntityManager('api/AccountingHT'),

        activate: function () {
            //the router's activator calls this function and waits for it to complete before proceding
            var self = this;
            var query = new breeze.EntityQuery()
                .from("Invoices").expand("CreditAccount,DebitAccount,Currency ");

            return self.manager.executeQuery(query).then(function (data) {
                self.invoices(data.results)
            }).fail(function (e) {
                alert(e);
            });

        },
        deleteItem: function (item) {
            var self = this;
            app.showMessage('Are Your sure you want to delete the Invoice', 'Delete Invoice', ['Yes', 'No'])
            .then(function (result) {
                if (result == 'Yes') {
                    item.entityAspect.setDeleted();
                    self.manager.saveChanges().then(
                    function () {
                        self.invoices.remove(item);
                //        self.invoices.valueHasMutated();
                    }).fail(function (err) {
                        self.manager.rejectChanges();
              //          self.activate();
                    });

                }
            });

        }

    };
});