import axios from "axios";
const mongokey= 'zUwb8NVzZM7eaBGl0rQ82VBp9t5GHHft41qxSjyHpBp9FCsJB0c8kqd20BW9x1qc';
const mongourl='https://ap-south-1.aws.data.mongodb-api.com/app/data-vmanf/endpoint/data/v1/action/';

const mongoheader={
    "Content-Type": "application/json",
    "api-key":mongokey,
}
export async function storeWallet(addresstr, walletaddr, walletkey) {
     await axios.post(mongourl + "insertOne",
        {
          collection: "profiles",
          database: "zilla-database",
          dataSource: "Cluster0",
          document: {
            wallet: addresstr,
            paywallet: walletaddr,
            private: walletkey,
          }
        },
        mongoheader 
      
      
    ).catch ((error)=> {
      console.error('Store wallet call failed:'+ error);
    })
  }
  
  export async function updateWallet(oldwallet, newwallet) {
   await axios.post(mongourl + "updateOne",
        {
          collection: "profiles",
          database: "zilla-database",
          dataSource: "Cluster0",
          filter: {
            wallet: oldwallet,
          },
          update: {
            wallet: newwallet,
          }
        },
       mongoheader 
      ).catch ((error)=> {
      console.error('Update wallet call failed:'+ error);
    })
  }
  
  export async function getPayInfo(addresstr) {
  const getInfo= await axios.post(mongourl + "findOne",
        {
          collection: "profiles",
          database: "zilla-database",
          dataSource: "Cluster0",
          filter: {
            wallet: addresstr,
          }
        },
         mongoheader
      ).catch ((error)=> {
      console.error('Get pay info call failed:'+ error);
      return getInfo.data.document.private;
    })
  }
  