(function() {
  describe('Form', function() {
    var form;
    form = null;
    beforeEach(function() {
      $('.page').remove();
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
    describe('initFields()', function() {
      it('should have no field, initially', function() {
        return expect(form.fields).toBeEmpty();
      });
      return it('should set fields', function() {
        form.initFields();
        return expect(form.fields).not.toBeEmpty();
      });
    });
    it('should have no error', function() {
      return expect(form.errors).toBeEmpty();
    });
    describe('when today is 20 december 2011', function() {
      beforeEach(function() {
        form.today = function() {
          return new Date('20 Dec 2011');
        };
        form.thisYear = form.getYear();
        return form.nextMonth = form.getNextMonth();
      });
      it('getYear should be 2011', function() {
        return expect(form.getYear()).toBe(2011);
      });
      it('thisYear should be 2011', function() {
        return expect(form.thisYear).toBe(2011);
      });
      it('getNextMonth should be 0', function() {
        return expect(form.getNextMonth()).toBe(0);
      });
      it('nextMonth should be 0', function() {
        return expect(form.nextMonth).toBe(0);
      });
      it('expectedYear should be next year', function() {
        return expect(form.expectedYear()).toBe(2012);
      });
      describe('buildMonthOptions()', function() {
        beforeEach(function() {
          return form.buildMonthOptions();
        });
        it('should create a list of months', function() {
          return Form.months.each(function(name) {
            return expect($('#month').html()).toInclude(name);
          });
        });
        return it('should select january the next month', function() {
          return expect($('#month option[selected]').text()).toBe('gennaio');
        });
      });
      return describe('buildYearOptions()', function() {
        beforeEach(function() {
          return form.buildYearOptions();
        });
        return it('should select expected year', function() {
          return expect($('#year option[selected]').text()).toBe('2012');
        });
      });
    });
    describe('when today is 10 January 2012', function() {
      beforeEach(function() {
        form.today = function() {
          return new Date('10 Jan 2012');
        };
        form.thisYear = form.getYear();
        return form.nextMonth = form.getNextMonth();
      });
      it('getYear should be 2012', function() {
        return expect(form.getYear()).toBe(2012);
      });
      it('getNextMonth should be 1', function() {
        return expect(form.getNextMonth()).toBe(1);
      });
      it('expectedYear should be this year', function() {
        return expect(form.expectedYear()).toBe(2012);
      });
      describe('buildMonthOptions()', function() {
        beforeEach(function() {
          return form.buildMonthOptions();
        });
        return it('should select februrary as the next month', function() {
          return expect($('#month option[selected]').text()).toBe('febbraio');
        });
      });
      return describe('buildYearOptions()', function() {
        beforeEach(function() {
          return form.buildYearOptions();
        });
        return it('should select expected year', function() {
          return expect($('#year option[selected]').text()).toBe('2012');
        });
      });
    });
    describe('isValid()', function() {
      describe('when all fields are valid', function() {
        beforeEach(function() {
          form.init();
          return form.isValid();
        });
        it('should be valid', function() {
          return expect(form.isValid()).toBeTruthy();
        });
        return it('should not find any error', function() {
          return expect(form.errors).toBeEmpty();
        });
      });
      return describe('when there are invalid fields', function() {
        beforeEach(function() {
          $('#designer').val('11');
          form.init();
          return form.isValid();
        });
        it('should not be valid when fields are not valid', function() {
          return expect(form.isValid()).toBeFalsy();
        });
        return it('should set errors', function() {
          return expect(form.errors).not.toBeEmpty();
        });
      });
    });
    describe('updateButton()', function() {
      return it('should have 1 as page number', function() {
        form.updateButton();
        return expect(form.submitButton.val()).toInclude('1');
      });
    });
    describe('submitting a valid page', function() {
      beforeEach(function() {
        form.init();
        form.updateButton();
        spyOn(window, 'alert');
        return form.element.submit();
      });
      it('should increment page count', function() {
        return expect(Page.count()).toBe(1);
      });
      it('should change submit button value', function() {
        return expect(form.submitButton.val()).toInclude('2');
      });
      it('should display no error', function() {
        return expect(window.alert).not.toHaveBeenCalled();
      });
      return describe('changing a reset field value', function() {
        beforeEach(function() {
          return $('#designer').change();
        });
        it('should reset page count', function() {
          return expect(Page.count()).toBe(0);
        });
        return it('should reset submit button value', function() {
          return expect(form.submitButton.val()).toInclude('1');
        });
      });
    });
    return describe('submitting an invalid page', function() {
      beforeEach(function() {
        form.init();
        $('#designer').val('33');
        spyOn(window, 'alert');
        return form.element.submit();
      });
      it('should not increment page number', function() {
        return expect(Page.count()).toBe(0);
      });
      return it('should display errors', function() {
        return expect(window.alert).toHaveBeenCalled();
      });
    });
  });
}).call(this);
