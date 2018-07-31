(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
	
	ext.get_rate = function(callback) {
		$.ajax({
              url: 'https://s3.amazonaws.com/dolartoday/data.json',
              dataType: 'json',
              success: function( dolartoday ) {
				  
				  ext.exchange = function(type){
				  if(type === "dollar"){(rate = dolartoday['USD']['dolartoday'])};
				  if(type === "euro"){(rate = dolartoday['EUR']['dolartoday'])};
				  }
                  callback(rate);
				  
              }
        });
	}

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
		['R', 'current exchange rate in %m.currency', 'get_rate', 'dollar'],
        ],
		menus: {currency: ["dollar","euro"]},
    };

    // Register the extension
    ScratchExtensions.register('DolarToday extension', descriptor, ext);
})({});
