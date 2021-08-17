SERVICES.start = function(filter) {
    var promises = [];

    var results = SERVICES.services.broadcast('start', filter);

    _.each(results, function(result) {
        if (Q.isPromise(result)) {
            promises.push(result);
        }
    });

    return Q.allSettled(promises)
        .then(function() {
            SERVICES.services.broadcast('ready', filter);
            return true;
        })
        .catch(function(e)
        {
            console.error(e.stack);
            return false;
        });
};

SAPPHIRE.application.listen('start', SERVICES.start.bind(SERVICES));

