(function() {
  var Page;
  Page = (function() {
    Page.build = function() {
      var page;
      page = new Page();
      return page.build();
    };
    function Page() {
      this.labels = [];
      this.labelsPerRow = 3;
      this.rowsCount = 12;
      this.year = $('#year').val();
      this.month = $('#month').val();
      this.designer = $('#designer').val();
      this.startCount = $('#start_count').val();
      this.defaultDesc = $('#default_desc').val();
    }
    Page.prototype.build = function() {
      var label, labelCount, totalLabels;
      labelCount = 0;
      totalLabels = this.rowsCount * this.labelsPerRow;
      while (labelCount < totalLabels) {
        label = new Label(this.optsFor(labelCount));
        this.labels.push(label);
        labelCount += 1;
      }
      return this;
    };
    Page.prototype.optsFor = function(n) {
      var opts;
      return opts = {
        id: n,
        year: this.year,
        month: this.month,
        designer: this.designer,
        desc: this.defaultDesc,
        count: this.startCount + n
      };
    };
    Page.prototype.toHtml = function() {
      var label, page, _i, _len, _ref;
      page = $('<div class="page"></div>');
      _ref = this.labels;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        label = _ref[_i];
        page.append(label.toHtml());
      }
      return page;
    };
    return Page;
  })();
  window.Page = Page;
}).call(this);
