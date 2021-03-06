Package('Gc.Views', {
	Directory : new Class({
		Extends : Sapphire.View,

		initialize : function(selector)
		{
			this.root = selector;
			this.parent();
		},

		draw : function(directory)
		{
			var container = this.root.find('.directory-container');
			container.empty();

			Object.each(directory, function(game)
			{
				var template = SAPPHIRE.templates.get('directory-card');
				template.find('.game-name').text(game.name);
				template.find('.game-image').attr('src', game.image);
				template.click(this.onGameClick.bind(this, game));

				container.append(template);
			}, this);
		},

		onGameClick : function(game)
		{
			this.fire('play', game);
//			SAPPHIRE.application.showPage('mj');
		}
	})
});
