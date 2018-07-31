(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
	
	ext.get_rate = function() {
		$.ajax({
              url: 'https://s3.amazonaws.com/dolartoday/data.json',
              dataType: 'jsonp',
              success: function( dolartoday ) {
                  rate = dolartoday['USD']['dolartoday'];
                  callback(rate);
              }
        });
	}

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
		['R', 'current exchange rate', 'get_rate'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('DolarToday extension', descriptor, ext);
})({});
