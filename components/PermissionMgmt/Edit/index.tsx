import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from "react-redux";
import ConfigureData from '../Add/Configure/ConfigureData';
import { clearSelectedCheckboxData } from "@/redux_toolkit/store/checkboxDataSlice";
import SelectedCheckboxData from '@/components/PermissionMgmt/Add/SelectedData';
import CheckboxLabels from '@/components/UI/Checkbox';

export interface EditPermissionDialogProps {
    open: boolean;
    onClose: () => void;
    Editdetails: any; // Add Editdetails prop here
}

function EditPermissionDialog(props: EditPermissionDialogProps ) {
    const dispatch = useDispatch();
    const { onClose, open,Editdetails } = props;
    const [name, setName] = React.useState(Editdetails.name);
    const [description, setDescription] = React.useState(Editdetails?.description);
    const [dataKey, setDataKey] = React.useState(Date.now());
    const [configureKey, setConfigureKey] = React.useState(Date.now());
    const [selectedRole, setSelectedRole] = React.useState(Editdetails?.role);

    React.useEffect(() => {
        if (open) {
          setConfigureKey(Date.now());
          setDataKey(Date.now());
          dispatch(clearSelectedCheckboxData()); // Dispatch action to clear selected checkbox data
        }
      }, [open, dispatch]);

    const { selectedCheckboxData }: any = useSelector(
        (state: any) => state.checkbox
      );
 
    const handleClose = () => {
        onClose();
    };

    const handleRoleChange = (selectedOption:any) => {
        setSelectedRole(selectedOption.value);
    };

    const handlechange=(e:any)=>{
        setName(e.target.value)
       
    }

    

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth="lg">
            <DialogTitle className="text-center">Edit Permissions</DialogTitle>
            <div className='flex '>
                <div className="p-4 border-r-2 w-10/12">
                    <div className="flex gap-9">
                        <div>
                            <label htmlFor="permissionName">Permission Name</label>
                            <input type="text" className='w-[550px]' value={name} onChange={handlechange} placeholder='Add permission Name'/>
                        </div>
                        <div className='w-[200px]'>
                            <label htmlFor="role">Role:</label>
                           <button className='bg-lime-100 border-none'>{selectedRole}</button>
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
                            value={description}
                        onChange={(e) => setDescription(e.target.value)}
                          
                        />
                    </div>,
                    <div className="flex items-start gap-4 mt-4">
                        <div className='border-r-2 pr-14'>
                            <h2 className='bg-slate-300 p-4 font-bold'>Configure</h2>
                            <CheckboxLabels roleName={selectedRole} />
                        </div>
                        <div>
                        <ConfigureData key={dataKey} data={selectedCheckboxData} />
                        </div>
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
        
                    <SelectedCheckboxData selectedCheckboxData={selectedCheckboxData} />
                </div>
            </div>
        </Dialog>
    );
}

export default function EditPermissionDialogDemo({name,Editdetails}:any) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
console.log("details",Editdetails)
    return (
        <div className="text-center">
            <Button variant="outlined" onClick={handleClickOpen}>
                {name}
            </Button>
            <EditPermissionDialog Editdetails={Editdetails}  open={open} onClose={handleClose} />
        </div>
    );
}
