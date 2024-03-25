import { Token } from "./token"

type TokensTree = {
  [key: string]: TokensTree | Token<any>
}

/**
 * Definition of locale
 */
export class Locale<Tree extends TokensTree> {
  protected _tokens: Tree
  private _paths = new Map<string, Token<any>>()

  protected constructor(translationsTree: Tree) {
    this._tokens = translationsTree
    this._setPathOnTokens(translationsTree)
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

/**
 * Definition of base locale.
 * Allows you to create child locales with same interface as base.
 */
export class BaseLocale<Tree extends TokensTree> extends Locale<Tree> {
  constructor(translationsTree: Tree) {
    super(translationsTree)
  }

  get tokens() {
    return this._tokens
  }

  /**
   * Creates child translation with same interface as BaseLocation
   */
  createChild(tree: Tree): Locale<Tree> {
    return new Locale(tree)
  }
}
