import { useDebouncedCallback } from "@/shared/hooks";
import { TSelectedOption } from "../lib/types";
import { GroupBase, OptionsOrGroups } from "react-select";

export default function useFetchAddress(
  setSelectedOption: (val: string) => void,
) {
  const fetchAddress = async (
    inputValue: string,
    callback: (
      options: OptionsOrGroups<TSelectedOption, GroupBase<TSelectedOption>>,
    ) => void,
  ): Promise<OptionsOrGroups<TSelectedOption, GroupBase<TSelectedOption>>> => {
    try {
      setSelectedOption(inputValue);

      const fetchingData = await fetch(
        "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Token " + process.env.TOKEN,
          },
          body: JSON.stringify({ query: inputValue }),
        },
      );

      const res = await fetchingData.json();
      const options = res.suggestions as OptionsOrGroups<
        TSelectedOption,
        GroupBase<TSelectedOption>
      >;

      callback(options);
      return options;
    } catch {
      const empty: OptionsOrGroups<
        TSelectedOption,
        GroupBase<TSelectedOption>
      > = [];
      callback(empty);
      return empty;
    }
  };

  return useDebouncedCallback(fetchAddress, 400);
}
