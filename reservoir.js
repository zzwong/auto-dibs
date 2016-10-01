var casper = require('casper').create({
  viewportSize: {
    width: 1280,
    height: 800
  }
});

// Usage: casperjs blah.js 722 Geisel 9/19/2016 10:00:00
// Book room#722 in Geisel on 9/19/2016 at 12:30pm

// Geisel
var roomNum_DibsRoomID_G = {
  '1': 1,'1040': 2,'1041': 3,'1042': 4,'1045': 5,'2': 51,'2070': 22,'2071':23,'2072':24,
  '518':35, '519': 36, '521':37,'522':38,'618':39,'619':40, '620':41, '622':42,'623':43,'624':44,'625':45,'626':46,
  '627':47, '629': 48, '630':49,'631':50,'718':52,'719':53, '720':54, '722':55,'723':56,'724':57
}

// BLB
var roomNum_DibsRoomID_B = {
  '106':7, '107':8, '108':9, '109':10, '110':11, '123':12, '131':13,
  '134':14, '204':17, '205':18, '206':19, '223':27, '224':28,
  '225':29, '226':30, '227':31, '228':32, '229':33, '230':34
}

// var wantedRoomNum = casper.cli.get(0);
// var library = casper.cli.get(1).lower();
// var wantedDate = casper.cli.get(2);
// var wantedTime = casper.cli.get(3);
// var email = casper.cli.get(4);

function validateArgs(){
  console.log('s')
}

function getRoomID(room_number, library){
  //if (library === "geisel")
  return roomNum_DibsRoomID_G[wantedRoomNum];
}


var times;

function parseDate(wantedDate){
  // Parse date and return formatted date
  console.log('s')
}
function parseTime(wantedTime){
  console.log('s')
}


// Return a document element instead of a time.
function getTimes(){
  // Scrape the divs with the times
  var item_link_divs = document.querySelectorAll('div.item-link');
  // for (var div in item_link_divs){
  //   var titleDiv = item_link_divs[div].getElementsByClassName('title')[0]
  //   var titleDivInner = titleDiv.innerHTML;
  //   var time = titleDivInner.substring(0, 18).trim();
  //   if (time === reservationTime){
  //     return item_link_divs[div];
  //   }
  // }
  // return "0";

  return item_link_divs[0];
  // return Array.prototype.map.call(item_link_divs, function(e){
  //   var titleDiv = e.getElementsByClassName('title')[0];
  //   var titleDivInner = titleDiv.innerHTML;
  //   var time = titleDivInner.substring(0, 18).trim();
  //   //return titleDiv.innerHTML;
  //   //timeElements[time] = objTimes;
  //
  //   //timeElements.time = times;
  //   return time;
  // });
}

casper.start("http://ucsd.evanced.info/dibs/Login/", function(){
  this.echo('Opening ' + this.getTitle());
  this.sendKeys('input#tbxPatronLibCard', '21822054820446');
  this.click('input#btnLoginSubmit');
  this.echo('Submit Button Clicked');
});

casper.then(function(){
  this.waitForSelector('select#SelectedRoomSize', function(){
    this.echo(this.getCurrentUrl());
  }, 1000);
});

casper.then(function(){
  this.click('input[value="Search"]');
  this.echo('Search Button Clicked');
  this.waitForSelector('form#frmBuildings', function(){
    this.echo(this.getCurrentUrl());
  }, 1000);
});

casper.then(function(){
  // Get elements by name. click on 2nd element...
  // Clicks on first div.item-link
  this.click('div.item-link'); // clicks BLB
  this.echo('Clicked');
  this.echo(this.getCurrentUrl());
});

casper.then(function(){
  this.fill('form#frmTimes',{
    'SelectedStartTime' : '2016/10/01 11:00:00'
  }, true);

  this.waitForSelector('form#frmRooms', function(){
    this.echo(this.getCurrentUrl());
  }, 1000);
});

casper.then(function(){
  this.fill('form#frmRooms',{
    'SelectedRoomID': '8'
  },true);
  this.waitForSelector('input#EmailAddress', function(){
    this.echo(this.getCurrentUrl());
  }, 1000);
});

// casper.then(function(){
//   //this.sendKeys('input#EmailAddress', 'azwong@ucsd.edu');
//   this.click('button#btnCallDibs');
//   this.echo('Clicked submit!!');
//   this.waitTimeout();
// });


casper.run(function(){
  this.captureSelector('dibs.jpg', 'html');
  this.echo('Screenshot Taken');
  this.exit();
});
