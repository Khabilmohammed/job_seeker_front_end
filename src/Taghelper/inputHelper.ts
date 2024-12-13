import React from "react";

const inputHelper = (e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>, data:any) => {
    const tempdata:any = { ...data };
    tempdata[e.target.name] = e.target.value;
    return tempdata;
};

export default inputHelper;