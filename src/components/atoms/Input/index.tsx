import { Input as InputUI } from '@material-tailwind/react';
import { InputProps } from '@/types/input';

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange
}) => {
  return (
    <InputUI
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
