(function(ext) {
	var data = [{"_id":{},"low":"0","high":"0","open":"0","close":"0"}];
	var session = {"_id":"0","bid":"0","ask":"0","mid":"0","date":"0","high":"0","low":"0","open":"0","close":"0"};
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
	
	ext.get_data = function (){fetch("https://cors.io/?https://freedolar.com/getDailyOHLC?ccy=usdves").then(function (j){return j.json()}).then(function (j){data = j})};
	ext.get_session = function (){fetch("https://cors.io/?https://freedolar.com/getDay?ccy=usdves").then(function (j){return j.json()}).then(function (j){data = j})};
	ext.price = function(type)
	{
	if(type === "open"){return data[0].open};
	if(type === "high"){return data[0].high};
	if(type === "low"){return data[0].low};
	if(type === "close"){return data[0].close};
	};
	ext.sessionData = function(type)
	{
	return session.close
	};
	
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
		[' ', 'get exchange rate data', 'get_data'],
		[' ', 'get previous close', 'get_session'],
		['r', '%m.type value', 'price' , 'close' ],
		['r', 'previous close', 'sessionData'],
		
        ],
		menus: {type: ["open","high","low","close"]},
    };

    // Register the extension
    ScratchExtensions.register('Dolar paralelo extension', descriptor, ext);
})({});
