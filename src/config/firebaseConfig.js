import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

export const firebaseConfig = {
  apiKey: 'AIzaSyAkUWg1AWJdR1OK48zUbnXrpUI2tfJTVX4',
  authDomain: 'electronics-shop-82ad4.firebaseapp.com',
  projectId: 'electronics-shop-82ad4',
  storageBucket: 'electronics-shop-82ad4.appspot.com',
  messagingSenderId: '97497925549',
  appId: '1:97497925549:web:b61eb9e6a551b35574c324',
  databaseURL: 'https://electronics-shop-82ad4-default-rtdb.firebaseio.com/',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
