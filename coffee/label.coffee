class Label
  @new = (opts) -> new @(opts)

  constructor: (opts) ->
    @id          = opts.id + (opts.pageCount * Page.rowsCount * Page.labelsPerRow)
    @year        = opts.year
    @month       = Number(opts.month)
    @designer    = opts.designer
    @count       = Number(opts.count)
    @desc        = opts.desc
    @controlCode = @getControlCode()
    @pageCount   = Number(opts.pageCount)

  toHtml: ->
    @html = $('<div class="label"></div>')
    code  = $('<p class="code"></p>')
    desc  = $("<p class=\"desc\"></p>")
    @editable = $("<span>#{@desc}</span>")
    code.text(@code())
    desc.append(@editable)
    @html.append(code).append(desc).attr(id: @id)

  initDescEdit: ->
    @editable.blur  -> $(@).prop(contentEditable: 'inherit')
    @editable.click -> $(@).prop(contentEditable: true).focus()
    @editable.keypress (event) -> @blur() if event.keyCode is 13

  # private

  code: ->
    "#{@formattedYear()}-#{@formattedMonth()}-#{@formattedDesigner()}-#{@count}-#{@controlCode}"

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