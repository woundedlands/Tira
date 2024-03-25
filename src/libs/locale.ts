import { Token } from "./token"

type TokensTree = {
  [key: string]: TokensTree | Token<any>
}

export class Locale<T extends TokensTree> {
  private _tokens: T
  private _paths = new Map<string, Token<any>>()

  constructor(translationsTree: T) {
    this._tokens = translationsTree
    this._setPathOnTokens(translationsTree)
  }

  getTokens() {
    return this._tokens
  }

  /**
   * @deprecated Internal method don't use it manually
   */
  _getTokenByPath(path: string): Token<any> | null {
    return this._paths.get(path) ?? null
  }

  private _setPathOnTokens(
    tokenObject: TokensTree,
    currentPath: string[] = [],
  ): void {
    Object.keys(tokenObject).forEach(key => {
      const currentValue = tokenObject[key]
      if (currentValue instanceof Token) {
        const token = currentValue
        const path = [...currentPath, key].join(".")
        token._setPath(path)
        this._paths.set(path, token)
      } else if (typeof currentValue === "object") {
        this._setPathOnTokens(currentValue, [...currentPath, key])
      }
    })
  }
}
