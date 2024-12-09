import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyBmRu94cl-zqKrbzd2OimLFssgY5kjxvA8",
  authDomain: "emotion-diary-new.firebaseapp.com",
  projectId: "emotion-diary-new",
  storageBucket: "emotion-diary-new.firebasestorage.app",
  messagingSenderId: "218893607802",
  appId: "1:218893607802:web:ad083547b272875a6b6cc3",
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// 인증 및 Firestore 인스턴스
const auth = getAuth(app);
const db = getFirestore(app);

// 인증 상태 변화 감지
const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};

export { auth, onAuthStateChanged, db, onAuthStateChangedListener };
