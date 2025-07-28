import type { ButtonProps } from "../interfaces/data.interfaces";


const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  onClick,
  disabled,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseClasses = "px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-sky-600 text-white hover:bg-sky-700 disabled:bg-sky-300",
    secondary: "bg-white text-sky-600 border-2 border-sky-600 hover:bg-sky-50 disabled:bg-gray-100 disabled:text-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300"
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button