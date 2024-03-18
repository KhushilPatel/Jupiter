import React from "react";
import Select from "react-select";
import { RingLoader } from "react-spinners";

const CustomSelect = ({
  options,
  value,
  isLoading, 
  onChange,
  onMenuScrollToBottom,
}:any) => {
  return (
    <Select
      menuIsOpen={true}
      value={value}
      noOptionsMessage={() => "Uh-oh nothing matches your search"}
      onChange={onChange}
      options={options}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          text: "orangered",
          primary: "black",
        },
      })}
      isLoading={isLoading}
      isSearchable
      classNamePrefix={"react-select"}
      isClearable={true}
      styles={{
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.data.value === "load-more" ? "blue" : "white",
          color: state.data.value === "load-more" ? "white" : "black",
        }),
      }}
      onMenuScrollToBottom={onMenuScrollToBottom}
    />
  );
};

export default CustomSelect;
