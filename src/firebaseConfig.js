import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB9OBYEs8VkNlQKinyYTIrJmEuPZCVu-7Q",
  authDomain: "my-app-69cb4.firebaseapp.com",
  projectId: "my-app-69cb4",
  storageBucket: "my-app-69cb4.appspot.com",
  messagingSenderId: "479363619892",
  appId: "1:479363619892:web:1ba574b477cfea3d86fe61"
};

  const app = initializeApp(firebaseConfig);

  export const storage = getStorage(app);
  export const db = getFirestore(app);
  export const auth =getAuth(app);