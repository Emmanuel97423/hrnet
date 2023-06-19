/**
 * @module components/Input
 * @category Components
 */

import { lazy, Suspense } from 'react';

import Label from '@/components/ui/common/Label';
import type { InputProps } from '@/types/input';

// Lazy load DateInput component
const DateInput = lazy(() => import('@/components/ui/DatePicker'));

/**
 * Input component
 *
 * @component
 * @param {InputProps} props - Input properties
 * @param {string} props.label - Label of the input field
 * @param {string} props.name - Name of the input field
 * @param {string} props.type - Type of the input field
 * @param {string} props.value - Value of the input field
 * @param {(value: any) => void} props.onChange - Function to be called when value is changed
 *
 * @example
 * return <Input label="MyLabel" name="myName" type="text" value="myValue" onChange={myOnChangeFunction} />
 *
 * @returns {JSX.Element} Input component JSX
 */
const Input: React.FC<InputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  ...props
}) => {
  // variable to hold the JSX content based on the type of input
  let content;

  // case for date input
  if (type === 'date') {
    content = (
      <Suspense fallback={<div>Loading...</div>}>
        <div className="my-2">
          <Label text={label} />
          {/* @ts-ignore */}
          <DateInput
            name={label.toLocaleLowerCase().replace('', ' ')}
            label={label}
            // @ts-ignore
            onChange={onChange}
          />
        </div>
      </Suspense>
    );
  }
  // case for text or number input
  else if (type === 'text' || type === 'number') {
    content = (
      <Suspense fallback={<div>Loading...</div>}>
        <div className="my-2 flex flex-col ">
          <Label text={label} />
          <input
            type={type}
            name={label}
            value={value}
            onChange={onChange}
            className="border-2 border-gray-300 rounded-md p-2 w-full"
          />
        </div>
      </Suspense>
    );
  }
  // case for select input
  else if (type === 'select') {
    content = (
      <>
        <Label text={label} />
        <select
          className="border-2 border-gray-300 rounded-md p-2 w-full"
          name={label.toLocaleLowerCase().replace(' ', '')}
          onChange={onChange}
        >
          <option value="">Select {label}</option>
          {props.options?.map((option) => (
            <option key={option.abbreviation} value={option.abbreviation}>
              {option.name}
            </option>
          ))}
        </select>
      </>
    );
  }
  // case for search input
  else if (type === 'search') {
    content = (
      <div className="flex items-center ">
        <Label text={label} />:
        <input
          type="search"
          className="border-2 border-black ml-2 outline-none p-1"
        />
      </div>
    );
  }

  return (
    <>
      {content}
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </>
  );
};

export default Input;
