(function() {
  var Field;
  Field = (function() {
    Field["new"] = function(opts) {
      return new Field(opts);
    };
    function Field(opts) {
      this.errors = [];
      this.id = opts.id;
      this.regexp = opts.regexp;
      this.required = this.regexp ? true : false;
    }
    Field.prototype.isValid = function() {
      var field, name, value;
      this.errors = [];
      field = $("#" + this.id);
      value = field.val();
      name = field.prev('label').text().compact().remove(':').capitalize();
      if (this.required && value.isBlank()) {
        this.errors.push("" + name + " deve essere inserito");
      }
      if (this.regexp && !value.has(this.regexp)) {
        this.errors.push("" + name + " non ha un valore accettabile");
      }
      if (this.errors.isEmpty()) {
        return true;
      } else {
        return false;
      }
    };
    return Field;
  })();
  window.Field = Field;
}).call(this);
