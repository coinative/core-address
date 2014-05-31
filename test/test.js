var Address = require('../');

var hex = function (hex) { return new Buffer(hex, 'hex'); };

var MAINNET_PUBKEYHASH = 0;
var MAINNET_SCRIPTHASH = 5;
var MAINNET_PRIVATEKEY = 128;
var TESTNET_PUBKEYHASH = 111;
var TESTNET_SCRIPTHASH = 196;
var TESTNET_PRIVATEKEY = 239;

var validFixtures = [
  { address: '1J35jqKXBxXYdAmyvcEaNJwTrAvA39dajM', version: MAINNET_PUBKEYHASH, hash: 'badeecfdef0507247fc8f74241d73bc039972d7b' },
  { address: '1VayNert3x1KzbpzMGt2qdqrAThiRovi8', version: MAINNET_PUBKEYHASH, hash: '0568015a9facccfd09d70d409b6fc1a5546cecc6' },
  { address: '342ftSRCvFHfCeFFBuz4xwbeqnDw6BGUey', version: MAINNET_SCRIPTHASH, hash: '19a7d869032368fd1f1e26e5e73a4ad0e474960e' },
  { address: 'mvtcsMhy7EnT63ZbFG6S8CFctoC7NY8XWm', version: TESTNET_PUBKEYHASH, hash: 'a8a2d273af525252706125d7cab33f1feeac8832' },
  { address: 'mxDtLLJd8aquF7PRMbeiP5D38Fo6wHc5Ka', version: TESTNET_PUBKEYHASH, hash: 'b73fc2c095cc766ebb942ae27c0509412e6a8a10' },
  { address: '2Mstfri3G9Zv44LcMm5WjXEkVWVMXbyW1v5', version: TESTNET_SCRIPTHASH, hash: '0714fc3a2e8c637a2cedbcd614b8baec157bbad3' }
];
var invalidFixtures = [
  '',
  'abc',
  '123123123',
  '1J35jqKXBxXYdAmyvcEaNJwTrAvA39dajN' // M => N
]

describe('core-address', function () {
  it('parseAddress', function () {
    validFixtures.forEach(function (fixture) {
      var address = new Address(fixture.address);
      expect(address.version).to.equal(fixture.version);
      expect(address.hash.toString('hex')).to.deep.equal(fixture.hash);
    });
  });

  it('toString ', function () {
    validFixtures.forEach(function (fixture) {
      var address = new Address(hex(fixture.hash), fixture.version);
      expect(address.toString()).to.equal(fixture.address);
    });
  });

  it('isValid', function () {
    validFixtures.forEach(function (fixture) {
      var address = new Address(fixture.address);
      expect(address.isValid()).to.be.true;
      address = new Address(hex(fixture.hash), fixture.version);
      expect(address.isValid()).to.be.true;
    });
    invalidFixtures.forEach(function (fixture) {
      expect(new Address(fixture).isValid()).to.be.false;
    });
  });

  it('Address.isValid', function () {
    validFixtures.forEach(function (fixture) {
      expect(Address.isValid(fixture.address)).to.be.true;
      expect(Address.isValid(hex(fixture.hash), fixture.version)).to.be.true;
    });
    invalidFixtures.forEach(function (fixture) {
      expect(Address.isValid(fixture)).to.be.false;
    });
  });
});
