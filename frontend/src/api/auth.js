const BASE_URL = "https://job-portal-backend-bge0.onrender.com";

export const registerUser = async(formdata)=>{
  const response = await fetch(`${BASE_URL}/register`,{
    method:"POST",
    headers:{
      "content-type":"application/json"
    },
    body:JSON.stringify(formdata)
  })
  const data = await response.json()
  if(!response.ok){
    throw{status:response.status,...data}
  }
  return data
}

export const loginUser = async(loginFormData)=>{
  const response = await fetch(`${BASE_URL}/login`,{
    method:"POST",
    headers:{
      "content-type":"application/json"
    },
    credentials: "include",
    body:JSON.stringify(loginFormData)
  })
  const recivedata = await response.json()
  if(!response.ok){
    throw{status:response.status,...recivedata}
  }
  return recivedata
}

export const logoutUser = async()=>{
  const response = await fetch(`${BASE_URL}/logout`,{
    method:"POST",
    headers:{
      "content-type":"application/json"
    },
    credentials: "include"
  })
  const recieveData = await response.json()
  if(!response.ok){
    throw{status:response.status,...recieveData}
  }
  return recieveData
}





export const getProfile =async()=>{
  const response = await fetch(`${BASE_URL}/profile`,{
    method:"GET",
    credentials:"include"
  })
  const recievedata = await response.json()
  if(!response.ok){
    throw{status:response.status,...recievedata}
  }
  return recievedata
}


export const updateprofile = async (profileData) => {
  const response = await fetch(`${BASE_URL}/updateprofile`, {
    method: "PUT",
    credentials: "include",
    body: profileData,
  });
  const recieveData = await response.json();
  if (!response.ok) {
    throw { status: response.status, ...recieveData };
  }
  return recieveData;
};