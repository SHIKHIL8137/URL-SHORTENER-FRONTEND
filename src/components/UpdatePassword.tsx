import { Lock, X, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { ChangePasswordProps } from "../interfaces/data.interfaces";
import { validatePassword } from "../utils/validator";
import { resetPassword } from "../api/Api";
import { toast } from "sonner";

const ChangePassword: React.FC<ChangePasswordProps> = ({ handleClose }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    const trimmedConfirmPassword = formData.confirmPassword.trim();
    const trimmedNewPassword = formData.newPassword.trim();
    const trimmedCurrentPassword = formData.currentPassword.trim();
    const confirmPasswordValidate = validatePassword(trimmedConfirmPassword);
    const currentPasswordValidate = validatePassword(trimmedCurrentPassword);
    const newPasswordValidate = validatePassword(trimmedNewPassword);
    if (currentPasswordValidate) {
      newErrors.currentPassword = currentPasswordValidate;
    } else if (newPasswordValidate) {
      newErrors.newPassword = newPasswordValidate;
    } else if (confirmPasswordValidate) {
      newErrors.confirmPassword = confirmPasswordValidate;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const { confirmPassword, ...data } = formData;
        const response = await resetPassword(data);
        if (response.data?.status) {
          toast.success(response.data?.message);
          handleClose();
          setFormData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message?.message);
      }
    }
  };

  return (
    <div className="fixed inset-0  bg-transparent backdrop-blur flex items-center justify-center z-50 p-4">
      <div
        className="bg-gradient-to-br from-sky-50 to-white rounded-xl drop-shadow-[0_0_10px_rgba(0,0,0,0.15)] w-full max-w-md
"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Reset Password
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-5 h-5 cursor-pointer" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                id="currentPassword"
                value={formData.currentPassword}
                onChange={(e) =>
                  handleInputChange("currentPassword", e.target.value)
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10 ${
                  errors.currentPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.currentPassword}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                value={formData.newPassword}
                onChange={(e) =>
                  handleInputChange("newPassword", e.target.value)
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10 ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Confirm your new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>
           <div className="text-sm text-gray-500 mt-2 ml-1 mb-5">
              Password must include:
              <ul className="list-disc list-inside ml-2">
                <li>At least 8 characters</li>
                <li>One uppercase letter (A-Z)</li>
                <li>One lowercase letter (a-z)</li>
                <li>One number (0-9)</li>
                <li>One special character (!@#$...)</li>
              </ul>
            </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 cursor-pointer"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
