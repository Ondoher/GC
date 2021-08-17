var Q = require('q');
var Feature = require('sapphire-express').Feature;

module.exports = function(req, res, app)
{
	var mj = new Feature(app, '/gc/pages/mj/');

	mj.addJS(['assets/js/Services/Mj.js']);
	mj.addPage({
		name: 'mj',
		url: 'assets/pages/mj.html',
		javascript: ['assets/js/Controllers/MahJongg.js', 'assets/js/Views/MahJongg.js', 'assets/js/Engines/MahJongg.js'],
		css: ['assets/css/mj.css', 'assets/css/ivory_48.css', 'assets/css/ivory.css'],
	});

	return Q(app);
}
