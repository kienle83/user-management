import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { useState } from 'react';
import { User } from '../../../models';


const useStyles = makeStyles((theme) => ({
    table: {},
    edit: {
        marginRight: theme.spacing(1),
    },
}));

export interface UserTableProps {
    userList: User[];
    onEdit?: (user: User) => void;
    onRemove?: (user: User) => void;
}

function UserTable({
    userList,
    onEdit,
    onRemove,
}: UserTableProps) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User>();

    const handleClose = () => {
        setOpen(false);
    };

    const handleRemoveClick = (user: User) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const handleRemoveConfirm = (user: User) => {
        onRemove?.(user);
        setOpen(false);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {userList.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.address.city}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.company.name}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        size="small"
                                        className={classes.edit}
                                        color="primary"
                                        onClick={() => onEdit?.(user)}
                                    >
                                        Edit
                                    </Button>

                                    <Button size="small" color="secondary" onClick={() => handleRemoveClick(user)}>
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Remove user dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Remove a user?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to remove user named "{selectedUser?.name}". <br />
                        This action can&apos;t be undo.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default" variant="outlined">
                        Cancel
                    </Button>

                    <Button
                        onClick={() => handleRemoveConfirm(selectedUser as User)}
                        color="secondary"
                        variant="contained"
                        autoFocus
                    >
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default UserTable;