# Tira - Translate

## Simple yet powerful typescript internationalization (i18n) library. Maximal type safety with minimal effort

### Links:

- [GitHub](https://github.com/woundedlands/Tira)
- [npm](https://www.npmjs.com/package/tira-translate)

### About:

#### Advantages:

- 🚀 Maximal typesafety
- 🤝 Really easy to use.
- 📂 Tiny (~5KB gzip, zero deps)
- 🕙 Performant

##### **Maximal typesafety**

Tira provides you **The Best Typesafety** compared to any other typescript lib

You **don't need to repeat yourself** defining translation and interface separately. All types are automatically collected from data model

You **don't need to run background service** to sync types like you would do with typesafe-i18n and some other libs.
**All code** you write is **automatically checked**

#### **Really easy to use**

Minimal boilerplate. It takes few lines to setup library.
All simplest as possible for user

### Installation:

```
npm install tira-translate
```

**Important**: your typescript version should be >= ~4.7.2

### Usage:

#### Simple

```ts
const enLocale = new BaseLocale({
  hello: token("Hello"),
})

const frLocale = enLocale.createChild({
  hello: token("Bonjour"),
})

// Tokens tree just as you defined above
const tokens = enLocale.tokens

const translations = {
  en: new Translation(enLocale),
  fr: new Translation(frLocale),
}

translations.en.get(tokens.hello) // Hello
translations.fr.get(tokens.hello) // Bonjour
```

#### Advanced

```ts
const enLocale = new BaseLocale({
  //  Simple translation
  hi: token("Hi"),
  // Nested translation
  user: {
    // Functional translation
    greet: token((options: { name: string }) => {
      return `Hi ${options.name}`
    }),
  },
})

// Use in your files
export const translateTokens = enLocale.tokens

const frLocale = enLocale.createChild({
  /**
    Use default translations if you don't have all
    (Completely optional)
  */
  ...translateTokens,
  // Override only required
  user: {
    // Options type is automatically detected from base locale
    greet: token(options => {
      return `Bonjour ${options.name}`
    }),
  },
})

const translations = {
  en: new Translation(enLocale),
  fr: new Translation(frLocale),
}

/*
Select translation based on your app logic. 
Simple example for demonstration
*/
const translation = translations.fr

// For simple translations second argument is not used
translation.get(translateTokens.hi)

// Automatically checks type of passed object
translation.get(translateTokens.user.greet, { name: "Ashley" })

/*
Returns an error because object {name: string} is missing. 
You are safe ^..^! 
*/
translation.get(translateTokens.user.greet)
```
