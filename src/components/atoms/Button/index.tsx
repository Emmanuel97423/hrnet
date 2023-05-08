import { ButtonProps } from '@/types/button';
import { Button as ButtonUI } from '@material-tailwind/react';

const Button: React.FC<ButtonProps> = ({ text }) => {
  return <ButtonUI>{text}</ButtonUI>;
};

export default Button;
