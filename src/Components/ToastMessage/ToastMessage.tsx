import React, { useEffect } from 'react';
import './ToastMessage.css';

interface Props {
    text: string;
    closeInMS?: number;
    onCloseToastMessage?: () => void;
}

const ToastMessage: React.FC<Props> = props => {
    const [showToast, setShowToast] = React.useState<boolean>(true);

    useEffect(() => {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
            setTimeout(() => {
                props.onCloseToastMessage && props.onCloseToastMessage();
            }, 1000);
        }, props.closeInMS || 3000);
    }, []);

    return (
        <div className={`toast-message-wrapper ${showToast ? 'toast-appear' : 'toast-disappear'}`}>
            <div className="toast-message-div">
                <div className="toast-message">{props.text}</div>
            </div>
        </div>
    );
}

export default ToastMessage;