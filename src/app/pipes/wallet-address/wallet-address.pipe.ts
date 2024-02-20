import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'walletAddress',
  standalone: true
})
export class WalletAddressPipe implements PipeTransform {

  transform(address: string | null, splitter = '6:4'): string {
    if (!address) {
      return '';
    }

    const [startLength, endLength] = splitter.split(':').map((x) => parseInt(x, 10));
    const start = address.slice(0, startLength);
    const end = address.slice(address.length - endLength);
    return start + '...' + end;
  }

}
