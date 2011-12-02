(function() {
  var Form;
  Form = (function() {
    Form.fields = [
      {
        id: 'year',
        regexp: /[a-z]{1,2}/i
      }, {
        id: 'month',
        regexp: /\d{1,2}/
      }, {
        id: 'designer',
        regexp: /[a-z]/i
      }, {
        id: 'start_count',
        regexp: /\d{1,2}/
      }
    ];
    Form["new"] = function() {
      return new Form();
    };
    Form.init = function() {
      var form;
      form = Form["new"]();
      $('form').submit(function(event) {
        event.preventDefault();
        if (form.isValid()) {
          return Page.build();
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
      _ref = Form.fields;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attributes = _ref[_i];
        this.validatableFields.push(Field["new"](attributes));
      }
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
    return Form;
  })();
  window.Form = Form;
}).call(this);
