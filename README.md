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

## Install Redux
Add redux and react redux

```yarn add redux react-redux```

We are going to do a TODO example:

First, Create a new file `store.ts`:

```
// create store and combine reducers are the modules
// that we need to create the global store

import { createStore, combineReducers } from 'redux';

// wee need import our reducers we are going to review
// with more details forward

import placeReducer from './reducers/placeReducer';

// We are going to add a reducer and recall with an alias

const rootReducer = combineReducers({
  places: placeReducer,
});

// This helper will create the store
const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
```
We create a new folder for our actions we are going to create `actions` into the file, we are going to export all our constants with the actions that we will need.

```
// actions/types.ts
export const ADD_PLACE = 'ADD_PLACE';
export const REMOVE_PLACE = 'REMOVE_PLACE';
export const EDIT_NAME = 'EDIT_NAME';
```

Create a file with the name of the actions that we are going to execute on this case I will add a file called places into actions folder: 

```
import { ADD_PLACE, REMOVE_PLACE, EDIT_NAME } from './types';

export const addPlace = (placeName: string) => {
  return {
    type: ADD_PLACE,
    payload: placeName,
  };
};

export const removePlace = (key: number) => {
  return {
    type: REMOVE_PLACE,
    payload: key,
  };
};

export const nameTextBox = (name: string) => {
  return {
    type: EDIT_NAME,
    payload: name,
  };
};
```

Now, we create a new folder called reducers into this folder we are going to add a reduce with the name of the element or data that will affect with the prefix `reducer`: 

```
import { ADD_PLACE, REMOVE_PLACE, EDIT_NAME } from '../actions/types';

const initialState = {
  name: '',
  placeName: '',
  places: [],
  key: 0,
};

const placeReducer = (state = initialState, action: any) => {
  const key: number = Math.random();

  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key,
          value: action.payload,
        } as any),
      };

    case REMOVE_PLACE:
      const filteredPlaces = state.places.filter(
        (place: any) => place.key !== action.payload,
      );

      return {
        ...state,
        places: filteredPlaces,
      };

    case EDIT_NAME:
      return {
        ...state,
        places: action.payload,
      };

    default:
      return state;
  }
};

export default placeReducer;
```

We need to configure the `App.tsx`

```
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { connect } from 'react-redux';
import { addPlace, removePlace}  from '../actions/place';
import ListItem from './ListItem';

function App(props: any) {
  const [name, setName] = useState('');

  function _handlePlaceSubmit() {
    props.add(name);
    setName('');
  }

  function _handlePlaceRemove(key: number) {
    props.remove(key);
  }

  function getListPlaces() {
    const list: Array<any> = props.places;

    if (list) {
      return (
        <FlatList
          data={props.places}
          keyExtractor={(index: any) => index.toString()}
          renderItem={info => (
            <ListItem
              placeName={info.item.value}
              handlePlaceRemove={() => _handlePlaceRemove(info.item.key)}
            />
          )}
        />
      );
    }

    return <Text>{'Empty list ...'}</Text>;
  }

  return (
    <View>
      <View>
        <TextInput
          placeholder="Type ..."
          value={name}
          onChangeText={text => {
            setName(text);
          }}
        />
        <TouchableOpacity
          onPress={_handlePlaceSubmit}
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
      {getListPlaces()}
    </View>
  );
}

const mapStateProps = (state: any) => {
  return {
    places: state.places.places,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    add: (name: any) => {
      dispatch(addPlace(name));
    },

    remove: (key: number) => {
      dispatch(removePlace(key));
    },
  };
};

export default connect(
  mapStateProps,
  mapDispatchToProps,
)(App);

```

# React Hooks

It works only on version higher `16.8.`
React Hooks is the newest of ReactJS. We can create `.tsx` or `.jsx` files cleaner and reusable logic with more possibilities.

I can say that React Hooks have helped me. Because, We have more posibilities for create cleaner reactjs code. The tedius way to write `this.state` is finished with react hooks. on new files you can make separate files to logic and view. 

React hooks allow us to take a functional component, manage state and it has many lifecycle methods.

The differencies between use react hooks and does not use them. 

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

As can you see, our component is cleaner and smaller whit react hooks.

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

We can create our own Hooks. If we need to customize our hooks, it is simple. This allows us create reusable logic. Forward, We will see an example about how create our own hooks and you will see the benefits.

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
 
For example:

```
setValueText('Lorem Ipsum')
setValueNumber(9)
setValueArray([1, 2, 3])
```

## Hook `useEffect`

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

You can add useEffect more than once at the same file.

## Hook `useContext`

`const value = useContext(MyContext)`

The React Context API allows you to easily access data on different levels of the component tree, without having to pass data down through props.

Context is principally used when some data has to be accessible by many components at different levels of nesting. Apply it sparingly because it makes component reuse more difficult.

Here an example:

```
import React, { useContext } from "react";

const ThemeContext = React.createContext(null);

function App() {
  return (
    <div>
      <ThemeContext.Provider value="dark">
        <Post />
      </ThemeContext.Provider>
    </div>
  );
}

function Post() {
 const theme = useContext(ThemeContext);

  return (
    <div className={theme}>
      {console.log(theme)}
        <h1>My posts</h1>
    </div>
  );
}
```

## Building your own hook

We have our component with the classic counter example: 

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
First, We need to create a new file `MyOwnHook.ts`. Into new file we can separate the logic by the way. 

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
```
Now, our component can take the state value and functions on this way:

```
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

As can you see, on this example we can see that our code can read claritier and If we need create complex functions we can keep separate into other file.

## Jest - Running the testing

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

Add this folder into `.gitignore` file.

`.jest/`

Here an example to run jest with redux: 

As good practice is create a file with the exactly name of the component that you wish test with prefix `test`. So, on this example we need to create a new file into folder `__test__` called `App-test.tsx`.

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

Run testing with command: `yarn jest`

Add `.jest/` file to `.gitignore` before to make push into repository.

## Running on emulator

Run your project with `yarn ios` or `yarn android`

## Built With

* [React Native](https://facebook.github.io/react-native/) - The web framework used
* [NodeJS](https://nodejs.org/en/) - Dependency Management
* [yarn](https://yarnpkg.com/) - Dependency Management
* [Redux](https://redux.js.org/) - Global Store

## Bibliography

- https://reactjs.org/docs/hooks-intro.html
- https://www.deadcoderising.com/react-16-3-how-to-pass-data-around-using-reacts-new-context-api/
- https://jestjs.io/docs/en/configuration
- https://redux.js.org/
- https://www.typescriptlang.org/
