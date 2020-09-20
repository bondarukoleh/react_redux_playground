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

`React-redux` provides a layer of connection between redux state and react components. \
Note about where we should keep state. *If there no effect on application state from component*, then *keep state on
component level*. If you realize that *change this component state affects, or needed somewhere else in the app*, or some
other component will use it - then *create action creator, action, reducer*, and add this logic in redux level.

`React-router` is a basic library with routing, React-router-dom for all apps that somehow working with dom,
React-router-native is for the react-native apps.

### Route
```jsx
import {
  BrowserRouter, // tells how to behave, looks for current url - and decide what page it should draw.
  Route, // rule that decide between certain route that user can visit, and components that will be visible on the screen
  Switch, // looks through its children <Route>s and renders the first one that matches the current URL.
} from "react-router-dom";

// exact - means only for this path it will be visible. If not - it will be visible everywhere.
<Route exact path={'/myPath'} render={() => <MyComponent />}/> // one way
<Route exact path={'/myPath'}><MyComponent/></Route> // another way
<Route exact path={'/myPath'} component={MyComponent}/> // one more way
```
Route adds special methods and properties to Component it wraps. But be aware if you mess with properties somehow, you 
cannot get the *history, location, match, etc.* from props that Route provide, since you re write it.
```jsx
<Route exact path={'/myPath'} render={() => <MyComponent/>}/> // You cannot get them 
<Route exact path={'/myPath'}><MyComponent/></Route> // You cannot get them
<Route exact path={'/myPath'} component={MyComponent}/> // This way you CAN get them.
<Route exact path={'/myPath'} component={(props) => <MyComponent {...props}/>}/> // This way you CAN get them.
<Route exact path={'/myPath'} render={(props) => <MyComponent {...props}/>}/> // This way you CAN get them.
```
Any children don't get those props of course, you need to pass them with hands. Or there is a better way `withRouter`.
```jsx
import {withRouter} from 'react-router-dom';
class MyComponent(){};
export default withRouter(MyComponent); // Now, ANY way you would wrap this Component - it alwas will have Route props.s
```
In route path `path={/:something}` - means dynamically value.
```jsx
/* This in the parent */
<Route exact path={'/:someId'} component={FullPost}/>
/* I will redirect someone here */
<Link to={`/${props.somePassedId}`} onClick={props.clicked}>
{/* In showed element I can extract id from */}
<p>{`Id of element ${this.props.match.params.someId}`}</p>
```
`BrowserRouter` that wraps `Router` - will match the current url with Routes it has to show one by one, and everything
that machs the path - it will show. So sometimes you can see a few components that isn't supposed to be together. \ 
The `<Switch/>` component will only render the first route that matches/includes the path.
```jsx
<Switch>
  <Route exact path={'/goods/:id'}><MyComponent/></Route>
  <Route exact path={'/goods'}><MyComponent/><Route/>  {/* You won't have one good over all goods here */}
</Switch>
```
Of course, you can MIX Switch with the BrowserRouter, not a problem. 

### Link
`a vs Link (from React Router)` \
We *use anchor*, *when* we want *User to be redirected to completely different html document*, in different domain, like login
via google.
We *use Link* (React Router) when we want *to navigate User to some other route hosted by React Router inside our
application*. There nice features of [Link][5]
```jsx
<Link to="/news">News</Link>
<Link to={{pathname: "/news", search: "?sort=name", hash: "#the-hash",}}>News</Link>
```

#### Path
The path you can use in Link's `to` can be either absolute or relative. \
**Absolute Path** - default, if you just enter to="/some-path" or to="some-path", that's absolute path, means it's
always appended right after your domain, both syntax (with and without leading slash) lead to `example.com/some-path`. \
**Relative Paths** - if you then want to append something to existing path. You can do that with the `url` property of
`props.match` that you can get from Route HOC \
```jsx
/*It works for the same Link element, that already has some path */
<Link to={props.match.url + '/new'}> {/* example.com/some-path/new */}
```
If you want to ensure that you always load the same path, no matter on which path you already are - use absolute.
Use relative paths if you want to navigate relative to your existing path.

`NavLink` - same as Link, but also adding "active" class to the anchor that is shown right now. Don't forget about exact attribute if you want to have only one active at the same time. Also, there is `activeClassName`, `activeStyle` to customize things.
```jsx
<NavLink
 activeClassName={'current-path'}
 activeStyle={{ 'background-color': '#007DDC' }}
 to="/"
 exact
>Home</NavLink>
```

#### Parameters    
```jsx
<Link to="/my-path?start=5">Go to Start</Link>
/* Or */
<Link 
    to={{
        pathname: '/my-path',
        search: '?start=5',
        hash: 'start-position'
    }}
    >Go to Start</Link>
```
You can get URL parameters **string** from `props.location.search` will give you ***?start=5***, or `props.location.hash`;
To parse it use:
```jsx
const query = new URLSearchParams(this.props.location.search);
for (const [key, value] of queries.entries()) {
  console.log(key, value); // 'start', '5'. This is the way get them.
}
```

#### Navigation programmatically
We can navigate to something by Link, or we can you `props.history` object. That contains some functions, like `goBack`, 
`goForward`, and `push`. Navigation history is like a stack, it has list of visited paths, that's why you can navigate
forward and back. Push method - pushes another link to this stack, so you navigate to it.
```jsx
<h1 onClick={() => props.history.push(`/${props.id}`)}>{props.title}</h1>
```

`Redux Form` - helping to add complicated logic form to app, it has its own reducer, so we don't need to add a lot of
logic in redux store.