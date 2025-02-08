import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AddTask = async (data: {
  description: string;
  fromTime: Date;
  toTime: Date;
}) => {
  console.log(data);
  console.log(localStorage.getItem("id"));
  const response = await axios.post(`${BASE_URL}/daily/tasks`, {
    ...data,
    fromTime: new Date(data.fromTime).toISOString(),
    toTime: new Date(data.toTime).toISOString(),
    employeeId: localStorage.getItem("id"),
  });

  return response.data;
};



export const GetTask = async () => {
    const response = await axios.get(`${BASE_URL}/daily/tasks/${localStorage.getItem("id")}`);
  
    return response.data;
  };

  
export const GetOneTask = async (id: string) => {
    const response = await axios.get(`${BASE_URL}/daily/task/${id}`);
  
    return response.data;
  };
  
  export const DeleteTask = async (id: string) => {
    return axios.delete(`${BASE_URL}/daily/tasks/${id}`, {
      
    });
  };

  export const GetDailySummary = async () => {
    const response = await axios.get(`${BASE_URL}/daily/summary/${localStorage.getItem("id")}`);
  
    return response.data;
  };


  export const UpdateTask = async (data: {
    description: string;
    fromTime?: any;
    toTime?: any;
  }, id:string) => {
    console.log(data);
    console.log(localStorage.getItem("id"));
    const response = await axios.put(`${BASE_URL}/daily/tasks/${id}`, {
      ...data,
      fromTime: new Date(data.fromTime).toISOString(),
      toTime: new Date(data.toTime).toISOString(),
      employeeId: localStorage.getItem("id"),
    });
  
    return response.data;
  };
  