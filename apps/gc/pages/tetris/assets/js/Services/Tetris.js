Package('Gc.Services', {
	Tetris : new Class({
		implements : ['play'],

		initialize : function()
		{
			SERVICES.services.make('tetris', this, this.implements, true);

			SAPPHIRE.application.listen('ready', this.onReady.bind(this));
		},

		onReady : function()
		{
			var game = {
				image: GC.baseUrl + 'gc/pages/tetris/assets/images/tetris-tile.jpg',
				name: 'Quadroids',
				service: 'tetris',
			};

			this.directoryService = SERVICES.services.subscribe('directory');
			this.directoryService.add(game);
		},

		play : function(game)
		{
			SAPPHIRE.application.showPage('tetris');
		}
	})
});

new Gc.Services.Tetris();
