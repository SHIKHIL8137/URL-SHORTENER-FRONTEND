import { Link } from "lucide-react";
import Button from "./Button";
import Input from "./Input";
import LoadingSpinner from "./LoadingSpinner";
import Card from "./Card";
import type { LoginProps } from "../interfaces/data.interfaces";
import { useRef, useState } from "react";
import { login } from "../api/Api";
import { toast } from "sonner";
import Navbar from "./NavBar";
import { validateEmail, validatePassword } from "../utils/validator";

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToRegister, goToLanding }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      passwordRef.current?.focus();
    }
  };

  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setError('');
    const emailValidate = validateEmail(email);
    const passwordValidate = validatePassword(password);
    if (emailValidate) {
      setError(emailValidate);
      return;
    } else if (passwordValidate) {
      setError(passwordValidate);
      return;
    }

    try {
      setLoading(true);
      const result = await login({ email, password });
      if (result.data?.status) {
        onLogin();
        toast.success(result.data?.message);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message?.message || 'Something went wrong';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex flex-col">
      <Navbar onNavigateToHome={goToLanding} />
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md sm:max-w-lg md:max-w-md lg:max-w-lg xl:max-w-md p-6 sm:p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mb-4">
              <Link className="w-8 h-8 text-sky-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          <div>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="Enter your email"
              onKeyDown={handleKeyDown}
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onKeyDown={handlePasswordKeyDown}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Enter your password"
              ref={passwordRef}
              required
            />

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <Button onClick={handleSubmit} disabled={loading} className="w-full mb-4">
              {loading ? <LoadingSpinner /> : 'Sign In'}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              Don&apos;t have an account?{' '}
              <button
                onClick={onSwitchToRegister}
                className="text-sky-600 hover:text-sky-700 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
