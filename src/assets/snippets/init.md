## Overview

This is the demo project of TrueWallet Smart Account. The same integration could be implemented in any mobile or web app for your customers.

## Wallet Initialization

To init your wallet with the TrueWallet SDK, you need to provide a signer and a bundler URL, which could be taken from the <a href="https://dashboard.true-wallet.io/" target="_blank">dashboard</a>.

```typescript
import {initTrueWallet} from '@truewallet/sdk';

/** Initialisation with salt */
const trueWallet = await initTrueWallet({
  signer: {
    type: 'salt',
    data: ['{{YOUR_UNIQUE_STRING_FOR_PRIVATE_KEY_GENERATION}}']
  },
  bundlerUrl: '{{ENDPOINT_URL_FROM_DASHBOARD}}',
  // Optional, bundlerUrl is used when rpcProviderUrl is not provided
  // rpcProviderUrl: '{{ENDPOINT_URL_FROM_DASHBOARD}}',
});
```

To get wallet address, run the following code:

```typescript
const address = trueWallet.address;
```

To get wallet balance, run the following code:

```typescript
const balance = await trueWallet.getBalance();
```

For more information please visit <a href="https://docs.true-wallet.io/" target="_blank">docs</a>.
