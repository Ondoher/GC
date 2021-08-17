Package('Gc.Services', {
	Klondike : new Class({
		implements : ['play'],

		initialize : function()
		{
			SERVICES.services.make('klondike', this, this.implements, true);

			SAPPHIRE.application.listen('ready', this.onReady.bind(this));
		},

		onReady : function()
		{
			var game = {
				image: GC.baseUrl + 'gc/pages/klondike/assets/images/klondike-tile.jpg',
				name: 'Solitaire',
				service: 'klondike',
			};

			this.directoryService = SERVICES.services.subscribe('directory');
			this.directoryService.add(game);
		},

		play : function(game)
		{
			SAPPHIRE.application.showPage('klondike');
		}
	})
});

new Gc.Services.Klondike();
