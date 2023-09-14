import { auth } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged 
} from "firebase/auth";

export const signUp = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    // User signed up successfully
  } catch (error) {
    // Handle error (e.g., user already exists)
    console.error("Error signing up:", error);
  }
};

export const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    // User signed in successfully
  } catch (error) {
    // Handle error (e.g., wrong password)
    console.error("Error signing in:", error);
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    // User signed out successfully
  } catch (error) {
    // Handle error
    console.error("Error signing out:", error);
  }
};

export const observeAuth = (setUser) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user); // Set the user object if authenticated
    } else {
      setUser(null); // Set to null if not authenticated
    }
  });
};
