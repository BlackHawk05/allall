import classNames from 'classnames';
import ReCAPTCHA from 'react-google-recaptcha';

interface IProps {
    onChange?: any;
    error?: any;
}

export const ReCaptcha: React.FC<IProps> = ({ onChange, error }) => {

    return (
        <div className={classNames([
            'border rounded-lg overflow-hidden',
            error ? 'border-red' : 'border-transparent'
        ])}>
            <ReCAPTCHA
                sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
                //'6Lflu3gmAAAAAKRQpBwvyfBLImMFFKIMcNIPZdRx'
                onChange={onChange}
            />
        </div>
    )
}
