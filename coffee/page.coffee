class Page
  @new = ->
    new Page()
    
  @show = -> 
    page = Page.new()
    page.build()
    page.show()
  
  constructor: ->
    @labels       = []
    @labelsPerRow = 3
    @rowsCount    = 12
    @year         = $('#year').val()
    @month        = Number($('#month').val())
    @designer     = $('#designer').val()
    @startCount   = Number($('#start_count').val())
    @defaultDesc  = $('#default_desc').val()
  
  show: ->
    $('body').append @toHtml()
    @html.fadeIn()
    
  build: ->
    labelCount = 0
    totalLabels = @rowsCount * @labelsPerRow
    while labelCount < totalLabels
      label = new Label(@optsFor(labelCount))
      @labels.push(label)
      labelCount += 1
      
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
    @html.append label.toHtml() for label in @labels
    @html

window.Page = Page