var Q = require('q');
var Feature = require('sapphire-express').Feature;

module.exports = function(req, res, app)
{
	var breadCrumbs = new Feature(app, '/gc/features/services/');

	breadCrumbs.addJS([
        'assets/js/Service.js',
        'assets/js/Registry.js',
        'assets/js/Eventable.js',
        'assets/js/Start.js',
    ]);

	return Q(app);
}
