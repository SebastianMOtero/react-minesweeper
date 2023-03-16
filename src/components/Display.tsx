import React from 'react';

interface Props {
    time: number;
}

export const Display = ({ time }: Props) => (
    <>
    {`Time: ${Math.floor(time/100)}`}
    </>
)