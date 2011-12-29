beforeEach(function() {
  this.addMatchers({
    toBeEmpty: function() {
      return this.actual.length === 0;
    }
  });
});
