ko.bindingHandlers.datetext = {
	init: function (element, valueAccessor, allBindingsAccessor) {
		// Provide a custom text value
		var value = valueAccessor(), allBindings = allBindingsAccessor();
		var dateFormat = allBindingsAccessor.dateFormat || "M/D/YYYY";
		var strDate = ko.utils.unwrapObservable(value);
		if (strDate) {
			if (moment(strDate).year() > 1970) {
			    var date = moment(strDate).format(dateFormat);
			    // var date = moment(strDate).calendar();
			    $(element).text(date);
			}
			else {
				$(element).text("-");
			}
		}
	},
	update: function (element, valueAccessor, allBindingsAccessor) {
		// Provide a custom text value
		var value = valueAccessor(), allBindings = allBindingsAccessor();
		var dateFormat = allBindingsAccessor.dateFormat || "M/D/YYYY";
		var strDate = ko.utils.unwrapObservable(value);
		if (strDate) {
			if (moment(strDate).year() > 1970) {
			    var date = moment(strDate).format(dateFormat);
			    // var date = moment(strDate).calendar();
			    $(element).text(date);
			}
			else {
				$(element).text("-");
			}
		}
	}
};
ko.bindingHandlers.datevalue = {
	init: function (element, valueAccessor, allBindingsAccessor) {
		// Use the value binding
		ko.bindingHandlers.value.init(element, valueAccessor, allBindingsAccessor);

		// Provide a custom text value
		var value = valueAccessor(), allBindings = allBindingsAccessor();
		var dateFormat = allBindingsAccessor.dateFormat || "M/D/YYYY";
		var strDate = ko.utils.unwrapObservable(value);
		if (strDate) {
			var date = moment(strDate).format(dateFormat);
			$(element).val(date);
		}
		ko.utils.registerEventHandler(element, "change", function () {
		    var observable = valueAccessor();
		    observable(moment($(element).val()));
		});
	    //$(element).datepicker({ formatDate: dateFormat });
	},
	update: function (element, valueAccessor, allBindingsAccessor) {
		// Use the value binding
		ko.bindingHandlers.value.update(element, valueAccessor, allBindingsAccessor);

		// Provide a custom text value
		var value = valueAccessor(), allBindings = allBindingsAccessor();
		var dateFormat = allBindingsAccessor.dateFormat || "M/D/YYYY";
		var strDate = ko.utils.unwrapObservable(value);
		if (strDate) {
			var date = moment(strDate).format(dateFormat);
			$(element).val(date);
		}
	}
};