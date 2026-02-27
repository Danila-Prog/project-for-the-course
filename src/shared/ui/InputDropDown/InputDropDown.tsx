import { ReactElement } from "react";
import AsyncSelect from "react-select/async";
import useFetchAddress from "./model/useFetchAddress";

type TSelectedOption = {
  value: string;
  data: { id: number };
};

interface IInputDropDown {
  idInputDropDown?: string;
  selectedOption?: string;
  setSelectedOption: (val: string) => void;
  placeholder: string;
  label: ReactElement;
}

export default function InputDropDown({
  idInputDropDown,
  selectedOption,
  setSelectedOption,
  placeholder,
  label,
}: IInputDropDown) {
  const fetchAddress = useFetchAddress(setSelectedOption);

  return (
    <div>
      {label}

      <AsyncSelect
        inputId={idInputDropDown}
        cacheOptions
        isClearable
        value={
          selectedOption ? { value: selectedOption, data: { id: 0 } } : null
        }
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
        onChange={(val) => setSelectedOption(val?.value ?? "")}
        placeholder={placeholder}
      />
    </div>
  );
}
