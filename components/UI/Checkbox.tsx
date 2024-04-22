import React, { useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useCallback } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedCheckboxData, removeSelectedCheckboxData, setCheckboxData} from '@/redux_toolkit/store/checkboxDataSlice';
import axios from 'axios';
import { RingLoader } from 'react-spinners';

export default function CheckboxLabels(props:any) {
    const [{ auth }] = useCookies(['auth']);
    const { roleName, defaultSelectedCheckboxData } = props;
    const [checkboxData, SetCheckboxData]:any = useState([]);  
    const dispatch = useDispatch();
    const selectedCheckboxData = useSelector((state:any) => state.checkbox.selectedCheckboxData);
    const [loading, setLoading] = useState(false);
    const dispatchedModuleNames = new Set();
    function capitalizeFirstLetter(str: string | undefined): string {  
       
        if (typeof str === 'string' && str.trim().length > 0) {
          
            return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        } else {
           
            return '';
        }
    }
      
    useEffect(() => {
        fetchCheckboxData();
    }, [roleName]);
    useEffect(() => {
        // console.log("defaultSelectedCheckboxData",defaultSelectedCheckboxData)
        // Set the initial checked state for checkboxes
        if (defaultSelectedCheckboxData) { 
            defaultSelectedCheckboxData.map((item:any) => {  
                if (!dispatchedModuleNames.has(item.moduleName)) {
                    const capitalizedModuleName = capitalizeFirstLetter(item.moduleName);
                    dispatch(addSelectedCheckboxData({ ...item, moduleName: capitalizedModuleName }));
                    dispatchedModuleNames.add(item.moduleName);
                }   
            });    
        }   
    }, [roleName]); 

    const fetchCheckboxData = async () => { 
        try {
            setLoading(true);
            const payload = {
                Authorization: `Bearer ${auth}`,
            };
            const response = await axios.post(
                `https://jupiter.cmdev.cc/admin-permission-group/modules`,
                {
                    roleName: roleName,
                },
                {
                    headers: payload,
                }
            );
            SetCheckboxData(response.data);
            dispatch(setCheckboxData(response?.data?.module));
        } catch (error) {
            console.error('Error fetching checkbox data:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleCheckboxClick = useCallback((item: any, checked: any) => {
        if (checked) {
            dispatch(addSelectedCheckboxData(item));
        } else {
            dispatch(removeSelectedCheckboxData(item));
        }
    }, [dispatch]); // Add any other dependencies if they're used inside the callback

    const isSelected = (item:any) => {
       
        // console.log(defaultSelectedCheckboxData?.some((selectedItem:any) =>capitalizeFirstLetter( selectedItem.moduleName )=== item.moduleName))
        return defaultSelectedCheckboxData?.some((selectedItem:any) =>capitalizeFirstLetter( selectedItem.moduleName )=== item.moduleName);
    };   
  
    return (
        <FormGroup className={`min-w-full bg-white rounded-lg ${loading ? 'opacity-50' : ''}`}>
            {loading && (
                <div className="inset-0 flex  items-end bg-white bg-opacity-75 z-50">
                    <RingLoader color="#4A90E2" loading={loading} />
                </div>
            )}
            {checkboxData?.module?.map((item:any, index:any) => (
                <FormControlLabel
                    key={index}
                    control={
                        <Checkbox
                            defaultChecked={isSelected(item)}
                            onChange={(event) => handleCheckboxClick(item, event.target.checked)}
                        />
                    }
                    label={item?.moduleName}
                />
            ))}
        </FormGroup>
    );
}
