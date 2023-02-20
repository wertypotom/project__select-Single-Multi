import React from "react";
import { SelectOptions } from "../../types/TSelect";
import style from "./Select.module.css";

type Props = {
    onChange: (value: SelectOptions | undefined) => void;
    options: SelectOptions[];
    value?: SelectOptions;
};

const Select = ({ onChange, options, value }: Props) => {
    return (
        <div tabIndex={0} className={style.container}>
            {/* tabIndex required to make a div focused. Focus styles are in a stylesheet */}
            <span className={style.value}>{value?.label}</span>
            <button className={style.closeBtn}>&times;</button>
            <div className={style.devider}></div>
            <div className={style.caret}></div>

            <ul className={`${style.options}`}>
                {options.map((option) => (
                    <li className={style.option} key={option.label}>
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Select;
