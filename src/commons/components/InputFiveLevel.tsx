import InputButtonGroup from "./InputButtonGroup";

type Props = {
  label: string;
  value: number;
  onChange: (newValue: number) => void;
};

const InputFiveLevel: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <InputButtonGroup
      label={label}
      options={[1, 2, 3, 4, 5]}
      value={value}
      helpText="Low"
      helpTextEnd="High"
      onChange={(newValue) => {
        onChange(newValue);
      }}
    />
  );
};

export default InputFiveLevel;
