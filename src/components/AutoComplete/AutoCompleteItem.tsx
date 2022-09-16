import React from "react";
import { FilterDataInput, FilterDataOutput } from "../../lib/filterDataByQuery";
import "./AutoCompleteItem.css";

export interface AutoCompleteProps {
  item: FilterDataOutput<FilterDataInput>;
  onClick: () => void;
}

const AutoCompleteItem = ({
  item,
  onClick,
}: AutoCompleteProps): React.ReactElement => {
  return (
    <div onClick={onClick} className="auto-complete__item" tabIndex={0}>
      {item.value?.split("").map((char, i) => (
        <span
          style={{
            color:
              i >= (item.startMatchIndex ?? -1) &&
              i <= (item.endMatchIndex ?? -1)
                ? "green"
                : "black",
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default AutoCompleteItem;
