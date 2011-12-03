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
    
  getControlCode: ->
    @getYearNumber() + @month + @getDesignerNumber() + @count
  
  getDesignerNumber: ->
    Form.letters.indexOf(@designer) + 1
  
  getYearNumber: ->
    Form.letters.indexOf(@year) + 1
    
  toHtml: ->
    @html = $('<div class="label"></div>')
    code = $('<p class="code"></p>')
    desc = $('<p class="desc"></p>')
    code.text("#{@year}-#{@formattedMonth()}-#{@designer}-#{@formattedCount()}-#{@controlCode}")
    desc.text(@desc)
    @html.append(code).append(desc).attr(id: @id)
  
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