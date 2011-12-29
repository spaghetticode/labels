# coffee -cwo spec spec/coffee

describe 'Page', ->
  page = null

  beforeEach ->
    loadFixtures('page.html')
    $('.page').remove()
    page = new Page()

  it 'month should have expected value', ->
    expect(page.month).toEqual 3

  it 'should have no label', ->
    expect(page.labels).toBeEmpty()

  it 'startCount should be 1', ->
    expect(page.startCount).toEqual 1

  it 'Page.count() should be zero', ->
    expect(Page.count()).toEqual 0

  describe 'when a page is already shown', ->
    beforeEach ->
      page.build().show()

    it 'should have labels', ->
      expect(page.labels).not.toBeEmpty()

    it 'Page.count() should be 1', ->
      expect(Page.count()).toEqual 1

    it 'startCount should be 37', ->
      page = Page.show()
      expect(page.startCount).toEqual 37

  describe 'build()', ->
    it 'should create labels', ->
      expect(page.labels.length).toEqual 0
      expect(page.build().labels.length).toEqual 36

  describe 'optsFor()', ->
    beforeEach ->
      page.build().show()

    it 'should have expected id', ->
      expect(page.optsFor(3).id).toEqual 3

    it 'should lowercase year', ->
      expect(page.optsFor(1).year).toEqual 'a'

    it 'should lowercase designer', ->
      expect(page.optsFor(1).designer).toEqual 'c'

    it 'should have expected count', ->
      expect(page.optsFor(3).count).toEqual 4
