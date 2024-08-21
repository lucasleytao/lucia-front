import React, { createContext, useContext, useState } from 'react';

const FormDataContext = createContext();

export const useFormData = () => useContext(FormDataContext);

export const FormDataProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        title:"",
        description:""
    });


    const updateFormData = (id, data) => {
        setFormData(prev => ({ ...prev, [id]: data }));
    };

    return (
        <FormDataContext.Provider value={{ formData,}}>
            {children}
        </FormDataContext.Provider>
    );
};
