export const WalletAddressSnippet: string =
  `  import {initTrueWallet} from '@truewallet/sdk';

  /** Initialisation with salt */
  const trueWallet = await initTrueWallet({...});
  const address = trueWallet.address;`

export const WalletBalanceSnippet: string =
  `import {initTrueWallet} from '@truewallet/sdk';

/** Initialisation with salt */
const trueWallet = await initTrueWallet({...});
const balance = await trueWallet.getBalance;`
