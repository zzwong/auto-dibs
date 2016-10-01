var casper = require('casper').create()
casper.start('http://ucsd.evanced.info/dibs/Login', function() {
    this.echo(this.getTitle());
});

casper.then(function(){
  // Use lib card #
  // Fill input field with library card #
  // var my_lib_card = '21822054820446';
  // var my_pin = 'Wong';
  this.fill('form#frmLogin', {
    'input[#id="tbxPatronLibCard"]': '21822054820446',
    'input[#id="tbxPatronPin"]':     'Wong'
  }, true);
})


casper.then(function(){
  this.evaluate(function(){
    $('form#frmLogin').submit()
  }
})

casper.then(function(){
  if(this.exists('select.#SelectedRoomSize'))
    this.echo('we are on')
})
// casper.thenOpen('http://phantomjs.org', function() {
//     this.echo(this.getTitle());
// });


casper.run(function() {
  this.echo('message sent').exit();
});
