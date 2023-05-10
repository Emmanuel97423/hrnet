import { useState } from 'react';
import { Input as InputUI } from '@material-tailwind/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { InputProps } from '@/types/input';

const Input: React.FC<InputProps> = ({ label, type, value, onChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  let content: JSX.Element;
  if (type === 'date') {
    content = (
      <div className="my-2">
        <label>{label}</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="border-2 border-gray-300 rounded-md p-2 w-full"
        />
      </div>
    );
  } else {
    content = (
      <div className="my-2">
        <label>{label}</label>
        <InputUI type={type} value={value} onChange={onChange} />
      </div>
    );
  }
  return <>{content}</>;
};

export default Input;
