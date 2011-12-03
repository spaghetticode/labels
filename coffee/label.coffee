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
    code.text("#{@year}-#{@formattedMonth()}-#{@designer}-#{@formattedCount()}-#{@controlCode}")
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
      
  formattedCount: ->
    if @count < 10
      "00#{@count}"
    else if 10 < @count < 100
      "0#{@count}"
    else
      "#{@count}"
      
  formattedMonth: ->
    if @month < 10 then "0#{@month}" else @month
        
window.Label = Label