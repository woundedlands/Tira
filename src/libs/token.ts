export type TokenOptions = Record<string, unknown>

export class Token<T extends TokenOptions | undefined> {
  /**
   * @deprecated Internal method don't use it manually
   */
  _translate
  private _path!: string
  constructor(settings: string | ((options: T) => string)) {
    if (typeof settings === "string") {
      this._translate = () => {
        return settings
      }
    } else {
      this._translate = settings
    }
  }

  /**
   * @deprecated Internal method don't use it manually
   */
  _setPath(path: string) {
    this._path = path
  }

  /**
   * @deprecated Internal method don't use it manually
   */
  _getPath() {
    return this._path!
  }
}

export function token<T extends TokenOptions | undefined>(
  options: ConstructorParameters<typeof Token<T>>[0],
) {
  return new Token<T>(options)
}
