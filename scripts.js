
  const firebaseConfig = {

    apiKey: "AIzaSyCl4unu9pY2DDQxVgPjIM12i-jViTtAVTk",

    authDomain: "iot2023-20c28.firebaseapp.com",

    databaseURL: "https://iot2023-20c28-default-rtdb.firebaseio.com",

    projectId: "iot2023-20c28",

    storageBucket: "iot2023-20c28.appspot.com",

    messagingSenderId: "1078279391484",

    appId: "1:1078279391484:web:16f2d8e01dc6d004bbef79",

    measurementId: "G-KB6FT1D0HC"

  };


  // Initialize Firebase

  //const app = initializeApp(firebaseConfig);

  //const analytics = getAnalytics(app);
  firebase.initializeApp(firebaseConfig);

	  // getting reference to the database
	  var database = firebase.database();

	  //getting reference to the data we want
	  var dataRef1 = database.ref('temp');
	  var dataRef2 = database.ref('humid');
	  var dataRef3 = database.ref('led');

	  //fetch the data
	  dataRef1.on('value', function(getdata1){
	  	var humi = getdata1.val();
	  	document.getElementById('humidity').innerHTML = humi + "%";
	  })

	   dataRef2.on('value', function(getdata2){
	  	var temp = getdata2.val();
	  	document.getElementById('temperature').innerHTML = temp + "&#8451;";
	  })



	var index=0;
var btn=document.getElementById("led");

function press() {
index++;
if (index%2==1) {
	database.ref('LED').set("1");
	document.getElementById('led').innerHTML="turn off";
}
else {
database.ref('LED').set("0");
document.getElementById('led').innerHTML="turn on";
}
}