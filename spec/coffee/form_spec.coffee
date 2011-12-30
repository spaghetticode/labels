# coffee -cwo spec spec/coffee

describe 'Form', ->
  form = null

  beforeEach ->
    $('.page').remove()
    loadFixtures('page.html')
    form = new Form()

  it 'should have a html field for each field', ->
    Form.fields.each (field) ->
      expect($("##{field.id}").length).toBe 1

  it 'should have element', ->
    expect(form.element.length).toBe 1

  describe 'initFields()', ->
    it 'should have no field, initially', ->
      expect(form.fields).toBeEmpty()

    it 'should set fields', ->
      form.initFields()
      expect(form.fields).not.toBeEmpty()

  it 'should have no error', ->
    expect(form.errors).toBeEmpty()

  describe 'when today is 20 december 2011', ->
    beforeEach ->
      form.today = -> new Date('20 Dec 2011')
      form.thisYear = form.getYear()
      form.nextMonth = form.getNextMonth()

    it 'getYear should be 2011', ->
      expect(form.getYear()).toBe 2011

    it 'thisYear should be 2011', ->
      expect(form.thisYear).toBe 2011

    it 'getNextMonth should be 0', ->
      expect(form.getNextMonth()).toBe(0)

    it 'nextMonth should be 0', ->
      expect(form.nextMonth).toBe(0)

    it 'expectedYear should be next year', ->
      expect(form.expectedYear()).toBe 2012

    describe 'buildMonthOptions()', ->
      beforeEach ->
        form.buildMonthOptions()

      it 'should create a list of months', ->
        Form.months.each (name) ->
          expect($('#month').html()).toInclude(name)

      it 'should select january the next month', ->
        expect($('#month option[selected]').text()).toBe 'gennaio'

    describe 'buildYearOptions()', ->
      beforeEach ->
        form.buildYearOptions()

      it 'should select expected year', ->
        expect($('#year option[selected]').text()).toBe '2012'

  describe 'when today is 10 January 2012', ->
    beforeEach ->
      form.today = -> new Date('10 Jan 2012')
      form.thisYear = form.getYear()
      form.nextMonth = form.getNextMonth()

    it 'getYear should be 2012', ->
      expect(form.getYear()).toBe 2012

    it 'getNextMonth should be 1', ->
      expect(form.getNextMonth()).toBe 1

    it 'expectedYear should be this year', ->
      expect(form.expectedYear()).toBe 2012

    describe 'buildMonthOptions()', ->
      beforeEach ->
        form.buildMonthOptions()

      it 'should select februrary as the next month', ->
        expect($('#month option[selected]').text()).toBe 'febbraio'

    describe 'buildYearOptions()', ->
      beforeEach ->
        form.buildYearOptions()

      it 'should select expected year', ->
        expect($('#year option[selected]').text()).toBe '2012'

  describe 'isValid()', ->
    describe 'when all fields are valid', ->
      beforeEach ->
        form.init()
        form.isValid()

      it 'should be valid', ->
        expect(form.isValid()).toBeTruthy()

      it 'should not find any error', ->
        expect(form.errors).toBeEmpty()

    describe 'when there are invalid fields', ->
      beforeEach ->
        $('#designer').val('11')
        form.init()
        form.isValid()

      it 'should not be valid when fields are not valid', ->
        expect(form.isValid()).toBeFalsy()

      it 'should set errors', ->
        expect(form.errors).not.toBeEmpty()

  describe 'updateButton()', ->
    it 'should have 1 as page number', ->
      form.updateButton()
      expect(form.submitButton.val()).toInclude '1'

  describe 'submitting a valid page', ->
    beforeEach ->
      form.init()
      form.updateButton()
      spyOn(window, 'alert')
      form.element.submit()

    it 'should increment page count', ->
      expect(Page.count()).toBe 1

    it 'should change submit button value', ->
      expect(form.submitButton.val()).toInclude '2'

    it 'should display no error', ->
      expect(window.alert).not.toHaveBeenCalled()

    describe 'changing a reset field value', ->
      beforeEach ->
        $('#designer').change()

      it 'should reset page count', ->
        expect(Page.count()).toBe 0

      it 'should reset submit button value', ->
        expect(form.submitButton.val()).toInclude '1'

  describe 'submitting an invalid page', ->
    beforeEach ->
      form.init()
      $('#designer').val('33')
      spyOn(window, 'alert')
      form.element.submit()

    it 'should not increment page number', ->
      expect(Page.count()).toBe 0

    it 'should display errors', ->
      expect(window.alert).toHaveBeenCalled()