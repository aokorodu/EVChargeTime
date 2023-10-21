import style from './CustomSelectorButton.module.css';

type CustomSelectorButtonType = {
    value: number,
    onClick: Function,
    selected: Boolean
    suffix?: String
}

const CustomSelectorButton = ({ value, onClick, selected, suffix }: CustomSelectorButtonType) => {
    return (
        <div className={`${style.selector} ${selected ? style.selected : style.deselected}`} onClick={() => { onClick(value) }}>{value}{suffix}</div>)
}

export default CustomSelectorButton