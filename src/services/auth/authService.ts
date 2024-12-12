import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User as FirebaseUser 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { User } from '../../types';
import { toast } from 'react-hot-toast';

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    
    if (!userDoc.exists()) {
      const userProfile = {
        name: email.split('@')[0],
        email: userCredential.user.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}`,
        role: 'renter',
        createdAt: new Date().toISOString(),
      };
      
      await setDoc(doc(db, 'users', userCredential.user.uid), userProfile);
      
      return {
        user: { id: userCredential.user.uid, ...userProfile } as User,
        token: await userCredential.user.getIdToken()
      };
    }

    return {
      user: { id: userCredential.user.uid, ...userDoc.data() } as User,
      token: await userCredential.user.getIdToken()
    };
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.message);
  }
};

export const registerWithEmail = async (
  email: string,
  password: string,
  userData: Omit<User, 'id' | 'email'>
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    const userProfile = {
      ...userData,
      email,
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, 'users', userCredential.user.uid), userProfile);
    
    return {
      user: { id: userCredential.user.uid, ...userProfile } as User,
      token: await userCredential.user.getIdToken()
    };
  } catch (error: any) {
    console.error('Registration error:', error);
    throw new Error(error.message);
  }
};

export const initAuthStateListener = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (!firebaseUser) {
      callback(null);
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (userDoc.exists()) {
        callback({ id: firebaseUser.uid, ...userDoc.data() } as User);
      } else {
        callback(null);
      }
    } catch (error) {
      console.error('Error in auth state listener:', error);
      toast.error('Erreur de connexion. Veuillez réessayer.');
      callback(null);
    }
  });
};