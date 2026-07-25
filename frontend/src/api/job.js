const BASE_URL = "http://localhost:1703";

export const createJob =async(jobdetail)=>{
  const response = await fetch(`${BASE_URL}/recruiter/postjob`,{
    method:"POST",
    headers:{
      "content-type":"application/json"
    },
    credentials: "include",
    body:JSON.stringify(jobdetail)
  })
  const recievedata = await response.json();
  if(!response.ok){
    throw{status:response.status,...recievedata}
  }
  return recievedata
} 


export const getAllJobs =async()=>{
  const response = await fetch(`${BASE_URL}/jobs`,{
    method:"GET",
  })
  const recievedata = await response.json();
  if(!response.ok){
    throw{status:response.status,...recievedata}
  }
  return recievedata
}

export const getSingleJob = async(id)=> {
  const response = await fetch(`${BASE_URL}/jobs/${id}`,{
    method:"GET",
  })
  const recievedata = await response.json();
  if(!response.ok){
    throw{status:response.status,...recievedata}
  }
  return recievedata
}

export const getMyJobs =async()=>{
  const response = await fetch(`${BASE_URL}/recruiter/myjobs`,{
    method:"GET",
    credentials:"include"
  })
  const recievedata = await response.json()
  if(!response.ok){
    throw{status:response.status,...recievedata}
  }
  return recievedata
}

export const deleteJobById = async(id)=>{
  const response = await fetch(`${BASE_URL}/recruiter/deletepost/${id}`,{
    method:"DELETE",
    credentials:"include",
  })
  const recievedata = await response.json();
  if(!response.ok){
    throw{status:response.status,...recievedata}
  }
  return recievedata;
}

export const editpost = async(id,oldpost)=>{
  const response = await fetch(`${BASE_URL}/recruiter/updatepost/${id}`,{
    method:"PUT",
     headers:{
      "content-type":"application/json"
    },
    credentials:"include",
    body:JSON.stringify(oldpost),
  })
  const recievedata = await response.json();
  if(!response.ok){
    throw{status:response.status,...recievedata}
  }
  return recievedata;
}