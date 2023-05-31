import { Button as ButtonUI } from '@material-tailwind/react';
import type { ButtonProps } from '@/types/button';

const Button: React.FC<ButtonProps> = ({ text }) => {
  // const handleClick = (e: any) => {
  //   console.log('e:', e);
  // };
  return (
    // <ButtonUI className="my-9" onClick={(e: any) => handleClick(e)}>
    //   {text}
    // </ButtonUI>
    <button className="my-9">{text}</button>
  );
};

export default Button;
