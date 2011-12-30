# coffee -cwo spec spec/coffee

describe 'Label', ->
  label = null
  opts  = null

  beforeEach ->
    opts =
      id: '1'
      year: 'a'
      month: 1
      designer: 'c'
      count: 12
      desc: 'File'
    label = new Label(opts)

  it 'should set attributes', ->
    ['id', 'year', 'month', 'designer', 'count', 'desc'].each (attribute) ->
      expect(label[attribute]).toBe opts[attribute]

  it 'should not matter if month and count are strings', ->
    opts.month = '1'
    opts.count = '12'
    expect(Label.new(opts).controlCode).toBe label.controlCode

  it 'should calculate control code', ->
    expect(label.controlCode).toBeTruthy()

  it 'should have expected controlCode', ->
    expect(label.controlCode).toBe 17

  it 'should have expected designerNumber', ->
    expect(label.designerNumber()).toBe 3

  it 'should have expected yearNumber', ->
    expect(label.yearNumber()).toBe 1

  it 'should have expected formattedDesigner', ->
    expect(label.formattedDesigner()).toBe 'C'

  it 'should have expected formattedYear', ->
    expect(label.formattedYear()).toBe 'A'

  it 'should have expected formattedMonth', ->
    expect(label.formattedMonth()).toBe '01'

  it 'should have expected yearNumber', ->
    expect(label.yearNumber()).toBe 1

  it 'should have expected designerNumber', ->
    expect(label.designerNumber()).toBe 3

  it 'should have expected code', ->
    expect(label.code()).toBe 'A-01-C-12-17'

  describe 'Label.new()', ->
    it 'should create a new label', ->
      expect(Label.new(opts)).toEqual new Label(opts)

  describe 'toHtml()', ->
    html = null

    beforeEach ->
      html = label.toHtml().html()

    it 'should set the wrapped element id as expected', ->
      expect(label.html.attr('id')).toBe label.id

    it 'should include a p with code', ->
      expect(html).toInclude '<p class="code">A-01-C-12-17</p>'

    it 'should include a p with description', ->
      expect(html).toInclude '<p class="desc"><span>File</span></p>'