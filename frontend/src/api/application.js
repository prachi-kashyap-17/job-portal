const BASE_URL = "http://localhost:1703";

export const ApplyOnJob = async (id) => {
  const response = await fetch(`${BASE_URL}/apply/${id}`,{
    method:"POST",
    headers:{
      "content-type":"application/json"
    },
    credentials:"include"
  })
  const recievedata = await response.json();
  if(!response.ok){
    throw{status:response.status,...recievedata}
  }
  return recievedata
}

export const MyApplications=async()=>{
  const response = await fetch(`${BASE_URL}/Myapplication`,{
    method:"GET",
    credentials:"include"
  })
  const recievedata = await response.json();
  if(!response.ok){
    throw{status:response.status,...recievedata}
  }
  return recievedata
}

export const saved = async(id )=>{
  const response = await fetch(`${BASE_URL}/savejob/${id}`,{
    method:"POST",
    headers:{
      "content-type":"application/json"
    },
    credentials:"include"
  })
  const recievedata = await response.json();
  if(!response.ok){
    throw{status:response.status,...recievedata}
  }
  return recievedata
}


export const getsavedjob = async()=>{
  const response = await fetch(`${BASE_URL}/savejob`,{
    method:"GET",
    credentials:"include"
  })
  const recievedata = await response.json();
  if(!response.ok){
    throw{status:response.status,...recievedata}
  }
  return recievedata
}


export const Unsave = async (id) => {
  const response = await fetch(`${BASE_URL}/unsaveJob/${id}`,{
    method:"POST",
    headers:{
      "content-type":"application/json"
    },
    credentials:"include"
  })
  const recievedata = await response.json();
  if(!response.ok){
    throw{status:response.status,...recievedata}
  }
  return recievedata
}

export const getAllapplicants = async(id)=>{
  const response = await fetch(`${BASE_URL}/recruiter/job/${id}/applicants`,{
    method:"GET",
    credentials:"include"
  })
  const recievedata = await response.json();
  if(!response.ok){
    throw{status:response.status,...recievedata}
  }
  return recievedata
}