export interface UserData {
  email: string;
  name: string;
}

export interface UrlData {
  id: number;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: UserData;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
}

export interface LandingPageProps {
  onGetStarted: () => void;
}

export interface DashboardProps {
  user: UserData;
  onLogout: () => void;
  goToLanding :()=> void;
}

export interface UrlListItemProps {
  url: UrlData;
}

export interface UrlShortenerFormProps {
  onUrlShortened: (newUrl: UrlData) => void;
}

export interface RegisterProps {
  onRegister: () => void;
  onSwitchToLogin: () => void;
    goToLanding :()=> void;
}

export interface LoginProps {
  onLogin: () => void;
  onSwitchToRegister: () => void;
   goToLanding :()=> void;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface InputProps {
  label?: string;
  error?: string;
  className?: string;
}
export interface NavbarProps {
  onNavigateToHome?: () => void;
}