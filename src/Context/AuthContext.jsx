import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const FAKE_USER = {
  name: "eslam",
  email: "eslam@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zdr",
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("This type of payload not exist");
  }
}
const initialState = { user: null, isAuthenticated: false };
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(email, pass) {
    if (email === FAKE_USER.email && pass === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was outside Auth Provider");
  return context;
}

export { useAuth, AuthProvider };
