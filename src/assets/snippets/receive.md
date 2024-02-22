## Read contract

Read any data from the contract, for instance `allowance`.

```typescript
import {initTrueWallet} from '@truewallet/sdk';

const wallet = await initTrueWallet({...});
const usdtAddress = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';
const usdtAbi = ['function allowance(address owner, address spender) view returns (uint256)'];
const allowance = await wallet.readContract({
  address: usdtAddress,
  abi: usdtAbi,
  method: 'allowance',
  args: ['0x...', '0x...']
});
console.log(allowance); // 1000000000000000000
```

For more information please visit <a href="https://docs.true-wallet.io/" target="_blank">docs</a>.
