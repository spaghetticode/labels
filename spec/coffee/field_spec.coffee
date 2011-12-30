# coffee -cwo spec spec/coffee

describe 'Field', ->
  field = null
  opts  = null

  beforeEach ->
    opts =
      id: 'foo'
      regexp: /^\d+$/
      min: 1
      max: 3
    field = new Field(opts)
    field.name  = -> 'Whatever'

  it 'should set attributes', ->
    ['id', 'regexp', 'min', 'max', 'range'].each (name) ->
      expect(field[name]).toBe opts[name]

  describe 'when all attributes are valid', ->
    beforeEach ->
      field.value = -> '1'

    it 'should be valid', ->
      expect(field.isValid()).toBeTruthy()

    it 'errors should stay empty', ->
      expect(field.errors).toBeEmpty()

    describe 'when value is included in range', ->
      it 'should not be valid', ->
        field.max = field.min = field.regexp = null
        field.value = -> 'c'
        field.range = ['A','B', 'C']
        expect(field.isValid()).toBeFalsy()

  describe 'when not all attributes are valid', ->
    it 'errors should not be empty', ->
      field.value = -> '11'
      field.isValid()
      expect(field.errors).not.toBeEmpty()

    describe 'when value exceeds max', ->
      it 'should not be valid', ->
        field.value = -> '4'
        expect(field.isValid()).toBeFalsy()

    describe 'when value is lower than min', ->
      it 'should not be valid', ->
        field.value = -> '0'
        expect(field.isValid()).toBeFalsy()

    describe 'when value does not match regexp', ->
      it 'should not be valid', ->
        field.value = -> 'abracadabra'
        expect(field.isValid()).toBeFalsy()

    describe 'when value is not included in range', ->
      it 'should not be valid', ->
        field.max = field.min = field.regexp = null
        field.value = -> 'c'
        field.range = ['A','B', 'C']
        expect(field.isValid()).toBeFalsy()

    describe 'when there are many errors', ->
      it 'should add a message for each error', ->
        field.value = -> 'asdasd'
        field.isValid()
        expect(field.errors.length).toBeGreaterThan(1)