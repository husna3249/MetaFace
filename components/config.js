import {ethers} from "ethers";
import {create as ipfsHttpClient} from "ipfs-http-client";
import userDbAbi from "../components/userdb.json";
import tokenAbi from "../components/nftabi.json";
export const client= ipfsHttpClient('http://***.***.*.***:****');
export const userdbaddress="0x63F4436cD50B5Db46F9D18c4A948d2b28B579Dc8";
export const rpc='https://rpc.ankr.com/polygon_mumbai';
const updaterwallet='private key ';
export const nftcontract='0x4981Ce06B2b18cfD9bA645fb93b858b4299D55FF';
export const tokenaddress='0x862d95cb9D51B75D995fbE6135B4B2F179D770bE';

 const provider = new ethers.providers.JsonRpcProvider(rpc)
const updater= new ethers.Wallet(updaterwallet,provider);
export const usercontract = new ethers.Contract(userdbaddress,userDbAbi,updater);
export const tokencontract = new ethers.Contract(tokenaddress,tokenAbi,updater);
 