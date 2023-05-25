import { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormContext from '@/context/FormContext';

type DatePickerProps = {
  label: string;
  selected?: string;
  onChange?: (e: any, date: Date | null) => void;
};

const DateInput: React.FC<DatePickerProps> = ({ label }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const { formData, setFormData } = useContext(FormContext);

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
        selected={startDate}
        onChange={(date) => {
          // useCallback(()=>{}, [date]);
          // handleOnChange(date, label);
          setStartDate(date);
          setFormData({
            ...formData,
            [label.toLowerCase().replace(/\s/g, '')]: dateConverter(date)
          });
        }}
        className="border-2 border-gray-300 rounded-md p-2 w-full"
      />
    </>
  );
};

export default DateInput;
