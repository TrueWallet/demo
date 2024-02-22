## Send ERC-20 tokens

Send ERC-20 tokens to the specified address.

```typescript
import {initTrueWallet} from '@truewallet/sdk';

const wallet = await initTrueWallet({...});
const usdtAddress = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';
const operationResponse = await wallet.sendErc20({to: '0x...', amount: 123.45, tokenAddress: usdtAddress});
await operationResponse.wait(); // wait for the transaction to be mined
```

For more information please visit <a href="https://docs.true-wallet.io/" target="_blank">docs</a>.
