import {useState} from 'react';

function useForm(form) {
    const [formData, setFormData] = useState(form);

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData(data => ({...data, [name]: value}))
    }

    const resetForm = () => {
        setFormData(form);
    }

    return {formData, handleChange, resetForm };
}

export default useForm;