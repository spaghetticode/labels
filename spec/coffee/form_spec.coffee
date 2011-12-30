# coffee -cwo spec spec/coffee

describe 'Form', ->
  form = null

  beforeEach ->
    loadFixtures('page.html')
    form = new Form()

  it 'should have a html field for each field', ->
    Form.fields.each (field) ->
      expect($("##{field.id}").length).toEqual 1



      # @fields    = []
      #   @errors    = []
      #   @element   = $('form')
      #   @thisYear  = @getYear()
      #   @nextMonth = @getNextMonth()
