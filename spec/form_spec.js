(function() {
  describe('Form', function() {
    var form;
    form = null;
    beforeEach(function() {
      loadFixtures('page.html');
      return form = new Form();
    });
    it('should have a html field for each field', function() {
      return Form.fields.each(function(field) {
        return expect($("#" + field.id).length).toBe(1);
      });
    });
    it('should have element', function() {
      return expect(form.element.length).toBe(1);
    });
    it('should have no error', function() {
      return expect(form.errors).toBeEmpty();
    });
    describe('when today is 20 december 2011', function() {
      beforeEach(function() {
        return form.today = function() {
          return new Date('20 Dec 2011');
        };
      });
      it('getYear should be 2011', function() {
        return expect(form.getYear()).toBe(2011);
      });
      it('getNextMonth should be 0', function() {
        return expect(form.getNextMonth()).toBe(0);
      });
      return it('expectedYear should be next year', function() {
        return expect(form.expectedYear()).toBe(2012);
      });
    });
    return describe('when today is 10 January 2012', function() {
      beforeEach(function() {
        return form.today = function() {
          return new Date('10 Jan 2012');
        };
      });
      it('getYear should be 2012', function() {
        return expect(form.getYear()).toBe(2012);
      });
      return it('getNextMonth should be 1', function() {
        return expect(form.getNextMonth()).toBe(1);
      });
    });
  });
}).call(this);
