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
      expect(label[attribute]).toEqual opts[attribute]

  it 'should not matter if month and count are strings', ->
    opts.month = '1'
    opts.count = '12'
    expect(Label.new(opts).controlCode).toEqual label.controlCode

  it 'should calculate control code', ->
    expect(label.controlCode).toBeTruthy()

  it 'should have expected controlCode', ->
    expect(label.controlCode).toEqual 17

  it 'should have expected designerNumber', ->
    expect(label.designerNumber()).toEqual 3

  it 'should have expected yearNumber', ->
    expect(label.yearNumber()).toEqual 1

  it 'should have expected formattedDesigner', ->
    expect(label.formattedDesigner()).toEqual 'C'

  it 'should have expected formattedYear', ->
    expect(label.formattedYear()).toEqual 'A'

  it 'should have expected formattedMonth', ->
    expect(label.formattedMonth()).toEqual '01'

  it 'should have expected yearNumber', ->
    expect(label.yearNumber()).toEqual 1

  it 'should have expected designerNumber', ->
    expect(label.designerNumber()).toEqual 3

  it 'should have expected code', ->
    expect(label.code()).toEqual 'A-01-C-12-17'

  describe 'Label.new()', ->
    it 'should create a new label', ->
      expect(Label.new(opts)).toEqual new Label(opts)

  describe 'toHtml()', ->
    beforeEach ->
      @html = label.toHtml().html()

    it 'should include a p with code', ->
      html = '<p class="code">A-01-C-12-17</p>'
      expect(@html).toContain html

    it 'should include a p with description', ->
      html = '<p class="desc"><span>File</span></p>'
      expect(@html).toContain html

  describe 'initDescEdit()', ->
    # to be tested