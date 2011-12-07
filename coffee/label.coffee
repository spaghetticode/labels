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
    code.text("#{@year}-#{@month}-#{@designer}-#{@count}-#{@controlCode}")
    desc.append(@editable)
    @html.append(code).append(desc).attr(id: @id)
    
  initDescEdit: ->
    @editable.blur  -> $(@).prop(contentEditable: false)    
    @editable.click -> $(@).prop(contentEditable: true).focus()
    @editable.keypress (event) -> @blur() if event.keyCode is 13
  
  # private
  
  getControlCode: ->
    @getYearNumber() + @month + @getDesignerNumber() + @count

  getDesignerNumber: ->
    Form.letters.indexOf(@designer) + 1

  getYearNumber: ->
    Form.letters.indexOf(@year) + 1
        
window.Label = Label