import React, {useEffect, useState} from "react";
import "./AppModal.css"

/**
 * @author Lovesh Singh.
 * @since 25-05-2023.
 * @description Modal component.
 */
const AppModal = ({onRequestClose, show, children}) => {

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(show)
    }, [show]);

    const onPressBackdrop = () => {
        onRequestClose()
        setVisible(!visible)
    }

    return (
        <>
            <div className="modal__container" onClick={onRequestClose ?? onPressBackdrop} style={{display: visible ? 'flex' : 'none'}}>
                <div className="modal__inner_container" onClick={e => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </>
    )
}
export default AppModal;
