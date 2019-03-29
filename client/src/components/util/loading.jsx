import React from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { CircleLoader } from 'react-spinners';

export default ({ active, children }) => {
    return (
        <LoadingOverlay active={active} spinner={<CircleLoader />}>
            {children}
        </LoadingOverlay>
    )
};