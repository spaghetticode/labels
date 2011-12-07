class Form
  @new = -> new @()
  
  @letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  
  @months = ['gennaio', 'febbraio', 'marzo', 'aprile',
    'maggio', 'giugno', 'luglio', 'agosto', 'settembre',
    'ottobre', 'novembre', 'dicembre']
    
  @fields = [ {id: 'year', regexp: /[a-z]/i, range: Form.letters}
    {id: 'month', regexp: /\d{1,2}/, min: 1, max: 12}
    {id: 'designer', regexp: /[a-z]/i, range: Form.letters}
    {id: 'start_count', regexp: /\d{1,2}/, min: 1, max: 999} ]
  
  @init = ->
    form = @new()
    $('form').submit (event) ->
      event.preventDefault()
      if form.isValid()
        Page.show()
        form.updateButton()
       else 
         alert(form.errors.join('\n'))
    form
  
  constructor: ->
    @errors = []
    @validatableFields = []
    @currentYear = @getYear()
    @nextMonth = @getNextMonth()
    for attributes in Form.fields
      @validatableFields.push Field.new(attributes)
    @buildYearOptions()
    @buildMonthOptions()
    @updateButton()
    @initEvents()

  isValid: ->
    @errors = []
    for field in @validatableFields
      @errors.push(field.errors) unless field.isValid()
    @errors = @errors.flatten()
    if @errors.isEmpty() then true else false

  # private
  
  initEvents: -> 
    $('#designer').change =>
      $('.page').remove()
      @updateButton()

  updateButton: ->
    submit = $('form [type=submit]')
    text = "#{submit.val().remove(/\d+/)}#{Page.count() + 1}"
    submit.val(text)
        
  buildYearOptions: ->
    year = 2009
    for letter in Form.letters[0..5]
      option = $("<option value=\"#{letter}\">#{year}</option>")
      option.attr(selected: true) if year is @expectedYear()
      $('#year').append(option)
      year += 1

  buildMonthOptions: ->
    i = 0
    for name in Form.months
      option = $("<option value=\"#{i+1}\">#{name}</option>")
      option.attr(selected: true) if i is @nextMonth
      $('#month').append(option)
      i += 1
      
  expectedYear: ->
    if @nextMonth isnt 0 then @currentYear else @currentYear + 1
  
  getNextMonth: ->
    current = new Date().getMonth()
    next = if current is 11 then 0 else current + 1
    Number(next)
    
  getYear: ->
    index = if $.browser.msie then 5 else 3
    Number(new Date().toString().split(' ')[index])
    
window.Form = Form