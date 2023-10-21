import React from "react"

type SelectorProps = {
    label?: string,
    value: number,
    valueOptions: number[],
    callback: Function,
    suffix?: string
}
const Selector = ({ label, value, valueOptions, callback, suffix }: SelectorProps) => {
    return (
        <>
            {label && <div>{label}</div>}
            <select onChange={(e) => { callback(e.target.value) }}>
                {valueOptions.map((val) => {
                    return <option key={val} defaultValue={value} value={val}>{val}{suffix}</option>
                })}
            </select>
        </>
    )
}

export default Selector;