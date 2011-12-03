(function() {
  var Page;
  Page = (function() {
    Page["new"] = function() {
      return new Page();
    };
    Page.show = function() {
      var page;
      page = Page["new"]();
      page.build();
      return page.show();
    };
    function Page() {
      this.labels = [];
      this.labelsPerRow = 3;
      this.rowsCount = 12;
      this.year = $('#year').val();
      this.month = Number($('#month').val());
      this.designer = $('#designer').val();
      this.startCount = Number($('#start_count').val());
      this.defaultDesc = $('#default_desc').val();
    }
    Page.prototype.show = function() {
      $('body').append(this.toHtml());
      return this.html.fadeIn();
    };
    Page.prototype.build = function() {
      var label, labelCount, totalLabels, _results;
      labelCount = 0;
      totalLabels = this.rowsCount * this.labelsPerRow;
      _results = [];
      while (labelCount < totalLabels) {
        label = new Label(this.optsFor(labelCount));
        this.labels.push(label);
        _results.push(labelCount += 1);
      }
      return _results;
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
      var label, _i, _len, _ref;
      this.html = $('<div class="page"></div>');
      _ref = this.labels;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        label = _ref[_i];
        this.html.append(label.toHtml());
      }
      return this.html;
    };
    return Page;
  })();
  window.Page = Page;
}).call(this);
