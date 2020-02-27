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

Add redux and react redux

```yarn add redux react-redux```

Add folder `.jest/` to `.gitignore`

# React Hooks

It works only on version higher `16.8.`
React Hooks is the newest of ReactJS. We can make `.tsx` or `.jsx` files cleaner and reusable logic with more possibilities.

React hooks allows us to take a Reactjs functional component and add state and lifecycle methods to it.

React Hooks are special functions to extends the capabilities of functional components and give them the possibility to have lifecycle events and manage state. 

We are goning to compare the differencies between use react hooks and does not use them. 

Whitout use React Hooks: 

```
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0 // Initial value
    };

    this.handleCounter = this.handleCounter.bind(this);
  }

  handleCounter(numb) {
    this.setState({
      count: numb
    })
  }

  render() {
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => this.handleCounter(this.state.count + 1)}>
          Click me
        </button>
      </div>
    );
  }
}

export default Counter
```

Now, With React Hooks: 

```
import React, { useState } from 'react';

function Counter() {
 
  const [count, setCount] = useState(0); // Here we are using useState Hook

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Counter
```

As can you see, our component is cleaner whit react hooks.

### Hook `useState`
```const [value, setValue] = useState(initialState)```

On versions less than `16.8.`, We read our state declaring it that way

```
super(props)
this.state = { 
  valueText: '',
  valueNumber: 0
}
```

Whit this code we can read the state by `this.state.valueText`
We can update the state on this way:

```this.setState({ valueText: 'Lorem Ipsum' })```

Now whit React Hooks, We declare our state in this way: 

```
const [valueText, setValueText] = useState('')
const [valueNumber, setValueNumber] = useState(0)
const [valueArray, setValueArray] = useState([])
```

Whit this code we can read the state by `valueText` or `valueNumber` or `valueArray`

We can update the state on this way:

```setState(newState)```


```
setValueText('Lorem Ipsum')
setValueNumber(9)
setValueArray([1, 2, 3])
```

### Hook `useEffect`

`useEffect(didUptate)`

This hook works like a combination between `componentDidMount` and `componentDidUpdate`.

Into `useEffect` You can add Mutations, subscriptions, timers, logging, fetch and others. 

Here an example: 

```
useEffect(() => {
  // This is called after every render, by default
  console.log('render!');

  // If you want to implement componentWillUnmount
  return () => console.log('unmounting...');
})
```

If you want implement `componentDidMount` only add `[]` at end of `useEffect`

```
 useEffect(() => {
  // This is called after every render, by default
  console.log('render!');
}, [])
```

You can add use effect more than once at the same file.

### Hook `useContext`

`const value = useContext(MyContext)`

Simpler way to consume data from multiple contexts.
This hook is used in combination with the React Context API, It allows us to get the current context value.

This hook is used to pass data from one component to another without being specified to each of the component trees.

Here an example:

```
import React, { useContext } from 'react'

const welcomeRoute = React.createContext({ path: '/welcome' })
const loggedUser = React.createContext(undefined)
const isStatic = React.createContext(false)

export default function App() {
  let welcomeRoute = useContext(welcomeRoute)
  let loggedUser = useContext(loggedUser)
  let isStatic = useContext(isStatic)

  return (
    !isStatic &&
    welcomeRoute.path === '/welcome' &&
    (loggedUser
      ? `Welcome back, ${loggedUser.name}!`
      : 'Welcome!'
    )
  )
}
```

## Jest

Add this folder into `.gitignore` file.

`.jest/`

Run testing with command: 

`yarn jest`

## Deployment

Run your project with `yarn ios` or `yarn android`

## Built With

* [React Native](https://facebook.github.io/react-native/) - The web framework used
* [NodeJS](https://nodejs.org/en/) - Dependency Management
* [yarn](https://yarnpkg.com/) - Dependency Management

## TODO

* Add new components.
* Explain hooks.
* Explain `jest`.
