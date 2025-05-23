import React, { useContext } from 'react'
import { AuthContext } from '../context'
import './ErrorCard.css'

function ErrorCard() {
    const {errorMsg} = useContext(AuthContext)

    return (
        <div className={errorMsg ? `error-card` : 'hidden'}>
            {errorMsg ? <div>{errorMsg}</div> : <></>}
        </div>
    )
}

export default ErrorCard;