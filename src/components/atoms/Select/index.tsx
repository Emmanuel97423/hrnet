type SelectProps = {
  options: Option[];
  label: string;
};
type Option = {
  name: string;
  abbreviation: string;
};
const Select: React.FC<SelectProps> = ({ options, ...props }) => {
  return (
    <>
      <label>{props.label}</label>
      <select {...props} className="p-2">
        {options.map((option) => (
          <option key={option.abbreviation} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
};
export default Select;
