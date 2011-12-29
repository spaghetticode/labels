(function() {
  describe('Label', function() {
    var label, opts;
    label = null;
    opts = null;
    beforeEach(function() {
      opts = {
        id: '1',
        year: 'a',
        month: 1,
        designer: 'c',
        count: 12,
        desc: 'File'
      };
      return label = new Label(opts);
    });
    it('should set attributes', function() {
      return ['id', 'year', 'month', 'designer', 'count', 'desc'].each(function() {
        return expect(label[this]).toEqual(opts[this]);
      });
    });
    it('should calculate control code', function() {
      return expect(label.controlCode).toBeTruthy();
    });
    it('should have expected controlCode', function() {
      return expect(label.controlCode).toEqual(17);
    });
    it('should have expected designerNumber', function() {
      return expect(label.designerNumber()).toEqual(3);
    });
    it('should have expected yearNumber', function() {
      return expect(label.yearNumber()).toEqual(1);
    });
    it('should have expected formattedDesigner', function() {
      return expect(label.formattedDesigner()).toEqual('C');
    });
    it('should have expected formattedYear', function() {
      return expect(label.formattedYear()).toEqual('A');
    });
    it('should have expected formattedMonth', function() {
      return expect(label.formattedMonth()).toEqual('01');
    });
    it('should have expected yearNumber', function() {
      return expect(label.yearNumber()).toEqual(1);
    });
    it('should have expected designerNumber', function() {
      return expect(label.designerNumber()).toEqual(3);
    });
    it('should have expected code', function() {
      return expect(label.code()).toEqual('A-01-C-12-17');
    });
    return describe('Label.new', function() {
      return it('should create a new label', function() {
        return expect(Label["new"](opts)).toEqual(new Label(opts));
      });
    });
  });
}).call(this);