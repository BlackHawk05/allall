import { toast } from 'react-toastify';

export const callToast = ({
    message = '',
    type = 'success',
    position = 'TOP_RIGHT',
}: {
    message: string;
    type?: 'success' | 'error' | 'warn' | 'info';
    position?: 'TOP_RIGHT' | 'TOP_CENTER' | 'TOP_LEFT' | 'BOTTOM_RIGHT' | 'BOTTOM_CENTER' | 'BOTTOM_LEFT'
}) => {
    // const _message = (
    //     <div>
    //         <div dangerouslySetInnerHTML={{ __html: message }}></div>
    //     </div>
    // );
    toast[type](message, {
        position: toast.POSITION[position],
    });
};

export const callToastError = (err: Error) => {
    toast.error(err.message);
}
