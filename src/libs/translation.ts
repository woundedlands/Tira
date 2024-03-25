import { TiraError } from "./error"
import { Locale } from "./locale"
import { Token, TokenOptions } from "./token"

type OptionsIfDefined<T> = T extends undefined ? never : TokenOptions

export class Translation<T extends Locale<any>> {
  private _locale

  constructor(locale: T) {
    this._locale = locale
  }

  get = this._get.bind(this)

  private _get<T extends undefined>(token: Token<T>): string
  private _get<T extends TokenOptions>(token: Token<T>, options: T): string
  private _get<T extends TokenOptions | undefined>(
    token: Token<T>,
    options?: OptionsIfDefined<T>,
  ): string {
    const path = token._getPath()
    const currentLocaleToken = this._locale._getTokenByPath(path)
    if (currentLocaleToken === null) {
      throw new TiraError("Passed invalid token to Translation")
    }

    return currentLocaleToken._translate(options as any)
  }
}
