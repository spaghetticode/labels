# coffee -cwo spec spec/coffee

describe 'Form', ->
  form = null

  beforeEach ->
    loadFixtures('page.html')
    form = new Form()

  it 'should have a html field for each field', ->
    Form.fields.each (field) ->
      expect($("##{field.id}").length).toBe 1

  it 'should have element', ->
    expect(form.element.length).toBe 1

  it 'should have no error', ->
    expect(form.errors).toBeEmpty()

  describe 'when today is 20 december 2011', ->
    beforeEach ->
      form.today = -> new Date('20 Dec 2011')

    it 'getYear should be 2011', ->
      expect(form.getYear()).toBe 2011

    it 'getNextMonth should be 0', ->
      expect(form.getNextMonth()).toBe(0)

    it 'expectedYear should be next year', ->
      expect(form.expectedYear()).toBe 2012

  describe 'when today is 10 January 2012', ->
    beforeEach ->
      form.today = -> new Date('10 Jan 2012')

    it 'getYear should be 2012', ->
      expect(form.getYear()).toBe 2012

    it 'getNextMonth should be 1', ->
      expect(form.getNextMonth()).toBe 1
