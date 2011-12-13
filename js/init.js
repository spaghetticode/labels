(function() {
  if ($.browser.msie) {
    document.write('<link rel="stylesheet" type="text/css" href="css/print-ie.css" media="print" />');
  }
  $(function() {
    return Form.init();
  });
}).call(this);
