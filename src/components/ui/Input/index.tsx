import { lazy, Suspense } from 'react';

import Label from '@/components/ui/common/Label';
import type { InputProps } from '@/types/input';
const DateInput = lazy(() => import('@/components/ui/DatePicker'));

const Input: React.FC<InputProps> = ({
  label,
  name,
  type,
  value,
  onChange,

  ...props
}) => {
  let content;
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
  } else if (type === 'text' || type === 'number') {
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
  } else if (type === 'select') {
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
  } else if (type === 'search') {
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
  return <>{content}</>;
};

export default Input;
