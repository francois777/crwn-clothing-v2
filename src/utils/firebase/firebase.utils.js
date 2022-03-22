import { initializeApp } from 'firebase/app'
import {  getAuth,
          signInWithRedirect,
          signInWithPopup,
          GoogleAuthProvider,
          createUserWithEmailAndPassword,
          signInWithEmailAndPassword,
          signOut,
          onAuthStateChanged
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDT0yVa11_oPvjggtkUH-s0RuCAgEngexk",
  authDomain: "crn-clothing-db-20911.firebaseapp.com",
  projectId: "crn-clothing-db-20911",
  storageBucket: "crn-clothing-db-20911.appspot.com",
  messagingSenderId: "917984175253",
  appId: "1:917984175253:web:cb4d3741a84118c68ea79c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// The following parameters are required by Google
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

export const db = getFirestore()

export const createUserDocument = async(
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  console.log('firebase.utils.js, userAuth: ', userAuth,
              '; additionalInformation: ', additionalInformation)

  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot)
  console.log(userSnapshot.exists())
  // if user document exists, return this document
  // if user document does not exist, create it.
  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (error) {
        console.log('error creating the user', error.message)
    }
  }
  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth)

// onAuthStateChanged is an open listener which is invoked whenever
// a user is authenticated or signs out.
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback)

// Other available parameters are:
// onAuthStateChanged(auth, callback, errorCallback, completedCallback)
// 
