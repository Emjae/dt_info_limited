(function(ext) {
	var data = {"USD":{"dolartoday":0,"sicad1":0,"efectivo_cucuta":0},"EUR":{"dolartoday":0,"sicad1":0,"efectivo_cucuta":0},"COL":{"efectivo":0},"EURUSD":{"rate":0}};
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
	
	ext.get_data = function (){fetch("https://s3.amazonaws.com/dolartoday/data.json").then(function (j){return j.json()}).then(function (j){data = j})};
	ext.dolartoday = function(type)
	{
	if(type === "dollar"){return data.USD.dolartoday);
	if(type === "euro"){return data.EUR.dolartoday);
	}
	
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
		[' ', 'get exchange rate data', 'get_data'],
		['r', 'dolartoday rate in %m.currency', 'dolartoday' ],
		
        ],
		menus: {currency: ["dollar","euro"]},
    };

    // Register the extension
    ScratchExtensions.register('DolarToday extension', descriptor, ext);
})({});
