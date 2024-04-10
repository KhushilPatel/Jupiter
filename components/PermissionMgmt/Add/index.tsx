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
}
type formData = {
  name: string;
  description: string;
};

function AddPermissionDialog(props: AddPermissionDialogProps) {
  const { onClose, open } = props;
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

  const schema: ZodType<formData> = z.object({
    name: z.string(),
    description: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formData>({ resolver: zodResolver(schema) });



  const toCamelCase = (str: string) => {
    return str.replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
              .replace(/\s/g, '')
              .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
  };
  
  const actions = selectedCheckboxData
    .filter((checkbox: any) => {
      const moduleName = toCamelCase(checkbox?.moduleName.replace(/\s/g, ""));
      return isChecked &&
        isChecked[moduleName] &&
        isChecked[moduleName][checkbox.action];
    })
    .map((checkbox: any) => ({
      action: checkbox?.action,
      moduleName: checkbox?.moduleName?.toLowerCase(),
    }));
  

  
  console.log("actions", actions);

  const permissions = selectedCheckboxData
  .filter((checkbox: any) => {
    const moduleName = toCamelCase(checkbox?.moduleName.replace(/\s/g, ""));
    return isChecked &&
      isChecked[moduleName] &&
      isChecked[moduleName][checkbox.action];
  })
  .map((checkbox: any) => (`${checkbox.moduleName.replace(/\s+/g, '_').toLowerCase()}_${checkbox.action}`));


console.log("permissions", permissions);


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

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="lg">
      <DialogTitle className="text-center">Add Permissions</DialogTitle>
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

export default function AddPermissionDialogDemo({ name }: any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
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
      <AddPermissionDialog open={open} onClose={handleClose} />
    </div>
  );
}
