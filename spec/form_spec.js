(function() {
  describe('Form', function() {
    var form;
    form = null;
    beforeEach(function() {
      loadFixtures('page.html');
      return form = new Form();
    });
    return it('should have a html field for each field', function() {
      return Form.fields.each(function(field) {
        return expect($("#" + field.id).length).toEqual(1);
      });
    });
  });
}).call(this);
