(function() {
  describe('Field', function() {
    var field, opts;
    field = null;
    opts = null;
    beforeEach(function() {
      opts = {
        id: 'foo',
        regexp: /^\d+$/,
        min: 1,
        max: 3
      };
      field = new Field(opts);
      return field.name = function() {
        return 'Whatever';
      };
    });
    it('should set attributes', function() {
      return ['id', 'regexp', 'min', 'max', 'range'].each(function(name) {
        return expect(field[name]).toEqual(opts[name]);
      });
    });
    describe('when all attributes are valid', function() {
      beforeEach(function() {
        return field.value = function() {
          return '1';
        };
      });
      it('should be valid', function() {
        return expect(field.isValid()).toBeTruthy();
      });
      it('errors should stay empty', function() {
        return expect(field.errors).toBeEmpty();
      });
      return describe('when value is included in range', function() {
        return it('should not be valid', function() {
          field.max = field.min = field.regexp = null;
          field.value = function() {
            return 'c';
          };
          field.range = ['A', 'B', 'C'];
          return expect(field.isValid()).toBeFalsy();
        });
      });
    });
    return describe('when not all attributes are valid', function() {
      it('errors should not be empty', function() {
        field.value = function() {
          return '11';
        };
        field.isValid();
        return expect(field.errors).not.toBeEmpty();
      });
      describe('when value exceeds max', function() {
        return it('should not be valid', function() {
          field.value = function() {
            return '4';
          };
          return expect(field.isValid()).toBeFalsy();
        });
      });
      describe('when value is lower than min', function() {
        return it('should not be valid', function() {
          field.value = function() {
            return '0';
          };
          return expect(field.isValid()).toBeFalsy();
        });
      });
      describe('when value does not match regexp', function() {
        return it('should not be valid', function() {
          field.value = function() {
            return 'abracadabra';
          };
          return expect(field.isValid()).toBeFalsy();
        });
      });
      describe('when value is not included in range', function() {
        return it('should not be valid', function() {
          field.max = field.min = field.regexp = null;
          field.value = function() {
            return 'c';
          };
          field.range = ['A', 'B', 'C'];
          return expect(field.isValid()).toBeFalsy();
        });
      });
      return describe('when there are many errors', function() {
        return it('should add a message for each error', function() {
          field.value = function() {
            return 'asdasd';
          };
          field.isValid();
          return expect(field.errors.length).toBeGreaterThan(1);
        });
      });
    });
  });
}).call(this);
