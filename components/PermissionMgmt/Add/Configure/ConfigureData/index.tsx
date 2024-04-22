import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from 'react-redux';
import { setisChecked } from "@/redux_toolkit/store/checkboxDataSlice";

const ConfigureData = ({ data, defaultSelectedCheckboxData }: any) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked]: any = useState({});
  const { checkboxData }: any = useSelector(
    (state: any) => state.checkbox
  );

  console.log("checkboxData", checkboxData);
console.log("data",data)
  function capitalizeFirstLetter(str: string | undefined): string {
    if (typeof str === 'string' && str.trim().length > 0) {
      return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    } else {
      return '';
    }
  }

  const handleCheckboxChange = (moduleName: string, action: string, event: any) => {
    const camelCaseModuleName = toCamelCase(moduleName);

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

  const toCamelCase = (str: string) => {
    return str.replace(/\s(.)/g, function ($1) { return $1.toUpperCase(); })
      .replace(/\s/g, '')
      .replace(/^(.)/, function ($1) { return $1.toLowerCase(); });
  };

  // Filter out data items based on presence in checkboxData
  const filteredData = checkboxData.filter((item: any) => {
    const moduleName = item.moduleName;
    const moduleExistsInCheckboxData = data.some((checkboxItem: any) => checkboxItem.moduleName === moduleName);
    return moduleExistsInCheckboxData;
  });
  
  console.log("Filtered Data:", filteredData);

  const isSelected = (item:any) => {
  
       return true;
  }
  return (
    <div className="mt-4 h-[500px] overflow-scroll">
      {filteredData?.map((item: any, index: any) => (
        <div key={index} className="border p-4 mb-4 w-[500px]">
          <h1 className="p-4 font-bold">{capitalizeFirstLetter(item?.moduleName)}</h1>

          <div className="mt-2">
            {item?.action?.map((action: any, actionIndex: any) => {
              return (
                <FormControlLabel
                  key={actionIndex}
                  control={
                    <Checkbox
                    defaultChecked={true}
                      checked={(isChecked[toCamelCase(item.moduleName)] || {})[action] || false}
                      onClick={(e: any) => handleCheckboxChange(
                        item?.moduleName,
                        action,
                        e
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
