jasmine.getFixtures().fixturesPath = 'fixtures'

jasmine.Matchers.prototype.toInclude = function(expected) {
  return this.toContain(expected);
};

beforeEach(function() {
  this.addMatchers({
    toBeEmpty: function() {
      return this.actual.length === 0;
    }
  });
});