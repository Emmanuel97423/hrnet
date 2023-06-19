/**
 * Form component
 *
 * @module components/Form
 */

import { useContext, useState } from 'react';
import { FormContext } from '@/context/FormContext';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/common/Button';
import { Modal } from 'modal-react-epok974';
import type { Employee } from '@/types/employee';
import type { FormProps } from '@/types/form';
import * as yup from 'yup';

type ActionResult = {
  message: string;
  error: number;
};

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
  const [modalMessage, setModalMessage] = useState<string>('');
  const [employee, setEmployee] = useState<Employee & Record<string, any>>({});
  // New state for validation errors
  const [errors, setErrors] = useState({});
  // Function to set error message and clear it after 3 seconds
  const setErrorMessage = (path: string, message: string) => {
    setErrors({ ...errors, [path]: message });
    setTimeout(() => {
      setErrors({ ...errors, [path]: '' });
    }, 3000);
  };

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
  // Build an object with validation rules for each field
  const validationRules = [...formFields].reverse().reduce((rules, field) => {
    const fieldName = field.label.toLowerCase().replace(' ', '');

    return {
      ...rules,
      [fieldName]: yup.string().required(`Champs requis`)
    };
  }, {});

  // Create validation schema based on formFields
  let validationSchema = yup.object().shape(validationRules);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    e.preventDefault();

    try {
      // Try to validate the form data against the schema
      await validationSchema.validate(employee);
      // If successful, add employee
      try {
        // @ts-ignore

        const result: ActionResult = addEmployee(employee);
        if (result.error == 1) {
          setModalMessage(`${result.message}`);
          handleModal(e);
          return;
        }
        setEmployee({});
        setModalMessage(`${result.message}`);
        handleModal(e);
      } catch (error) {
        console.log('error:', error);
      }
    } catch (err) {
      // If validation fails, update errors state
      // @ts-ignore
      setErrorMessage(err.path, err.message);
    }
  };

  /**
   * Handle closing of the modal
   *
   * @param {any} e - event object
   */
  const handleCloseModal = (e: any) => {
    e.preventDefault();
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
  const fields = formFields.map((field: any, index: number) => {
    const fieldName: string = field.label.toLowerCase().replace(' ', '');

    return (
      <Input
        key={index}
        name={field.label.toLowerCase().replace(' ', '')}
        label={field.label}
        type={field.type}
        placeholder={field.placeholder}
        options={field?.options}
        onChange={(e) => {
          handleChange(e, fieldName);
        }}
        value={employee[field.label.toLowerCase().replace(' ', '')] || ''}
        // @ts-ignore
        error={errors[fieldName]} // Pass down the error
      />
    );
  });

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
          {modalMessage}
        </Modal>
      </form>
    </>
  );
};
export default Form;
