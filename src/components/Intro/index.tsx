import styles from './Intro.module.css';
import Button from '@mui/material/Button';
import ChargeAnimation from '../ChargeAnimation';

type IntroProps = {
    callback: Function
}
const Intro = ({ callback }: IntroProps) => {
    return (
        <>
            <div className={styles.holder}>
                <div className={styles.container}>
                    {/* <div className={styles.animationHolder}><ChargeAnimation /></div> */}

                    <header>
                        <div className={styles.mainTitle}>80 or 100?</div>
                    </header>
                    <section>
                        <h1>Question: In the long run, what saves the most time: charging to 80%, or 100%?*</h1>
                        <div>
                            <strong>Disclaimer:</strong>
                            <div>This is not meant to be a scientifically accurate study on charging!  I don’t have access to the official charging curves for EGMP cars, and the results are based on charging curve estimates cobbled together from several different sources. For entertainment purposes only!</div>
                        </div>
                    </section>

                    <section>
                        <strong>Assumptions:</strong>
                        <div>This app makes the following highly unrealistic assumptions:</div>
                        <ol>
                            <li>The cars are always charged at 350 kW DC chargers at the maximum possible speed</li>
                            <li>Charging occurs at the same speed, every time.</li>
                            <li>Charging begins and ends at the same start and end charge percentage every time.</li>
                        </ol>
                    </section>

                    <section>
                        <div className={styles.note}>This analysis is for E-GMP vehicles (Kia EV6, Hyundai Ioniq 5/6, Genesis GV60) only.</div>
                    </section>
                    <div className={styles.buttonHolder}>
                        <Button variant="contained" size="large"
                            onClick={() => { callback() }} disableElevation sx={{
                                background: "#000000",
                                color: "white",
                                border: "1px solid black",
                                "&:hover": {
                                    background: "white",
                                    color: "black"
                                }

                            }}>
                            BEGIN
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Intro