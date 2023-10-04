import { auth, googleProvider } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  signInWithPopup 
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
    // Optionally save user to local storage here if required
  } catch (error) {
    // Handle error (e.g., wrong password)
    console.error("Error signing in:", error);
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    // User signed out successfully
    // Remove user from local storage
    localStorage.removeItem('user');
  } catch (error) {
    // Handle error
    console.error("Error signing out:", error);
  }
};

export const observeAuth = (setUser) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      // console.log("User set:", JSON.stringify(user)); // Debug line
    } else {
      setUser(null);
      localStorage.removeItem('user');
      // console.log("User removed"); // Debug line
    }
  });
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    // Save user to local storage to maintain session on refresh
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};
