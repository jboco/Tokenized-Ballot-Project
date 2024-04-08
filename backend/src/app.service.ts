import { Injectable } from '@nestjs/common';
import {ethers} from 'ethers';
import * as tokenJson from './assets/MyToken.json';
const ERV20VOTES_TOKEN_ADDRESS = "0x4C3271Efc88bd4547C21341B2520176F89E1b1D3";

export class tokenRequestInfo {
  address: string;
  amount: number;
}

@Injectable()
export class AppService {
  provider: ethers.Provider;
  erc20Contract: ethers.BaseContract;

  constructor(){
    this.provider = ethers.getDefaultProvider("sepolia");
    const erc20ContractFactory = new ethers.ContractFactory(tokenJson.abi, tokenJson.bytecode);
    this.erc20Contract = erc20ContractFactory.attach(ERV20VOTES_TOKEN_ADDRESS).connect(this.provider);
  
  }
  getTokenAddress() {
    return ERV20VOTES_TOKEN_ADDRESS;
  }

  requestToken (toAddress: string, amount: number){
    
  }
}
