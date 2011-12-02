class Field
  @new = (opts) ->
    new Field(opts)
    
  constructor: (opts) ->
    @errors = []
    @id = opts.id
    @regexp = opts.regexp
    @required = if @regexp then true else false
  
  isValid: ->
    @errors = []
    field = $("##{@id}")
    value = field.val()
    name  = field.prev('label').text().compact().remove(':').capitalize()
    if @required and value.isBlank()
      @errors.push("#{name} deve essere inserito")
    if @regexp and !value.has(@regexp)
      @errors.push("#{name} non ha un valore accettabile")
    if @errors.isEmpty() then true else false
    
window.Field = Field