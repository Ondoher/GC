Package('Gc.Controllers', {
	Gc : new  Class({
		Extends: Sapphire.Controller,

		initialize : function()
		{
			this.parent();
			SAPPHIRE.application.listen('start', this.onStart.bind(this));
			SAPPHIRE.application.listen('ready', this.onReady.bind(this));
		},

		onStart : function(callback)
		{
			callback();
		},

		onReady : function()
		{
			this.view = new Gc.Views.Gc();
		}
	})
});

SAPPHIRE.application.registerController('gc', new Gc.Controllers.Gc());
