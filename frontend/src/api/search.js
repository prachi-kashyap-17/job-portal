const BASE_URL = "http://localhost:1703";


export const getsearchJob = async(title,location)=>{
  const response = await fetch(`${BASE_URL}/searchjob?title=${encodeURIComponent(title)}&location=${encodeURIComponent(location)}`,{
    method:"GET"
  })
  const data = await response.json()
  if(!response.ok){
    throw{status:response.status,...data}
  }
  return data
}
