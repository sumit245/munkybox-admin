import axios from "axios";


export const getClients=()=>{
    let Client=axios
      .get("/api/users/")
      .then((res) => {
        let Client;
        Client=res.data
        return Client
        
      })
      .catch((err) => {
        console.log(err);
      });
      return Client 
}

export const getClientbyID=(idofclient)=>{
  let Client=axios
      .get("/api/users/"+idofclient)
      .then((res) => {
        let Client;
        Client=res.data
        return Client
        
      })
      .catch((err) => {
        console.log(err);
      });
      return Client 
}
export const addClient=(newClient)=>{
  axios.post('/api/users/',newClient).then((res)=>{
    console.log(res.data)
  }).catch((err)=>{
    console.log(err)
  })
}
export const deleteMultipleClient=(arrClient)=>{
  axios.delete('/api/users/',arrClient).then((res)=>{
    console.log(res.data);
  }).catch((err)=>{
    console.log(err);
  })
}
export const deleteClient=(idofclient)=>{
  axios.delete('/api/users/'+idofclient).then((res)=>{
    console.log(res);
  }).catch((err)=>{
    console.log(err);
  })
}

export const updateClient = (idofclient, newClient) => {
  console.log(idofclient);
  axios.post('/api/users/'+idofclient,newClient).then((res)=>{
    console.log(res.data)
  }).catch((err)=>{
    console.log(err)
  })
}
