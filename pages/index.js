import 'sf-font';
import axios from 'axios';

import { pinJSONToIPFS,checkNfts,signInUser, changePic, addPicture,getAccount, addAccount, convertWeiToEth, migrateProfile, transferTokens } from '../components/web3connect';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/router';
 

export default function Home(){
const [nftid,getNftId]=useState(" ");
const[wallet,getWallet]=useState(" ");
const[fileUrl,getFileUrl]= useState(null);
const [tokenamt,getBalance]= useState(0);

const router=useRouter();

useEffect(()=>{
const checkauth= setInterval(()=>{
  checkWallet();
},2000);
return()=> clearInterval(checkauth);
},[]);


async function checkWallet(){
  const output= await checkNfts();
  if(output==0){
    router.push("/denied");
    return;
  }
  
}
 
 
async function getUser(){
  const output= await signInUser();
  const nftidraw=(output.getNftId[0]).toString();
  getNftId(nftidraw);
  getWallet(output.walletaddr);
  const userdata = await getAccount();
  const userurl = userdata.userurl;
  if(userurl==undefined){
    let first= '';
    let last ="";
    let user = "";
    let email ="";

    document.getElementById("first").value=first
    document.getElementById("last").value=last
    document.getElementById("user").value=user
    document.getElementById("email").value=email
    let newuser ="welcome";
    document.getElementById("displayupdatechanged").value=newuser;
    return;
  } 
  else{
    const header={
      "Content-Type":"application/json",
    }
    const userinfo =await axios.get(userurl,header);
let first = userinfo.data.getfirst;
let last = userinfo.data.getlast;
let user = userinfo.data.getuser;
let email = userinfo.data.getemail;
document.getElementById("first").value=first
document.getElementById("last").value=last
document.getElementById("user").value=user
document.getElementById("email").value=email
const tokenbalance = (userdata.balance).toString();
const tokenbalformat = await convertWeiToEth(tokenbalance);
 
getBalance(tokenbalformat);
const picurl= userdata.picurl;
 if(picurl== 'http://***.***.**.*.****/ipfs/'){
getFileUrl('ipfs.png')
 }
 else{
  getFileUrl(picurl);
 }
  }
}
useEffect(()=>{
   
  getUser();
},[wallet]);



 

    async function updateProfile(){
       let getfirst= document.getElementById("first").value.toString();
       let getlast= document.getElementById("last").value.toString();
       let getuser = document.getElementById("user").value.toString();
       let getemail= document.getElementById("email").value.toString();
       if(!getfirst || !getlast || !getuser || !getemail)
        return

       const data = JSON.stringify({getfirst, getlast,getuser,getemail
    });
       const newcid = await pinJSONToIPFS(data);
       await addAccount(newcid);
       let confirmation= 'Profile Updated';
      document.getElementById('displayupdatechanged').innerHTML=confirmation;
    }

async function updatePic(e){
  const file=e.target.files[0];
  const picCid= await changePic(file);
  console.log(picCid);
  await addPicture(picCid);
}

async function migrateAccount(){
  let newwallet= document.getElementById("newwallet").value.toString();
   const result= await migrateProfile(newwallet,nftid);
   if(result =='completed'){
  let confirmation= 'Wallet migrated';
      document.getElementById('walletsuccess').innerHTML=confirmation;
   }
   else{
    let confirmation= 'Migration failed ';
      document.getElementById('walletsuccess').innerHTML=confirmation;
   }
}
 

async function tranferERC(){
  
   const result= await transferTokens();
   if(result =='completed'){
  let confirmation= 'tokens transfered';
      document.getElementById('displaytransfer').innerHTML=confirmation;
   }
   else{
    let confirmation= 'tokens failed ';
      document.getElementById('displaytransfer').innerHTML=confirmation;
   }
}
    return(
        <div className='container'>
<main>
      <div className="py-2 text-center">
          <div className="col-7 p-3 mx-auto">
             
            <img
              className=" mb-4 mr-4 mt-3 ml-4"
              src="metaasss.png"
              alt=""
              width="200"
           
              height="200"
            />
            
          </div>
          <div className="col mt-4 mx-auto">
            <h1 className="mb-0" style={{color:"white"}}>Edit Your </h1>
            <h1 style={{ fontSize: "54px", marginRight: "5px", color: "white" }}>
              
              Profile
            </h1>
          </div>
        </div>
        <div className="row g-6">
          <div className="col-md-3 col-lg-3">
            <form
              className="card p-1"
              style={{
                backgroundColor: "#00000070",
                boxShadow: "0px 1px 5px #ffffff",
              }}
            >
              <img
                className="d-block mx-auto"
                src="ipfs.png"
                alt=""
                style={{
                  maxWidth: "60px",
                  maxHeight: "40px",
                  position: "absolute",
                  boxShadow: "0px, 1px, 10px, #00000070",
                }}
              />
              <h5
                className="d-flex justify-content-end"
                id="displaypicchanged"
              />
              <img
                className="d-block mx-auto mb-4"
                alt=""
              src={fileUrl}
                style={{
                  maxWidth: "250px",
                  maxHeight: "250px",
                  minWidth: "40px",
                  minHeight: "20px",
                }}
              />
              <input
                style={{ backgroundColor: "transparent", color: "white" }}
                className="btn btn-secondary d-flex justify-content-end"
                type="file"
                name="Asset"
                 onChange={updatePic}
                
              />
              Update Profile Avatar 
            </form>
            <h4 className="d-flex justify-content-end align-items-right mt-2 mb-3">
              <span className="text-primary bold">Rank</span>
              <span className="badge bg-primary rounded-pill">39</span>
            </h4>
            <ul className="list-group mb-3">
              <li
                className="list-group-item d-flex justify-content-between"
                style={{ backgroundColor: "#2E69FF30" }}
              >
                <div className="text-success">
                  <h4 className="my-0" style={{ color: "white" }}>
                    NFT
                  </h4>
                  <small style={{ color: "white" }}>PASSPORT</small>
                </div>
                <span style={{ fontSize: "30px", color: "white" }}>
                  ID {nftid}
                </span>
              </li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-8">
            <h4 className="mb-3 d-flex justify-content-end" style={{color:"white"}}>Profile Info</h4>
          
 
            <h5
              className="d-flex justify-content-end"
              id="displayupdatechanged"
            />
            <form className="needs-validation" noValidate>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="first" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="first"
                    id="first"
                    style={{
                      backgroundColor: "#d3d3d310",
                      fontWeight: "lighter",
                      color: "white",
                    }}
                    required
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>

                <div className="col-sm-6">
                  <label htmlFor="last" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="last"
                    id="last"
                    style={{
                      backgroundColor: "#d3d3d310",
                      fontWeight: "lighter",
                      color: "white",
                    }}
                    required
                  />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>

                <div className="col-sm-6">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">@</span>
                    <input
                      type="text"
                      className="form-control"
                      name="user"
                      id="user"
                      style={{
                        backgroundColor: "#d3d3d310",
                        fontWeight: "lighter",
                        color: "white",
                      }}
                      required
                    />
                    <div className="invalid-feedback">
                      Your username is required.
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <label htmlFor="email" className="form-label">
                    Email{" "}
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    style={{
                      backgroundColor: "#d3d3d310",
                      fontWeight: "lighter",
                      color: "white",
                    }}
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>
              </div>
            </form>
            <h6 id="displaysuccess" />
            <button
              className="w-100 btn btn-primary btn-md mt-4"
             onClick={updateProfile}
              style={{
                backgroundColor: "transparent",
                fontWeight: "lighter",
                fontSize: "20px",
              }}
            >
              Update Profile
            </button >
              </div>
          </div>
          <hr className="my-3" />
            <div className="row d-flex">
              <div className="col-lg-6">
                <h4 className="mb-2" style={{color:"white"}}>Wallet Address</h4>
                <h6
                  style={{
                    color: "#83EEFF",
                    fontSize: "13px",

                  }}
                >{wallet}
                </h6>
                <input
                  type="text"
                  className="form-control col-10"
                  name="newwallet"
                  id="newwallet"
                  placeholder="Paste new wallet id"
                  style={{
                    backgroundColor: "#d3d3d310",
                    fontWeight: "lighter",
                    color: "white",
                  }}
                  required
                />
                <button onClick={migrateAccount} className="btn btn-secondary mt-2">
                  Update Wallet
                </button>
                <p className="lead" style={{ fontSize: "12px" }}>
                  Remember your wallet is tied to your NFT, If you update your
                  wallet, your NFT passport will be moved as well! Both items
                  are required for access. Once your NFT has been moved, please
                  re-login using your new wallet.
                </p>
                <h6 id="walletsuccess" />
              </div>
              <div className="col-lg-4">
                <div className="row mb-1">
                  <div className="col-sm-3">
                    
                  </div>
                  <div className='col-md-5'>
                  <h4 className="mb-2">Balance</h4>
                  <h3 className='mt-1'>{tokenamt}</h3>
                  </div>
                <label>Internal Wallet</label>
                <h6
                  style={{
                    color: "#83EEFF",
                    fontSize: "13px",
                  }}
                >
                </h6>
                <h6 className="mt-2">Transfer ZILLA to Personal Wallet</h6>
                <button onClick={tranferERC} className="btn btn-primary mt-2">
                  Transfer ZILLA
                </button>
                <h6 id="displaytransfer" />
                </div>
              </div>
              </div>
        </main>
        </div>
    )
}