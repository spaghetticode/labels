class Field
  @new = (opts) -> new @(opts)

  constructor: (opts) ->
    @errors  = []
    @id      = opts.id
    @regexp  = opts.regexp
    @min     = opts.min
    @max     = opts.max
    @range   = opts.range
    @element = $("##{@id}")

  isValid: ->
    @errors = []
    @validate @value(), @name()
    if @errors.isEmpty() then true else false

  # private

  value: ->
    @element.val()

  name : ->
    @element.prev('label').text().compact().remove(':').capitalize()

  validate: (value, name) ->
    if (@regexp and !value.has(@regexp)) or (@range and @range.indexOf(value) < 0)
      @errors.push "#{name} non è valido"
    if isNaN(Number(value)) and (@min or @max)
      @errors.push "#{name} deve essere un numero"
    if @min and Number(value) < @min
      @errors.push "#{name} deve essere maggiore di #{@min-1}"
    if @max and Number(value) > @max
      @errors.push "#{name} deve essere minore di #{@max+1}"

window.Field = Field