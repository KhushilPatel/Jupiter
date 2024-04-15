// CheckboxLabels.js

import React, { useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedCheckboxData, removeSelectedCheckboxData } from '@/redux_toolkit/store/checkboxDataSlice';
import axios from 'axios';
import { RingLoader } from 'react-spinners';

export default function CheckboxLabels(props:any) {
    const [{ auth }] = useCookies(['auth']);
    const { roleName ,defaultSelectedCheckboxData} = props;
    const [checkboxData, setCheckboxData]:any = useState([]);
    const dispatch = useDispatch();
    const selectedCheckboxData = useSelector((state:any) => state.checkbox.selectedCheckboxData);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCheckboxData();
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
            setCheckboxData(response.data);
        } catch (error) {
            console.error('Error fetching checkbox data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxClick = (item:any, checked:any) => {
        if (checked) {
            dispatch(addSelectedCheckboxData(item));
        } else {
            dispatch(removeSelectedCheckboxData(item));
        }
    };
    function capitalizeFirstLetter(str:any) {
        return str.replace(/\b\w/g, (char:any) => char.toUpperCase());
    }
    
    console.log("defaultSelectedCheckboxData", defaultSelectedCheckboxData.map((item:any) => capitalizeFirstLetter(item.moduleName)));

    const isSelected = (item:any) => {
        return defaultSelectedCheckboxData.some((selectedItem:any) => capitalizeFirstLetter(selectedItem.moduleName) === item.moduleName);
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
                            onChange={(event) => handleCheckboxClick(item, event.target.checked)
                            }
                        />
                    }
                    label={item?.moduleName}
                />
            ))}
         
        </FormGroup>
    );
}
