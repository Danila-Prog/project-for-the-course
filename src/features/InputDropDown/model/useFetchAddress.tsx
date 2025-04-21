import { Dispatch, SetStateAction } from "react";
import { TSelectedOption } from "../lib/types";
import { GroupBase, OptionsOrGroups } from "react-select";

export default function useFetchAddress(
  setSelectedOption: Dispatch<SetStateAction<string | null>>
) {
  const fetchAddress = async (
    inputValue: string,
    callback: (
      options: OptionsOrGroups<TSelectedOption, GroupBase<TSelectedOption>>
    ) => void
  ): Promise<OptionsOrGroups<TSelectedOption, GroupBase<TSelectedOption>>> => {
    try {
      setSelectedOption(inputValue);

      const fetchingData = await fetch(String(process.env.URL_ADDRESS), {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Token " + process.env.TOKEN,
        },
        body: JSON.stringify({ query: inputValue }),
      });

      const res = await fetchingData.json();

      const options: OptionsOrGroups<
        TSelectedOption,
        GroupBase<TSelectedOption>
      > = res.suggestions;

      callback(options);

      return options;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("error", error);
        const emptyOptions: OptionsOrGroups<
          TSelectedOption,
          GroupBase<TSelectedOption>
        > = [];
        callback(emptyOptions);
        return emptyOptions;
      }
      const emptyOptions: OptionsOrGroups<
        TSelectedOption,
        GroupBase<TSelectedOption>
      > = [];
      callback(emptyOptions);
      return emptyOptions;
    }
  };

  return fetchAddress;
}
