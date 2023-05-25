import { useContext, useMemo, useState } from 'react';
import FormContext from '@/context/FormContext';
import type { FormProps } from '@/types/form';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/common/Button';

const Form: React.FC<FormProps> = ({ formFields }) => {
  const { handleSubmit, formData } = useContext(FormContext);

  const fields = formFields.map((field: any, index: number) =>
    useMemo<JSX.Element>(() => {
      return (
        <Input
          key={index}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          options={field?.options}
        />
      );
    }, [formData])
  );

  return (
    <form
      className="flex flex-col justify-around"
      onSubmit={(e) => {
        handleSubmit(e);
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
