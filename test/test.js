var Address = require('../');

var hex = function (hex) { return new Buffer(hex, 'hex'); };

var validFixtures = require('./fixtures/valid.json');
var invalidFixtures = require('./fixtures/invalid.json');

describe('satoshi-address', function () {
  it('parseAddress', function () {
    validFixtures.forEach(function (fixture) {
      var address = new Address(fixture.address);
      expect(address.type).to.equal(fixture.type);
      expect(address.version).to.equal(fixture.version);
      expect(address.hash.toString('hex')).to.equal(fixture.hash);
    });
  });

  it('toString ', function () {
    validFixtures.forEach(function (fixture) {
      var address = new Address(hex(fixture.hash), fixture.type, fixture.network);
      expect(address.toString()).to.equal(fixture.address);
    });
  });

  it('Address.isValid', function () {
    validFixtures.forEach(function (fixture) {
      expect(Address.isValid(fixture.address)).to.be.true;
      expect(Address.isValid(hex(fixture.hash), fixture.type, fixture.network)).to.be.true;
    });
    invalidFixtures.forEach(function (fixture) {
      expect(Address.isValid(fixture)).to.be.false;
    });
  });
});
