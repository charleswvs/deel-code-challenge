import { useState } from "react";
import { fetchUsers } from "./api/users";
import "./App.css";
import AutoComplete from "./components/AutoComplete/AutoComplete";
import { FilterDataInput } from "./lib/filterDataByQuery";

const options = [
  { id: 1, value: "apples" },
  { id: 2, value: "banana" },
  { id: 3, value: "cherry" },
  { id: 4, value: "watermelon" },
  { id: 5, value: "peach" },
  { id: 6, value: "pumpkin" },
  { id: 7, value: "tomato" },
  { id: 8, value: "café" },
];

function App() {
  const [selectedItem, setSelectedItem] = useState<FilterDataInput>();

  const onSelect = (item: FilterDataInput) => {
    setSelectedItem(item);
  };

  const fetchOptions = async (): Promise<FilterDataInput[]> => {
    const users = await fetchUsers();

    return users.map((user) => ({
      ...user,
      value: user.name,
    }));
  };

  return (
    <div className="App">
      <AutoComplete
        onSelect={onSelect}
        fetchOptions={fetchOptions}
        selectedItem={selectedItem}
      />
    </div>
  );
}

export default App;
