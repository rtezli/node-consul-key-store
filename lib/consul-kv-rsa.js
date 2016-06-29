var consul = require('consul')();

function PublicKeyStore(config) {
    this.config = config;
}

PublicKeyStore.prototype.Load(serviceName) {
    consul.kv.get('public-keys/' + serviceName + '/key.pem', function(error, values)) {

    }
}

PublicKeyStore.prototype.Store(serviceName) {
    consul.kv.set('public-keys/' + serviceName + '/key.pem', function(error, values)) {

    }
}

module.export = PublicKeyStore;


var q = require('q');

function CertificateStore(config) {
    this.consul = require('consul')(config);
}

CertificateStore.prototype.Load(serviceName) {
    var deferred = Q.defer();
    this.consul.kv.get('public-keys/' + serviceName + '/key.pem', function(error, values)) {
        if (!error) {
            q.resolve(value);
        } else {
            q.reject(error);
        }
    }
    return q.promise;
}

CertificateStore.prototype.Store(serviceName) {
    var deferred = Q.defer();
    this.consul.kv.set('public-keys/' + serviceName + '/key.pem', function(error, values)) {
        if (!error) {
            q.resolve();
        } else {
            q.reject(error);
        }
    }
    return q.promise;
}

module.export = CertificateStore;
