(function() {
  describe('Page', function() {
    var page;
    page = null;
    beforeEach(function() {
      loadFixtures('page.html');
      $('.page').remove();
      return page = new Page();
    });
    it('month should have expected value', function() {
      return expect(page.month).toBe(3);
    });
    it('should have no label', function() {
      return expect(page.labels).toBeEmpty();
    });
    it('startCount should be 1', function() {
      return expect(page.startCount).toBe(1);
    });
    it('Page.count() should be zero', function() {
      return expect(Page.count()).toBe(0);
    });
    describe('when a page is already shown', function() {
      beforeEach(function() {
        return page.build().show();
      });
      it('should have labels', function() {
        return expect(page.labels).not.toBeEmpty();
      });
      it('Page.count() should be 1', function() {
        return expect(Page.count()).toBe(1);
      });
      return it('startCount should be 37', function() {
        page = Page.show();
        return expect(page.startCount).toBe(37);
      });
    });
    describe('build()', function() {
      return it('should create labels', function() {
        expect(page.labels.length).toBe(0);
        return expect(page.build().labels.length).toBe(36);
      });
    });
    describe('optsFor()', function() {
      beforeEach(function() {
        return page.build().show();
      });
      it('should have expected id', function() {
        return expect(page.optsFor(3).id).toBe(3);
      });
      it('should lowercase year', function() {
        return expect(page.optsFor(1).year).toBe('a');
      });
      it('should lowercase designer', function() {
        return expect(page.optsFor(1).designer).toBe('c');
      });
      return it('should have expected count', function() {
        return expect(page.optsFor(3).count).toBe(4);
      });
    });
    return describe('toHtml()', function() {
      beforeEach(function() {
        return this.html = page.build().toHtml();
      });
      it('should include 36 labels', function() {
        var labelCount;
        labelCount = this.html.find('.label').length;
        return expect(labelCount).toBe(36);
      });
      return it('should have page class', function() {
        var klass;
        klass = this.html.attr('class');
        return expect(klass).toBe('page');
      });
    });
  });
}).call(this);
