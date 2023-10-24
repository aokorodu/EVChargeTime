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
                        <h1>Over the long run, what saves the most time? Charging less often, but to 100%, or charging more often, but only to 80%? *</h1>
                        <div>
                            <strong>GOAL:</strong>
                            <p>To help you determine the <strong>best charging strategy</strong> based upon how long it takes you (on average) to drive to a charger, how long you have to wait (on average) to charge, and the average full-charge range of your vehicle.</p>
                        </div>
                        <div>
                            <strong>DISCLAIMER:</strong>
                            <p>This is not meant to be a scientifically accurate study!  I don’t have access to official charging curves for EGMP cars, and the results are based entirely on estimates cobbled together from several different sources. <strong>For entertainment purposes only!</strong></p>
                            <p>In addition, this app doesn't consider the long-term effect of various charging strategies on battery health. Nor will it look at the ethical/moral question of charging to 100% when people are waiting. It only looks at one thing: <strong>TIME</strong></p>
                        </div>
                    </section>

                    <section>
                        <strong>ASSUMPTIONS:</strong>
                        <p>This app makes the following highly unrealistic assumptions:</p>
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