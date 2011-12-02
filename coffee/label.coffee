class Label
  constructor: (opts) ->
    @id       = opts.id # number of label in the batch of pages
    @year     = opts.year # C
    @month    = opts.month # 4
    @designer = opts.designer # a
    @count    = opts.count # 1
    @desc     = opts.desc # File
    @controlCode = @getControlCode()
    
  getControlCode: ->
    @year + @month + @getDesignerNumber() + @count
  
  getDesignerNumber: ->
    letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    letters.indexOf(@designer) + 1
    
  toHtml: ->
    label = $('<div class="label" id="' + @id + '"></div>')
    code = $('<p class="code"></p>')
    desc = $('<p class="desc"></p>')
    code.text("#{@year}-#{@formattedMonth()}-#{@designer}-#{@formattedCount()}-#{@controlCode}")
    desc.text(@desc)
    label.append(code).append(desc)
  
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
    
  