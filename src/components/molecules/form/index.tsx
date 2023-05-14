import { useContext } from 'react';
import FormContext from '@/context/FormContext';
import type { FormProps } from '@/types/form';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const Form: React.FC<FormProps> = ({
  formFields,
  onSubmit
  // handleOnChange
}) => {
  const { handleSubmit } = useContext(FormContext);
  const fields = formFields.map((field: any, index: number) => (
    <Input
      key={index}
      label={field.label}
      type={field.type}
      placeholder={field.placeholder}
      options={field?.options}
      // onChange={(e) => {
      //   handleOnChange(e, field.label);
      // }}
    />
  ));

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
