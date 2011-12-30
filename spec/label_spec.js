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
      return ['id', 'year', 'month', 'designer', 'count', 'desc'].each(function(attribute) {
        return expect(label[attribute]).toBe(opts[attribute]);
      });
    });
    it('should not matter if month and count are strings', function() {
      opts.month = '1';
      opts.count = '12';
      return expect(Label["new"](opts).controlCode).toBe(label.controlCode);
    });
    it('should calculate control code', function() {
      return expect(label.controlCode).toBeTruthy();
    });
    it('should have expected controlCode', function() {
      return expect(label.controlCode).toBe(17);
    });
    it('should have expected designerNumber', function() {
      return expect(label.designerNumber()).toBe(3);
    });
    it('should have expected yearNumber', function() {
      return expect(label.yearNumber()).toBe(1);
    });
    it('should have expected formattedDesigner', function() {
      return expect(label.formattedDesigner()).toBe('C');
    });
    it('should have expected formattedYear', function() {
      return expect(label.formattedYear()).toBe('A');
    });
    it('should have expected formattedMonth', function() {
      return expect(label.formattedMonth()).toBe('01');
    });
    it('should have expected yearNumber', function() {
      return expect(label.yearNumber()).toBe(1);
    });
    it('should have expected designerNumber', function() {
      return expect(label.designerNumber()).toBe(3);
    });
    it('should have expected code', function() {
      return expect(label.code()).toBe('A-01-C-12-17');
    });
    describe('Label.new()', function() {
      return it('should create a new label', function() {
        return expect(Label["new"](opts)).toEqual(new Label(opts));
      });
    });
    describe('toHtml()', function() {
      beforeEach(function() {
        return this.html = label.toHtml().html();
      });
      it('should include a p with code', function() {
        var html;
        html = '<p class="code">A-01-C-12-17</p>';
        return expect(this.html).toContain(html);
      });
      return it('should include a p with description', function() {
        var html;
        html = '<p class="desc"><span>File</span></p>';
        return expect(this.html).toContain(html);
      });
    });
    return describe('initDescEdit()', function() {});
  });
}).call(this);
