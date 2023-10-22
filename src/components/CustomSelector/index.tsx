import { useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import styles from './CustomSelector.module.css';

type SelectorProps = {
    label?: string,
    value: number,
    valueOptions: number[],
    callback: Function,
    suffix?: string
}

const CustomSelector = ({ label, value, valueOptions, callback, suffix }: SelectorProps) => {
    const [selectedValue, setSelectedValue] = React.useState(value);
    const func = (e: any) => {
        setSelectedValue(e.target.value)
        callback(e.target.value)
    }
    React.useEffect(() => {
        setSelectedValue(value)
    }, [])
    return (
        <>
            <div className={styles.container}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedValue}
                        label={label}
                        onChange={func}
                    >
                        {valueOptions.map((val) => {
                            return (
                                <MenuItem key={val} value={val}>{val}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </div>
        </>);
}

export default CustomSelector