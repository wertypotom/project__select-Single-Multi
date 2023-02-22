import { useState } from "react";
import { SelectOptions } from "./types/TSelect";
import Select from "./UI/Select/Select";

const options: SelectOptions[] = [
    {
        value: 1,
        label: "first",
    },
    {
        value: 2,
        label: "Second",
    },
    {
        value: 3,
        label: "Third",
    },
    {
        value: 4,
        label: "Fourth",
    },
    {
        value: 5,
        label: "Fifth",
    },
];

function App() {
    const [value, setValue] = useState<SelectOptions | undefined>(options[0]);
    const [values, setValues] = useState<SelectOptions[]>([]);

    return (
        <>
            <Select
                value={value}
                options={options}
                onChange={(option) => setValue(option)}
            />
            <br></br>
            <Select
                multiple
                value={values}
                options={options}
                onChange={(option) => setValues(option)}
            />
        </>
    );
}

export default App;
