Package('Gc.Services', {
	Words : new Class({
		implements : ['play'],

		initialize : function()
		{
			SERVICES.services.make('words', this, this.implements, true);

			SAPPHIRE.application.listen('ready', this.onReady.bind(this));
		},

		onReady : function()
		{
			var game = {
				image: GC.baseUrl + 'gc/pages/words/assets/images/words-tile.jpg',
				name: 'Words',
				service: 'words',
			};

			this.directoryService = SERVICES.services.subscribe('directory');
			this.directoryService.add(game);
		},

		play : function(game)
		{
			SAPPHIRE.application.showPage('words');
		}
	})
});

new Gc.Services.Words();
