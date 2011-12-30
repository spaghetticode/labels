# coffee -cwo spec spec/coffee

describe 'Field', ->
  field = null
  opts  = null

  beforeEach ->
    loadFixtures('page.html')
    opts =
      id: 'designer'
      regexp: /^\d+$/
      min: 1
      max: 3
    field = new Field(opts)

  it 'should set attributes', ->
    ['id', 'regexp', 'min', 'max', 'range'].each (name) ->
      expect(field[name]).toBe opts[name]

  describe 'when all attributes are valid', ->
    beforeEach ->
      spyOn(field, 'value').andReturn('3')

    it 'should be valid', ->
      expect(field.isValid()).toBeTruthy()

    it 'errors should stay empty', ->
      expect(field.errors).toBeEmpty()

  describe 'when not all attributes are valid', ->
    it 'errors should not be empty', ->
      spyOn(field, 'value').andReturn('11')
      field.isValid()
      expect(field.errors).not.toBeEmpty()

    describe 'when value exceeds max', ->
      it 'should not be valid', ->
        spyOn(field, 'value').andReturn('4')
        field.isValid()
        expect(field.isValid()).toBeFalsy()

    describe 'when value is lower than min', ->
      beforeEach ->
        spyOn(field, 'value').andReturn('0')

      it 'should not be valid', ->
        expect(field.isValid()).toBeFalsy()

    describe 'when value does not match regexp', ->
      beforeEach ->
        spyOn(field, 'value').andReturn('abracadabra')

      it 'should not be valid', ->
        expect(field.isValid()).toBeFalsy()

    describe 'when value is not included in range', ->
      beforeEach ->
        field.max = field.min = field.regexp = null
        field.range = ['A','B', 'C']
        spyOn(field, 'value').andReturn('c')

      it 'should not be valid', ->
        expect(field.isValid()).toBeFalsy()

    describe 'when there are many errors', ->
      beforeEach ->
        spyOn(field, 'value').andReturn('asdasd')

      it 'should add a message for each error', ->
        field.isValid()
        expect(field.errors.length).toBeGreaterThan(1)