(function() {
  var Page;
  Page = (function() {
    Page.build = function() {
      return new this().build();
    };
    Page.show = function() {
      return this.build().show();
    };
    function Page() {
      this.number = 1;
      this.labelsPerRow = 3;
      this.rowsCount = 12;
      this.labels = [];
      this.year = $('#year').val();
      this.designer = $('#designer').val();
      this.defaultDesc = $('#default_desc').val();
      this.month = Number($('#month').val());
      this.startCount = Number($('#start_count').val());
    }
    Page.prototype.show = function() {
      $('body').append(this.toHtml());
      return this.html.fadeIn();
    };
    Page.prototype.build = function() {
      var label, labelCount, totalLabels;
      labelCount = 0;
      totalLabels = this.rowsCount * this.labelsPerRow;
      while (labelCount < totalLabels) {
        label = Label["new"](this.optsFor(labelCount));
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
