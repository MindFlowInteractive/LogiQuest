// scripts/generate-starknet-key.js
const { ec } = require('starknet');

// Generate a random private key
const privateKey = `0x${ec.starkCurve.utils.randomPrivateKey()}`;
console.log('Generated Starknet Private Key:', privateKey);

// For Starknet, the public key can be derived from the private key
// But we won't use the actual starknet.js functions for this in the script
// since they require async operations with a provider

console.log('\nAdd these to your .env file:');
console.log(`STARKNET_PRIVATE_KEY=${privateKey}`);
console.log('');
console.log("Note: For STARKNET_ACCOUNT_ADDRESS, you'll need to:");
console.log(
  '1. Create a testnet wallet with Argent X or Braavos browser extension',
);
console.log('2. Fund it with testnet tokens from the Starknet faucet');
console.log('3. Copy your wallet address to STARKNET_ACCOUNT_ADDRESS in .env');
