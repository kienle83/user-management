import { Box, Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React, { ChangeEvent, useRef } from 'react';
import { ListParams } from '../../../models';


export interface UserFiltersProps {
    filter: ListParams;
    onChange: (newFilter: ListParams) => void;
    onSearchChange?: (newFilter: ListParams) => void;
}

function UserFilters({ filter, onChange, onSearchChange }: UserFiltersProps) {
    const searchRef = useRef<HTMLInputElement>();
    const selectRef = useRef<HTMLInputElement>();
    // FIXME fetch city list from API
    // const cityList = ["Gwenborough", "Romaguera-Crona", "Wisokyburgh", "Deckow-Crist", "Romaguera-Jacobson", "Robel-Corkery", "Roscoeview", "South Christy", "Howemouth", "Aliyaview", "Bartholomebury", "Lebsackbury"];

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!onSearchChange) return;

        const newFilter: ListParams = {
            ...filter,
            name_like: e.target.value,
            _page: 1,
        };
        onSearchChange(newFilter);
    };

    const handleSortChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
        if (!onChange) return;

        const value = e.target.value;
        const [_sort, _order] = (value as string).split('_');
        const newFilter: ListParams = {
            ...filter,
            _sort: _sort || undefined,
            _order: (_order as 'asc' | 'desc') || undefined,
        };
        onChange(newFilter);
    };

    const handleClearFilter = () => {
        if (!onChange) return;

        const newFilter: ListParams = {
            ...filter,
            _page: 1,
            _sort: undefined,
            _order: undefined,
            name_like: undefined,
        };
        onChange(newFilter);

        if (searchRef.current) {
            searchRef.current.value = '';
        }
    };

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel htmlFor="searchByName">Search by name</InputLabel>
                        <OutlinedInput
                            id="searchByName"
                            label="Search by name"
                            endAdornment={<Search />}
                            defaultValue={filter.name_like}
                            onChange={handleSearchChange}
                            inputRef={searchRef}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6} lg={2}>
                    <FormControl variant="outlined" size="small" fullWidth>
                        <InputLabel id="sortBy">Sort</InputLabel>
                        <Select
                            labelId="sortBy"
                            value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
                            onChange={handleSortChange}
                            ref={selectRef}
                            label="Sort"
                        >
                            <MenuItem value="">
                                <em>No sort</em>
                            </MenuItem>

                            <MenuItem value="name_asc">Name ASC</MenuItem>
                            <MenuItem value="name_desc">Name DESC</MenuItem>
                            <MenuItem value="email_asc">Email ASC</MenuItem>
                            <MenuItem value="email_desc">Email DESC</MenuItem>
                            <MenuItem value="address.city_asc">City ASC</MenuItem>
                            <MenuItem value="address.city_desc">City DESC</MenuItem>
                            <MenuItem value="company.name_asc">Company ASC</MenuItem>
                            <MenuItem value="company.name_desc">Company DESC</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6} lg={1}>
                    <Button variant="outlined" color="primary" fullWidth onClick={handleClearFilter}>
                        Clear
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default UserFilters;