/**
 * Form component
 *
 * @module components/Form
 */

import { useContext, useMemo, useState } from 'react';
import { FormContext } from '@/context/FormContext';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/common/Button';
import { Modal } from 'modal-react-epok974';
import type { Employee } from '@/types/employee';
import type { FormProps } from '@/types/form';

/**
 * Form Component
 *
 * @component
 *
 * @param {object} formFields - the fields of the form
 *
 * @returns {React.Element} - Form component rendered
 */
const Form: React.FC<FormProps> = ({ formFields }) => {
  const { addEmployee } = useContext(FormContext);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [employee, setEmployee] = useState<Employee & Record<string, any>>({});

  /**
   * Handle the change of form inputs
   *
   * @param {any} e - event object
   * @param {string} label - label of the input field
   */
  const handleChange = (e: any, label: string) => {
    let name: string = label;
    let value: string | React.FormEvent;
    if (label === 'birthday' || label === 'start') {
      value = e;
    } else {
      value = e.target.value;
    }
    setEmployee((values) => ({ ...values, [name]: value }));
  };

  /**
   * Handle the submission of the form
   *
   * @param {React.FormEvent} e - event object
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    addEmployee(employee);
    // @ts-ignore
    handleModal(e);
  };

  /**
   * Handle closing of the modal
   *
   * @param {any} e - event object
   */
  const handleCloseModal = (e: any) => {
    e.preventDefault();
    console.log('e:', e);
    setOpenModal(false);
  };

  /**
   * Handle opening of the modal
   *
   * @param {any} e - event object
   */
  const handleModal = (e: any) => {
    e.stopPropagation();
    setOpenModal(true);
  };

  /**
   * Create form fields
   */
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
        <Modal
          width="700"
          height="100"
          open={openModal}
          handleCloseModal={handleCloseModal}
          handleModal={handleModal}
        >
          Employee Saved!
        </Modal>
      </form>
    </>
  );
};
export default Form;
