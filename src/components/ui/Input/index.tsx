import { useContext, lazy, Suspense } from 'react';
import { Input as InputUI } from '@material-tailwind/react';
import { FormContext } from '@/context/FormContext';
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
  // const { formData, setFormData, setSearch, handleSearchChange } =
  //   useContext(FormContext);
  // const handleInputChange = (e: any) => {
  //   // handleOnChange(e)
  //   setFormData({
  //     ...formData,
  //     [label.toLowerCase().replace(/\s/g, '')]: e.target.value
  //   });
  // };
  // const searchChangeTest = (e: any) => {
  //   console.log('e:', e.target.value);
  //   e.preventDefault();
  //   setSearch(e.target.value);
  //   handleSearchChange(e.target.value);
  //   console.log('setSearch:', setSearch);
  // };

  // const handleChange = (e: any) => {
  //   console.log('e:', e);
  // };

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
        <div className="my-2">
          <Label text={label} />
          <input type={type} name={label} value={value} onChange={onChange} />
        </div>
      </Suspense>
    );
  } else if (type === 'select') {
    content = (
      <>
        <Label text={label} />
        <select
          className="p-2"
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
