import { useContext, useCallback } from 'react';
import { Input as InputUI } from '@material-tailwind/react';
import FormContext from '@/context/FormContext';

import DateInput from '@/components/ui/DatePicker';
import Label from '@/components/ui/common/Label';
import type { InputProps } from '@/types/input';

const Input: React.FC<InputProps> = ({ label, type, value, ...props }) => {
  console.log('label:', label);
  const { formData, setFormData, handleOnChange } = useContext(FormContext);
  console.log('props:', props);
  const handleInputChange = useCallback(
    (e: any) => {
      setFormData({
        ...formData,
        [label.toLowerCase().replace(/\s/g, '')]: e.target.value
      });
    },
    [label]
  );

  let content;
  if (type === 'date') {
    content = (
      <div className="my-2">
        <Label text={label} />
        <DateInput label={label} />
      </div>
    );
  } else if (type === 'text' || type === 'number') {
    content = (
      <div className="my-2">
        <Label text={label} />
        <InputUI type={type} value={value} onChange={handleInputChange} />
      </div>
    );
  } else if (type === 'select') {
    content = (
      <>
        <Label text={label} />

        <select className="p-2" onChange={handleInputChange}>
          <option value="">Select {label}</option>
          {props.options?.map((option) => (
            <option key={option.abbreviation} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </>
    );
  }
  return <>{content}</>;
};

export default Input;
