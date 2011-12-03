(function() {
  var Label;
  Label = (function() {
    Label["new"] = function(opts) {
      return new this(opts);
    };
    function Label(opts) {
      this.id = opts.id;
      this.year = opts.year;
      this.month = opts.month;
      this.designer = opts.designer;
      this.count = opts.count;
      this.desc = opts.desc;
      this.controlCode = this.getControlCode();
    }
    Label.prototype.toHtml = function() {
      var code, desc;
      this.html = $('<div class="label"></div>');
      code = $('<p class="code"></p>');
      desc = $("<p class=\"desc\"></p>");
      this.editable = $("<span>" + this.desc + "</span>");
      code.text("" + this.year + "-" + (this.formattedMonth()) + "-" + this.designer + "-" + (this.formattedCount()) + "-" + this.controlCode);
      desc.append(this.editable);
      return this.html.append(code).append(desc).attr({
        id: this.id
      });
    };
    Label.prototype.initDescEdit = function() {
      this.editable.blur(function() {
        return $(this).prop({
          contentEditable: false
        });
      });
      this.editable.click(function() {
        return $(this).prop({
          contentEditable: true
        }).focus();
      });
      return this.editable.keypress(function(event) {
        if (event.keyCode === 13) {
          return this.blur();
        }
      });
    };
    Label.prototype.getControlCode = function() {
      return this.getYearNumber() + this.month + this.getDesignerNumber() + this.count;
    };
    Label.prototype.getDesignerNumber = function() {
      return Form.letters.indexOf(this.designer) + 1;
    };
    Label.prototype.getYearNumber = function() {
      return Form.letters.indexOf(this.year) + 1;
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
