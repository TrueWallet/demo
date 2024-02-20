import { APP_INITIALIZER, FactoryProvider } from "@angular/core";
import { WalletService } from "../../services/wallet/wallet.service";

const initApp = (service: WalletService) => {
  return async () => await service.init();
};

export const appInit: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: initApp,
  multi: true,
  deps: [WalletService],
};
