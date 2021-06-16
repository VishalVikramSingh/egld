const {Account, Transaction, GasLimit, TransactionPayload, NetworkConfig, Balance, ProxyProvider, Mnemonic, UserSigner} = require("@elrondnetwork/erdjs");

let sender = new Account("erd1tpuwcsq28szvqmhty7jhgute77yv7mv9hlpq7e65q8mw6jzk8y3qvxgtd7");
let reciever = new Account("erd16x7le8dpkjsafgwjx0e5kw94evsqw039rwp42m2j9eesd88x8zzs75tzry");

let x = new Mnemonic("oil comfort chalk style access above forum imitate.....")

// console.log(x.deriveKey())

let key = x.deriveKey();

let signer = new UserSigner(key);

let mainnet = new ProxyProvider("https://gateway.elrond.com", 20000);

async function sendTxn(){
	await NetworkConfig.getDefault().sync(mainnet);

    await sender.sync(mainnet);
    console.log("here")
    await reciever.sync(mainnet);
    let initialBalanceOfReciever = reciever.balance;

    let transaction = new Transaction({
            receiver: reciever.address,
            value: Balance.egld(9999999999)
        });

    transaction.setNonce(sender.nonce);
    sender.incrementNonce();

    await signer.sign(transaction);
    await transaction.send(mainnet);

    await transaction.awaitExecuted(mainnet);
}

sendTxn();
