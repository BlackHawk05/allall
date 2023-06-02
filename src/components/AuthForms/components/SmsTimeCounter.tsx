import React, { useEffect, useState } from 'react';

interface IProps {
    countLimit: number;
    setIsSendCodeAvailable: any;
    setIsError?: any;
}

export const SmsTimeCounter: React.FC<IProps> = (props) => {
    const { countLimit, setIsSendCodeAvailable, setIsError } = props;
    const [ count, setCount ] = useState<number>(countLimit);

    useEffect(() => {   
        const counter = () => {
            if (count - 1 === 0) {
                setIsError && setIsError(null);
                setIsSendCodeAvailable(true);
            } else {
                setCount(count - 1);
            }
        }

        if (count > 0) {
            setTimeout(() => counter(), 1000);
        }
    })

    return (
        <>
            {count}
        </>
    )
}