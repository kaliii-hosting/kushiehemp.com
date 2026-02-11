import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD0NE8mV9djppRtCCWLvruuO1aLHVAX2lQ",
  authDomain: "kushie-hemp-store.firebaseapp.com",
  projectId: "kushie-hemp-store",
  storageBucket: "kushie-hemp-store.firebasestorage.app",
  messagingSenderId: "10428580359",
  appId: "1:10428580359:web:22d7e04e502b894174a0a2"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
