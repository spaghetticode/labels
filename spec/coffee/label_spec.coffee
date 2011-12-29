# coffee -cwo spec spec/coffee

describe 'Label', ->
  label = null
  opts  = null

  beforeEach ->
    opts =
      id: '1'
      year: 'a'
      month: '1'
      designer: 'c'
      count: 12
      desc: 'File'
    label = new Label(opts)

  it 'should set attributes', ->
    ['id', 'year', 'month', 'designer', 'count', 'desc'].each ->
      expect(label[this]).toEqual opts[this]

  it 'should calculate control code', ->
    expect(label.controlCode).toBeTruthy()

  it 'should have expected designerNumber', ->
    expect(label.designerNumber()).toEqual 3

  it 'should have expected yearNumber', ->
    expect(label.yearNumber()).toEqual 1

  it 'should have expected formattedDesigner', ->
    expect(label.formattedDesigner()).toEqual 'C'

  it 'should have expected formattedYear', ->
    expect(label.formattedYear()).toEqual 'A'