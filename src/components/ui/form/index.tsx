import { useContext, useMemo } from 'react';
import FormContext from '@/context/FormContext';
import type { FormProps } from '@/types/form';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/common/Button';

const Form: React.FC<FormProps> = ({ formFields }) => {
  const { handleSubmit, handleOnChange } = useContext(FormContext);
  const fields = useMemo<JSX.Element[]>(() => {
    return formFields.map((field: any, index: number) => (
      <Input
        key={index}
        label={field.label}
        type={field.type}
        placeholder={field.placeholder}
        options={field?.options}
        // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        //   handleOnChange(e, field.label)
        // }
      />
    ));
  }, [formFields]);

  return (
    <form
      className="flex flex-col justify-around"
      onSubmit={() => {
        handleSubmit;
      }}
    >
      {fields}
      <Button
        type="submit"
        text="Submit"
        color="red"
        onClick={() => {
          handleSubmit;
        }}
      />
    </form>
  );
};
export default Form;
