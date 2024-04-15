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
import { useCookies } from 'react-cookie';
import { clearSelectedCheckboxData } from "@/redux_toolkit/store/checkboxDataSlice";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ZodType, any, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
export interface AddPermissionDialogProps {
  open: boolean;
  onClose: () => void;
  Editdetails: any; // Add Editdetails prop here
  name:any
}
type formData = {
  name: string;
  description: string;
};

function AddPermissionDialog(props: AddPermissionDialogProps) {
  const { onClose, open ,Editdetails,name} = props;
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState("");
  const [configureKey, setConfigureKey] = React.useState(Date.now());
  const [dataKey, setDataKey] = React.useState(Date.now());
  const { isChecked }: any = useSelector((state: any) => state.checkbox);
  console.log("Add permission", isChecked);
  const [{ auth }] = useCookies(['auth']);
  const { selectedCheckboxData }: any = useSelector(
    (state: any) => state.checkbox
  );
  console.log("selectedcheckbox data", selectedCheckboxData);
console.log("newwwEditdetails",Editdetails)
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (open) {
      setValue('name', Editdetails?.name || '');
      setValue('description', Editdetails?.description || '');
      setSelectedRole(Editdetails?.role || '');
      setConfigureKey(Date.now());
      setDataKey(Date.now());
      dispatch(clearSelectedCheckboxData()); // Dispatch action to clear selected checkbox data
    }
  }, [open, dispatch]);

  const schema: ZodType<formData> = z.object({
    name: z.string(),
    description: z.string(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<formData>({ resolver: zodResolver(schema) });



  function toCamelCase(inputString:any) {
    return inputString.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
  }
  
  const actions: any[] = [];
  for (const moduleName in isChecked) {
    const camelModuleName = toCamelCase(moduleName); // Convert module name to camelCase
    const selectedActions = [];
    for (const action in isChecked[moduleName]) {
      if (isChecked[moduleName][action]) {
        selectedActions.push(action);
      }
    }
    if (selectedActions.length > 0) {
      actions.push({
        moduleName: camelModuleName, // Use camelCase module name
        action: selectedActions
      });
    }
  }
  
  console.log("actions", actions);



  function toSnakeCase(inputString:any) {
    return inputString.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
  }
  
  const permissions:any = [];
  for (const moduleName in isChecked) {
    for (const action in isChecked[moduleName]) {
      if (isChecked[moduleName][action]) {
        const formattedModuleName = toSnakeCase(moduleName);
        const formattedAction = toSnakeCase(action);
        permissions.push(`${formattedModuleName}_${formattedAction}`);
      }
    }
  }


console.log("permissions", permissions);

// Filter out duplicate permissions
const filteredPermissions = Array.from(new Set(permissions));

console.log("filteredPermissions", filteredPermissions);



  const handleClose = async (formData: formData) => {
    console.log("It worked", formData);
    console.log(selectedRole);
    onClose();
    try {
      setLoading(true)
      const payload = {
        Authorization: `Bearer ${auth}`,
    };
      const response = await axios.post(
        `https://jupiter.cmdev.cc/admin-permission-group`,
        {
          name: formData.name,
          role: selectedRole,
          description: formData.description,
          permissions:permissions,
          permissionData: actions,
        },
        {
          headers:payload
        }
      );
    } catch (error) {
      console.error("Error fetching checkbox data:", error);
    }
    finally{
      setLoading(false)
    }
  };

  const handleRoleChange = (selectedOption: any) => {
    setSelectedRole(selectedOption.value);
  };

  const options = [
    { value: "SUPER_ADMIN", label: "Super Admin" },
    { value: "PATIENT", label: "Patient" },
    { value: "PRESCRIBER_ADMIN", label: "Prescriber Admin" },
  ];
  const currentSelection = [{label: selectedRole, value: selectedRole}];
  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="lg">
      <DialogTitle className="text-center">{name}</DialogTitle>
      <form onSubmit={handleSubmit(handleClose)}>
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
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500">
                    Permission Name is required
                  </span>
                )}
              </div>
              <div className="w-[200px]">
                <label htmlFor="role">Role:</label>
                <Select
                  className="w-[150px]"
                  value={currentSelection}
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
                {...register("description", { required: true })}
              />
              {errors.description && (
                <span className="text-red-500">Description is required</span>
              )}
            </div>
            <div className="flex gap-4 mt-4">
              <div>
                {/* Configure */}
                <div className="Configure">
                  <ConfigurePermissions
                    key={configureKey}
                    roleName={selectedRole}
                    defaultSelectedCheckboxData={Editdetails?.permissionData}
                  />
                </div>
                <div className="flex justify-end w-2/4">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
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
      </form>
    </Dialog>
  );
}

export default function AddPermissionDialogDemo({ name , Editdetails}: any) {

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
  const handleClose = async () => {
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
     
                <AddPermissionDialog
                name={name}
                    Editdetails={Editdetails}
                    open={open}
                    onClose={handleClose}
                />
         
    </div>
  );
}
