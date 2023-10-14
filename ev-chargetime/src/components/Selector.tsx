import React from "react"

type SelectorProps = {
    value: number,
    valueOptions: number[],
    callback: Function
}
const Selector = ({ value, valueOptions, callback }: SelectorProps) => {
    return (
        <select onChange={(e) => { callback(e.target.value) }}>
            {valueOptions.map((val) => {
                return <option key={val} defaultValue={value} value={val}>{val}%</option>
            })}
        </select>
    )
}

export default Selector;