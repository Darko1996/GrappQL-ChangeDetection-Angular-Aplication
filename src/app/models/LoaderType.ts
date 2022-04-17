export class LoaderType {
  readonly FULL = 'full';

  message: string | undefined;
  type: 'full';

  constructor(type: 'full', message?: string) {
    this.type = type;
    this.message = message;
  }
}
