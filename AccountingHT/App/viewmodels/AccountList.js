define(['require', 'durandal/http', 'durandal/app'], function (require, http, app) {


    return {
        displayName: 'Accounts',
        accounts: ko.observableArray([]),
        manager: new breeze.EntityManager('api/AccountingHT'),

        activate: function () {
            //the router's activator calls this function and waits for it to complete before proceding
            var self = this;
            var query = new breeze.EntityQuery()
                .from("Accounts");

            return self.manager.executeQuery(query).then(function (data) {
                self.accounts(data.results)
            }).fail(function (e) {
                alert(e);
            });

        },

        delete: function (item) {
            //the app model allows easy display of modal dialogs by passing a view model
            //views are usually located by convention, but you an specify it as well with viewUrl
            var self = this;
            app.showMessage('Are Your sure you want to delete the account', 'Delete Account', ['Yes', 'No'])
            .then(function (result) {
                if (result == 'Yes') {
                    item.entityAspect.setDeleted();
                    self.manager.saveChanges().then(function () {
                        self.accounts.valueHasMutated();
                    });

                }
            });

        }

    };
});