import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import styles from './CustomInput.module.css';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';

type CustomInputProps = {
    label: string,
    value: number,
    suffix: string,
    onChange: Function
}
const CustomInput = ({ label, value, suffix, onChange }: CustomInputProps) => {
    return (
        // <div className={styles.holder}>
        //     <TextField id="outlined-basic" label={label} defaultValue={value} variant="outlined" onChange={(e) => { onChange(e) }} />

        // </div>


        <>
            <InputLabel htmlFor="outlined-adornment-amount">{label}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-amount"
                fullWidth
                endAdornment={<InputAdornment position="end">miles</InputAdornment>}
                label="Amount"
                onChange={(e) => { onChange(e) }}
                value={value}
            />
        </>

    )
}

export default CustomInput