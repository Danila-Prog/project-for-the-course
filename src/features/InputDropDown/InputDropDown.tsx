import { Dispatch, ReactElement, SetStateAction } from "react";
import AsyncSelect from "react-select/async";
import useFetchAddress from "./model/useFetchAddress";

type TSelectedOption = {
  value: string;
  data: { id: number };
};

interface IInputDropDown {
  idInputDropDown?: string;
  setSelectedOption: Dispatch<SetStateAction<string | null>>;
  placeholder: string;
  label: ReactElement;
}
export default function InputDropDown({
  idInputDropDown,
  setSelectedOption,
  placeholder,
  label,
}: IInputDropDown) {
  const fetchAddress = useFetchAddress(setSelectedOption);
  const handleChange = (selectedOption: TSelectedOption | null) =>
    selectedOption ? setSelectedOption(selectedOption.value) : null;

  return (
    <div>
      {label}

      <AsyncSelect
        inputId={idInputDropDown}
        cacheOptions
        isClearable
        styles={{
          control: (styles) => ({
            ...styles,
            border: "2px solid #d6d6d6",
            borderRadius: "10px",
            boxShadow: "none",
            ":hover": {
              border: "2px solid #d6d6d6",
            },
            fontSize: "16px",
          }),
        }}
        loadOptions={fetchAddress}
        getOptionLabel={(option) => option.value}
        getOptionValue={(option: TSelectedOption) =>
          option.value && String(option.value)
        }
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
}
