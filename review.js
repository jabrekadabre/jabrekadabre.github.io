//hello world!  ※\(^o^)/※ (✿◠‿◠) （｡◑ヮ◑｡）(((o(*ﾟ▽ﾟ*)o))) (ﾉ◕ヮ◕)ﾉ*:・ﾟ✧ 
X = 1080-40;
Y = 1710;
times = [];

work = 0;


function setup(){
	myCanvas = createCanvas(X,Y );
	myCanvas.parent('review');
	console.log(times);

	textSize(22);
	textFont("monospace");


	BLACK = color(  0,   0,   0);
	WHITE = color(255, 255, 255);
	BLUE  = color(100,   0, 255);
	GREEN = color( 53, 227, 155);//(  0, 255,  80); //original green
	BACKGROUND = color(20,20,20); //(51, 51, 51)// color(180,150,200) 255, 230, 255 ;


	button2 = createButton("☀");
	button2.parent('review');
	button2.position(X-40,180);
	button2.style("background-color",BACKGROUND);
	button2.style("color", WHITE);
	button2.style("font-size", 20+"px");
	button2.mousePressed(darkmode);
	windowResized()
	darkmode = false;
	goal = 0;
	update()
}
function update(){
	allcookiedata = document.cookie;
	console.log("allcookiedata",allcookiedata);


	reviewdata = [];
	cookie = getCookie("weekreview");
	console.log("cookie",cookie);
	if(cookie.substr(0,4) == "time"){ 
		console.log("we found a cookie with (time)");
		weekdata = (cookie.substr(4,cookie.length-1)).split('|');}
	console.log(weekdata);

	reviewdata.push((weekdata[0].substr(11,weekdata[0].length)).split(':').map(Number)); //frist element can be added, but for the second one, we need to check if there were any days of inacticity 
	for(i = 1; i < weekdata.length ; i ++){ //calculate how many days was user inactive
		firstday = Date.parse(weekdata[i-1].substr(0,10));
		secondday =  Date.parse(weekdata[i].substr(0,10));
		console.log("firstday",firstday);
		numofempty = Math.floor((secondday-firstday)/86400000);
		console.log("numofempty", numofempty);
		for(n = 1; n< numofempty;n++){
			reviewdata.push("empty_day");
		}
		reviewdata.push((weekdata[i].substr(11,weekdata[i].length)).split(':').map(Number));
	}
	console.log("reviewdata",reviewdata);
	background(BACKGROUND);




	d = new Date();
	day = d.getDay();

	console.log("day: ",day);
	for(g = 0; g < 7-day; g++){
		reviewdata.push("empty_day");
	}



	weektext = ["This week:", "Last week", "Week 3", "Week 4" ,"Week 5"];
	for(u = 1; u < 5; u++){
		draw_outline((X/2)-(X/6)*pow(-1,u),400 + 200*((u-1)+(u-2)));

 	}



}
function draw_outline(locx,locy){
	translate(locx,locy);

	noStroke();
	fill(WHITE);
	text(weektext[u-1] , -250*(u%2-1) - 350*(u%2),-80);
	console.log("text bi ");

	R = X/12;
	//     middle, left,   up left                up right              right             down right             down left
	mov = [[-R/2-2.5, +R*0.866+5],[+R/2+2.5, +R*0.866+5],[+R+5,0],[+R/2+2.5, -R*0.866-5],[-R/2-2.5, -R*0.866-5],[-R-5,0],[0,0]];
	for(z = 0; z < 7 ; z++ ){ // looks like we have some historical data to draw
		console.log("we insdie", z, reviewdata.length);
		if (reviewdata[reviewdata.length-1] == "empty_day"){
			reviewdata.pop(); // cool, now we can remove it 
			stroke(GREEN);
			noFill();
			circle(mov[z][0],mov[z][1],R);
			console.log("konec");//draw empty circles insted 

		}
		else if (reviewdata.length > 0 ){
				draw1day(reviewdata[reviewdata.length-1] ,mov[z]); //draw the last input first
				reviewdata.pop(); // cool, now we can remove it 

			}

		else{
			stroke(GREEN);
			noFill();
			circle(mov[z][0],mov[z][1],R);
			console.log("konec");//draw empty circles insted 
		}
		console.log("lets move on ");
	}

	translate(-locx,-locy);
}


function draw1day(a,loc){
	translate(loc[0],loc[1]);
	R = X/12;
	console.log("noice", a, a.length, R);
	for (i = 0; i < a.length; i++){

		if (i == 0 && a[i] != 0){ // draw arc from the start of the day to the first time stamp  it must not be zero since that's midnight, and 0 to 0 draws a full circle
			stroke(WHITE);
			fill(WHITE)
			arc(0,0, R,R, (-PI/2), (-PI/2)+ ((a[i])/(24*60)) *(2*PI) , PIE);

		}
		else if(i%2 == 0 && a[i-1]!=a[i]){
			stroke(GREEN);
			fill(GREEN);
			arc(0,0, R,R,  (-PI/2)+ ((a[i-1])/(24*60)) *(2*PI),  (-PI/2)+ ((a[i])/(24*60)) *(2*PI) , PIE);
			if (i != a.length){
				work += (a[i] - a[i-1]);}
		}
		else if(i%2 == 1 && a[i-1]!=a[i]){
			stroke(WHITE);
			fill(WHITE);
			arc(0,0, R,R,  (-PI/2)+ ((a[i-1])/(24*60)) *(2*PI),  (-PI/2)+ ((a[i])/(24*60)) *(2*PI) , PIE);

		}

	}
	console.log("completed one day");
	translate(-loc[0],-loc[1]);


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

function darkmode(){
	if (darkmode){
		BACKGROUND = color(20,20,20);// color(180,150,200);
		darkmode = false;
		button2.style("color", WHITE);
		document.body.style.background = "#141414";
	}
}

function windowResized() {
	X = windowWidth;
	if (X > 1080){
		X = 1080 -40;
	}
	else{
		X = X-40;
	}
  	resizeCanvas(X,Y);
  	update();
  }


function draw(){
	frameRate(0.01);
	update();

}