import React from 'react'
import "./AppButtonStyle.css"

/**
 * @author Lovesh Singh.
 * @since 25-05-2023.
 * @description Button component.
 */
const AppButton = ({label, type, onClick}) => {
    return (
        <button onClick={onClick} className={type === "primary" ? "button button-primary" : "button button-secondary"}>
            {label}
        </button>
    )
}

export default AppButton