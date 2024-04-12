import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import ConfigureData from '../Add/Configure/ConfigureData';
import { clearSelectedCheckboxData } from '@/redux_toolkit/store/checkboxDataSlice';
import SelectedCheckboxData from '@/components/PermissionMgmt/Add/SelectedData';
import CheckboxLabels from '@/components/UI/Checkbox';
import { useCookies } from 'react-cookie';
import axios from 'axios'; // Import Axios

export interface EditPermissionDialogProps {
    open: boolean;
    onClose: () => void;
    Editdetails: any; // Add Editdetails prop here
}

function EditPermissionDialog(props: EditPermissionDialogProps) {
    const dispatch = useDispatch();
    const { onClose, open, Editdetails } = props;
    const [{ auth }] = useCookies(['auth']);
    const { register, handleSubmit, setValue } = useForm();
    const [selectedRole, setSelectedRole] = React.useState('');

    React.useEffect(() => {
        if (open) {
            setValue('name', Editdetails.name || '');
            setValue('description', Editdetails?.description || '');
            setValue('role', Editdetails?.role || '');
            setSelectedRole(Editdetails?.role || '');
            dispatch(clearSelectedCheckboxData());
        }
    }, [open, Editdetails, setValue, dispatch]);

    console.log("EditDetails",Editdetails)

    const { selectedCheckboxData }: any = useSelector((state: any) => state.checkbox);

    const handleClose = () => {
        onClose();
    };

    const onSubmit = async (data: any) => {
        try {
            onClose();
            console.log('Form data:', data);

            const payload = {
                Authorization: `Bearer ${auth}`,
               
            };

            const response = await axios.patch(`https://jupiter.cmdev.cc/admin-permission-group/${Editdetails.id}`,{ name: data.name,
            description: data.description,
            permissions: selectedCheckboxData.map((checkbox: any) => (`${checkbox.moduleName.replace(/\s+/g, '_').toLowerCase()}_${checkbox.action}`)),
            permissionData: selectedCheckboxData.map((checkbox: any) => ({ action: checkbox.action, moduleName: checkbox.moduleName.toLowerCase() })),
            role: data.role} ,{headers:payload});

            console.log('API response:', response.data);

            dispatch(clearSelectedCheckboxData());
            onClose();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth="lg">
            <DialogTitle className="text-center">Edit Permissions</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex'>
                    <div className="p-4 border-r-2 w-10/12">
                        <div className="flex gap-9">
                            <div>
                                <label htmlFor="permissionName">Permission Name</label>
                                <input
                                    type="text"
                                    className='w-[550px]'
                                    placeholder='Add permission Name'
                                    {...register('name')}
                                />
                            </div>
                            <div className='w-[200px]'>
                                <label htmlFor="role">Role:</label>
                                <input
                                    type="text"
                                    className='w-[150px]'
                                    placeholder='Role'
                                    value={selectedRole}
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="description">Description:</label>
                            <TextField
                                id="description"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={4}
                                {...register('description')}
                            />
                        </div>
                        <div className="flex items-start gap-4 mt-4">
                            <div className='border-r-2 pr-14'>
                                <h2 className='bg-slate-300 p-4 font-bold'>Configure</h2>
                                
                                <CheckboxLabels roleName={selectedRole} />
                            </div>
                            <div>
                                <ConfigureData data={selectedCheckboxData} />
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className="bg-yellow-200 text-black mt-4"
                        >
                            Save Changes
                        </Button>
                    </div>
                    <div className='mr-28'>
                        <SelectedCheckboxData selectedCheckboxData={selectedCheckboxData} />
                    </div>
                </div>
            </form>
        </Dialog>
    );
}

export default function EditPermissionDialogDemo({ name, Editdetails }: any) {
    const [open, setOpen] = React.useState(false);
    const [currentEditDetails, setCurrentEditDetails] = React.useState(null); // Change initial state to null

    React.useEffect(() => {
        console.log('currentEditDetails updated:', currentEditDetails);
    }, [currentEditDetails]);

    const handleClickOpen = (details: any) => {
        console.log('handleClickOpen called with details:', details);
        setCurrentEditDetails(details);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="text-center">
            <Button variant="outlined" onClick={() => handleClickOpen(Editdetails)}>
                {name}
            </Button>
            {currentEditDetails !== null && (
                <EditPermissionDialog
                    Editdetails={currentEditDetails}
                    open={open}
                    onClose={handleClose}
                />
            )}
        </div>
    );
}
