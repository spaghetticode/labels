(function() {
  var Field;
  Field = (function() {
    Field["new"] = function(opts) {
      return new this(opts);
    };
    function Field(opts) {
      this.errors = [];
      this.id = opts.id;
      this.regexp = opts.regexp;
      this.min = opts.min;
      this.max = opts.max;
      this.range = opts.range;
    }
    Field.prototype.isValid = function() {
      var field, name, value;
      this.errors = [];
      field = $("#" + this.id);
      value = field.val();
      name = field.prev('label').text().compact().remove(':').capitalize();
      this.validate(value, name);
      if (this.errors.isEmpty()) {
        return true;
      } else {
        return false;
      }
    };
    Field.prototype.validate = function(value, name) {
      if (this.regexp && !value.has(this.regexp)) {
        console.log(value.has(this.regexp));
        this.errors.push("" + name + " non è valido");
      }
      if (this.min && Number(value) < this.min) {
        this.errors.push("" + name + " deve essere maggiore di " + (this.min - 1));
      }
      if (this.max && Number(value) > this.max) {
        return this.errors.push("" + name + " deve essere minore di " + (this.max + 1));
      }
    };
    return Field;
  })();
  window.Field = Field;
}).call(this);
