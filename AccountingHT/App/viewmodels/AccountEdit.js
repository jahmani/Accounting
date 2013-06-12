define(['durandal/http', 'durandal/app', 'services/logger','durandal/plugins/router'], function (http, app,logger,router) {

    return {
        displayName: 'Edit Account',
        account: ko.observable(),
        accounts: ko.observableArray([]),
        formStatus: "EDIT",
        manager : new breeze.EntityManager('api/AccountingHT'),

        activate: function (data) {
            logger.log('Account Edit View Activated', null, 'Account Edit ', true);
            var self = this;

            var query = new breeze.EntityQuery().from("Accounts");
            self.manager.executeQuery(query).then(function (data) {
                self.accounts(data.results);
            }).fail(function (e) {
                alert(e);
            });
            if (data.id != undefined) {


                if (data.id == "ADDNEW") {
                    self.formStatus = "ADDNEW"
                    var query = new breeze.EntityQuery().from("Accounts");
                    return self.manager.executeQuery(query).then(function (data) {
                        self.accounts(data.results);
                    var acc = self.manager.createEntity("Account", { Name: 'Acme' }, breeze.EntityState.Detached);

                    self.account(acc);
                    }).fail(function (e) {
                        alert(e);
                    });

                    var y = self.manager.getChanges();
                }
                else {
                    self.formStatus = "EDIT"
                    var query = new breeze.EntityQuery().from("Accounts").where("Id", "==", data.id);
                    return self.manager.executeQuery(query).then(function (data) {
                        self.account(data.results[0])
                    }).fail(function (e) {
                        alert(e);
                    });
                }
            }
        },


        save: function () {
            var self = this;
            if (self.formStatus == "ADDNEW")
                self.manager.addEntity(self.account());

            self.manager.saveChanges().then(function () {
                logger.log('Succesfully saved changes', null, 'Account Edit ', true);
                //router.navigateTo("#/AccountList");
            });
        },

        canDeactivate: function () {
           return app.showMessage('Are you sure you want to leave without saving changes?', 'Confirm', ['Yes', 'No'])
            .then(function (result) {
                return result == 'Yes';
            });
        }

    };
});