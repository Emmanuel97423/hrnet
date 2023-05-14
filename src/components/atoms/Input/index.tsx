import { useState, useContext } from 'react';
import { Input as InputUI } from '@material-tailwind/react';
import FormContext from '@/context/FormContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { InputProps } from '@/types/input';

const Input: React.FC<InputProps> = ({ label, type, value, ...props }) => {
  const { formData, setFormData, handleOnChange } = useContext(FormContext);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  let content;
  if (type === 'date') {
    content = (
      <div className="my-2">
        <label>{label}</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setFormData({
              ...formData,
              [label.toLowerCase().replace(/\s/g, '')]: date
            });
          }}
          className="border-2 border-gray-300 rounded-md p-2 w-full"
        />
      </div>
    );
  } else if (type === 'text' || type === 'number') {
    content = (
      <div className="my-2">
        <label>{label}</label>
        <InputUI
          type={type}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(e, label)
          }
        />
      </div>
    );
  } else if (type === 'select') {
    content = (
      <>
        <label>{label}</label>
        <select className="p-2" onChange={(e: any) => handleOnChange(e, label)}>
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
