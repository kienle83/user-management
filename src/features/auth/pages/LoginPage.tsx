import { Box, Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { authActions } from '../authSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
    },

    box: {
        padding: theme.spacing(3)
    }
}));

function LoginPage() {

    const classes = useStyles();
    const dispatch = useAppDispatch();
    const isLogging = useAppSelector(state => state.auth.logging);

    const handleLoginClick = () => {
        // get username and password from login form
        dispatch(authActions.login({
            username: '',
            password: ''
        }))
    }

    return (
        <div className={classes.root}>
            <Paper elevation={1} className={classes.box}>
                <Typography variant="h5" component="h1">
                    User Management
                </Typography>
                <p>Company: Nord Cloud</p>
                <Box mt={4}>
                    <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
                        Click here to login &nbsp; {isLogging && <CircularProgress size={22} color="secondary" />}
                    </Button>
                </Box>
            </Paper>
        </div>
    );
}

export default LoginPage;