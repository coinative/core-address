var base58 = require('core-base58');

function parseAddress(address) {
  var data = base58.decodeCheck(address);
  if (!data) {
    throw new Error('invalid data or checksum');
  }
  var version = Address.versions[data[0]];
  if (!version) {
    throw new Error('unknown version');
  }
  return {
    type: version.type,
    network: version.network,
    hash: data.slice(1)
  };
}

// new Address(hash, type='pubkeyhash', network='mainnet')
// new Address(address)
function Address(hash, type, network) {
  if (typeof hash === 'string') {
    var parsed = parseAddress(hash);
    this.type = parsed.type;
    this.network = parsed.network;
    this.hash = parsed.hash;
    return;
  }

  this.type = type || 'pubkeyhash';
  this.network = network || 'mainnet';
  this.hash = hash;
}

Address.prototype.toString = function () {
  var version = Address.networks[this.network][this.type];
  var data = Buffer.concat([new Buffer([version]), this.hash]);
  return base58.encodeCheck(data);
};

// Address.isValid(hash, type='pubkeyhash', network='mainnet')
// Address.isValid(address)
Address.isValid = function (hash, type, network) {
  try {
    new Address(hash, type, network);
    return true;
  } catch (e) {
    return false;
  }
};

Address.networks = {
  mainnet: {
    pubkeyhash: 0,
    scripthash: 5
  },
  testnet: {
    pubkeyhash: 111,
    scripthash: 196
  }
};

Object.defineProperty(Address, 'versions', {
  get: function () {
    var networks = Address.networks;
    return Object.keys(networks).reduce(function (versions, network) {
      Object.keys(networks[network]).forEach(function (type) {
        var version = networks[network][type];
        versions[version] = { network: network, type: type };
      });
      return versions;
    }, {});
  }
});

module.exports = Address;
