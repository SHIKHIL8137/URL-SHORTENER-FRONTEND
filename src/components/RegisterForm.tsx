import { User } from "lucide-react";
import Button from "./Button";
import Input from "./Input";
import LoadingSpinner from "./LoadingSpinner";
import Card from "./Card";
import type { RegisterProps } from "../interfaces/data.interfaces";
import { useRef, useState, useCallback } from "react";
import { register } from "../api/Api";
import { toast } from "sonner";
import debounce from "lodash/debounce";
import Navbar from "./NavBar";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validator";

const Register: React.FC<RegisterProps> = ({
  onRegister,
  onSwitchToLogin,
  goToLanding,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const nameRef: any = useRef<HTMLInputElement>(null);
  const emailRef: any = useRef(null);
  const passwordRef: any = useRef<HTMLInputElement>(null);
  const confirmPasswordRef: any = useRef<HTMLInputElement>(null);

  const handleKeyDown =
    (nextRef: React.RefObject<HTMLInputElement>) =>
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (nextRef.current) {
          nextRef.current.focus();
        }
      }
    };

  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      debouncedSubmit();
    }
  };

  const handleSubmit = async () => {
    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const emailValidate = validateEmail(trimmedEmail);
    const nameValidate = validateName(trimmedName);
    const passwordValidate = validatePassword(trimmedPassword);

    if (nameValidate) {
      setError(nameValidate);
      return;
    }
    if (emailValidate) {
      setError(emailValidate);
      return;
    }
    if (passwordValidate) {
      setError(passwordValidate);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const result = await register({
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      });
      if (result.data?.status) {
        onRegister();
        toast.success(result.data?.message);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message?.message || "Something went wrong";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSubmit = useCallback(debounce(handleSubmit, 300), [
    name,
    email,
    password,
    confirmPassword,
  ]);

  return (
    <div className="min-h-screen">
      <Navbar onNavigateToHome={goToLanding} />
      <div className=" bg-gradient-to-br from-sky-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-sky-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600 mt-2">Sign up to get started</p>
          </div>

          <div>
            <Input
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => (setName(e.target.value), setError(""))}
              onKeyDown={handleKeyDown(emailRef)}
              placeholder="Enter your full name"
              ref={nameRef}
              required
              aria-describedby={error ? "form-error" : undefined}
            />

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => (setEmail(e.target.value), setError(""))}
              onKeyDown={handleKeyDown(passwordRef)}
              placeholder="Enter your email"
              ref={emailRef}
              required
              aria-describedby={error ? "form-error" : undefined}
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => (setPassword(e.target.value), setError(""))}
              onKeyDown={handleKeyDown(confirmPasswordRef)}
              placeholder="Create a password"
              ref={passwordRef}
              required
              aria-describedby={error ? "form-error" : undefined}
            />

            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => (
                setConfirmPassword(e.target.value), setError("")
              )}
              onKeyDown={handlePasswordKeyDown}
              placeholder="Confirm your password"
              ref={confirmPasswordRef}
              required
              aria-describedby={error ? "form-error" : undefined}
            />
            <div className="text-sm text-gray-500 mt-1 ml-1 mb-5">
              Password must include:
              <ul className="list-disc list-inside ml-2">
                <li>At least 8 characters</li>
                <li>One uppercase letter (A-Z)</li>
                <li>One lowercase letter (a-z)</li>
                <li>One number (0-9)</li>
                <li>One special character (!@#$...)</li>
              </ul>
            </div>

            {error && (
              <div
                id="form-error"
                role="alert"
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
              >
                {error}
              </div>
            )}

            <Button
              onClick={debouncedSubmit}
              disabled={loading}
              className={`w-full mb-4 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? <LoadingSpinner /> : "Create Account"}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={onSwitchToLogin}
                className="text-sky-600 hover:text-sky-700 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
