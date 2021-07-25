import { Box, Grid, LinearProgress, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { dashboardActions, selectDashboardLoading, selectDashboardStatistics } from './dashboardSlice';
import StatisticItem from './components/StatisticItem';
import { Business, LocationCity, PeopleAlt } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(1),
    },

    loading: {
        position: 'absolute',
        top: theme.spacing(-1),
        width: '100%',
    },
}));


function Dashboard() {

    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectDashboardLoading);
    const statistics = useAppSelector(selectDashboardStatistics);
    const classes = useStyles();

    useEffect(() => {
        dispatch(dashboardActions.fetchData());
    }, [dispatch]);

    return (
        <Box className={classes.root}>
            {/* Loading */}
            {loading && <LinearProgress className={classes.loading} />}

            {/* Statistic Section */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                    <StatisticItem
                        icon={<PeopleAlt fontSize="large" color="primary" />}
                        label="users"
                        value={statistics.userCount}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <StatisticItem
                        icon={<LocationCity fontSize="large" color="primary" />}
                        label="cities"
                        value={statistics.cityCount}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <StatisticItem
                        icon={<Business fontSize="large" color="primary" />}
                        label="companies"
                        value={statistics.companyCount}
                    />
                </Grid>

            </Grid>
        </Box>
    );
}

export default Dashboard;