import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ListParams, User } from '../../../models';
import UserFilters from '../components/UserFilters';
import UserTable from '../components/UserTable';
import { selectUserFilter, selectUserList, selectUserLoading, userActions } from '../userSlice';

const useStyles = makeStyles(theme => ({
    root: {},
    titleContainer: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(4)
    },
    loading: {
        position: 'absolute',
        top: theme.spacing(-1),
        width: '100%'
    }
}))

function ListPage() {

    const match = useRouteMatch();
    const history = useHistory();

    const userList = useAppSelector(selectUserList);
    const filter = useAppSelector(selectUserFilter);
    const loading = useAppSelector(selectUserLoading);

    const dispatch = useAppDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(userActions.fetchUserList(filter));
    }, [dispatch, filter]);

    // TODO add pagination
    // const handlePageChange = (e: any, page: number) => {
    //     dispatch(
    //         userActions.setFilter({
    //             ...filter,
    //             _page: page,
    //         })
    //     );
    // };

    const handleSearchChange = (newFilter: ListParams) => {
        dispatch(userActions.setFilterWithDebounce(newFilter));
    };

    const handleFilterChange = (newFilter: ListParams) => {
        dispatch(userActions.setFilter(newFilter));
    };

    const handleRemoveUser = async (user: User) => {
        try {
            console.log('remove user');
            // // Remove user API
            // await userApi.remove(user?.id || '');
            // toast.success('Remove student successfully!');
            // // Trigger to re-fetch student list with current filter
            // const newFilter = { ...filter };
            // dispatch(userActions.setFilter(newFilter));
        } catch (error) {
            // Toast error
            console.log('Failed to fetch user', error);
        }
    };

    const handleEditUser = async (user: User) => {
        history.push(`${match.url}/${user.id}`);
    };

    return (
        <Box className={classes.root}>

            {loading && <LinearProgress className={classes.loading} />}

            <Box className={classes.titleContainer}>
                <Typography variant="h4">Users</Typography>
                <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">
                        Add new user
                    </Button>
                </Link>
            </Box>

            <Box mb={3}>
                {filter && <UserFilters
                    filter={filter}
                    onChange={handleFilterChange}
                    onSearchChange={handleSearchChange}
                />}
            </Box>

            {userList && <UserTable userList={userList}
                onEdit={handleEditUser}
                onRemove={handleRemoveUser}
            />}
        </Box>
    );
}

export default ListPage;