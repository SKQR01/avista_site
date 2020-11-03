import React, {useCallback, useEffect, useRef, useState} from 'react'
import classNames from "classnames";

const FloatInput = ({children, placeholder, name, registerRef, error, search = false, ...props}) => {
    const currentRef = useRef()
    // const currentRef = React.createRef()
    const [value, setValue] = useState()

    return (
        <>
            {error && <span>{error.message}</span>}
            <div className="float-input">
                <div className="float-input-section">

                    {search && <span className={`search__clear`} onClick={() => currentRef.current.value = ''}>✖</span>}
                    <input className={"search-box"} name={name} ref={(e) => {
                        registerRef && registerRef(e)
                        currentRef.current = e
                    }
                    } {...props} required/>

                    <label className="float-input-label" htmlFor={name}>

                        <span className="float-input-content">{children || placeholder}</span>
                    </label>
                </div>
            </div>
        </>
    )
}


export default FloatInput