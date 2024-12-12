export type FirebaseAuthError = {
  code: string;
  message: string;
};

export const handleAuthError = (error: FirebaseAuthError): Error => {
  const errorMessages: Record<string, string> = {
    'auth/email-already-in-use': 'Cette adresse email est déjà utilisée',
    'auth/invalid-credential': 'Email ou mot de passe incorrect',
    'auth/weak-password': 'Le mot de passe est trop faible',
    'auth/invalid-email': 'Adresse email invalide',
    'auth/user-not-found': 'Aucun compte ne correspond à cet email',
    'auth/too-many-requests': 'Trop de tentatives, veuillez réessayer plus tard',
    'auth/network-request-failed': 'Erreur de connexion, vérifiez votre connexion internet',
    'permission-denied': 'Accès refusé. Veuillez vous reconnecter.',
  };

  const message = errorMessages[error.code] || 'Une erreur est survenue';
  return new Error(message);
};