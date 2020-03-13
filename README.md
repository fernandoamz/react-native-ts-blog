# React Hooks, TypeScript And Redux for React Native

Welcome to the React Hooks, TypeScript And Redux for React Native blogpost. I will talk about how to use React Hooks with TypeScript and React Native. For this blogpost, we are going to build a counter app. This exercise consists in two buttons that increment or decrement the state of our app. We are going to implement Hooks to see the benefits of using them, and how to integrate TypeScript and Redux. Then, we are going to test with Jest.

### Getting started with TypeScript
According to the documentation, TypeScript is:

JavaScript that scales. TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Any browser. Any host. Any OS. Open source.

TypeScript helps us create JavaScript code cleaner. TypeScript is an object-oriented programming language. It requires a TypeScript compiler to convert into a JavaScript file.

When I started with TypeScript, it was difficult for me to understand it. It was because I was using the dynamic typed part of JavaScript. TypeScript forces us to create data types specifics. 

TypeScript was designed by Anders Hejlsberg at Microsoft. It is both a language and a set of tools. It is a strongly typed, object oriented, compiled language. It is a superset of JavaScript compiled to JavaScript. TypeScript is JavaScript with some additional features.

TypeScript was created to make JavaScript code development safe.
TypeScript uses all the code found in JavaScript with other coding concepts like classes, modules, interfaces, and types. It allows developers to detect errors and debug applications easier. 

### Benefits to use TypeScript:
- It is purely object-oriented programming.
- It can be used for client-side and server-side development equal.
- It offers a “compiler” that can convert to JavaScript-equivalent code.
- It has an API for DOM manipulation.
- It has a namespace concept by defining a “Module”.
- We can create Classes, Interfaces, Generics.
- The compiler is used to convert to JavaScript so it can run on web pages.
- Null checking when you are in development.
- It can use Access modifiers.
- It can use NameSpaces.
- TypeScript has static type checking.

TypeScript is able to point out errors in compilation ever during development. TypeScript also supports JavaScript libraries and API documentation. In TypeScript the same code can be run on any browser, device and operating system. JavaScript code is TypeScript code. It can be converted into TypeScript just changing the extension of the file from “.js” to “.ts”.

### Install environment
Let's go to create our project with TypeScript.
First we need to create our project.

`react-native init rnworkshop`
`cd rnworkshop`

### Adding Typescript
The next step is to add TypeScript to your project. The following commands will:

Add TypeScript to your project
```yarn add --dev typescript```

Add React Native TypeScript Transformer to your project
```yarn add --dev react-native-typescript-transformer```

initialize an empty TypeScript config file, which we'll configure next
```yarn tsc --init --pretty --jsx react```

add an empty React Native TypeScript Transformer config file, which we'll configure next
 
`touch rn-cli.config.js`
`adds typings for React and React Native`
`yarn add --dev @types/react @types/react-native`

This package contains type definitions for React 
The `rn-cli.config.js` contains the settings for the React Native TypeScript Transformer. This lines will transform the TSX files to JS files, you need open it and add the following:

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

Rename the generated App.js and `__tests__/App.js ` files to App.tsx. All new files should use the .tsx extension (or .ts if the file doesn't contain any JSX code). It is the extension of TypeScript.

# Redux
Redux is a package that helps us create only one state into our app. The only way to change the state is through dispatch actions. 

### How does it work?
It works as a single store. We can access our application store through the Dispatch function. The Dispatch will call the Actions. The Actions need to be defined to call the Reducers. The Reducers will do changes into the global store.

You can use Redux according to your needs. There exist other alternatives such as Flux.

### A practical example.
The counter example app is good to understand the changes in the state. The counter example is about an initialState that will be called counter. Two functions will change the initialState through the dispatch. We will define the Actions, and then, we are going to change the file App.tsx to use Hooks. We are using Redux because only one state must exist in the app and with Redux we can do that.

### Store
One storage hold the state tree of your application. Store is not a class, it's just an object with a few methods on it.

Store Methods
- getState()
    This method will return the current state tree from the app.
- dispatch(action)
    Executes an action type. This is the only way to make changes into the state.
- subscribe(listener)
    Adds a change listener. It will be called any time an action is dispatched.
- replaceReducer(nextReducer)
    Replaces the reducer currently used by the store to calculate the state.

If we want to create a store, we need to create a file in the root path called `store.ts`. The store is created by two methods `createStore` and `combineReducers`. Let's create it.

```
import {createStore, combineReducers} from 'redux';
import counter from './reducers/counterReducer';

const rootReducer = combineReducers({
  counter,
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
```

`createStore` holds all the state tree of your app.The only way to change this store is with Dispatch Actions.

`combineReducers` is a helper function from the Redux package that will return an object with all the reducers declared into the combineReducer helper.

`rootReducer` will return an object with all our Reducers. The Reducers will be explained shortly.

`configureStore` will return our store with all our Reducers into it.

## Actions
Into the Actions we have functions. These functions will be called by the view through the Dispatch. We need to return these functions two parameters: the type and payload.

### Type

They define a file usually called `types.ts` into a folder called actions. This name is usually used by convention. You can use whatever name to define them. For the counter example we are going to need two action types `INCREMENT_COUNT` and `DECREMENT_COUNT`. We need to export these constants into a file.

```
// actions/types.ts
export const INCREMENT_COUNT = 'INCREMENT_COUNT';
export const DECREMENT_COUNT = 'DECREMENT_COUNT';
```

Now, we need to create a new file with the name `incrementer.ts` into the same folder. In this new file we are going to declare the functions. These functions will return the `type` and `payload`.

```
// actions/incrementer.ts
import {INCREMENT_COUNT, DECREMENT_COUNT} from './types';

export const incrementCount = (counter: number) => {
  return {
    type: INCREMENT_COUNT,
    payload: counter,
  };
};

export const decrementCount = (counter: number) => {
  return {
    type: DECREMENT_COUNT,
    payload: counter,
  };
};
```

We have finished the Actions. Redux knows what `type` needs to query.

### Reducers.
It helps us specify how the state will change. They are a response to the Actions sent to the store. The actions describe what happened, they do not describe how the state will change. We are going to create the reducer for the counter example. We are going to define the changes that we need into our state.

Usually, Reducers go in the folder “reducers”. The files in the Reducers use the Reducer’s name and prefix `Reducer`. For example:

```
// reducers/counterReducer.ts
import { INCREMENT_COUNT, DECREMENT_COUNT } from '../actions/types';

const initialState = {
  counter: 0,
};

const counter = (state = initialState, action: any) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return {
        ...state,
        counter: state.counter + 1,
      };

    case DECREMENT_COUNT:
      return {
        ...state,
        counter: state.counter - 1,
      };

    default:
      return state;
  }
};

export default counter;

```
We need to import the action types we defined previously. Then, we define the initial state. This is the state for counter example.

```
const initialState = {
  counter: 0,
};

```
This function is the Reducer’s name. This reducer will need to get the state and the action.

```
const counter = (state = initialState, action: any) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return {
        ...state,
        counter: state.counter + 1,
      };

    case DECREMENT_COUNT:
      return {
        ...state,
        counter: state.counter - 1,
      };

    default:
      return state;
  }
};

```
Now we need to import redux on our `App.tsx` component. We need to import the actions too. 

- mapStateProps: This function returns the global store with the latest changes.

- mapDispatchToProps:  Here, we can call the dispatch functions. We can modify the global state.

We need to connect our component with the global state with the connect function on react-redux
```
export default connect(
  mapStateProps,
  mapDispatchToProps,
)(App);

```
Here, the complete example: 

```
import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { incrementCount, decrementCount } from '../actions/incrementer';

function App(props: any) {
  return (
    <View style={styles.containerView}>
      <Text>{props.counter.counter}</Text>
      <Button
        title="Increment"
        onPress={() => props.increment(props.counter.counter)}
      />
      <Button
        title="Decrement"
        onPress={() => props.decrement(props.counter.counter)}
      />
    </View>
  );
}

const mapStateProps = (state: any) => {
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    increment: (counter: number) => {
      dispatch(incrementCount(counter));
    },

    decrement: (counter: number) => {
      dispatch(decrementCount(counter));
    },
  };
};

export default connect(
  mapStateProps,
  mapDispatchToProps,
)(App);

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

In summary, Redux is a predictable state container. It is an easy way to implement a global store. Redux is flexible, centralized and debuggable for JS apps. In this case we are using Redux with React. You can use Redux with other front end frameworks.
 
TypeScript in Redux has the potential to bring type safety for Reducers, state, Action creators, and UI components. It has easy refactoring of typed code for your React Redux app. Take time to evaluate the decision to use typescript on your app.


## React Hooks
A React Hook is a special function that allows us to use React features. React hooks allow us to take a functional component, manage its state and lifecycle methods.
I can say that React Hooks have helped me create cleaner React code. The tedious way to write this.state is over with React Hooks. In new files you can make separate files to logic and view.
React Hooks work on version higher than 16.8. It is the newest of ReactJS. Without them, we have to bind all classes because the functions must be updated through the render. We have to declare our class component and get all the props into the component. We have to declare our state and update it with a special method of react `this.state.value`. Like the example below:

```
import React, { Component } from 'react';
import { View, Button, Text } from 'react-native'

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0 
};

    this.handleCounter = this.handleCounter.bind(this);
  }

  handleCounter(counter) {
    this.setState({
      count: counter
    })
  }

  render() {
    return (
      <View style={{ margin: 100 }}>
        <Text>You clicked {count} times</Text>
        <Button title=”Increment” onPress={() => this.handleCounter(this.state.count + 1)} />
        <Button title=”Decrement” onPress={() => this.handleCounter(this.state.count - 1)} />
      </View>
    );
  }
}

export default Counter
```

Now we can use the hook `useState` into React. The state is declared within our functional component. We do not have to bind our clases and the way to declare the state is using Hooks to give the values to our initial structure. We can read the values of our state easier only by declaring the state name.
This is the equivalent code of the previous example.

```
import React, {useState} from 'react';
import {View, Button, Text} from 'react-native';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <View style={{ margin: 100 }}>
      <Text>You clicked {count} times</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
      <Button title="Decrement" onPress={() => setCount(count - 1)} />
    </View>
  );
}

export default Counter;
```

Our state is better to read with this React Hook and the code is shorter. React Hooks allow us to create modular and extensible code. In this blog we will review the basic React Hooks.

The basic React Hooks:
- useState
- useEffect
- useContext

More Hooks:
- useReducer
- useCallback
- useMemo
- useRef
- useImperativeHandle
- useLayoutEffect
- useDebugValue

We can create our own Hooks, it is simple. We will see an example about how to create our own Hooks and you will see the benefits.
 
Hook useState
The state reflects the values that you need for your render. It can be declared in every .JSX file. You can keep all data types in the state. The state always returns us the most recent changes.

`const [value, setValue] = useState(initialState)`

On versions previous than 16.8, we read our state declaring it that way
```
super(props)
this.state = { 
  valueText: '',
  valueNumber: 0
}
```

With this code we can read the state by this.state.valueText. We can update the state in this way:

```
this.setState({
  valueText: 'Lorem Ipsum'
})

```
Now with React Hooks, we declare our state in this way:
`const [valueText, setValueText] = useState('')`
`const [valueNumber, setValueNumber] = useState(0)`
`const [valueArray, setValueArray] = useState([])`

With this code we can read the state by valueText or valueNumber or valueArray. We can update the state on this way:
`setState(newState)`

For example:

`setValueText('Lorem Ipsum')`
`setValueNumber(9)`
`setValueArray([1, 2, 3])`

useState allows us to use state and other React features without writing a class. useState is an array with two positions. The first position saves the current state. The second position has a method to change the state’s value.
Suppose that we want to add an automatic increment or decrement for our counter example. We need to declare a state into our functional component called automatic, first we need import the “useState” Hook:

`import { useState } from “react”`

If we need a Hook, first we have to import it from the React library. Now, we can declare our state. As good practice we need to name our value first in camelCase. The second position needs to be called with the prefix set plus the state’s name.

`const [automaticIncrement, setAutomaticIncrement] = useState(false);`
`const [automaticDecrement, setAutomaticDecrement] = useState(false);`
`const [stop, setStop] = useState(true);`

Our state is ready to accept changes in the values. For this example we are going to need these three variables because one will increment automatically and other will decemente automatically. Both are with the boolean value `false`. The third option is to stop the automatic function. It is `true` because in the view the value is held in zero . Those are the initial values.
We are going to add three more buttons in the view. They change the state to  `true` when we want to use the automatic function.

```
<Button
  title="Auto Increment"
  onPress={() => {
    setAutomaticIncrement(true);
    setAutomaticDecrement(false);
    setStop(false);
  }}
/>
<Button
  title="Auto Decrement"
  onPress={() => {
    setAutomaticIncrement(false);
    setAutomaticDecrement(true);
    setStop(false);
  }}
/>
<Button
  title="Stop"
  onPress={() => {
    setStop(!stop);
  }}
/>

```
We have prepared all to use the `useEffect` hook. This hook will allow you to change the value every time that the render is working.

### Hook useEffect
`useEffect(didUptate)`

This Hook works like a combination of componentDidMount and componentDidUpdate.
With useEffect, you can add mutations, subscriptions, timers, logging, fetch and others. To use this Hook, we need to import it from the React library, like this:

```
import { useEffect } from ‘react’
useEffect(() => {
  // This is called after every render, by default
  console.log('render!');

  // If you want to implement componentWillUnmount
  return () => console.log('unmounting...');
})

If you want implement componentDidMount only add [] at end of useEffect
useEffect(() => {
  // This is called after every render, by default
  console.log('render!');
}, [])

```
You can add useEffect more than once to the same file. For the automatic function to counter example we need to declare the useEffect into our functional component. These Hooks will work calling our dispatch and executing the reducer for increment or decrement automatically:

```
useEffect(() => {
    if (automaticIncrement && !stop) {
      setTimeout(() => {
        props.increment(props.counter.counter);
      }, 100);
    }
    if (automaticDecrement && !stop) {
      setTimeout(() => {
        props.decrement(props.counter.counter);
      }, 100);
    }
});

```
The three buttons declared previously will change the state of our component. With useEffect we are going to read the values from the state tree. We will be able to activate the increment or decrement option. We are using a setTimeout as you can see for call the dispatch action from Redux depending on the case. If we press the button `Auto increment` or `Auto decrement`, we will see the automatic function running. If we press the option stop the auto running will stop. It is a good example on how the `useEffect` works. We have the complete example below:
 
```
import React, {useEffect, useState} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {incrementCount, decrementCount} from '../actions/incrementer';
 
function App(props: any) {
  const [automaticIncrement, setAutomaticIncrement] = useState(false);
  const [automaticDecrement, setAutomaticDecrement] = useState(false);
  const [stop, setStop] = useState(true);
 
  useEffect(() => {
    if (automaticIncrement && !stop) {
      setTimeout(() => {
        props.increment(props.counter.counter);
      }, 100);
    }
 
    if (automaticDecrement && !stop) {
      setTimeout(() => {
        props.decrement(props.counter.counter);
      }, 100);
    }
  });
 
  return (
    <View style={styles.containerView}>
      <Text>{props.counter.counter}</Text>
      <Button
        title="Increment"
        onPress={() => props.increment(props.counter.counter)}
      />
      <Button
        title="Decrement"
        onPress={() => props.decrement(props.counter.counter)}
      />
      <Button
        title="Auto Increment"
        onPress={() => {
          setAutomaticIncrement(true);
          setAutomaticDecrement(false);
          setStop(false);
        }}
      />
      <Button
        title="Auto Decrement"
        onPress={() => {
          setAutomaticIncrement(false);
          setAutomaticDecrement(true);
          setStop(false);
        }}
      />
      <Button
        title="Stop"
        onPress={() => {
          setStop(!stop);
        }}
      />
    </View>
  );
}
 
const mapStateProps = (state: any) => {
  return {
    counter: state.counter,
  };
};
 
const mapDispatchToProps = (dispatch: any) => {
  return {
    increment: (counter: number) => {
      dispatch(incrementCount(counter));
    },
 
    decrement: (counter: number) => {
      dispatch(decrementCount(counter));
    },
  };
};
 
export default connect(
  mapStateProps,
  mapDispatchToProps,
)(App);
 
const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

## Hook useContext
const value = useContext(MyContext)
The React Context API allows you to easily access data on different levels of the component tree, without having to pass data down through props. Context is mainly used when some data has to be accessible by many components at different levels of nesting. Apply it sparingly because it makes component reuse more difficult.

useContext helps us make our code modular. It allows us to pass properties between screens. For example, If we have a Toolbar. It needs to keep the same styles on all screens. We are going to add a toolbar example to our application. We are going to pass the styles for useContext.

First, we are going to import our useContext Hook.
`import React, { useContext } from 'react';`

Then, we need to import the react native components for the styles and views.
`import { StyleSheet, View, Text } from 'react-native';`

The object theme is to save the different toolbar’s styles. For this example, we are going to save two different colors for the toolbar `light` and  `dark`.

```
const themes = {
  light: {
    background: '#eeeeee',
  },
  dark: {
    background: '#222222',
  },
};
```

We need to create our context using the React Context API. This function will create a context object with all methods. The image below is an example.

`const ThemeContext = React.createContext(themes.light);`

The provider will pass the value for the tree. We are passing the light value from our theme object. The value only will be read to the component wrapped.

```
function ToolBar() {
  return (
    <ThemeContext.Provider value={themes.light}>
      <ThemedToolbar />
    </ThemeContext.Provider>
  );
}
```

We are going to create our ThemedToolbar functional object. Into this component we are going to call useContext Hook. We pass the ThemeContext declared previously. The image below is an example for the object that it will return us.

ThemedToolbar is the functional component for show in the render. Now, we can use the object within the context.

```
function ThemedToolbar() {
  const theme = useContext(ThemeContext);
 
  return (
    <View style={styles.marginView}>
      <View
        style={Object.assign(
          {backgroundColor: theme.background},
          styles.viewText,
        )}>
        <Text>{theme.title}</Text>
      </View>
    </View>
  );
}
```

We are using the context to pass a style to our view and the toolbar’s title. You can see it in the code above highlighted in blue.

We must export our ToolBar that has the provider property. 
`export default ToolBar;`

This is the style guide used. marginView is for using a margin in our app. textColor has the color for our text into the text component. viewText is for center the content of our view.

```
const styles = StyleSheet.create({
  marginView: {
    marginTop: 100,
  },
  textColor: {
    color: 'blue',
    fontWeight: 'bold',
    marginLeft: 60,
  },
  viewText: {
    width: '80%',
    height: 40,
    marginLeft: 30,
  },
});

```

In summary, this Hook can be used to pass values into our components. React.createContext is to wrap the object that you want to make modular. If you want to make changes to the values only you need modify this object to do it. Provider works to pass values of our context wrapped. Use this hook depending on your needs.

### Building your own hook
We have our component with the classic counter example:
This is a practical example about how to create our own hook.

```
import React, { useState } from "react"
import { View, Button, Text } from "react-native"

function App() {
  const [count, setCount] = useState(0);

  function Increment() {
    setCount(count + 1);
  }

  function Decrement() {
    setCount(count - 1);
  }

  return (
    <View>
      <Text>{count}</Text>
      <Button title="Increment" onPress={Increment} />
      <Button title="Decrement" onPress={Decrement} />
    </View>
  );
}

export default App

```

First, We need to create a new file called MyOwnHook.ts. Into the new file we can separate the logic by the way.

```
import { useState } from "react";

function useCounter(value: number, nextValue: number) {
  const [count, setCount] = useState(value)

  function Increment() {
    setCount(count + nextValue: number)
  }

  function Decrement() {
    setCount(count - nextValue: number)
  }

  return [count, Increment, Decrement]
}

export default useCounter;

Now, our component can take the state value and functions on this way:
import React from "react";
import useCounter from "./MyOwnHook";

function App() {
  const [count, Increment, Decrement] = useCounter(0, 1);

  return (
    <div className="App">
        <h1>{count}</h1>
        <button onClick={Increment}>Increment</button>
        <button onClick={Decrement}>Decrement</button>
    </div>
  );
}

export default App;
```

As you can see, in this example we can see that our code can read claritier and If we need to create complex functions we can keep them separate into other files.
The rules of hooks
 
There are principal usage rules for React Hooks. described in its documentation oficial.
 
1.- Hooks must be called in the same order, at the top level.
2.- Don’t call Hooks inside loops, conditions, or nested functions.
3.- Only Call Hooks from React Functions.
4.- Custom hooks should start with the word use and be camel-cased.
 
There is a ESLint plugin that can help you to enforce the rules. You can add this plugin to your project. This plugin was developed by React core team.
 
 `yarn add eslint-plugin-react-hooks`
 
Jest - Running the testing
React Native ships with Jest, so for testing a React Native app with TypeScript, we'll want to add ts-jest to our devDependencies.

`yarn add --dev ts-jest`

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
This will configure Jest to run .ts and .tsx files with ts-jest.
Now, we need to install libraries into dev dependencies, That help us to write TypeScript Code.
yarn add --dev @types/jest @types/react @types/react-native @types/react-test-renderer

Add this folder into .gitignore file.
.jest/
Here an example to run jest with redux:
As good practice is create a file with the exact name of the component that you wish to test with a prefix test. So, in this example we need to create a new file into folder __test__ called App-test.tsx.

```
// __test__/App-test.tsx

import 'react-native';
import React from 'react';
import App from '../components/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import placeReducer from '../reducers/placeReducer';

import renderer from 'react-test-renderer';
const store = createStore(placeReducer);

it('renders correctly', () => {
  renderer.create(
    <Provider store={store}>
      <App />
    </Provider>,
  );
});
```

### Run testing with command:
`yarn jest`

Add `.jest/` file to `.gitignore` before pushing into the repository.

### Running on emulator
Run your project with command `yarn ios` or `yarn android`

### Built With
React Native - The web framework used
NodeJS - Dependency Management
yarn - Dependency Management
Redux - Global Store

Bibliography
https://reactjs.org/docs/hooks-intro.html
https://www.deadcoderising.com/react-16-3-how-to-pass-data-around-using-reacts-new-context-api/
https://jestjs.io/docs/en/configuration
https://redux.js.org/
https://www.typescriptlang.org/

