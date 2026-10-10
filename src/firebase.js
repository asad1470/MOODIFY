import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const app = initializeApp({
  apiKey: "AIzaSyADGrFU5EAjPs2YXILm67Z4th_hnLQnxV0",
  authDomain: "moodify-bfefc.firebaseapp.com",
  projectId: "moodify-bfefc",
  appId: "1:222078697262:web:1051f073485dbeee0644bf",
})

export const auth = getAuth(app)