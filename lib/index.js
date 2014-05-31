var base58 = require('core-base58');

function parseAddress(address) {
  var data = base58.decodeCheck(address);
  if (!data) {
    return {};
  }
  return {
    version: data[0],
    hash: data.slice(1)
  };
}

// new Address(hash, version)
// new Address(address)
function Address(hash, version) {
  if (typeof hash === 'string') {
    var parsed = parseAddress(hash);
    this.hash = parsed.hash;
    this.version = parsed.version;
    return;
  }
  this.hash = hash;
  this.version = version;
}

Address.prototype.isValid = function () {
  return Buffer.isBuffer(this.hash) &&
         this.hash.length === 20 &&
         (Address.knownVersions.indexOf(this.version) !== -1);
};

Address.prototype.toString = function () {
  var data = Buffer.concat([new Buffer([this.version]), this.hash]);
  return base58.encodeCheck(data);
};

// Address.isValid(hash, version)
// Address.isValid(address)
Address.isValid = function (hash, version) {
  return new Address(hash, version).isValid();
};

Address.knownVersions = [
  0, // mainnet pubkey hash
  5, // mainnet script hash
  111, // testnet pubkey hash
  196 // testnet script hash
];

module.exports = Address;
