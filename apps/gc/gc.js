var Q = require('q');
var sapphire = require('sapphire-express');

function main(req, res, app)
{
	app.addJS([
//		'https://www.symphony.com/resources/api/v1.0/symphony-api.js',
	], true);

	app.addCSS([
		'https://www.symphony.com/resources/api/v1.1/symphony-style.css',
	], true);

	app.addCSS([
		'/gc/assets/css/gc.css',
	]);

	app.addJS([
		'/assets/js/lib/translate.js',
		'/assets/js/lib/templates.js',
		'/gc/assets/js/3rdParty/underscore.js',
		'/gc/assets/js/Views/Gc.js',
		'/gc/assets/js/Controllers/Gc.js',
		'/gc/assets/js/random.js',
		'/gc/assets/js/sets.js',
	]);


	return Q(app)
}

function use(type, name, req, res)
{
	var module = require('./' + type + '/' + name + '/' + name + '.js');
	return function(app)
	{
		return module(req, res, app);
	}
}

exports.getApplication = function(req, res)
{
	var session = req.session.get();
	var app = new sapphire.Application('GC', req, res);

	app.setTitle('Gc');
	app.setBody('apps/gc/templates/body.html');
	app.setMaster('apps/gc/templates/master.html');
	app.addVariable('baseUrl', CONFIG.baseUrl);

	return main(req, res, app)
		.then(sapphire.features.animator.bind(sapphire.features.animator, req, res))
		.then(sapphire.features.dialogs.bind(sapphire.features.dialogs, req, res))
		.then(use('features', 'services', req, res))
		.then(use('features', 'bread-crumbs', req, res))
		.then(use('pages', 'directory', req, res))
		.then(use('pages', 'mj', req, res))
		.then(use('pages', 'tetris', req, res))
		.then(use('pages', 'klondike', req, res))
		.then(use('pages', 'words', req, res))
		.then(function(app)
		{
			return Q(app);
		})
}
