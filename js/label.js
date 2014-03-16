// Generated by CoffeeScript 1.6.3
(function() {
  var Label;

  Label = (function() {
    Label["new"] = function(opts) {
      return new this(opts);
    };

    function Label(opts) {
      this.id = 1 + opts.id + (opts.pageCount * this.perPage());
      this.year = opts.year;
      this.month = Number(opts.month);
      this.designer = opts.designer;
      this.count = Number(opts.count);
      this.desc = opts.desc;
      this.controlCode = this.getControlCode();
      this.pageCount = Number(opts.pageCount);
    }

    Label.prototype.perPage = function() {
      return Page.rowsCount * Page.labelsPerRow;
    };

    Label.prototype.toHtml = function() {
      var code, desc;
      this.html = $('<div class="label"></div>');
      code = $('<p class="code"></p>');
      desc = $("<p class=\"desc\"></p>");
      this.editable = $("<span>" + this.desc + "</span>");
      code.text(this.code());
      desc.append(this.editable);
      if (this.id % this.perPage() === 0) {
        this.html.addClass('last');
      }
      return this.html.append(code).append(desc).attr({
        id: this.id
      });
    };

    Label.prototype.initDescEdit = function() {
      this.editable.blur(function() {
        return $(this).prop({
          contentEditable: 'inherit'
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

    Label.prototype.code = function() {
      return "" + (this.formattedYear()) + "-" + (this.formattedMonth()) + "-" + (this.formattedDesigner()) + "-" + this.count + "-" + this.controlCode;
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
