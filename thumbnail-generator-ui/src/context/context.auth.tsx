import React, { useContext, useState, useEffect } from "react";
import auth, { User, UserCreated, UserCredential } from "../util/firebaseApp";

interface IAuthContextProps {
  currentUser: User;
  createUser(email: string, password: string): Promise<UserCreated>;
  loginUser(email: string, password: string): Promise<UserCredential>;
  logOutUser(): Promise<void>;
}
export interface AuthProviderProps {}

const AuthContext = React.createContext<IAuthContextProps>(
  {} as IAuthContextProps
);

export function useAuth() {
  return useContext(AuthContext);
}

/**
 * Creates a user using Firebase
 * @param email user provided email
 * @param password user provided password
 * @returns Promise with new user data.
 */
function createUser(email: string, password: string): Promise<UserCreated> {
  return auth.createUserWithEmailAndPassword(email, password);
}

/**
 * Authorize user with a given email and password
 * @param email user provided email
 * @param password user provided password
 * @returns Promise with authorized user data.
 */
function loginUser(email: string, password: string): Promise<UserCredential> {
  return auth.signInWithEmailAndPassword(email, password);
}

/**
 * Sign out user from app
 * @returns Empty promise when done
 */
function logOutUser(): Promise<void> {
  return auth.signOut();
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authChanges = auth.onAuthStateChanged((user: User) => {
      console.log("Current user in app: ", user?.email);
      setCurrentUser(user);
      setLoading(false);
    });

    // unsubscribe onUnmount
    return authChanges;
  }, []);

  const authValue: IAuthContextProps = {
    createUser,
    loginUser,
    logOutUser,
    currentUser,
  };
  return (
    <AuthContext.Provider value={authValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
