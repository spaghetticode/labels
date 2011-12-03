class Form
  @fields = [
    {id: 'year', regexp: /[a-z]{1,2}/i}
    {id: 'month', regexp: /\d{1,2}/}
    {id: 'designer', regexp: /[a-z]/i}
    {id: 'start_count', regexp: /\d{1,2}/}
  ]
  
  @new = ->
    new Form()
    
  @init = ->
    form = Form.new()
    $('form').submit (event) ->
      event.preventDefault()
      if form.isValid() then Page.show() else alert(form.errors.join('\n'))
    form
  
  constructor: ->
    @errors = []
    @validatableFields = []
    for attributes in Form.fields
      @validatableFields.push Field.new(attributes)
      
  isValid: ->
    @errors = []
    for field in @validatableFields
      @errors.push(field.errors) unless field.isValid()
    @errors = @errors.flatten()
    if @errors.isEmpty() then true else false

window.Form = Form