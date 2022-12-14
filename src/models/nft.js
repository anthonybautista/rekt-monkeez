import {getNFTContract} from "@/utils/contract";

function NFT(tokenId, pic, staked) {
    this.tokenId = tokenId;
    this.pic = pic;
    this.staked = staked ?? false;
}

NFT.getURI = async function (address, token) {
    let contract = getNFTContract(address);
    return await contract.tokenURI(token);
}


export default NFT;