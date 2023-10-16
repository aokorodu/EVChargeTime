import { useState } from "react";
import CustomSelectorButton from "./CustomSelectorButton";
import styles from "./CustomSelector.module.css";

type SelectorProps = {
    label?: string,
    value: number,
    valueOptions: number[],
    callback: Function,
    suffix?: string
}

const CustomSelector = ({ label, value, valueOptions, callback, suffix }: SelectorProps) => {
    const [chosenValue, setChosenValue] = useState(value);
    const [open, toggleOpen] = useState(false);

    const selectValue = (newValue: number) => {
        setChosenValue(newValue);
        toggleOpen(!open);
        callback(newValue)
    }

    return (
        <>
            <div className={styles.holder} onClick={() => { toggleOpen(!open) }}>
                <div>{label}</div>

                <div  >{chosenValue}{suffix}</div>
                {open &&
                    <div className={styles.dropdownHolder} onBlur={() => { console.log('blur') }}>
                        {valueOptions.map((val) => {
                            return (<CustomSelectorButton value={val} onClick={selectValue} selected={val === chosenValue ? true : false} suffix={suffix} />)
                        })}
                    </div>}
            </div>
        </>);
}

export default CustomSelector