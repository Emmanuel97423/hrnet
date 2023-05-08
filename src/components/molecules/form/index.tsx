import { FormProps } from '@/types/form';
import Input from '@/components/atoms/Input';
const Form: React.FC<FormProps> = () => {
  return (
    <div>
      <Input label="FirstName" type="text" placeholder="First name" />
      <Input label="Lastname" type="text" placeholder="Last Name" />
    </div>
  );
};
export default Form;
