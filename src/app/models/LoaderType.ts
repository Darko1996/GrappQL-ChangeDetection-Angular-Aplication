export class LoaderType {
  readonly FULL = 'full';
  readonly BAR = 'bar';

  message: string | undefined;
  type: 'full' | 'bar';

  constructor(type: 'full' | 'bar', message?: string) {
    this.type = type;
    this.message = message;
  }
}
