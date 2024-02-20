import { Pipe, PipeTransform } from '@angular/core';
import Identicon from "identicon.js";

@Pipe({
  name: 'indenticon',
  standalone: true
})
export class IndenticonPipe implements PipeTransform {

  transform(data: string | undefined, size: number = 48): string {
    if (!data) {
      return '';
    }

    const imgBase64 = new Identicon(data, {
      size,
      format: 'svg',
      background: [255, 255, 255, 0],
    }).toString();

    return `data:image/svg+xml;base64,${imgBase64}`;
  }
}
