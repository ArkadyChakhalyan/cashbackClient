import React, { createContext, FC, ReactNode, useContext, useState } from 'react';
import { IEventContextProps } from './types.ts';
import { EVENT_HIDE_TIME } from './constants.ts';
import { Event } from '../components/event/event.tsx';

const EventContext = createContext<IEventContextProps>(null);

export const EventProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [event, setEvent] = useState(null);

    const showEvent = (
        x: number,
        y: number,
        text: string
    ) => {
        setEvent({ x, y, text });

        setTimeout(() => {
            setEvent(null);
        }, EVENT_HIDE_TIME);
    };

    return (
        <EventContext.Provider value={{ showEvent }}>
            {children}
            {event && <Event {...event} />}
        </EventContext.Provider>
    );
};

export const useEvent = (): IEventContextProps => {
    const context = useContext(EventContext);
    if (!context) {
        return;
    }
    return context;
};
