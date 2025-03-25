import { RpcProvider, Signer, Account } from 'starknet';

export const provider = new RpcProvider({
  nodeUrl: 'https://starknet-mainnet.g.alchemy.com/starknet/version/rpc/v0_7/W5QU9A0a-41vVVrU-de4Oo8LkwXq7UEI'
});

//🔑 How to Get an Alchemy Key:
// Go to Alchemy – https://www.alchemy.com
// Sign up or log in
// Create a new app
// Select Starknet as the network
// Choose Mainnet or Testnet
// Copy the RPC URL


const privateKey = '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
const signer = new Signer(privateKey);

let starkAccount: Account;

(async () => {
  const publicKey = await signer.getPubKey(); // Get public key from signer
  console.log('Public Key:', publicKey);

  // Create account using provider, address (public key), and signer
   const starkAccount = new Account(provider, publicKey, signer);
  console.log('Account:', starkAccount);
})();


export { starkAccount };



