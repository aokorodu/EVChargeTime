import React from "react"

type SelectorProps = {
    value: number,
    valueOptions: number[],
    callback: Function,
    suffix?: string
}
const Selector = ({ value, valueOptions, callback, suffix }: SelectorProps) => {
    return (
        <select onChange={(e) => { callback(e.target.value) }}>
            {valueOptions.map((val) => {
                return <option key={val} defaultValue={value} value={val}>{val}{suffix}</option>
            })}
        </select>
    )
}

export default Selector;