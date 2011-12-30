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
      this.element = $("#" + this.id);
    }
    Field.prototype.isValid = function() {
      this.errors = [];
      this.validate(this.value(), this.name());
      if (this.errors.isEmpty()) {
        return true;
      } else {
        return false;
      }
    };
    Field.prototype.value = function() {
      return this.element.val();
    };
    Field.prototype.name = function() {
      return this.element.prev('label').text().compact().remove(':').capitalize();
    };
    Field.prototype.validate = function(value, name) {
      if ((this.regexp && !value.has(this.regexp)) || (this.range && this.range.indexOf(value) < 0)) {
        this.errors.push("" + name + " non è valido");
      }
      if (isNaN(Number(value)) && (this.min || this.max)) {
        this.errors.push("" + name + " deve essere un numero");
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
