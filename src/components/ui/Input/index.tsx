import { useContext, lazy, Suspense } from 'react';
import { Input as InputUI } from '@material-tailwind/react';
import FormContext from '@/context/FormContext';
import Label from '@/components/ui/common/Label';
import type { InputProps } from '@/types/input';
const DateInput = lazy(() => import('@/components/ui/DatePicker'));

const Input: React.FC<InputProps> = ({ label, type, value, ...props }) => {
  const { formData, setFormData, setSearch, handleSearchChange } =
    useContext(FormContext);
  const handleInputChange = (e: any) => {
    // handleOnChange(e)
    setFormData({
      ...formData,
      [label.toLowerCase().replace(/\s/g, '')]: e.target.value
    });
  };
  const searchChangeTest = (e: any) => {
    console.log('e:', e.target.value);
    e.preventDefault();
    setSearch(e.target.value);
    handleSearchChange(e.target.value);
    console.log('setSearch:', setSearch);
  };

  let content;
  if (type === 'date') {
    content = (
      <Suspense fallback={<div>Loading...</div>}>
        <div className="my-2">
          <Label text={label} />
          <DateInput label={label} />
        </div>
      </Suspense>
    );
  } else if (type === 'text' || type === 'number') {
    content = (
      <Suspense fallback={<div>Loading...</div>}>
        <div className="my-2">
          <Label text={label} />
          <InputUI type={type} value={value} onChange={handleInputChange} />
        </div>
      </Suspense>
    );
  } else if (type === 'select') {
    content = (
      <>
        <Label text={label} />
        <select className="p-2" onChange={handleInputChange}>
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
          onChange={searchChangeTest}
        />
      </div>
    );
  }
  return <>{content}</>;
};

export default Input;
