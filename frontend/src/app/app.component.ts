import { Component } from '@angular/core';
import {BigNumberish, ethers}  from 'ethers';
import tokenJson from '../assets/MyToken.json'
import { HttpClient } from '@angular/common/http';
const ERC20VOTES_TOKEN_ADDRESS = "0x4C3271Efc88bd4547C21341B2520176F89E1b1D3"; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  wallet : ethers.HDNodeWallet | undefined ;
  provider : ethers.Provider | undefined ;
  ethersBalance : number | undefined ;
  tokenBalance : number | undefined;
  votingPower : number | undefined;
  tokenContract : ethers.Contract | undefined;
  tokenContractAddress: String | undefined;
  constructor (private http: HttpClient)
  {
  
  }
  
  createWallet ()
  {
    this.provider = ethers.getDefaultProvider("sepolia")
    this.wallet = ethers.Wallet.createRandom().connect(this.provider);
    this.http.get<any>("http://localhost:3000/token-address")
    .subscribe((ans)=>{
      
      this.tokenContractAddress = ans.result;
      if (this.tokenContractAddress && this.wallet && this.provider) {
    this.tokenContract = new ethers.Contract(ERC20VOTES_TOKEN_ADDRESS, tokenJson.abi, this.wallet);
    this.provider.getBalance(this.wallet.address).then((balanceBn) => {
      this.ethersBalance = parseFloat(ethers.formatEther(balanceBn));
    })

    this.tokenContract["balanceOf"](this.wallet.address).then((tokenBalanceBn : BigNumberish) => {
      this.tokenBalance = parseFloat(ethers.formatEther(tokenBalanceBn));
    })
    this.tokenContract["getVotes"](this.wallet.address).then((votePowerBn : BigNumberish) => {
      this.votingPower = parseFloat(ethers.formatEther(votePowerBn))+5;
    })
   }
  });
  }


  vote(voteId: string) {
    console.log ("Trying to vote " + voteId)
  }
}
