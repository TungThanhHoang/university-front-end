import React, { useState } from 'react'
import { Select } from 'antd';

const { Option } = Select;

export default function SelectView({ gpa , groupItem , setGroupItem}) {
    const { term } = groupItem
    const handleOnChange = (value) => {
        setGroupItem({ ...groupItem,  term: value });
    }
    let arr = []
    const handleConvert = () => {
        if (gpa !== undefined) {
            arr.push(...Object.keys(gpa));
        }
    }
    handleConvert()
    return (
        <>
            <Select
                className="mb-4"
                name="select_term"
                showSearch
                style={{
                    width: 220,
                }}
                value={term}
                onChange={handleOnChange}
                optionFilterProp="children"
               
            >
                {arr?.map(item => <Option key={item} value={item}>{item}</Option>)}
            </Select>
        </>
    )
}
