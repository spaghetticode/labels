class Page
  @show = -> 
    new @().build().show()
  
  @count = ->
    $('.page').length
  
  constructor: ->
    @labelsPerRow = 3
    @rowsCount    = 12
    @labels       = []
    @year         = $('#year').val()
    @designer     = $('#designer').val()
    @defaultDesc  = $('#default_desc').val()
    @month        = Number $('#month').val()
    @startCount   = @getStartCount()
  
  show: ->
    $('body').append @toHtml()
    @html.fadeIn =>
      label.initDescEdit() for label in @labels
  
  # private
  
  getStartCount: ->
    Number($('#start_count').val()) + Page.count() * @labelsPerRow * @rowsCount
    
  build: ->
    labelCount = 0
    totalLabels = @rowsCount * @labelsPerRow
    while labelCount < totalLabels
      label = Label.new(@optsFor(labelCount))
      @labels.push label
      labelCount += 1
    @
      
  optsFor: (n) ->
    opts =
      id:       n
      year:     @year
      month:    @month
      designer: @designer
      desc:     @defaultDesc
      count:    @startCount + n
  
  toHtml: ->
    @html = $('<div class="page"></div>')
    @html.append(label.toHtml()) for label in @labels
    @html

window.Page = Page