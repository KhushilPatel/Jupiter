import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from 'react-redux';
import { setisChecked } from "@/redux_toolkit/store/checkboxDataSlice";

const ConfigureData = ({ data }: any) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked]:any = useState({});

  const handleCheckboxChange = (moduleName: string, action: string) => (event: any) => {
    const camelCaseModuleName = toCamelCase(moduleName); // Convert moduleName to camelCase
  
    const updatedState = {
      ...isChecked,
      [camelCaseModuleName]: {
        ...(isChecked[camelCaseModuleName]),
        [action]: event.target.checked
      }
    };
    setIsChecked(updatedState);
    dispatch(setisChecked({ key: camelCaseModuleName, value: updatedState[camelCaseModuleName] }));
  };

  // Utility function to convert string to camelCase
  const toCamelCase = (str: string) => {
    return str.replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
              .replace(/\s/g, '')
              .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
  };

  return (
    <div className="mt-4 h-[500px] overflow-scroll">
      {data?.map((item: any, index: any) => (
        <div key={index} className="border p-4 mb-4 w-[500px]">
          <h1 className="p-4 font-bold">{item.moduleName}</h1>

          <div className="mt-2">
            {item?.action?.map((action: any, actionIndex: any) => {
              const checkboxKey = `${toCamelCase(item.moduleName)}-${action}`;
              return (
                <FormControlLabel
                  key={actionIndex}
                  control={
                    <Checkbox
                      checked={(isChecked[toCamelCase(item.moduleName)] || {})[action] || false}
                      onChange={handleCheckboxChange(
                        item.moduleName,
                        action
                      )}
                    />
                  }
                  label={action}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConfigureData;
