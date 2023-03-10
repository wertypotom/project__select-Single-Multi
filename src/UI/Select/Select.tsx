import { useState, MouseEvent, useEffect, useRef } from "react";
import { SelectOptions } from "../../types/TSelect";
import style from "./Select.module.css";

type SingleSelectProps = {
    multiple?: false;
    onChange: (value: SelectOptions | undefined) => void;
    value?: SelectOptions;
};

type MultiSelectProps = {
    multiple: true;
    onChange: (value: SelectOptions[]) => void;
    value: SelectOptions[];
};

type Props = {
    options: SelectOptions[];
} & (MultiSelectProps | SingleSelectProps);

const Select = ({ multiple, onChange, options, value }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoverIndex, setHoverIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) setHoverIndex(0);
    }, [isOpen]);

    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (event.target !== containerRef.current) return;

            if (event.code === "Space") {
                setIsOpen(!isOpen);
            }

            if (event.code === "Escape") {
                setIsOpen(false);
            }

            if (event.code === "Enter") {
                const option = options[hoverIndex];

                if (multiple) {
                    if (!value.includes(option)) {
                        onChange([...value, option]);
                    }
                } else {
                    onChange(option);
                    setIsOpen(false);
                }
            }

            if (event.code === "ArrowDown") {
                if (hoverIndex < options.length - 1) {
                    setHoverIndex((prev) => prev + 1);
                }
            }

            if (event.code === "ArrowUp") {
                if (hoverIndex > 0) {
                    setHoverIndex((prev) => prev - 1);
                }
            }
        };

        containerRef.current?.addEventListener("keydown", handler);

        return () => {
            containerRef.current?.removeEventListener("keydown", handler);
        };
    }, [isOpen, hoverIndex]);

    const clearOptions = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        multiple ? onChange([]) : onChange(undefined);
    };

    const selectOption = (
        e: MouseEvent<HTMLElement>,
        option: SelectOptions
    ) => {
        e.stopPropagation();

        if (multiple) {
            if (value.includes(option)) {
                // if value already selected
                // remove value once clicked on it second time
                onChange(value.filter((v) => v !== option));
            } else {
                // add new value to array of values
                onChange([...value, option]);
            }
        } else {
            if (option !== value) {
                onChange(option);
                setIsOpen(false);
            }
        }
    };

    const isOptionSelected = (option: SelectOptions) => {
        // for multiples we highlight all chosen elements. For single only that currently selected
        return multiple ? value.includes(option) : option === value;
    };

    const getSelectedOptions = () => {
        return multiple
            ? value.map((v) => (
                  <button
                      onClick={(event) => selectOption(event, v)}
                      key={v.value}
                      className={style.optionBadge}
                  >
                      {v.label}
                      <span className={style.closeBtn}>&times;</span>
                  </button>
              ))
            : value?.label;
    };

    return (
        <div
            ref={containerRef}
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(!isOpen)}
            tabIndex={0}
            className={style.container}
        >
            {/* tabIndex required to make a div focused. Focus styles are in a stylesheet */}
            <span className={style.value}>{getSelectedOptions()}</span>
            <button onClick={clearOptions} className={style.closeBtn}>
                &times;
            </button>
            <div className={style.devider}></div>
            <div className={style.caret}></div>
            {isOpen && (
                <ul className={`${style.options}`}>
                    {options.map((option, index) => (
                        <li
                            onMouseEnter={() => setHoverIndex(index)}
                            onClick={(event) => selectOption(event, option)}
                            className={`${style.option} ${
                                isOptionSelected(option) ? style.selected : ""
                            } ${hoverIndex === index ? style.hovered : ""}`}
                            key={option.label}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Select;
