export class CustomeError {
  constructor(public code: number, public msg: string, public error?: Error) {}
}
