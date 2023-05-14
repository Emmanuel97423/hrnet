import { useContext } from 'react';
import FormContext from '@/context/FormContext';
import { Button as ButtonUI } from '@material-tailwind/react';
import type { ButtonProps } from '@/types/button';

const Button: React.FC<ButtonProps> = ({ text, onSubmit }) => {
  const { handleSubmit } = useContext(FormContext);
  return (
    <ButtonUI className="my-9" onClick={(e: any) => handleSubmit(e)}>
      {text}
    </ButtonUI>
  );
};

export default Button;
