//hello world!  ※\(^o^)/※ (✿◠‿◠) （｡◑ヮ◑｡）(((o(*ﾟ▽ﾟ*)o))) (ﾉ◕ヮ◕)ﾉ*:・ﾟ✧ 
X = 1010;
Y = 1010;

a = []; // timestamps
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function setup(){
	
	myCanvas = createCanvas(X,Y );
	myCanvas.parent('timer');
	
	BLACK = color(  20,   20,   20);
	WHITE = color(255, 255, 255);
	BLUE =  color(  100,   0, 255);
	LIGHTBLUE = color(184, 215, 239);
	GREEN = color(53, 227, 155);//(  0, 255,  80); //original green
	BACKGROUND = color(20,20,20)// color(180,150,200) 255, 230, 255 ;
	


	button1 = createButton('START/STOP');
	button1.parent('timer');
	button1.position(21, 21+35);
	button1.style("background-color",BACKGROUND);
	button1.style("font-size", 30+ "px");
	button1.style("color", WHITE);
	button1.mousePressed(delo);

	button2 = createButton("☀");
	button2.parent('timer');
	button2.position(X-40,2);
	button2.style("background-color",BACKGROUND);
	button2.style("color", WHITE);
	button2.style("font-size", 20+"px");
	button2.mousePressed(darkmode);

	button3 = createButton('▲ ');
	button3.parent('timer');
	button3.position(200,Y-98);
	button3.style("background-color",BACKGROUND);
	button3.style("font-size", 9+ "px");
	button3.style("color", WHITE);
	button3.mousePressed(goalplus);
	
	button4 = createButton('▼');
	button4.parent('timer');
	button4.position(200,Y-84 );
	button4.style("background-color",BACKGROUND);
	button4.style("font-size", 9+ "px");
	button4.style("color", WHITE);
	button4.mousePressed(goalminus);
	
	button5 = createButton("About & Tutorial");
	button5.parent('timer');
	button5.position(X-220,2);
	button5.style("background-color",BACKGROUND);
	button5.style("color", WHITE);
	button5.style("font-size", 21+"px");
	button5.mousePressed(aboutpage);

	button6 = createButton("✿ Your weekly review");
	button6.parent('timer');
	button6.position(X-224,34);
	button6.style("background-color",BACKGROUND);
	button6.style("color", WHITE);
	button6.style("font-size", 20+"px");
	button6.mousePressed(reviewpage);

	button7 = createButton("𝚌𝚕𝚎𝚊𝚛");
	button7.parent('timer');
	button7.position(X/2-70,Y-45);
	button7.style("background-color",BACKGROUND);
	button7.style("color", WHITE);
	button7.style("font-size", 17+"px");
	button7.mousePressed(clearday);


	a = checkcookie();
	if (a.length == 0){
		delo();
	}
	work = 0;
	wk = 0;
	wrn = false;
	wst = false;
	startTimer = 0;
	darkmode = false;
	goal = 0;
	windowResized();

}

function checkcookie(){
	weekdata = readcookie();
	if(weekdata.length != 0){
		if( weekdata[weekdata.length-1].substr(0,daymonth.length) == daymonth){ // cookie already exists
			a = weekdata[weekdata.length-1].substr(11, weekdata[weekdata.length-1].length).split(':').map(Number);
		}

	}
	else{
		a = []
	}
	return a;
}

function clearday(){
	var result = confirm("Are you sure you want to reset the timer? \nTotal time will be 0.");
	if (result) {
		a = []
		createcookie();
		delo();
	}
}

function aboutpage(){
window.open("https://onlinetimer.github.io/about.html");
}
function reviewpage(){
	if (wrn == false){
  		delo();
	}
    delo(); //two times, so that the timer state doesnt change
	window.open("https://onlinetimer.github.io/review.html");
}

function windowResized() {
	X = windowWidth;
	Y = windowHeight;
	if(X>Y){
		if (Y<750){
			X = X-10;
		}
		else{
		X = Y-10;}}
	Y = Y-10;
  	resizeCanvas(X,Y);
	button2.position(X-40,2);
	button3.position(200,Y-98);
	button4.position(200,Y-84);
	button5.position(X-220,2);
	button6.position(X-220,34);
	button7.position(X/2,Y-45);

	R = Math.min(X,Y);
}
function goalplus(){
	if (goal < 24){
	goal ++;}}
function goalminus(){
	if (goal > 0){
	goal --;}}
function darkmode(){
	if (darkmode){
		BACKGROUND = BLACK;// color(180,150,200);
		darkmode = false;
		button2.style("color", WHITE);
		document.body.style.background = "#141414";
	}
	else{
		darkmode = true;
		//BACKGROUND = color(180,150,200);//darkerpink // few different pastel colors
		//BACKGROUND = color(151, 151, 200);//blue
		//BACKGROUND = color(180,150,200); //lightpurple
		BACKGROUND = LIGHTBLUE;//lightblue	
		//BACKGROUND = color(239, 184, 207);//lightpink
	document.body.style.background = "#b8d7ef";
	button2.style("color", BLACK);
	}
	button1.style("background-color",BACKGROUND);
	button2.style("background-color",BACKGROUND);
	button3.style("background-color",BACKGROUND);
	button4.style("background-color",BACKGROUND);
	button5.style("background-color",BACKGROUND);
	button6.style("background-color",BACKGROUND);
	button7.style("background-color",BACKGROUND);



}
window.onbeforeunload = function () {
	if (wrn == false){
  		delo();
	}
    delo(); //two times, so that the timer state doesnt change
}

function delo(){
	d = new Date();
	minute = d.getMinutes();
	hour = d.getHours();
	sec = d.getSeconds();
	ctime = hour*60+minute;
	a.push(ctime);
	if (a.length >= 3){
		if (a[a.length-3] == ctime){
			a.splice(a.length-3,2); // if you clicked the start/stop 3 times in the same minute, we can safely remove those timestamps to save space in a cookie		
		}}
	console.log(" o(*ﾟ▽ﾟ*)o timestamp:",a);
	createcookie();

}

function readcookie(){
	d = new Date();
	weekdata = [];
	month = d.getMonth()+1; //because january is 0
	day = d.getDate();
	year = d.getFullYear();
	daymonth = addZero(month).toString()+"/"+addZero(day).toString()+"/"+year.toString()+'!';
	cookie = getCookie("weekreview");
	if(cookie.substr(0,4) == "time"){ 
		weekdata = [];
		weekdata = (cookie.substr(4,cookie.length-1)).split('|');}

	return weekdata;
}

function createcookie(){
	weekdata = readcookie();
	while (weekdata.length > 28){ //delete if data is too old.
		weekdata.shift();
	}


	if (weekdata.length != 0){
		if( weekdata[weekdata.length-1].substr(0,daymonth.length) == daymonth){ // check if the last imput from a cookie is from today, if it is, than edit it, else creat it
			weekdata[weekdata.length-1] = daymonth + a.join(':'); //todays data already exists
		}
		else{
			weekdata.push(daymonth + a.join(':'));} //welcome back user

	}
	else{
		weekdata.push(daymonth + a.join(':'));}
	newcookie = "time"+weekdata.join('|');
	setCookie("weekreview",newcookie);

}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function setCookie(cname, cvalue) {
  var d = new Date();
  d.setTime(d.getTime() + (29*24*60*60*1000)); //will be saved for 29 days of inactivity, but after that its not even visible anymore, so we can delete it
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" +";";
}


function draw() {
	frameRate(10);
	textSize(32);
	work = 0;
	background(BACKGROUND);
	for (x = 0; x < 5; x++){
		fill(100+10*x,x*50,255-x*5);
		text("TIMER! ヽ(•ᴗ•ヽ) ",20+x,42-x);}
	d = new Date();
	minute = d.getMinutes();
	hour = d.getHours();
	sec = d.getSeconds();
	fill(WHITE);
	text(addZero(hour)+":"+addZero(minute)+":"+addZero(sec), X/2.35, 40);
	noStroke()
	ctime = hour*60 +minute;
	if (ctime == 1439 && a[a.length-1] != 1439){ // well if you dent save your progress yet, here you go, one minute before midnight
		delo();}
	for (i = 0; i < a.length; i++){
		if (a[i] > ctime){ // midnight!! weird bugs appear when clock jumps to 0, so the page just reloads
			a = [0]; // now reset it, so that this doesnt get called 100 times a second (because it did for some reason)
			window.location.reload(false);
			} //this was added, since it wasnt able to refresh.. to many request per second..
		if (i == 0 && a[i] != 0){ // draw arc from the start of the day to the first time stamp  it must not be zero since that's midnight, and 0 to 0 draws a full circle
			stroke(WHITE);
			fill(WHITE)
			arc(X/2, Y/2, R/1.2,R/1.2, (-PI/2), (-PI/2)+ ((a[i])/(24*60)) *(2*PI) , PIE);

		}
		else if(i%2 == 0 && a[i-1]!=a[i] && a[i] != 0){
			stroke(GREEN);
			fill(GREEN);
			arc(X/2, Y/2, R/1.2,R/1.2,  (-PI/2)+ ((a[i-1])/(24*60)) *(2*PI),  (-PI/2)+ ((a[i])/(24*60)) *(2*PI) , PIE);
			if (i != a.length){
				work += (a[i] - a[i-1]);}
		}
		else if(i%2 == 1 && a[i-1]!=a[i]  && a[i] != 0){
			stroke(WHITE);
			fill(WHITE);
			arc(X/2, Y/2, R/1.2,R/1.2,  (-PI/2)+ ((a[i-1])/(24*60)) *(2*PI),  (-PI/2)+ ((a[i])/(24*60)) *(2*PI) , PIE);

		}

		if (i == a.length-1 ){
			if(i%2 == 0){
				wrn = false;
				stroke(WHITE);
				fill(WHITE);
			}
			else{
				wrn = true;
				fill(GREEN);
				text("WORK TIME!",17,90+45);
				fill(WHITE);
				text("WORK TIME!",17+2,90-2+45);
				fill(GREEN);
				stroke(GREEN);
				if( a[i] != ctime){
					work += (ctime - a[i]);}
				}
			if ( a[i] != ctime){
				arc(X/2, Y/2, R/1.2,R/1.2,  (-PI/2)+ (a[i]/(24*60))*(2*PI),  (-PI/2)+(ctime/(24*60))*(2*PI) , PIE);
				fill(BACKGROUND);

			}
		}
	}
	noStroke();
	fill(WHITE);
	text("𝙶𝚘𝚊𝚕: "+goal+" 𝚑",20,Y-70);
	wh = Math.floor(work/60);
	wm = work-wh*60;
	fill(WHITE);
	text("𝚝𝚘𝚝𝚊𝚕 𝚝𝚒𝚖𝚎: "+ wh +"𝚑, "+ wm +"𝚖",20, Y-20);
	if (goal > 0){
		gg = goal*60-work;
		if (gg>0){
			gh = Math.floor(gg/60);
			gm = gg - gh*60;
			text(gh +"𝚑, "+ gm +"𝚖 𝚕𝚎𝚏𝚝", X-240,Y-20);}
		else{
			fill(BLUE);
			text("(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧", X-260,Y-20);
			fill(WHITE);
			text("𝙲𝚘𝚖𝚙𝚕𝚎𝚝𝚎!", X-200,Y-70);
			text("(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧ ", X-260+2,Y-20-2);
		}

		
	}
	tt =  (hour*(60*60)+ minute*60+ sec)- startTimer;
	thour = Math.floor(tt/(60*60));
	tmin = Math.floor((tt- thour*(60*60))/60);
	tsec = tt - (thour*(60*60) + tmin*60);
	if (wrn == true && wst == false){
		startTimer = hour*60*60+ minute*60+ sec;
		wst = true;
	}
	else if (wrn == true && wst == true){
		fill(GREEN);
		text(addZero(thour)+":"+ addZero(tmin)+ ":" + addZero(tsec),20,180);
		fill(WHITE);
		text(addZero(thour)+":"+ addZero(tmin)+ ":" + addZero(tsec),20+2,180-2);
	}
	else if (wrn == false && wst == true){
		startTimer = hour*60*60+ minute*60+ sec;
		wst = false;
	}
	else if(wrn == false && wst == false){
		fill (WHITE);
		text(addZero(thour)+":"+ addZero(tmin)+ ":" + addZero(tsec),20,140);

	}

}
