import {initializeApp} from 'firebase/app';
import {getAuth,initializeAuth , getReactNativePersistence} from 'firebase/auth';
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'

// const firebaseConfig = {
//     apiKey: "AIzaSyBpLHrbPBtgdDB4KgOpYSLwTqQEidVnwkk",
//     authDomain: "tiawpao-firebaseauth.firebaseapp.com",
//     projectId: "tiawpao-firebaseauth",
//     storageBucket: "tiawpao-firebaseauth.firebasestorage.app",
//     messagingSenderId: "503107179056",
//     appId: "1:503107179056:web:079f8981abccca792b53f5",
//     measurementId: "G-8BXRHJY2JN"
//   };
const firebaseConfig = {
  apiKey: "AIzaSyD_Z1lBJrnolGssUvIrmgqX63lW-X-isCU",
  authDomain: "tiaw-pao-auth-57bdf.firebaseapp.com",
  projectId: "tiaw-pao-auth-57bdf",
  storageBucket: "tiaw-pao-auth-57bdf.firebasestorage.app",
  messagingSenderId: "649405707315",
  appId: "1:649405707315:web:bab9ec57d90274ad1f9f46",
  measurementId: "G-8Z9V1QDRNR"
};

  const app = initializeApp(firebaseConfig);
  // const auth = getAuth(app);
  // export {auth};
  export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  })
  