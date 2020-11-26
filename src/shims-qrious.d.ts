declare module "qrious" {
  // options: https://www.npmjs.com/package/qrious
  interface QRiousOptions {
    background?: string;
    backgroundAlpha?: number;
    element?: HTMLElement;
    foreground?: string;
    foregroundAlpha?: number;
    level?: string;
    mime?: string;
    padding?: number;
    size?: number;
    value?: string;
  }

  export default class QRious implements QRiousOptions {
    constructor(options?: QRiousOptions);

    set(options: QRiousOptions): void;
    toDataURL(mime?: string): string;
  }
}
