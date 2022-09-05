import Monitor from 'Model/Models/Monitor';
import React, { FunctionComponent, ReactElement } from 'react';
import MonitorElement from './Monitor';

export interface ComponentProps {
    monitors: Array<Monitor>;
    onNavigateComplete?: (() => void) | undefined; 
}

const MonitorsElement: FunctionComponent<ComponentProps> = (
    props: ComponentProps
): ReactElement => {
    if (!props.monitors || props.monitors.length === 0) {
        return <p>No monitors.</p>;
    }

    return (
        <div>
            {props.monitors.map((monitor: Monitor, i: number) => {
                return <MonitorElement monitor={monitor} key={i} onNavigateComplete={props.onNavigateComplete} />;
            })}
        </div>
    );
};

export default MonitorsElement;
