import type { ButtonProps } from '@/types/button';

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="my-9 w-full text-white p-2 bg-black border-2 rounded-md  outline-none"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
