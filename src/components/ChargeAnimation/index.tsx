import styles from './ChargeAnimation.module.css';

const ChargeAnimation = () => {
    return (
        <svg viewBox="0 0 500 100">
            <g id="charge bar" clip-path="url(#roundedRec)">
                <g className={styles.progressBackground} id="progressBackground">
                    <rect id="Rectangle 17" width="550" height="125" fill="#091441" />
                    <g id="stripe">
                        <line id="Line 9" x1="48.872" y1="0.703888" x2="1.87203" y2="125.704" stroke="#1C306B" stroke-width="4" />
                    </g>
                    <g id="stripe_2">
                        <line id="Line 9_2" x1="98.872" y1="0.703888" x2="51.872" y2="125.704" stroke="#1C306B" stroke-width="4" />
                    </g>
                    <g id="stripe_3">
                        <line id="Line 9_3" x1="148.872" y1="0.703888" x2="101.872" y2="125.704" stroke="#1C306B" stroke-width="4" />
                    </g>
                    <g id="stripe_4">
                        <line id="Line 9_4" x1="198.872" y1="0.703888" x2="151.872" y2="125.704" stroke="#1C306B" stroke-width="4" />
                    </g>
                    <g id="stripe_5">
                        <line id="Line 9_5" x1="248.872" y1="0.703888" x2="201.872" y2="125.704" stroke="#1C306B" stroke-width="4" />
                    </g>
                    <g id="stripe_6">
                        <line id="Line 9_6" x1="298.872" y1="0.703888" x2="251.872" y2="125.704" stroke="#1C306B" stroke-width="4" />
                    </g>
                    <g id="stripe_7">
                        <line id="Line 9_7" x1="348.872" y1="0.703888" x2="301.872" y2="125.704" stroke="#1C306B" stroke-width="4" />
                    </g>
                    <g id="stripe_8">
                        <line id="Line 9_8" x1="398.872" y1="0.703888" x2="351.872" y2="125.704" stroke="#1C306B" stroke-width="4" />
                    </g>
                    <g id="stripe_9">
                        <line id="Line 9_9" x1="448.872" y1="0.703888" x2="401.872" y2="125.704" stroke="#1C306B" stroke-width="4" />
                    </g>
                    <g id="stripe_10">
                        <line id="Line 9_10" x1="548.872" y1="0.703888" x2="501.872" y2="125.704" stroke="#1C306B" stroke-width="4" />
                    </g>
                    <g id="stripe_11">
                        <line id="Line 9_11" x1="498.872" y1="0.703888" x2="451.872" y2="125.704" stroke="#1C306B" stroke-width="4" />
                    </g>
                </g>
                <rect id="progressBar" x="53" width="281" height="125" fill="url(#paint0_linear_0_1)" />
                <path id="Rectangle 19" d="M0 10C0 4.47715 4.47715 0 10 0H50V125H10C4.47715 125 0 120.523 0 115V10Z" fill="#607648" />
            </g>
            <text x="250" y="60" textAnchor='middle' dominantBaseline={"middle"} fontSize={60} fill={"white"} fontWeight={"bold"}>?</text>
            <defs>
                <clipPath id="roundedRec">
                    <rect x="0" y="0" width="500" height="100" rx="15" ry="15" />
                </clipPath>
                <linearGradient id="paint0_linear_0_1" x1="53" y1="56.5" x2="334.003" y2="55.0759" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0375601" stop-color="#B0D75A" />
                    <stop offset="1" stop-color="#52C3B5" />
                </linearGradient>
            </defs>
        </svg>

    )
}

export default ChargeAnimation;