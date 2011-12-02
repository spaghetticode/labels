class Page
  @build = -> 
    page = new Page()
    page.build()
  
  constructor: ->
    @labels       = []
    @labelsPerRow = 3
    @rowsCount    = 12
    @year         = $('#year').val()
    @month        = $('#month').val()
    @designer     = $('#designer').val()
    @startCount   = $('#start_count').val()
    @defaultDesc  = $('#default_desc').val()
    
  build: ->
    labelCount = 0
    totalLabels = @rowsCount * @labelsPerRow
    while labelCount < totalLabels
      label = new Label(@optsFor(labelCount))
      @labels.push(label)
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
    page = $('<div class="page"></div>')
    page.append label.toHtml() for label in @labels
    page

window.Page = Page