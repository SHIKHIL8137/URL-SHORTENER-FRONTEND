import validator from "validator";

export const validateName = (name: string): string | null => {
  const trimmed = name.trim();
  if (!validator.isAlpha(trimmed.replace(/\s/g, ""))) {
    return "Name must contain only letters";
  }
  if (!validator.isLength(trimmed, { min: 3 })) {
    return "Name must be at least 3 characters long";
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  if (!validator.isEmail(email)) {
    return "Invalid email format";
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  const isStrong = validator.isStrongPassword(password, {
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });
  if (!isStrong) {
    return "Password must be strong (e.g. Pass@123)";
  }
  return null;
};

export const validateURL = (url: string): string | null => {
  if (!url.trim()) return null; 
  if (!validator.isURL(url)) {
    return "Invalid URL format";
  }
  return null;
};
