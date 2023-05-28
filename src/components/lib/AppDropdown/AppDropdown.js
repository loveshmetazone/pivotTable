import React from 'react'

/**
 * @author Lovesh Singh.
 * @since 25-05-2023.
 * @description Dropdown component.
 */
const AppDropdown = ({ label, value, options, onChange }) => {
    return (
        <label>

            {/*{label}*/}

            <select style={{margin: "0.5rem", cursor: "pointer"}} value={value} onChange={onChange}>

                {options.map((option, i) => (

                    <option key={i} value={option.value}>{option.label}</option>

                ))}

            </select>


        </label>

    );
}

export default AppDropdown