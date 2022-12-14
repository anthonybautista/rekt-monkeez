import {getErc20Contract} from "@/utils/contract";

function Token(name, address) {
    this.name = name;
    this.address = address;
}

Token.getBalance = async function (address, account) {
    let contract = getErc20Contract(address);
    return await contract.balanceOf(account);
}

Token.approve = async function (address, operator, amount) {
    let contract = getErc20Contract(address);
    try {
        let tx = await contract.approve(operator, amount);
        await tx.wait();
        console.log(`https://snowtrace.io/tx/${tx.hash}`);
        return `Approved!`;
    } catch (e) {
        console.log(e);
        return e["reason"];
    }
}


export default Token;