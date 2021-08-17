Package('Gc.Services', {
	Mj : new Class({
		implements : ['play'],

		initialize : function()
		{
			SERVICES.services.make('mj', this, this.implements, true);

			SAPPHIRE.application.listen('ready', this.onReady.bind(this));
		},

		onReady : function()
		{
			var game = {
				image: GC.baseUrl + 'gc/pages/mj/assets/images/mj-tile.jpg',
				name: 'Mah Jongg Solitaire',
				service: 'mj',
			};

			this.directoryService = SERVICES.services.subscribe('directory');
			this.directoryService.add(game);
		},

		play : function(game)
		{
			SAPPHIRE.application.showPage('mj');
		}
	})
});

new Gc.Services.Mj();
