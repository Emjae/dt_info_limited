(function(ext) {
	var data = {"USD":{"dolartoday":0,"localbitcoin_ref":0,"efectivo_cucuta":0},"EUR":{"dolartoday":0,"sicad1":0,"efectivo_cucuta":0},"COL":{"efectivo":0},"EURUSD":{"rate":0}};
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
	if(type === "dollar"){return data.USD.dolartoday};
	if(type === "euro"){return data.EUR.dolartoday};
	};
	ext.cash = function(type)
	{
	if(type === "dollar"){return data.USD.efectivo_cucuta};
	if(type === "euro"){return data.EUR.efectivo_cucuta};
	};
	ext.bitcoin = function(type)
	{
	if(type === "dollar"){return data.USD.localbitcoin_ref};
	if(type === "euro"){return data.USD.localbitcoin_ref*data.EURUSD.rate};
	};
	ext.eurusd = function(type)
	{
	return data.EURUSD.rate;
	};
	
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
		[' ', 'get exchange rate data', 'get_data'],
		['r', 'dolartoday %m.currency price', 'dolartoday' , 'dollar' ],
		['r', '%m.currency cash price', 'cash', 'dollar' ],
		['r', 'estimated %m.currency price through LocalBitCoins', 'bitcoin','dollar' ],
		['r', 'EUR/USD rate', 'eurusd' ],
		
        ],
		menus: {currency: ["dollar","euro"]},
    };

    // Register the extension
    ScratchExtensions.register('DolarToday extension', descriptor, ext);
})({});
