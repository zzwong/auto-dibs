var casper = require('casper').create({
  viewportSize: {
    width: 1280,
    height: 800
  }
});

// Usage: casperjs blah.js 722 Geisel 9/19/2016 10:00:00
// Book room#722 in Geisel on 9/19/2016 at 12:30pm

// Geisel
var roomNum_DibsRoomID = {
  '1': 1,'1040': 2,'1041': 3,'1042': 4,'1045': 5,'2': 51,'2070': 22,'2071':23,'2072':24,
  '518':35, '519': 36, '521':37,'522':38,'618':39,'619':40, '620':41, '622':42,'623':43,'624':44,'625':45,'626':46,
  '627':47, '629': 48, '630':49,'631':50,'718':52,'719':53, '720':54, '722':55,'723':56,'724':57,
  '106':7, '107':8, '108':9, '109':10, '110':11, '123':12, '131':13,
  '134':14, '204':17, '205':18, '206':19, '223':27, '224':28,
  '225':29, '226':30, '227':31, '228':32, '229':33, '230':34
}

var libIDNum = casper.cli.get(0);
var argRmNum = casper.cli.get(1);
var argDate = casper.cli.get(2).toLowerCase();
var argTime = casper.cli.get(3);
var argEmail = casper.cli.get(4);
//
// casper.echo(casper.cli.has(0));
// if (casper.cli.args.length < 5){
//   casper.echo('not enough args').exit();
// }


function getRoomID(room_number, library){
  //if (library === "geisel")
  return roomNum_DibsRoomID_G[wantedRoomNum];
}


var times;

function parseDate(wantedDate){
  // Parse date and return formatted date
  var year, month, day;
  var currDate = new Date(Date.now());
  //var dateArray = currDate.toLocaleDateString();
  year =  currDate.getFullYear();
  month = currDate.getMonth()+1;
  day =   currDate.getDate();
  if (wantedDate === 'today'){
    var dibsFormattedDate = year+'/'+month+'/'+day;
    return dibsFormattedDate;
  } else if (wantedDate === 'tomorrow' || wantedDate === 'tmr'){
    var tomorrow = new Date();
    tomorrow.setDate(currDate.getDate() + 1)
    year =  tomorrow.getFullYear();
    month = tomorrow.getMonth()+1;
    day =   tomorrow.getDate();
    var dibsFormattedDate = year+'/'+month+'/'+day;
    return dibsFormattedDate
  }
  var dibsFormattedDate = year+'/'+month+'/'+day;
  return dibsFormattedDate;
}



/**
 * Takes in user input for time and returns military time
 * Input:
 *    6pm, 10:00am, 9:30pm
 */
function parseTime(str){
  var hr, min;
  var meridiem = str.split(/\d/g).pop().toLowerCase();
  var nums = str.match(/\d+/);
  if (nums.length == 1){
    hr = nums.pop();
    min = '00';
  } else {
    min = nums.pop();
    hr = nums.pop();
  }
  if (meridiem == 'pm'){
    var hr_int = parseInt(hr, 10);
    hr_int += 12;
    hr = hr_int;
  }
  var formattedTime = hr+':'+min+':00';
  return formattedTime;
}

casper.start("http://ucsd.evanced.info/dibs/Login/", function(){
  this.echo('Opening ' + this.getTitle());
  this.sendKeys('input#tbxPatronLibCard', libIDNum.toString());
  this.click('input#btnLoginSubmit');
  this.echo('Submit Button Clicked');
});

casper.then(function(){
  this.waitForSelector('select#SelectedRoomSize', function(){
    this.echo(this.getCurrentUrl());
  }, 5000);
});

casper.then(function(){
  this.evaluate(function(){
    document.querySelector('select#SelectedSearchDate').selectedIndex = 2;
  })
  this.click('input[value="Search"]');
  this.echo('Search Button Clicked');
  this.waitForSelector('form#frmBuildings', function(){
    this.echo(this.getCurrentUrl());
  }, 1000);
});

casper.then(function(){
  // this.evaluate(function(){
  //   var libraries = document.querySelectorAll('div.item-link');
  //   libraries[1].click();
  // });
  // Doesn't matter which LIbrary is clicked because all it does is hide the rooms
  // that belong to the other library
  this.click('div.item-link');
  this.echo('Clicked');
  this.echo(this.getCurrentUrl());
});

casper.then(function(){
  // this.fill('form#frmTimes',{
  //   'SelectedStartTime' : '2016/10/01 17:00:00'
  // }, true);

  var formattedDate = parseDate(argDate);
  var formattedTime = parseTime(argTime);
  var startTime = formattedDate + ' ' + formattedTime;
  this.fill('form#frmTimes', {
    'SelectedStartTime' : startTime
  }, true);
  this.waitForSelector('form#frmRooms', function(){
    this.echo(this.getCurrentUrl());
  }, 5000);
});

casper.then(function(){
  var roomNum = roomNum_DibsRoomID[argRmNum].toString();
  this.echo(roomNum)
  this.fill('form#frmRooms',{
    'SelectedRoomID': roomNum
  },true);
  this.waitForSelector('input#EmailAddress', function(){
    this.echo(this.getCurrentUrl());
  }, 5000);
});

casper.then(function(){
  this.sendKeys('input#EmailAddress', argEmail);
  this.click('button#btnCallDibs');
  this.echo('Clicked submit!!');
  this.waitTimeout(1000);
  this.waitForSelector('div.confirm', function(){
    this.echo(this.getCurrentUrl());
  }, 5000);
});


casper.run(function(){
  this.captureSelector('dibs.jpg', 'html');
  this.echo('Screenshot Taken');
  this.exit();
});
