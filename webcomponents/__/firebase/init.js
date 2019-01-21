if (typeof firebase === 'undefined') throw new Error('hosting/init-error: Firebase SDK not detected. You must include it before /__/firebase/init.js');
firebase.initializeApp({
	"apiKey": "AIzaSyA4FlZ_UlSF7QL7aj2oOaCk8dRG_pYXQ18",
	"databaseURL": "https://makerlabs-acm-test.firebaseio.com",
	"storageBucket": "makerlabs-acm-test.appspot.com",
	"authDomain": "makerlabs-acm-test.firebaseapp.com",
	"messagingSenderId": "919145167196",
	"projectId": "makerlabs-acm-test"
});