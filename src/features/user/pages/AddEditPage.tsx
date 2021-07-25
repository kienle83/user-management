import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import userApi from '../../../api/userApi';
import { User } from '../../../models';
import UserForm from '../components/UserForm';
import { toast } from 'react-toastify';

function AddEditPage() {
    const history = useHistory();
    const { userId } = useParams<{ userId: string }>();
    const isEdit = Boolean(userId);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (!userId) return;

        (async () => {
            try {
                const response: User = await userApi.getById(userId);
                setUser(response);
            } catch (error) {
                console.log('failed to fetch user details', error)
            }
        })();

    }, [userId])

    const handleUserFormSubmit = async (formValues: User) => {
        if (isEdit) {
            console.log('update user', formValues);
            // TODO call API to update user
            //await userApi.update(formValues);
        } else {
            console.log('add new user', formValues);
            // TODO call API to add new user
            //await userApi.add(formValues);
        }

        // Toast success
        toast.success('Save user successfully!');

        // Redirect back to user list
        history.push('/admin/users');
    };

    const initialValues: User = {
        name: '',
        id: '',
        ...user,
    } as User;


    return (
        <Box>
            <Link to="/admin/users">
                <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
                    <ChevronLeft /> Back to user list
                </Typography>
            </Link>

            <Typography variant="h4">{isEdit ? 'Update user info' : 'Add new user'}</Typography>

            {(!isEdit || Boolean(user)) && (
                <Box mt={3}>
                    <UserForm initialValues={initialValues} onSubmit={handleUserFormSubmit} />
                </Box>
            )}
        </Box>
    );
}

export default AddEditPage;