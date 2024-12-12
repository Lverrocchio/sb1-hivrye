import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { app } from './config';

const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export { auth };