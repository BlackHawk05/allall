import { useStore } from 'effector-react';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs'
import ImageUploading from 'react-images-uploading';
import { useForm } from 'react-hook-form';
import { ISignInValues } from '~/components/AuthForms/interfaces';
import { RegistrationSchema } from '~/components/AuthForms/validation';
import { $config } from '~/services/config';
import { UserStore, UserService, UserApi } from '~/services/user';
import { CheckboxField } from '~/shared/ui/CheckboxField';
import { DatePicker } from '~/shared/ui/DatePicker';
import { LabelIcon } from '~/shared/ui/LabelIcon';
import { SelectField } from '~/shared/ui/SelectField';
import { TextField } from '~/shared/ui/TextField';
import * as Icons from '~/images/icon'
import classNames from 'classnames';
import { Button } from '~/shared/ui/Button';
import { callToastError, callToast } from '~/utils/callToast'

interface IProps {
}

const maxImages = 1;

export const ConfigProfile: React.FC<IProps> = (props) => {
    const {  } = props;
    const user = useStore(UserStore.$user);
    
    const [images, setImages] = useState([{
        data_url: user.avatar
    }]);
    const [ isDisabled, setIsDisabled ] = useState<boolean>(true);
    const formValues = UserService.userDataParse({user});

    const { register, control, setValue, handleSubmit, formState: { errors }, clearErrors } = useForm<ISignInValues>({
        defaultValues: formValues,
        mode: 'onChange'
    });
    const config = useStore($config);

    const onSubmit = (data: ISignInValues) => {        
        UserApi.saveUserData(UserService.prepareUserData({
            ...formValues,
            ...data
        }))
        .then((response) => {
            console.log('res:', response);
            setIsDisabled(false);
            callToast({ message: 'Данные успешно сохранены' })
        })
        .catch(callToastError)
    }

    const renderStatus = () => {

        const classes = {
            container: classNames([
                'mb-5 flex gap-5 p-8 rounded-lg items-center',
                user.status === 'ACTIVE' && 'bg-primary',
                user.status === 'UNDER_CONSIDERATION' && 'bg-lightred',
                user.status === 'NOT_CONFIRMED' && 'bg-white border border-stroke',
            ]),
            text: classNames([
                'flex flex-col gap-1',
                user.status === 'ACTIVE' && 'text-white',
                user.status === 'UNDER_CONSIDERATION' && 'text-red',
                user.status === 'NOT_CONFIRMED' && 'text-black',
            ]),
            icon: classNames([
                user.status === 'ACTIVE' && '[&>*]:fill-white',
                user.status === 'UNDER_CONSIDERATION' && '[&>*]:fill-red [&>path:last-child]:fill-white',
                user.status === 'NOT_CONFIRMED' && '[&>*]:fill-black',
            ])
        }

        const renderText = () => {
            switch (user.status) {
                case 'ACTIVE':
                    return (<>
                        <div>Ваш профиль успешно верифицирован</div>
                        <div className='text-xs opacity-70'>Ваши товары доступны к продаже</div>
                    </>)
                case 'UNDER_CONSIDERATION':
                    return (<>
                        <div>Пожалуйста, обновите данные</div>
                        <div className='text-xs opacity-70'>Ваши товары сейчас не отображаются у покупателей</div>
                    </>)
                case 'NOT_CONFIRMED':
                    return (<>
                        <div>Ваш профиль проверяется</div>
                        <div className='text-xs opacity-70'>Обычно это занимает не более 5 минут</div>
                    </>)
            }
        }

        const renderIcon = () => {
            switch (user.status) {
                case 'ACTIVE':
                    return <Icons.profileConfirm className={classes.icon} />;
                case 'UNDER_CONSIDERATION':
                    return <Icons.reject className={classes.icon} />;
                case 'NOT_CONFIRMED':
                    return <Icons.reload className={classes.icon} />;
            }
        }

        return (
            <div className={classes.container}>
                {renderIcon()}
                <div className={classes.text}>
                    {renderText()}
                </div>
            </div>
        )
    }

    useEffect(() => {
        register('avatarBase64', { required: false });
    }, [ user ]);

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
        setValue('avatarBase64', imageList[0]?.data_url)
    };
    
    return (
        <div className='container'>
            {renderStatus()}

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className='mb-5'>
                    <h2 className='mb-5 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>
                        Личная информация
                    </h2>
                    <div className='flex gap-5 justify-between items-stretch'>
                        <div className='flex flex-col w-1/4'>
                            <div className='flex gap-2 items-center mb-2.5'>
                                Фото
                                <LabelIcon title='Подсказка' message={'Подсказка'} />
                            </div>
                            <div className='mb-5 grow border-dashed border-2 rounded-xl overflow-hidden border-primary'>
                                <ImageUploading
                                    // multiple
                                    value={images}
                                    onChange={onChange}
                                    maxNumber={maxImages}
                                    dataURLKey="data_url"
                                >
                                    {({
                                        imageList,
                                        onImageUpload,
                                        onImageRemoveAll,
                                        onImageUpdate,
                                        onImageRemove,
                                        isDragging,
                                        dragProps,
                                    }) =>{
                                        const classname = classNames([
                                            'flex flex-col gap-5 items-center justify-center text-center h-full text-primary',
                                            'bg-center bg-cover bg-no-repeat',
                                            isDragging ? 'bg-lightgray' : 'bg-whiten'
                                        ]);
                                        
                                        return (
                                            <div className={classname}
                                                onClick={() => {
                                                    onImageUpload();
                                                    onImageRemoveAll();
                                                }}
                                                {...dragProps}
                                                style={
                                                    imageList[0]
                                                    ? { backgroundImage: `url(${imageList[0].data_url})`} 
                                                    : undefined
                                                }
                                            >
                                                {!imageList[0]
                                                    && <>
                                                        <div className='rounded-lg bg-primary p-6'>
                                                            <Icons.plus className='[&>*]:fill-white'/>
                                                        </div>
                                                        Нажмите<br/>или перетащите сюда файл
                                                    </>
                                                }
                                                
                                            </div>
                                        )
                                    }}
                                </ImageUploading>
                            </div>
                        </div>
                        <div className='w-1/4'>
                            <TextField
                                name='fio'
                                label='ФИО'
                                placeholder='Иванов Иван Иванович'
                                classnames='mb-5'
                                rules={RegistrationSchema.fio}
                                defaultValue={formValues?.fio}
                                control={control}
                                errors={errors}
                                labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                            />
                            <TextField
                                name='siteUrl'
                                label='Адрес сайта'
                                placeholder='https://example.com'
                                classnames='mb-5'
                                control={control}
                                defaultValue={formValues?.siteUrl}
                                errors={errors}
                                rules={RegistrationSchema.siteUrl}
                                labelIcon={<LabelIcon title='Подсказка' message={'Адрес вашего сайта. Например страница ВКонтакте.'} />}
                            />
                            <TextField
                                name='city'
                                label='Город или населенный пункт'
                                placeholder='Москва'
                                classnames='mb-5'
                                control={control}
                                errors={errors}
                                rules={RegistrationSchema.city}
                                defaultValue={formValues?.city}
                                labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                            />
                        </div>
                        <div className='w-1/4'>
                            <TextField
                                name='phoneString'
                                label='Телефон'
                                mask={'+7\ (999) 999-99-99'}
                                placeholder='+7'
                                classnames='mb-5'
                                changeHandler={() => {
                                    //isSendCodeAvailable && setIsError(null);
                                }}
                                rules={RegistrationSchema.phoneString}
                                defaultValue={formValues?.phone}
                                control={control}
                                errors={errors}
                                labelIcon={<LabelIcon
                                    title='Подсказка'
                                    message={'Сюда нужно ввести номер телефона, на который мы отправим SMS.'}
                                    width='25rem'
                                />}
                            />
                            <TextField
                                type='number'
                                name='zipcode'
                                label='Почтовый индекс'
                                placeholder='000000'
                                classnames='mb-5'
                                control={control}
                                errors={errors}
                                rules={RegistrationSchema.zipcode}
                                defaultValue={formValues?.zipcode}
                                // changeHandler={(value: string) => JuridicalService.addressSearch({
                                //     zip: value,
                                //     clearErrors,
                                //     setValue,
                                //     formValues
                                // })}
                                labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                            />
                            <SelectField
                                label='Код страны по ISO'
                                classnames='mb-5'
                                values={config?.countries}
                                defaultValue={formValues?.countryIso}
                                //ref={refs.countryIso}
                                labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                                {...register('countryIso', RegistrationSchema.countryIso)}
                            />
                        </div>
                        <div className='w-1/4'>
                            <TextField
                                name='email'
                                label='Электронная почта'
                                placeholder='example@email.com'
                                classnames='mb-5'
                                control={control}
                                defaultValue={formValues.email}
                                rules={RegistrationSchema.email}
                                errors={errors}
                                labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                            />
                            <SelectField
                                label='Тип адреса'
                                classnames='mb-5'
                                values={config.addressType}
                                defaultValue={formValues?.addressType}
                                //ref={refs.addressType}
                                labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                                {...register('addressType', RegistrationSchema.addressType)}
                            />
                            <TextField
                                name='address'
                                label='Улица, дом, корпус, квартира, офис'
                                placeholder='ул. Ленина, д. 52'
                                classnames='mb-5'
                                defaultValue={formValues?.address}
                                control={control}
                                errors={errors}
                                rules={RegistrationSchema.address}
                                labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                            />
                        </div>
                    </div>
                </div>
                <div className='juridical'>
                    <h2 className='mb-5 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>
                        Юридическая информация
                    </h2>
                    <div className='flex gap-5'>
                        <div className='w-1/2'>
                            <TextField
                                name='fullOrganizationName'
                                label='Полное название организации'
                                placeholder='Общество с Ограниченной Ответственностью “Название”'
                                classnames='mb-5'
                                control={control}
                                rules={RegistrationSchema.fullOrganizationName}
                                errors={errors}
                                defaultValue={formValues.fullOrganizationName}
                                labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                            />
                            <TextField
                                name='shortOrganizationName'
                                label='Сокращенное название'
                                placeholder='ООО “Название”'
                                classnames='mb-5'
                                control={control}
                                rules={RegistrationSchema.shortOrganizationName}
                                errors={errors}
                                defaultValue={formValues.shortOrganizationName}
                                labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                            />
                            {formValues.organizationForm === 'INDIVIDUAL'
                                && <div className='mb-5'>
                                    <CheckboxField
                                        label='Самозанятый'
                                        //ref={refs.smz}
                                        changeHandler={(value: boolean) => {
                                            // RegStore.saveRegData({
                                            //     ...formValues,
                                            //     smz: value
                                            // })
                                        }}
                                        checked={formValues.smz}
                                    />
                                </div>
                            }
                            <TextField
                                label='ФИО руководителя'
                                name='lastName'
                                placeholder='Фамилия'
                                classnames='mb-5'
                                control={control}
                                rules={RegistrationSchema.lastName}
                                errors={errors}
                                defaultValue={formValues.lastName}
                                labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                            />
                            <TextField
                                name='firstName'
                                placeholder='Имя'
                                classnames='mb-5'
                                control={control}
                                rules={RegistrationSchema.firstName}
                                errors={errors}
                                defaultValue={formValues.firstName}
                            />
                            <TextField
                                name='middleName'
                                placeholder='Отчество'
                                classnames='mb-5'
                                control={control}
                                rules={RegistrationSchema.middleName}
                                errors={errors}
                                defaultValue={formValues.middleName}
                            />
                        </div>
                        <div className='w-1/2'>
                            <div className='flex gap-5'>
                                <div className='w-1/2'>
                                    <SelectField
                                        label='Гражданство'
                                        classnames='mb-5'
                                        values={config.citizenship}
                                        defaultValue={formValues.citizenship}
                                        //ref={refs.citizenship}
                                        labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                                        {...register('citizenship', RegistrationSchema.citizenship)}
                                    />
                                    <TextField
                                        type='number'
                                        name='ogrn'
                                        label='ОГРН'
                                        placeholder='ОГРН'
                                        classnames='mb-5'
                                        control={control}
                                        rules={RegistrationSchema.ogrn}
                                        errors={errors}
                                        defaultValue={formValues.ogrn}
                                        labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                                    />
                                </div>
                                <div className='w-1/2'>
                                    <DatePicker
                                        name='birthdate'
                                        label='Дата рождения'
                                        classnames='mb-5'
                                        control={control}
                                        errors={errors}
                                        defaultValue={dayjs(formValues.birthdate).format('DD.MM.YYYY')}
                                        labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                                    />
                                    <TextField
                                        type='number'
                                        name='inn'
                                        label='ИНН'
                                        placeholder='ИНН'
                                        classnames='mb-5'
                                        control={control}
                                        rules={RegistrationSchema.inn}
                                        errors={errors}
                                        defaultValue={formValues.inn}
                                        //disabled
                                    />
                                </div>
                            </div>
                            {formValues.inn.length === 10
                                && <TextField
                                    type='number'
                                    name='kpp'
                                    label='КПП'
                                    placeholder='000000'
                                    classnames='mb-5'
                                    control={control}
                                    rules={RegistrationSchema.kpp}
                                    errors={errors}
                                    defaultValue={formValues.kpp}
                                    labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                                />
                            }
                        </div>
                    </div>
                </div>
                <div className='bankAccount'>
                    <h2 className='mb-5 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>
                        Банковская информация
                    </h2>
                    <div className='mb-4 flex gap-5 w-full'>
                        <TextField
                            type='number'
                            name='bic'
                            label='БИК'
                            placeholder='044525411'
                            rules={RegistrationSchema.bic}
                            classnames='basis-1/2'
                            defaultValue={formValues.bic}
                            control={control}
                            errors={errors}
                            // changeHandler={(value: string) => JuridicalService.bankSearch({
                            //     bic: value,
                            //     clearErrors,
                            //     setValue,
                            //     formValues
                            // })}
                            labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                        />
                        <TextField
                            type='number'
                            name='billNumber'
                            label='Рассчетный счет'
                            placeholder='30101810145250000411'
                            classnames='basis-1/2'
                            defaultValue={formValues.billNumber}
                            control={control}
                            errors={errors}
                            rules={RegistrationSchema.billNumber}
                            labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                        />
                    </div>
                    <div className=''>
                        <TextField
                            name='bankName'
                            label='Банк'
                            placeholder='Название банка'
                            classnames='w-full'
                            control={control}
                            rules={RegistrationSchema.bankName}
                            defaultValue={formValues.bankName}
                            errors={errors}
                            labelIcon={<LabelIcon title='Подсказка' message={'Подсказка'} />}
                        />
                    </div>
                </div>
            </form>
            <div className='mt-5 flex gap-5 justify-end'>
                {isDisabled
                        ? <Button
                            classnames=''
                            type='secondary'
                            onClick={() => setIsDisabled(false)}
                            disabled={user.status === 'ACTIVE'}
                        >
                            Изменить
                        </Button>
                        : <>
                            <Button
                                classnames=''
                                type='secondary'
                                onClick={() => setIsDisabled(true)}
                            >
                                Отмена
                            </Button>
                            <Button
                                classnames=''
                                onClick={handleSubmit(onSubmit)}
                                disabled={user.status === 'ACTIVE'}
                            >
                                Отправить на рассмотрение
                            </Button>
                        </>
                    }
            </div>
        </div>
    )
}