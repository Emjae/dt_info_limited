(function(ext) {
	var data = [{"_id":{},"low":"0","high":"0","open":"0","close":"0"}];
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
	
	ext.get_data = function (){fetch("https://cors.io/?https://freedolar.com/getDailyOHLC?ccy=usdves").then(function (j){return j.json()}).then(function (j){data = j})};
	ext.price = function(type)
	{
	if(type === "open"){return data.open};
	if(type === "high"){return data.high};
	if(type === "low"){return data.low};
	if(type === "close"){return data.close};
	};
	
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
		[' ', 'get exchange rate data', 'get_data'],
		['r', '%m.type value', 'price' , 'close' ],
		
        ],
		menus: {type: ["open","high","low","close"]},
    };

    // Register the extension
    ScratchExtensions.register('Dolar paralelo extension', descriptor, ext);
})({});
