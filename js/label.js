(function() {
  var Label;
  Label = (function() {
    Label.letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    function Label(opts) {
      this.id = opts.id;
      this.year = opts.year;
      this.month = opts.month;
      this.designer = opts.designer;
      this.count = opts.count;
      this.desc = opts.desc;
      this.controlCode = this.getControlCode();
    }
    Label.prototype.getControlCode = function() {
      return this.getYearNumber() + this.month + this.getDesignerNumber() + this.count;
    };
    Label.prototype.getDesignerNumber = function() {
      return Label.letters.indexOf(this.designer) + 1;
    };
    Label.prototype.getYearNumber = function() {
      return Label.letters.indexOf(this.year) + 1;
    };
    Label.prototype.toHtml = function() {
      var code, desc, label;
      label = $('<div class="label" id="' + this.id + '"></div>');
      code = $('<p class="code"></p>');
      desc = $('<p class="desc"></p>');
      code.text("" + this.year + "-" + (this.formattedMonth()) + "-" + this.designer + "-" + (this.formattedCount()) + "-" + this.controlCode);
      desc.text(this.desc);
      return label.append(code).append(desc);
    };
    Label.prototype.formattedCount = function() {
      var _ref;
      if (this.count < 10) {
        return "00" + this.count;
      } else if ((10 < (_ref = this.count) && _ref < 100)) {
        return "0" + this.count;
      } else {
        return "" + this.count;
      }
    };
    Label.prototype.formattedMonth = function() {
      if (this.month < 10) {
        return "0" + this.month;
      } else {
        return this.month;
      }
    };
    return Label;
  })();
  window.Label = Label;
}).call(this);
