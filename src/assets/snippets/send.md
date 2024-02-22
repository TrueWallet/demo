## Send native tokens

Send native tokens to the specified address.

```typescript
import {initTrueWallet} from '@truewallet/sdk';

const wallet = await initTrueWallet({...});
const operationResponse = await wallet.send({to: '0x...', amount: 123.45});
await operationResponse.wait(); // wait for the transaction to be mined
```

For more information please visit <a href="https://docs.true-wallet.io/" target="_blank">docs</a>.
