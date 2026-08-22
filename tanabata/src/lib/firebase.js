import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Helper untuk subscribe realtime wishes
export const subscribeWishes = (callback) => {
  const q = query(collection(db, "wishes"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const wishes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(wishes);
  });
};

// Helper untuk kirim wish baru
export const sendWish = async ({ name, wish, color }) => {
  // Generate posisi acak di sekitar ranting bambu
  const posX = (Math.random() - 0.5) * 2;
  const posY = 1.5 + Math.random() * 2;
  const posZ = (Math.random() - 0.5) * 2;

  return await addDoc(collection(db, "wishes"), {
    name: name || "Anonim",
    wish,
    color: color || "#f43f5e",
    position: [posX, posY, posZ],
    createdAt: serverTimestamp(),
  });
};