import { useState } from "react";
import { fetchUsers } from "./api/users";
import "./App.css";
import AutoComplete from "./components/AutoComplete/AutoComplete";
import { FilterDataInput } from "./lib/filterDataByQuery";

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
