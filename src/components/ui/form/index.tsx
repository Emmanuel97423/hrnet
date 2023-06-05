import { useContext, useMemo, useState } from 'react';
import { FormContext } from '@/context/FormContext';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/common/Button';
import { Modal } from 'modal-react-epok974';
import type { Employee } from '@/types/employee';
import type { FormProps } from '@/types/form';

const Form: React.FC<FormProps> = ({ formFields }) => {
  const { addEmployee } = useContext(FormContext);
  const [employee, setEmployee] = useState<Employee & Record<string, any>>({});

  const handleChange = (e: any, label: string) => {
    let name: string = label;
    let value: string;
    if (label === 'birthday' || label === 'start') {
      value = e;
    } else {
      value = e.target.value;
    }
    setEmployee((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // @ts-ignore
    addEmployee(employee);
  };

  const fields = formFields.map((field: any, index: number) =>
    useMemo<JSX.Element>(() => {
      return (
        <Input
          key={index}
          name={field.label.toLowerCase().replace(' ', '')}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          options={field?.options}
          onChange={(e) => {
            handleChange(e, field.label.toLowerCase().replace(' ', ''));
          }}
        />
      );
    }, [employee[field.label.toLowerCase().replace(' ', '')]])
  );

  return (
    <>
      <form
        className="flex flex-col justify-around"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {fields}
        <Button type="submit" text="Submit" color="red" />
        <Modal width="100" height="100" open={false}>
          Content Modal
        </Modal>
      </form>
    </>
  );
};
export default Form;
