# React Native TypeScript Workshop :rocket:

This is a workshop about react native. how use hooks with typescript and integrate testing.

## Getting Started
What is TypeScript ? The official documentation says: 

`JavaScript that scales.
TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
Any browser. Any host. Any OS. Open source.`

We can create JavaScript code cleaner.

### Prerequisites

First we need to install `react native cli`. 
We can install with the [Facebook's official documentation](https://facebook.github.io/react-native/docs/getting-started.html).

You need to be careful:exclamation:

Follow the instructions `React Native CLI Quickstart`. 

:warning: If you follow the `Expo CLI Quickstart`, You can not follow this workshop:exclamation:.

### Installing

If you have installed `react-native cli`, Let's go to create our project with `TypeScript`.

First we need to create our project.

```
react-native init rnworkshop
cd rnworkshop

```

Adding Typescript
The next step is to add TypeScript to your project. The following commands will:

* add TypeScript to your project
* add React Native TypeScript Transformer to your project
* initialize an empty TypeScript config file, which we'll configure next
* add an empty React Native TypeScript Transformer config file, which we'll configure next
* adds typings for React and React Native

```
yarn add --dev typescript
yarn add --dev react-native-typescript-transformer
yarn tsc --init --pretty --jsx react
touch rn-cli.config.js
yarn add --dev @types/react @types/react-native
```

The tsconfig.json file contains all the settings for the TypeScript compiler. The defaults created by the command above are mostly fine, but open the file and uncomment the following line:

```
{
  /* Search the config file for the following line and uncomment it. */
  // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
}
```

The rn-cli.config.js contains the settings for the React Native TypeScript Transformer. Open it and add the following:

```
module.exports = {
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer');
  },
  getSourceExts() {
    return ['ts', 'tsx'];
  },
};
```

Rename the generated `App.js` and `__tests_/App.js` files to `App.tsx`. `index.js` needs to use the `.js` extension. All new files should use the `.tsx` extension (or `.ts` if the file doesn't contain any JSX).


## Running the tests

React Native ships with `Jest`, so for testing a React Native app with TypeScript, we'll want to add `ts-jest` to our devDependencies.

```
yarn add --dev ts-jest
```

Then, we'll open up our package.json and replace the jest field with the following:

```
{
  "jest": {
    "preset": "react-native",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js"
    ],
    "transform": {
      "^.+\\.(js)$": "<rootDir>/node_modules/babel-jest",
      "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
    },
    "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    "testPathIgnorePatterns": [
      "\\.snap$",
      "<rootDir>/node_modules/"
    ],
    "cacheDirectory": ".jest/cache"
  }
}
```

This will configure Jest to run `.ts` and `.tsx` files with `ts-jest`.

Now, we need to install libraries into `dev` dependencies, That help us to write TypeScript Code. 

```
yarn add --dev @types/jest @types/react @types/react-native @types/react-test-renderer
```

Add folder `.jest/` to `.gitignore`

```
# Jest
#
.jest/
```

Run testing with command: 

```
yarn jest
```

## Deployment

Run your project with `yarn ios` or `yarn android`

## Built With

* [React Native](https://facebook.github.io/react-native/) - The web framework used
* [NodeJS](https://nodejs.org/en/) - Dependency Management
* [yarn](https://yarnpkg.com/) - Dependency Management
* [Native Base](https://nativebase.io/) - Style guide

## Authors

* **Fernando Amezcua** - *Initial work* - [Bio](https://fernandoamz.github.io/)

## License

This project is licensed under the MIT License

## TODO

* Add new components.
* Explain hooks.
* Explain best practices with `jest`.
* Explain how make a Release.
* Explain Navigation.
* Explain Style Guide.
