import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Select from 'react-select';
import CheckboxLabels from '@/components/UI/Checkbox';

export interface EditPermissionDialogProps {
    open: boolean;
    onClose: () => void;
}

function EditPermissionDialog(props: EditPermissionDialogProps) {
    const { onClose, open } = props;
    const [description, setDescription] = React.useState('');
    const [selectedRole, setSelectedRole] = React.useState('');

    const handleClose = () => {
        onClose();
    };

    const handleRoleChange = (selectedOption:any) => {
        setSelectedRole(selectedOption.value);
    };

    const options = [
        { value: 'SUPER_ADMIN', label: 'Super Admin' },
        { value: 'PATIENT', label: 'Patient' },
        { value: 'PRESCRIBER_ADMIN', label: 'Prescriber Admin' }
    ];

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth="lg">
            <DialogTitle className="text-center">Edit Permissions</DialogTitle>
            <div className='flex '>
                <div className="p-4 border-r-2 w-10/12">
                    <div className="flex gap-9">
                        <div>
                            <label htmlFor="permissionName">Permission Name</label>
                            <input type="text" className='w-[550px]' placeholder='Add permission Name'/>
                        </div>
                        <div className='w-[200px]'>
                            <label htmlFor="role">Role:</label>
                            <Select className='w-[350px]' options={options} onChange={handleRoleChange} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <TextField
                            id="description"
                            label="Description"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col items-start gap-4 mt-4">
                        <div className='border-r-2 pr-14'>
                            <h2 className='bg-slate-300 p-4 font-bold'>Configure</h2>
                            <CheckboxLabels roleName={selectedRole} />
                        </div>
                        <div></div>
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClose}
                        className="bg-yellow-200 text-black mt-4"
                    >
                        Save Changes
                    </Button>
                </div>
                <div className='mr-28'>
                    <h1>Selected</h1>
                </div>
            </div>
        </Dialog>
    );
}

export default function EditPermissionDialogDemo({name}:any) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="text-center">
            <Button variant="outlined" onClick={handleClickOpen}>
                {name}
            </Button>
            <EditPermissionDialog open={open} onClose={handleClose} />
        </div>
    );
}
