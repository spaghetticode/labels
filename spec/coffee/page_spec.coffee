# coffee -cwo spec spec/coffee

describe 'Page', ->
  page = null

  beforeEach ->
    loadFixtures('page.html')
    $('.page').remove()
    page = new Page()

  it 'month should have expected value', ->
    expect(page.month).toBe 3

  it 'should have no label', ->
    expect(page.labels).toBeEmpty()

  it 'startCount should be 1', ->
    expect(page.startCount).toBe 1

  it 'Page.count() should be zero', ->
    expect(Page.count()).toBe 0

  describe 'when a page is already shown', ->
    beforeEach ->
      page.build().show()

    it 'should have labels', ->
      expect(page.labels).not.toBeEmpty()

    it 'Page.count() should be 1', ->
      expect(Page.count()).toBe 1

    it 'startCount should be 37', ->
      page = Page.show()
      expect(page.startCount).toBe 37

  describe 'build()', ->
    it 'should create labels', ->
      expect(page.labels.length).toBe 0
      expect(page.build().labels.length).toBe 36

  describe 'optsFor()', ->
    beforeEach ->
      page.build().show()

    it 'should have expected id', ->
      expect(page.optsFor(3).id).toBe 3

    it 'should lowercase year', ->
      expect(page.optsFor(1).year).toBe 'a'

    it 'should lowercase designer', ->
      expect(page.optsFor(1).designer).toBe 'c'

    it 'should have expected count', ->
      expect(page.optsFor(3).count).toBe 4

  describe 'toHtml()', ->
    beforeEach ->
      @html = page.build().toHtml()

    it 'should include 36 labels', ->
      labelCount = @html.find('.label').length
      expect(labelCount).toBe 36

    it 'should have page class', ->
      klass = @html.attr('class')
      expect(klass).toBe 'page'