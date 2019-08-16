import * as React from 'react';
import ScrollBars from 'react-scrollbar';

interface IScrollSectionProps  {
    [key: string]: any
}

export const ScrollSection: React.FC<IScrollSectionProps> = ({children, ...rest}) => {
    return (
        <ScrollBars vertical {...rest} >
            {children}
        </ScrollBars>
    )
};
