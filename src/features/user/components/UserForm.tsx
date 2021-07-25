import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../components/FormFields/InputField';
import { User } from '../../../models';


export interface UserFormProps {
    initialValues?: User;
    onSubmit?: (formValues: User) => void;
}

const schema = yup.object().shape({
    name: yup
        .string()
        .required('Please enter name')
        .test('two-words', 'Please enter at least two words', (value) => {
            if (!value) return true;
            const parts = value?.split(' ') || [];
            return parts.filter((x) => Boolean(x)).length >= 2;
        }),
    username: yup
        .string()
        .required('Please enter username'),
    email: yup
        .string()
        .required('Please enter email')
        .email(),

})

function UserForm({ initialValues, onSubmit }: UserFormProps) {

    const [error, setError] = useState<string>('');

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<User>({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (formValues: User) => {
        try {
            setError('');
            console.log(formValues)
            //await onSubmit?.(formValues);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Box maxWidth={400}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>

                <InputField name="name" control={control} label="Full Name" />
                <InputField name="username" control={control} label="Username" />
                <InputField name="email" control={control} label="Email" />

                <InputField name="address.street" control={control} label="Street" />
                <InputField name="address.suite" control={control} label="Suite" />
                <InputField name="address.city" control={control} label="City" />
                <InputField name="address.zipcode" control={control} label="Zipcode" />
                <InputField name="address.geo.lat" control={control} label="Latitude" />
                <InputField name="address.geo.lng" control={control} label="Longitude" />

                <InputField name="phone" control={control} label="Phone" />
                <InputField name="website" control={control} label="Website" />

                <InputField name="company.name" control={control} label="Company name" />
                <InputField name="company.catchPhrase" control={control} label="Company catch phrase" />
                <InputField name="company.bs" control={control} label="Company bs" />

                {error && { error }}

                <Box mt={3}>
                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                        {isSubmitting && <CircularProgress size={16} color="primary" />}
                        &nbsp;Save
                    </Button>
                </Box>

            </form>
        </Box>
    );
}

export default UserForm;