(function() {
  var Page;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Page = (function() {
    Page.show = function() {
      return new this().build().show();
    };
    Page.count = function() {
      return $('.page').length;
    };
    function Page() {
      this.labelsPerRow = 3;
      this.rowsCount = 12;
      this.labels = [];
      this.year = $('#year').val();
      this.designer = $('#designer').val();
      this.defaultDesc = $('#default_desc').val();
      this.month = Number($('#month').val());
      this.startCount = this.getStartCount();
    }
    Page.prototype.show = function() {
      $('body').append(this.toHtml());
      this.html.fadeIn(__bind(function() {
        var label, _i, _len, _ref, _results;
        _ref = this.labels;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          label = _ref[_i];
          _results.push(label.initDescEdit());
        }
        return _results;
      }, this));
      return this;
    };
    Page.prototype.getStartCount = function() {
      return Number($('#start_count').val()) + Page.count() * this.labelsPerRow * this.rowsCount;
    };
    Page.prototype.build = function() {
      var labelCount, totalLabels;
      labelCount = 0;
      totalLabels = this.rowsCount * this.labelsPerRow;
      while (labelCount < totalLabels) {
        this.labels.push(Label["new"](this.optsFor(labelCount)));
        labelCount += 1;
      }
      return this;
    };
    Page.prototype.optsFor = function(n) {
      return {
        id: n,
        year: this.year.toLowerCase(),
        month: this.month,
        designer: this.designer.toLowerCase(),
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
