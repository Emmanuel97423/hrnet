import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type DatePickerProps = {
  label: string;
  selected?: string;
  onChange: (value: any) => void;
};

const DateInput: React.FC<DatePickerProps> = ({ label, onChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const dateConverter = (date: any) => {
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();

    let formattedDate = month + '/' + day + '/' + year;
    return formattedDate;
  };

  return (
    <>
      {' '}
      <DatePicker
        name={label.toLocaleLowerCase().replace(' ', '')}
        selected={startDate}
        onChange={(date: any) => {
          onChange(dateConverter(date));

          setStartDate(date);
        }}
        className="border-2 border-gray-300 rounded-md p-2 w-full"
      />
    </>
  );
};

export default DateInput;
