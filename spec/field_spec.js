(function() {
  describe('Field', function() {
    var field, opts;
    field = null;
    opts = null;
    beforeEach(function() {
      loadFixtures('page.html');
      opts = {
        id: 'designer',
        regexp: /^\d+$/,
        min: 1,
        max: 3
      };
      return field = new Field(opts);
    });
    it('should set attributes', function() {
      return ['id', 'regexp', 'min', 'max', 'range'].each(function(name) {
        return expect(field[name]).toBe(opts[name]);
      });
    });
    describe('when all attributes are valid', function() {
      beforeEach(function() {
        return spyOn(field, 'value').andReturn('3');
      });
      it('should be valid', function() {
        return expect(field.isValid()).toBeTruthy();
      });
      return it('errors should stay empty', function() {
        return expect(field.errors).toBeEmpty();
      });
    });
    return describe('when not all attributes are valid', function() {
      it('errors should not be empty', function() {
        spyOn(field, 'value').andReturn('11');
        field.isValid();
        return expect(field.errors).not.toBeEmpty();
      });
      describe('when value exceeds max', function() {
        return it('should not be valid', function() {
          spyOn(field, 'value').andReturn('4');
          field.isValid();
          return expect(field.isValid()).toBeFalsy();
        });
      });
      describe('when value is lower than min', function() {
        beforeEach(function() {
          return spyOn(field, 'value').andReturn('0');
        });
        return it('should not be valid', function() {
          return expect(field.isValid()).toBeFalsy();
        });
      });
      describe('when value does not match regexp', function() {
        beforeEach(function() {
          return spyOn(field, 'value').andReturn('abracadabra');
        });
        return it('should not be valid', function() {
          return expect(field.isValid()).toBeFalsy();
        });
      });
      describe('when value is not included in range', function() {
        beforeEach(function() {
          field.max = field.min = field.regexp = null;
          field.range = ['A', 'B', 'C'];
          return spyOn(field, 'value').andReturn('c');
        });
        return it('should not be valid', function() {
          return expect(field.isValid()).toBeFalsy();
        });
      });
      return describe('when there are many errors', function() {
        beforeEach(function() {
          return spyOn(field, 'value').andReturn('asdasd');
        });
        return it('should add a message for each error', function() {
          field.isValid();
          return expect(field.errors.length).toBeGreaterThan(1);
        });
      });
    });
  });
}).call(this);
