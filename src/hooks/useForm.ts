import { TUserForm } from "../services/types/data";
import {useState} from 'react';

export function useForm(inputValues: TUserForm) {
    const [form, setForm] = useState(inputValues);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {value, name} = event.target;
      setForm({...form, [name]: value});
    };

    return {form, handleChange, setForm};
  }