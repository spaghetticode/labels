// Generated by CoffeeScript 1.8.0
(function() {
  var Form;

  Form = (function() {
    Form.init = function() {
      return new this().init();
    };

    Form.letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    Form.months = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

    Form.fields = [
      {
        id: 'year',
        regexp: /[a-z]/i,
        range: Form.letters
      }, {
        id: 'month',
        regexp: /\d{1,2}/,
        min: 1,
        max: 12
      }, {
        id: 'designer',
        regexp: /[a-z]/i
      }, {
        id: 'start_count',
        regexp: /\d{1,2}/,
        min: 1,
        max: 999
      }
    ];

    function Form() {
      this.fields = [];
      this.errors = [];
      this.element = $('form');
      this.thisYear = this.getYear();
      this.nextMonth = this.getNextMonth();
      this.submitButton = this.element.find('[type=submit]');
      this.labelHeight = this.element.find('#label_height');
      this.styles = $('#print_styles');
    }

    Form.prototype.isValid = function() {
      var field, _i, _len, _ref;
      this.errors = [];
      _ref = this.fields;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        field = _ref[_i];
        if (!field.isValid()) {
          this.errors.push(field.errors);
        }
      }
      this.errors = this.errors.flatten();
      if (this.errors.isEmpty()) {
        return true;
      } else {
        return false;
      }
    };

    Form.prototype.init = function() {
      this.buildYearOptions();
      this.buildMonthOptions();
      this.updateButton();
      this.initFields();
      this.initSubmit();
      this.initReset();
      this.initLabelHeight();
      this.setPrintStyles();
      return this;
    };

    Form.prototype.initFields = function() {
      var attributes, _i, _len, _ref, _results;
      _ref = Form.fields;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attributes = _ref[_i];
        _results.push(this.fields.push(Field["new"](attributes)));
      }
      return _results;
    };

    Form.prototype.initSubmit = function() {
      return this.element.submit((function(_this) {
        return function(event) {
          event.preventDefault();
          if (_this.isValid()) {
            Page.show();
            return _this.updateButton();
          } else {
            return alert(_this.errors.join('\n'));
          }
        };
      })(this));
    };

    Form.prototype.initReset = function() {
      return this.element.find('.reset-field').change((function(_this) {
        return function() {
          $('.page').remove();
          return _this.updateButton();
        };
      })(this));
    };

    Form.prototype.updateButton = function() {
      var text;
      text = "" + (this.submitButton.val().remove(/\d+/)) + (Page.count() + 1);
      return this.submitButton.val(text);
    };

    Form.prototype.buildYearOptions = function() {
      var index, letter, option, year, _i, _len, _ref, _results;
      year = 2009;
      index = this.thisYear + 2 - 2009;
      _ref = Form.letters.slice(0, +index + 1 || 9e9);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        letter = _ref[_i];
        option = $("<option value=\"" + letter + "\">" + year + "</option>");
        if (year === this.expectedYear()) {
          option.attr({
            selected: true
          });
        }
        $('#year').append(option);
        _results.push(year += 1);
      }
      return _results;
    };

    Form.prototype.buildMonthOptions = function() {
      var i, name, option, _i, _len, _ref, _results;
      i = 0;
      _ref = Form.months;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        option = $("<option value=\"" + (i + 1) + "\">" + name + "</option>");
        if (i === this.nextMonth) {
          option.attr({
            selected: true
          });
        }
        $('#month').append(option);
        _results.push(i += 1);
      }
      return _results;
    };

    Form.prototype.expectedYear = function() {
      if (this.nextMonth !== 0) {
        return this.thisYear;
      } else {
        return this.thisYear + 1;
      }
    };

    Form.prototype.getNextMonth = function() {
      var current, next;
      current = this.today().getMonth();
      next = current === 11 ? 0 : current + 1;
      return Number(next);
    };

    Form.prototype.getYear = function() {
      return Number(this.today().toUTCString().split(' ')[3]);
    };

    Form.prototype.today = function() {
      return new Date();
    };

    Form.prototype.initLabelHeight = function() {
      this.setLabelheightFromLocalStorage();
      return this.labelHeight.change((function(_this) {
        return function(event) {
          localStorage.setItem('labels.label_height', _this.labelHeight.val());
          return _this.setPrintStyles();
        };
      })(this));
    };

    Form.prototype.setLabelheightFromLocalStorage = function() {
      var val;
      val = String(localStorage.getItem('labels.label_height'));
      if (val === 'null' || val === 'undefined') {
        val = 70;
      }
      return this.labelHeight.val(val);
    };

    Form.prototype.setPrintStyles = function() {
      return this.styles.text("div.label { height: " + (this.labelHeight.val()) + "pt; }");
    };

    return Form;

  })();

  window.Form = Form;

}).call(this);
