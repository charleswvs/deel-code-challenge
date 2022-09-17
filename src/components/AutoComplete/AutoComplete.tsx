import React, { useCallback, useEffect, useRef, useState } from "react";
import filterDataByQuery, {
  FilterDataInput,
  FilterDataOutput,
} from "../../lib/filterDataByQuery";
import AutoCompleteItem from "./AutoCompleteItem";
import "./AutoComplete.css";

export interface AutoCompleteProps {
  fetchOptions: () => Promise<FilterDataInput[]>;
  onSelect: (item: FilterDataInput) => void;
  selectedItem?: FilterDataInput;
}

const AutoComplete = ({
  fetchOptions,
  onSelect,
  selectedItem,
}: AutoCompleteProps): React.ReactElement => {
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();
  const lastRequest = useRef<string>();
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<FilterDataOutput<FilterDataInput>[]>(
    []
  );
  const [isFetching, setIsFetching] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | number>();

  const filterData = useCallback(
    async (value: string) => {
      lastRequest.current = value;
      const options = await fetchOptions();

      if (!value.length) {
        return options;
      }
      return filterDataByQuery(options, value);
    },
    [fetchOptions]
  );

  useEffect(() => {
    clearTimeout(debounceTimeoutRef.current);
    const isValueSelected = selectedItem && selectedItem?.id === selectedItemId;

    if (!isValueSelected) {
      setIsFetching(true);

      debounceTimeoutRef.current = setTimeout(async () => {
        const results = await filterData(inputValue);
        if (lastRequest.current !== inputValue) return;

        setIsFetching(false);
        setResults(results);
      }, 400);
    }
  }, [filterData, inputValue, selectedItem, selectedItemId]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setInputValue(event.target.value);
    setSelectedItemId(undefined);
  };

  const handleSelectItem = (item: FilterDataOutput<FilterDataInput>) => {
    setInputValue(item.value || "");
    setResults([]);
    setSelectedItemId(item.id);
    onSelect(item);
  };

  return (
    <div>
      <input
        onChange={handleInputChange}
        value={inputValue}
        placeholder="Start typing..."
        className="auto-complete__input"
      />
      {isFetching ? (
        <div className="auto-complete__items-container">
          <span className="auto-complete__loading">loading...</span>
        </div>
      ) : (
        !!results.length && (
          <div className="auto-complete__items-container">
            {results.map((item) => (
              <AutoCompleteItem
                key={item.id}
                onClick={() => handleSelectItem(item)}
                item={item}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default AutoComplete;
