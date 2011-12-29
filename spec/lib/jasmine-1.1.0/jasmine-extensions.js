jasmine.getFixtures().fixturesPath = 'fixtures'

beforeEach(function() {
  this.addMatchers({
    toBeEmpty: function() {
      return this.actual.length === 0;
    }
  });
});