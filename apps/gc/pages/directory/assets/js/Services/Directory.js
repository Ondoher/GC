Package('Gc.Services', {
	Directory : new Class({
		implements : ['get', 'add', 'play', 'crumbClick'],

		initialize : function()
		{
			SERVICES.services.make('directory', this, this.implements, true);
			SAPPHIRE.application.listen('ready', this.onReady.bind(this));
			SAPPHIRE.application.listen('linked', this.onLinked.bind(this));

			this.directory = {};
		},

		onReady : function()
		{
			SAPPHIRE.application.showPage('directory');
			this.crumbsService = SERVICES.services.subscribe('bread-crumbs');
		},

		get : function()
		{
			return JSON.parse(JSON.stringify(this.directory));
		},

		add : function(game)
		{
			this.directory[game.name] = game;
			this.fire('update');
		},

		play : function(game)
		{
			var service = SERVICES.services.subscribe(game.service);
			if (!service) return;

			service.invoke('play', game);
			this.crumbsService.add('Directory', 'directory', 'directory');
		},

		crumbClick : function(id)
		{
			SAPPHIRE.application.showPage('directory');
		},

		onLinked : function()
		{
			this.crumbsService.clear();
			this.crumbsService.add('Directory', 'directory', 'directory');
		}
	})
});

new Gc.Services.Directory();
