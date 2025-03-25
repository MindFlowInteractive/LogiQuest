// import { Injectable, Logger } from '@nestjs/common';
// import  {getStarknet}  from '@argent/get-starknet';

// @Injectable()
// export class WalletService {
//   private readonly logger = new Logger(WalletService.name);

//   async connectWallet() {
//     try {
//       const starknet = await getStarknet();

//       if (!starknet) {
//         throw new Error('Starknet wallet not installed');
//       }

//       await starknet.enable();

//       const address = starknet.selectedAddress;
//       this.logger.log(`Connected wallet address: ${address}`);

//       return { address };
//     } catch (error) {
//       this.logger.error(`Failed to connect wallet: ${error.message}`);
//       throw new Error(`Failed to connect wallet: ${error.message}`);
//     }
//   }
// }
