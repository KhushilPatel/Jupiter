// AddPermissionDialog.js

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Select from "react-select";
import ConfigurePermissions from "@/components/PermissionMgmt/Add/Configure/index";
import ConfigureData from "@/components/PermissionMgmt/Add/Configure/ConfigureData/index";
import SelectedCheckboxData from "@/components/PermissionMgmt/Add/SelectedData/index";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedCheckboxData } from "@/redux_toolkit/store/checkboxDataSlice";

export interface AddPermissionDialogProps {
  open: boolean;
  onClose: () => void;
}

function AddPermissionDialog(props: AddPermissionDialogProps) {
  const { onClose, open } = props;
  const [description, setDescription] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState("");
  const [configureKey, setConfigureKey] = React.useState(Date.now());
  const [dataKey, setDataKey] = React.useState(Date.now());
  
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (open) {
      setDescription("");
      setSelectedRole("");
      setConfigureKey(Date.now());
      setDataKey(Date.now());
      dispatch(clearSelectedCheckboxData()); // Dispatch action to clear selected checkbox data
    }
  }, [open, dispatch]);

  const handleClose = () => {
    onClose();
  };

  const { selectedCheckboxData }: any = useSelector(
    (state: any) => state.checkbox
  );

  const handleRoleChange = (selectedOption: any) => {
    setSelectedRole(selectedOption.value);
  };
  const options = [
    { value: "SUPER_ADMIN", label: "Super Admin" },
    { value: "PATIENT", label: "Patient" },
    { value: "PRESCRIBER_ADMIN", label: "Prescriber Admin" },
  ];

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="lg">
      <DialogTitle className="text-center">Add Permissions</DialogTitle>
      <div className="flex">
        <div className="p-4 border-r-2 w-10/12">
          {/* Input Fields */}
          <div className="flex gap-9">
            <div>
              <label htmlFor="permissionName">Permission Name</label>
              <input
                type="text"
                className="w-[550px]"
                placeholder="Add permission Name"
              />
            </div>
            <div className="w-[200px]">
              <label htmlFor="role">Role:</label>
              <Select
                className="w-[150px]"
                options={options}
                onChange={handleRoleChange}
              />
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
          <div className="flex gap-4 mt-4">
            <div>
              {/* Configure */}
              <div className="Configure">
                <ConfigurePermissions
                  key={configureKey}
                  roleName={selectedRole}
                />
              </div>
              <div className="flex justify-end w-2/4">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                  className="bg-yellow-200 text-black mt-4"
                >
                  Save Changes
                </Button>
              </div>
            </div>

            {/* Configure Data */}
            <ConfigureData key={dataKey} data={selectedCheckboxData} />
          </div>
        </div>
        {/* Selected Checkbox */}
        <SelectedCheckboxData selectedCheckboxData={selectedCheckboxData} />
      </div>
    </Dialog>
  );
}

export default function AddPermissionDialogDemo({ name }: any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="text-center">
      <button
        className="bg-violet-500 hover:bg-blue-500 text-2xl "
        onClick={handleClickOpen}
      >
        {name}
      </button>
      <AddPermissionDialog open={open} onClose={handleClose} />
    </div>
  );
}
