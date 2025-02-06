import {initializeApp,getApps} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBpLHrbPBtgdDB4KgOpYSLwTqQEidVnwkk",
    authDomain: "tiawpao-firebaseauth.firebaseapp.com",
    projectId: "tiawpao-firebaseauth",
    storageBucket: "tiawpao-firebaseauth.firebasestorage.app",
    messagingSenderId: "503107179056",
    appId: "1:503107179056:web:079f8981abccca792b53f5",
    measurementId: "G-8BXRHJY2JN"
  };

  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }
  
  const auth = getAuth();
  
  export { auth };
  