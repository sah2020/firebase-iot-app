
  const firebaseConfig = {

    apiKey: "AIzaSyD8BfVD5v4MeKsXga2leQrYiqmpll5oMtE",
    authDomain: "iot2023-99e2c.firebaseapp.com",
    projectId: "iot2023-99e2c",
    storageBucket: "iot2023-99e2c.appspot.com",
    messagingSenderId: "70235148479",
    appId: "1:70235148479:web:90c0374539ef71ed29760a",
    measurementId: "G-KB6FT1D0HC"

  };


  // Initialize Firebase

  //const app = initializeApp(firebaseConfig);

  //const analytics = getAnalytics(app);
  firebase.initializeApp(firebaseConfig);

	  // getting reference to the database
	  var database = firebase.database();

	  //getting reference to the data we want
	  var dataRef1 = database.ref('humid');
	  var dataRef2 = database.ref('led');
 	  var dataRef3 = database.ref('temp');

	  //fetch the data
	  dataRef1.on('value', function(getdata1){
	  	var humi = getdata1.val();
	  	document.getElementById('humidity').innerHTML = humi + "%";
	  })

	   dataRef3.on('value', function(getdata3){
	  	var temp = getdata3.val();
	  	document.getElementById('temperature').innerHTML = temp + "&#8451;";
	  })



	var index=0;
var btn=document.getElementById("led");

function press() {
	index++;
	if (index%2==1) {
		database.ref('led').set(true);
		document.getElementById('led').innerHTML="turn off";
	}
	else {
		database.ref('led').set(false);
		document.getElementById('led').innerHTML="turn on";
	}
}
