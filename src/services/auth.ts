import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../config/firebase';
import { User, UserRole } from '../types';

export async function loginWithEmail(email: string, password: string) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    const userData = userDoc.data() as Omit<User, 'id'>;

    if (!userDoc.exists()) {
      throw new Error('Utilisateur non trouvé');
    }

    return {
      user: {
        id: result.user.uid,
        ...userData,
      },
      token: await result.user.getIdToken(),
    };
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(
      error.code === 'auth/invalid-credential' 
        ? 'Email ou mot de passe incorrect'
        : 'Erreur lors de la connexion'
    );
  }
}

export async function registerWithEmail(
  email: string, 
  password: string, 
  userData: {
    name: string;
    role: UserRole;
    location: string;
    avatar?: File;
  }
) {
  try {
    // Create auth user
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Upload avatar if provided
    let avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`;
    if (userData.avatar) {
      const avatarRef = ref(storage, `avatars/${result.user.uid}`);
      await uploadBytes(avatarRef, userData.avatar);
      avatarUrl = await getDownloadURL(avatarRef);
    }

    // Update profile
    await updateProfile(result.user, {
      displayName: userData.name,
      photoURL: avatarUrl,
    });

    // Send email verification
    await sendEmailVerification(result.user);

    // Create user document in Firestore
    const userDoc = {
      name: userData.name,
      email,
      role: userData.role,
      location: userData.location,
      avatar: avatarUrl,
      createdAt: new Date().toISOString(),
      rating: 0,
      reviews: 0,
      emailVerified: false,
    };

    await setDoc(doc(db, 'users', result.user.uid), userDoc);

    return {
      user: {
        id: result.user.uid,
        ...userDoc,
      },
      token: await result.user.getIdToken(),
    };
  } catch (error: any) {
    console.error('Registration error:', error);
    throw new Error(
      error.code === 'auth/email-already-in-use'
        ? 'Cette adresse email est déjà utilisée'
        : 'Erreur lors de l\'inscription'
    );
  }
}

export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Password reset error:', error);
    throw new Error('Erreur lors de la réinitialisation du mot de passe');
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Erreur lors de la déconnexion');
  }
}

export async function updateUserProfile(
  userId: string,
  updateData: {
    name?: string;
    avatar?: File;
    location?: string;
  }
) {
  try {
    const userRef = doc(db, 'users', userId);
    const updates = { ...updateData };

    if (updateData.avatar) {
      const avatarRef = ref(storage, `avatars/${userId}`);
      await uploadBytes(avatarRef, updateData.avatar);
      updates.avatar = await getDownloadURL(avatarRef);
    }

    await setDoc(userRef, updates, { merge: true });
    
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: updateData.name,
        photoURL: updates.avatar,
      });
    }

    return updates;
  } catch (error) {
    console.error('Profile update error:', error);
    throw new Error('Erreur lors de la mise à jour du profil');
  }
}