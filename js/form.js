(function() {
  var Form;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Form = (function() {
    Form["new"] = function() {
      return new this();
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
        regexp: /[a-z]/i,
        range: Form.letters
      }, {
        id: 'start_count',
        regexp: /\d{1,2}/,
        min: 1,
        max: 999
      }
    ];
    Form.init = function() {
      var form;
      form = this["new"]();
      $('form').submit(function(event) {
        event.preventDefault();
        if (form.isValid()) {
          Page.show();
          return form.updateButton();
        } else {
          return alert(form.errors.join('\n'));
        }
      });
      return form;
    };
    function Form() {
      var attributes, _i, _len, _ref;
      this.errors = [];
      this.validatableFields = [];
      this.currentYear = Number(new Date().toString().split(' ')[3]);
      this.nextMonth = this.getNextMonth();
      _ref = Form.fields;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attributes = _ref[_i];
        this.validatableFields.push(Field["new"](attributes));
      }
      this.buildYearOptions();
      this.buildMonthOptions();
      this.updateButton();
      this.initEvents();
    }
    Form.prototype.isValid = function() {
      var field, _i, _len, _ref;
      this.errors = [];
      _ref = this.validatableFields;
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
    Form.prototype.initEvents = function() {
      return $('#designer').change(__bind(function() {
        $('.page').remove();
        return this.updateButton();
      }, this));
    };
    Form.prototype.updateButton = function() {
      var submit, text;
      submit = $('form [type=submit]');
      text = "" + (submit.val().remove(/\d+/)) + (Page.count() + 1);
      return submit.val(text);
    };
    Form.prototype.buildYearOptions = function() {
      var letter, option, year, _i, _len, _ref, _results;
      year = 2009;
      _ref = Form.letters.slice(0, 6);
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
        return this.currentYear;
      } else {
        return this.currentYear + 1;
      }
    };
    Form.prototype.getNextMonth = function() {
      var current, next;
      current = new Date().getMonth();
      next = current === 11 ? 0 : current + 1;
      return Number(next);
    };
    return Form;
  })();
  window.Form = Form;
}).call(this);
