import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../config/firebase';
import { User } from '../../types';
import { toast } from 'react-hot-toast';

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    
    if (!userDoc.exists()) {
      throw new Error('Profil utilisateur introuvable');
    }

    const token = await userCredential.user.getIdToken();
    return {
      user: { id: userCredential.user.uid, ...userDoc.data() } as User,
      token
    };
  } catch (error: any) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerWithEmail = async (
  email: string,
  password: string,
  userData: Omit<User, 'id' | 'email'>
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    let avatarUrl = userData.avatar;
    if (userData.avatar instanceof File) {
      const avatarRef = ref(storage, `avatars/${userCredential.user.uid}`);
      await uploadBytes(avatarRef, userData.avatar);
      avatarUrl = await getDownloadURL(avatarRef);
    }

    const userProfile = {
      ...userData,
      email,
      avatar: avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}`,
      createdAt: new Date().toISOString(),
      emailVerified: false,
    };

    await setDoc(doc(db, 'users', userCredential.user.uid), userProfile);
    
    const token = await userCredential.user.getIdToken();
    return {
      user: { id: userCredential.user.uid, ...userProfile } as User,
      token
    };
  } catch (error: any) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    toast.success('Déconnexion réussie');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
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
      callback(null);
    }
  });
};