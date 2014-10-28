class Label
  @new = (opts) -> new @(opts)

  constructor: (opts) ->
    @id          = 1 + opts.id + (opts.pageCount * @perPage())
    @year        = opts.year
    @month       = Number(opts.month)
    @designer    = opts.designer
    @count       = Number(opts.count)
    @desc        = opts.desc
    @controlCode = @getControlCode()
    @pageCount   = Number(opts.pageCount)

  perPage: -> Page.rowsCount * Page.labelsPerRow

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
    letters = @designer.split('')
    total = 0
    for letter in letters
      total += Form.letters.indexOf(letter) + 1
    total

  yearNumber: ->
    Form.letters.indexOf(@year) + 1

  formattedDesigner: ->
    @designer.toUpperCase()

  formattedMonth : ->
    if @month > 9 then @month else "0#{@month}"

  formattedYear: ->
    @year.toUpperCase()

window.Label = Label