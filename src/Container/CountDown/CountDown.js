import React, { Component } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import "./CountDown.scss";
import Button from "@material-ui/core/Button";


const CountDown = (props) => {

    const renderTimeFunc = value => {
        if (value === 0) {
            return <Button className="timer">ارسال مجدد</Button>;
        }
        return (
            <div className="timer">
                <div className="value">{value}</div>
            </div>
        );
    };
    return(
        <CountdownCircleTimer
            isPlaying
            size={70}
            strokeWidth={3}
            // isLinearGradient={true}
            durationSeconds={props.time}
            colors={[["#00d06b", 0.5], ["#209eff", 0.33], ["#ff1a1a"]]}
            renderTime={renderTimeFunc}
            onComplete={props.resetCountDown}
        />
    )
}

export default CountDown;
