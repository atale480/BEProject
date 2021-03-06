import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAJohm8upTGBo4FPp_2ITUtwPPoDOhBhM",
  authDomain: "be-project-7cdae.firebaseapp.com",
  databaseURL: "https://be-project-7cdae.firebaseio.com",
  projectId: "be-project-7cdae",
  storageBucket: "be-project-7cdae.appspot.com",
  messagingSenderId: "415220481022",
  appId: "1:415220481022:web:1212ce50e893d7006cdeaf"
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name
    });
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  getCurrentUserEmailId() {
    return this.auth.currentUser.email;
  }

  doSignInWithGoogle() {
    return this.auth.signInWithPopup(this.googleProvider);
  }

  doSignInWithFacebook() {
    return this.auth.signInWithPopup(this.facebookProvider);
  }
}

export default new Firebase();
