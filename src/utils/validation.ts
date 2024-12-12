export function validatePassword(password: string): string | null {
  if (!password) {
    return 'Le mot de passe est requis';
  }

  if (password.length < 8) {
    return 'Le mot de passe doit contenir au moins 8 caractères';
  }

  if (!/[A-Z]/.test(password)) {
    return 'Le mot de passe doit contenir au moins une majuscule';
  }

  if (!/[a-z]/.test(password)) {
    return 'Le mot de passe doit contenir au moins une minuscule';
  }

  if (!/[0-9]/.test(password)) {
    return 'Le mot de passe doit contenir au moins un chiffre';
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'Le mot de passe doit contenir au moins un caractère spécial';
  }

  return null;
}

export function validateEmail(email: string): string | null {
  if (!email) {
    return 'L\'email est requis';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Email invalide';
  }

  return null;
}