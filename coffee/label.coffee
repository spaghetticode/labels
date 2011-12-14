class Label
  @new = (opts) -> new @(opts)
    
  constructor: (opts) ->
    @id       = opts.id
    @year     = opts.year
    @month    = opts.month
    @designer = opts.designer
    @count    = opts.count
    @desc     = opts.desc
    @controlCode = @getControlCode()
    
  toHtml: ->
    @html = $('<div class="label"></div>')
    code  = $('<p class="code"></p>')
    desc  = $("<p class=\"desc\"></p>")
    @editable = $("<span>#{@desc}</span>")
    code.text("#{@formattedYear()}-#{@formattedMonth()}-#{@formattedDesigner()}-#{@count}-#{@controlCode}")
    desc.append(@editable)
    @html.append(code).append(desc).attr(id: @id)
    
  initDescEdit: ->
    @editable.blur  -> $(@).prop(contentEditable: false)    
    @editable.click -> $(@).prop(contentEditable: true).focus()
    @editable.keypress (event) -> @blur() if event.keyCode is 13
  
  # private
  
  getControlCode: ->
    @yearNumber() + @month + @designerNumber() + @count

  designerNumber: ->
    Form.letters.indexOf(@designer) + 1

  yearNumber: ->
    Form.letters.indexOf(@year) + 1
    
  formattedDesigner: ->
    @designer.toUpperCase()

  formattedMonth : ->
    if @month > 9 then @month else "0#{@month}"
  
  formattedYear: ->
    @year.toUpperCase()
        
window.Label = Label