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
      code.text("" + (this.formattedYear()) + "-" + (this.formattedMonth()) + "-" + (this.formattedDesigner()) + "-" + this.count + "-" + this.controlCode);
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
      return this.yearNumber() + this.month + this.designerNumber() + this.count;
    };
    Label.prototype.designerNumber = function() {
      return Form.letters.indexOf(this.designer) + 1;
    };
    Label.prototype.yearNumber = function() {
      return Form.letters.indexOf(this.year) + 1;
    };
    Label.prototype.formattedDesigner = function() {
      return this.designer.toUpperCase();
    };
    Label.prototype.formattedMonth = function() {
      if (this.month > 9) {
        return this.month;
      } else {
        return "0" + this.month;
      }
    };
    Label.prototype.formattedYear = function() {
      return this.year.toUpperCase();
    };
    return Label;
  })();
  window.Label = Label;
}).call(this);
