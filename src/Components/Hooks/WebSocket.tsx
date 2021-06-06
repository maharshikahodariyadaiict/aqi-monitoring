import React, { useEffect, useState } from 'react';

export const useWebSocket = (url: string, onMessage: Function) => {
    const [message, setMessage] = useState<string | null>(null);
    const ws = React.useRef<any>(null);
    const timeoutRef = React.useRef<any>(null);

    useEffect(() => {
        ws.current = new WebSocket(url);
        ws.current.onmessage = onMessage;

        ws.current.onopen = (e: Event) => {
            console.log('Connection established...');
            setMessage('Web socket connection established.')
        }

        ws.current.onclose = (e: CloseEvent) => {
            console.log('Connection Closed. Try to Reconnect...', e.wasClean);
            if(!e.wasClean) {
                if(timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                }
                setMessage('Connection Closed. Try to Reconnect...');
                timeoutRef.current = setTimeout(() => {
                    ws.current = new WebSocket(url);
                }, 3000);
            } else {
                setMessage('Socket connection closed successfully.')
            }
        }

        ws.current.onerror = (e: any) => {
            console.log('Some error occured...', e?.message);
        }
        return () => {
            ws.current.close();
        }
    }, [])

    const wsState = (ws && ws.current) ? ws.current.readyState : 0

    return {
        wsState,
        message,
        setMessage
    }
}
