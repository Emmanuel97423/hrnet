import { useState, useContext, useCallback, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormContext from '@/context/FormContext';

type DatePickerProps = {
  label: string;
  selected?: string;
  onChange?: (e: any, date: Date | null) => void;
};

const DateInput: React.FC<DatePickerProps> = ({ label, ...props }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const { formData, setFormData, handleOnChange } = useContext(FormContext);

  const datePickerExpect = useMemo(() => {
    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          // useCallback(()=>{}, [date])
          // handleOnChange(date, label);
          setStartDate(date);
          setFormData({
            ...formData,
            [label.toLowerCase().replace(/\s/g, '')]: date
          });
        }}
        className="border-2 border-gray-300 rounded-md p-2 w-full"
      />
    );
  }, [startDate]);
  return (
    <>
      {' '}
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          // useCallback(()=>{}, [date])
          // handleOnChange(date, label);
          setStartDate(date);
          setFormData({
            ...formData,
            [label.toLowerCase().replace(/\s/g, '')]: date
          });
        }}
        className="border-2 border-gray-300 rounded-md p-2 w-full"
      />
    </>
  );
};

export default DateInput;
