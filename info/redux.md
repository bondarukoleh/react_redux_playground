# Redux

##### note about the libraries
`husky` - pre-commit hooks library. \
`lint-staged` - gives ability to manage files that will be in commit. \
in `.eslintrc` - we inherit eslint-config-prettier from external package, and react eslint from react. Also, we're adding
a plugin `eslint-plugin-prettier` so there won't be conflicts between linters - prettier and eslint.

### Redux flow
One-way data flow in our app.
1. User activity occurs ->
2. ActionCreator creates an action object ->
3. Action object caught by reducer ->
4. Reducer process action object, returns new Application state ->
5. New state - new react-component props ->
6. Props changed - Component re-rendered.

`Redux - keeps state in one place (store)`. Redux inspired by Flux, under the hood Redux uses "context" feature of react.
There is old "context" and after the react 16.3 - "New Context API" - be aware.

`State` - it's a big object with all states of components, **"Store"** is that object. `In Redux there is only one Store`
unlike Flux. Store join reducers and actions, and has a lot of useful methods like:
- getState()
- dispatch(action) -> renew state with new action
- subscribe(listener)

### Actions
`Actions` - it's an `object that describes actions`, `{type: DO_SOME_ACTION, payload: data_that_action_needs}`
*type* is mandatory, and preferably to *store all data that comes with action - in payload*. Also, with the common rules 
we should keep action types in *constants*. `const DO_SOME_ACTION = 'Some_action_done';`

#### actionCreator
To make action happen - you need `actionCreator` function.
```js
const USER_CLICK_ACTION = 'user_click_action';
function userClickActionCreator({clickedButtonName}) {
  return {
    type: USER_CLICK_ACTION, // so reducers know what action has occured
    payload: clickedButtonName // so reducer could use the data
  }
}
```
Almost all actions from User on UI - is a dispatch action event in actionCreator so reducer can change state depend 
on action:
1. App has its initial state ->
2. User clicks the button, action BUTTON_CLICKED dispatched ->
3. Button reducer catches the action dispatch and renew state of app ->
4. Components listened state change - rendered.

#### reducer
`Action` object says "something happened!", but doesn't describe how `Store` should be changed after something happened.
This is the job of `reducer`. \
There are common approach of *"reducer composition"*. Mean we divide big application state to small pieces, and each
piece - has its own reducer that responsible for this piece of state. All reducers join in rootReducer. \
From reducer if something changes we need to `return only new object of state`, *never a changed old one*.

```js
function pagerReducer(state = initialState, action) {
  if(action.type = USER_CLICK_ACTION) {
    return Object.assign({}, state, {
       buttonThatWasClickedName: action.payload
    })
  } else {
    return state;
  }
}
```

#### Redux package:
- **createStore(reducer, [preloadedState], [enhancer])**
`Creates a Redux store` that holds the complete state tree of your app. There `should only be a single store` in your app.
    - **reducer (Function)**: A reducing function that `returns the next state tree`, given the *current state tree*,
     and an *action to handle*.
    - **[preloadedState] (any)**: The initial state.
    - **[enhancer] (Function)**: The store enhancer. You may optionally specify it to enhance the store with third-party
   capabilities such as middleware, time travel, persistence, etc.
    - `Returns (Store)`: An object that holds the complete state of your app. The only way to `change its state` is by
       `dispatching` actions. You may also `subscribe` to the changes to its state to update the UI.
       
Simple enhancer - is logger. e.g.:
```js
import { applyMiddleware } from 'redux';
import { rootReducer } from '../reducers';
export function logger(store) {
  return function(next) {
    return function(action) {
      console.log('Action will be dispatched.');
      console.log(action);
      return next(action);
    };
  };
};
export const store = createStore(rootReducer, applyMiddleware(logger));
```

### Thunk redux
Thunk redux - is `middleware`, enhancer that adds `ability to return from action creator` not only the object like in sync
actions, but `a function` that have a dispatch as a parameter, and after some async action in this function - we can
dispatch an event.
```js
function createThunkMiddleware(extraArgument) {
    return ({ dispatch, getState }) => next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState, extraArgument);
        }
        return next(action);
    };
}
const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
export default thunk;
```

#### React-Redux package components:
`Provider` - all components inside it can access Store.

#### Connect
function `connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)` \
To `bind redux store with react components props` - we need **"connect" function**. It connects react component with store,
we describe `what properties we need to get from store`, and `pass component we need to pass those properties to`. It
returns *<Connected(My_React_component)/>* new component but with bounded props from store. Also, after wrapping wrapped
component has function dispatch in its props. In connect function we bind store properties that needed to especially 
component's props, and we also `automatically subscribe for changes to these properties`, mean if something
will change properties in store we subscribed to - component reducer will `automatically update component props` and
`component will be rendered`. So we should subscribe only for needed properties in component *connect* function,
otherwise component will be rendered even when nothing is changed for it. \
To bind redux dispatch function to actions from component - we need mapDispatchToProps.

### React Component vs Container
|characteristic|Component|Container|
|:---:|:---|:---|
|aimed|How it should look like (markup, styles)|How it should work (data managing, state setting)|
|knows about redux?|No|Yes|
|gets Data|from props|subscribed to redux state changes|
|to change data|call callback from props|dispatches redux action|
|created|by developers, with hands|generated by Redux (commonly)|