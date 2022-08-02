import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

export const signInGoogle = () => {
	return new Promise((resolve) => {
		auth.signOut();

		const provider = new firebase.auth.GoogleAuthProvider();
		resolve(auth.signInWithPopup(provider));
	});
};

export const signOut = () => {
	return auth.signOut();
};
