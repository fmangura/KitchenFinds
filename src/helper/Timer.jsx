import React, {useState, useEffect} from 'react'
import './Timer.css'

export default function Timer() {
    const [timeDisplay, setTimeDisplay] = useState(``)
    const [time, setTime] = useState(0)
    const [timeUnit, setTimeUnit] = useState('min')
    const [timerRunning, setTimerRunning] = useState(false)
    const allUnits = ['hr', 'min', 'sec']
    let timerId

    useEffect(() => {
        let hr, min, sec
        let currTimer

        if (timeUnit == 'min') {
            currTimer = time * 60

        } else if (timeUnit == 'hr') {
            currTimer = time * 3600
        
        } else {
            currTimer = time
        }
        
        if (timerRunning && currTimer > 0) {
            timerId = setInterval(() => {
                if (currTimer < 0) { 
                    clearInterval(timerId);
                    TimerToggle();
                }

                if (timeUnit == 'min') {
                    hr = Math.floor(currTimer / 3600)
                    min = Math.floor(currTimer / 60)
                    sec = currTimer % 60
    
                } else if (timeUnit == 'hr') {
                    hr = Math.floor(currTimer / 3600)
                    min = Math.floor(currTimer / 60)
                    sec = currTimer % 60
                
                } else {
                    hr = Math.floor(currTimer / 3600)
                    min = Math.floor(currTimer / 60)
                    sec = currTimer
                }

                setTimeDisplay((`${hr.toString().padStart(2,0)}:${min.toString().padStart(2,0)}:${sec.toString().padStart(2,0)}`));

                currTimer = currTimer - 1
            }, 1000);
        }

        return function endTime() {
            setTime(() => {
                if (timeUnit == 'min') {
                    return currTimer / 60
        
                } else if (timeUnit == 'hr') {
                    return currTimer / 3600
                
                } else {
                    return currTimer
                }
            })
            clearInterval(timerId)
        };
    }, [timerRunning]);

    function TimerToggle() {
        if (timerRunning) {
            setTimerRunning(false);
        } else {
            setTimerRunning(true)
        } 
    }

    function handleTimerInput(e) {
        let {value} = e.target
        if (value > 60) value = 60
        if (value < 0) value = 0
        setTime(Number(value))
    }

    function handleTimerSelect(e) {
        setTimeUnit(e.target.value)
    }

    function Timerbuttons(num, unit) {
        setTimeUnit(unit)
        setTime(time => time + num)
    }

    function ResetTimeDisplay() {
        setTimerRunning(false);
        clearInterval(timerId);
        setTimeDisplay('');
        setTime(0);
    }

    return (
        <div className='timer' style={{display:'flex', flexDirection:'column'}}>
            <h6>Timer</h6>
            <div className='timer-container'>
                {!timeDisplay ? 
                    <div className='time-input'>
                        <input type='number' placeholder='Input time...' value={time} onChange={handleTimerInput} style={{width:'40px'}}></input>
                        <select onChange={handleTimerSelect}>
                            <option value={timeUnit}>{timeUnit}</option>
                            {allUnits.map((unit) => unit !== timeUnit ? 
                                <option value={unit}>{unit}</option>
                                :
                                null
                            )}
                        </select>
                    </div>
                    :
                    <h3>{timeDisplay}</h3>
                }
            </div>
            <div className='timer-buttons'>
                {!timeDisplay ? 
                    <span>
                        <button onClick={TimerToggle}>Start</button>
                        <button onClick={() => Timerbuttons(5,'min')}>+5 min</button>
                        <button onClick={() => Timerbuttons(10,'min')}>+10 min</button>
                        <button onClick={() => Timerbuttons(30,'min')}>+30 min</button>
                    </span>
                    :
                    <span>
                        <button onClick={TimerToggle}>Pause</button>
                        <button onClick={ResetTimeDisplay}>Reset</button>
                    </span>
                }

            </div>
        </div>
    )
}