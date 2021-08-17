SERVICES.eventable = {
    makeEventable : function(thing) {
        thing.eventer = SERVICES.services.makeAnonymousService();
        thing.fire = thing.eventer.fire.bind(thing.eventer);
        thing.listen = thing.eventer.listen.bind(thing.eventer);
        thing.unlisten = thing.eventer.unlisten.bind(thing.eventer);
        thing.bubble = thing.eventer.bubble.bind(thing.eventer);
    }
}
