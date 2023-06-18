/**
 * @module components/DateInput
 * @category Components
 */

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * DatePickerProps is an object type.
 * @typedef {Object} DatePickerProps
 * @property {string} label - The label for the DatePicker.
 * @property {string} [selected] - The initially selected date.
 * @property {(value: any) => void} onChange - Handler for onChange event.
 */

/**
 * DateInput component
 *
 * @component
 * @param {DatePickerProps} props - DateInput properties
 * @param {string} props.label - Label of the date picker
 * @param {(value: any) => void} props.onChange - Function to be called when date is changed
 *
 * @example
 * return <DateInput label="MyLabel" onChange={myOnChangeFunction} />
 *
 * @returns {JSX.Element} DateInput component JSX
 */

type DatePickerProps = {
  label: string;
  selected?: string;
  onChange: (value: any) => void;
};

const DateInput: React.FC<DatePickerProps> = ({ label, onChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  /**
   * Converts the Date object to string format MM/DD/YYYY
   *
   * @function
   * @param {Date} date - The date to be converted
   * @returns {string} - The date string in the format MM/DD/YYYY
   */
  const dateConverter = (date: any): string => {
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();

    let formattedDate = month + '/' + day + '/' + year;
    return formattedDate;
  };

  return (
    <>
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
