var SERVICES = {};
var services = {};
var registryService = new Service('service-registry');

SERVICES.services = {
    listen : registryService.listen.bind(registryService),
    unlisten : registryService.unlisten.bind(registryService),
    fire : registryService.fire.bind(registryService),
    fireArgs : registryService.fireArgs.bind(registryService),

    assign : function(name, service) {
        services[name] = service;
    },

    register : function(name) {
        if (services[name] === undefined) {
            services[name] = new Service(name);
        }

        registryService.fire('registered', name);
        return services[name];
    },

    subscribe : function(name) {
    // if we are floating, maybe this service is global, check the global list of the parent
        if (services[name] === undefined) {
            return false
        }

        return services[name];
    },

    remove : function(name) {
        if (services[name] !== undefined) {
            delete services[name];
        }
    },

    broadcast : function(event, filter) {
        var passed = Array.prototype.slice.call(arguments, 1);
        var results = [];

        for (var name in services) {
            if (services.hasOwnProperty(name)) {
                var skip = (filter && !filter(name)) || false;
                try {
                    if (!skip) {
                        results.push(services[name].fireArgs(event, passed));
                    }
                } catch (e) {
                    console.warn('error during broadcast');
                    console.warn(e.stack);
                }
            }
         }

         SERVICES.services.fireArgs(event, passed);

         return results;
    },

    makeAnonymousService : function() {
        return new Service('anon')
    },

    make : function(serviceName, thing, implementing, eventable)
    {
        thing.registryService = SERVICES.services.register(serviceName);
        implementing = implementing || [];

        implementing.forEach(function(name) {
            if (thing[name]) {
                thing.registryService.implement(name, thing[name].bind(thing));
            } else {
                console.warn('cannot find', name, 'in', serviceName);
            }
        });

        if (eventable) {
            thing.fire = thing.registryService.callfire.bind(thing.registryService);
            thing.listen = thing.registryService.listen.bind(thing.registryService);
            thing.unlisten = thing.registryService.unlisten.bind(thing.registryService);
            thing.bubble = thing.registryService.bubble.bind(thing.registryService);
        }
    },
}
