(function (CS) {
	var definition = {
		typeName: 'multi',
		displayName: 'multi',
		datasourceBehavior: CS.Extensibility.Enums.DatasourceBehaviors.Multiple,
		visObjectType: symbolVis,
		getDefaultConfig: function () {
			return {
				DataShape: 'Table',
				Height: 300,
				Width: 500,
				TextColor: 'white'
			};
		}
	};
	
	//************************************
	// Function called to initialize the symbol
	//************************************
	function symbolVis() { }
    CS.deriveVisualizationFromBase(symbolVis);
	symbolVis.prototype.init = function(scope, elem) {
		this.onDataUpdate = dataUpdate;
		// Create var to hold the data, labels
		scope.items = [];
		function dataUpdate(data) {
			if(data) {
				for (var i = 0; i < data.Rows.length; i++) {
					if (scope.items[i]) {
						// Update the time and date
						scope.items[i].Time = data.Rows[i].Time;
						scope.items[i].Value = parseFloat(data.Rows[i].Value);
						// If the label have been updated, update it
						if (data.Rows[i].Label) {
							scope.items[i].Label = data.Rows[i].Label;
						}
					} else {
						// Create a new data object, extracting attributes from the data update
						var newDataObject = {
							"Label": data.Rows[i].Label,
							"Time": data.Rows[i].Time,
							"Value": parseFloat(data.Rows[i].Value),
						};
						scope.items[i] = newDataObject;
					}
				}
			}
		}	
	}
	CS.symbolCatalog.register(definition);
})(window.PIVisualization);