var q = require('q');

function PublicKeyStore(options) {
    if (options === undefined) {
        this.consul = require('consul')();
    } else {
        this.consul = require('consul')(options);
    }
}

PublicKeyStore.prototype.load = function(serviceName) {
    var deferred = Q.defer();
    this.consul.kv.get('public-keys/' + serviceName + '/key.pem', function(error, values) {
        if (!error) {
            q.resolve(value);
        } else {
            q.reject(error);
        }
    });
    return q.promise;
}

PublicKeyStore.prototype.store = function(serviceName, key) {
    var deferred = Q.defer();
    this.consul.kv.set('public-keys/' + serviceName + '/key.pem', function(error, values) {
        if (!error) {
            q.resolve();
        } else {
            q.reject(error);
        }
    });
    return q.promise;
}

module.exports = PublicKeyStore;
