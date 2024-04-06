import { initializeApp } from 'firebase/app'
import { getAuth} from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const app = initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
})


export const firebaseRealtimeDatabase = getDatabase(app)
export const firebaseAuth = getAuth(app)