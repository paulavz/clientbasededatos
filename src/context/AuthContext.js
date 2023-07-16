import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
  documents: JSON.parse(localStorage.getItem("documents")) || null,
  followLibraries: JSON.parse(localStorage.getItem("follows")) || null,
  libraries: JSON.parse(localStorage.getItem("libraries")) || null,
  myLibrary: JSON.parse(localStorage.getItem("myLibraries")) || null,
  loading: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  useEffect(() => {
    if (state.documents !== undefined) {
      localStorage.setItem("documents", JSON.stringify(state.documents));
    }
  }, [state.documents]);

  useEffect(() => {
    if (state.followLibraries !== undefined) {
      localStorage.setItem("follows", JSON.stringify(state.followLibraries));
    }
  }, [state.followLibraries]);

  useEffect(() => {
    if (state.libraries !== undefined) {
      localStorage.setItem("libraries", JSON.stringify(state.libraries));
    }
  }, [state.libraries]);

  useEffect(() => {
    if (state.myLibrary !== undefined) {
      localStorage.setItem("myLibraries", JSON.stringify(state.myLibrary));
    }
  }, [state.myLibrary]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        documents: state.documents,
        followLibraries: state.followLibraries,
        libraries: state.libraries,
        myLibrary: state.myLibrary,
				loading: state.loading,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
