import React from "react";
import { useSelector } from "react-redux";

const Index = ({ selectedCheckboxData }: any) => {
  const { isChecked }: any = useSelector((state: any) => state.checkbox);

  // Function to convert string to camelCase
  const toCamelCase = (str: string) => {
    return str.replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
              .replace(/\s/g, '')
              .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
  };

  return (
    <div className="mr-28 w-1/2">
      <h1>Selected</h1>
      {selectedCheckboxData?.map((item: any, index: number) => (
        <div key={index}>
          <h2 className="font-bold text-sky-600">{item?.moduleName}</h2>
          {item?.action?.map((action: any, actionIndex: number) => {
            
            const camelCaseModuleName = toCamelCase(item.moduleName.replace(/\s/g, ""));
          
            return isChecked &&
              isChecked[camelCaseModuleName] &&
              isChecked[camelCaseModuleName][action] && (
              <div key={actionIndex}>{action}</div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Index;
