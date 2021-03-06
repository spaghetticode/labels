class Page
  @rowsCount    = 12
  @labelsPerRow = 3

  @show = ->
    new @().build().show()

  @count = ->
    $('.page').length


  constructor: ->
    @labelsPerRow = @constructor.labelsPerRow
    @rowsCount    = @constructor.rowsCount
    @labels       = []
    @year         = $('#year').val()
    @designer     = $('#designer').val()
    @defaultDesc  = $('#default_desc').val()
    @month        = Number $('#month').val()
    @startCount   = @getStartCount()
    @labelHeight  = $('#label_height').val()

  show: ->
    $('body').append @toHtml()
    @html.fadeIn =>
      label.initDescEdit() for label in @labels
    @

  # private

  getStartCount: ->
    Number($('#start_count').val()) + Page.count() * @labelsPerRow * @rowsCount

  build: ->
    labelCount = 0
    totalLabels = @rowsCount * @labelsPerRow
    while labelCount < totalLabels
      @labels.push Label.new(@optsFor(labelCount))
      labelCount += 1
    @

  optsFor: (n) ->
    id:        n
    year:      @year.toLowerCase()
    month:     @month
    designer:  @designer.toLowerCase()
    desc:      @defaultDesc
    count:     @startCount + n
    pageCount: Page.count()

  toHtml: ->
    @html = $('<div class="page"></div>')
    @html.append(label.toHtml()) for label in @labels
    @html

window.Page = Page