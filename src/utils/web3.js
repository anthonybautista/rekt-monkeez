import {ethers} from 'ethers'
import web3 from 'web3'

const POLLING_INTERVAL = 12000
const RPC_URL = "https://api.avax.network/ext/bc/C/rpc"
//const RPC_URL = "https://api.avax-test.network/ext/bc/C/rpc"
export const getLibrary = () => {
    const httpProvider = new web3.providers.HttpProvider(RPC_URL)
    const web3NoAccount = new ethers.providers.Web3Provider(httpProvider)
    web3NoAccount.pollingInterval = POLLING_INTERVAL;
    return web3NoAccount
}


export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL)