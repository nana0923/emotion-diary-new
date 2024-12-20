import { useState, createContext, useReducer, useRef, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "@routes/router";
import { onAuthStateChanged, auth, db } from "@/firebase";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

import { ToastContainer } from "react-toastify";
import Spinner from "@components/Spinner";

import "@/App.css";
import "react-toastify/dist/ReactToastify.css";

function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE": {
      nextState = state.map((item) => (String(item.id) === String(action.data.id) ? action.data : item));
      break;
    }
    case "DELETE": {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("Diary", JSON.stringify(nextState));
  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();
export const LoadingContext = createContext();
export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(undefined); // 로그인된 사용자 정보
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const [data, dispatch] = useReducer(reducer, []);

  // Firebase 인증 상태 변화 감지
  useEffect(() => {
    setIsLoading(true); // 초기 로딩 상태 활성화
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchDiaries(currentUser.uid);
      } else {
        setUser(null);
      }
      setIsLoading(false); // 인증 상태 확인 후 로딩 종료
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 Firebase 상태 리스너 정리
  }, []);

  // Firestore에서 일기 데이터 가져오기
  const fetchDiaries = async (userId) => {
    const diariesCollection = collection(db, "users", userId, "diary");
    const diarySnapshot = await getDocs(diariesCollection);
    const diaryList = diarySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    dispatch({ type: "INIT", data: diaryList });
  };

  // 새로운 일기 추가 (Firestore에 저장)
  const onCreate = async (createdDate, emotionId, content) => {
    if (user) {
      try {
        const diaryRef = collection(db, "users", user.uid, "diary");
        const newDocRef = await addDoc(diaryRef, {
          createdDate,
          emotionId,
          content,
        });
        dispatch({
          type: "CREATE",
          data: { id: newDocRef.id, createdDate, emotionId, content },
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  // 일기 수정 (Firestore에서 업데이트)
  const onUpdate = async (id, createdDate, emotionId, content) => {
    if (user) {
      try {
        const diaryRef = doc(db, "users", user.uid, "diary", id);
        await updateDoc(diaryRef, {
          createdDate,
          emotionId,
          content,
        });
        dispatch({
          type: "UPDATE",
          data: { id, createdDate, emotionId, content },
        });
      } catch (e) {
        console.error("Error updating document: ", e);
      }
    }
  };

  // 일기 삭제 (Firestore에서 삭제)
  const onDelete = async (id) => {
    if (user) {
      try {
        const diaryRef = doc(db, "users", user.uid, "diary", id);
        await deleteDoc(diaryRef);
        dispatch({ type: "DELETE", id });
      } catch (e) {
        console.error("Error deleting document: ", e);
      }
    }
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ user }}>
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
          <DiaryStateContext.Provider value={data}>
            <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
              />
              {/* 로딩 */}
              {isLoading && <Spinner />}
              {/* 라우터 제공 */}
              <RouterProvider router={router} />
            </DiaryDispatchContext.Provider>
          </DiaryStateContext.Provider>
        </LoadingContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
