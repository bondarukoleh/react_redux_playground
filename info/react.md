## Overall
*React killer feature* - that it *manage virtual DOM*, making all changes with components in virtual DOM, and after that
makes all changes in one operation with real DOM, which makes it very fast.

React using the *jsx syntax*, it gives ability to write a `"html"` markup (which is jsx markup) in `.js` files.
To render component from jsx - we should name and call it from capital.
```jsx
ReactDOM.render(<App />, $('#root'));
ReactDOM.render(React.createElement('h1', null, 'Hello world')); // became
ReactDOM.render(<h1>Hello world</h1>);
```
We can use Babel to make from jsx markup language - javascript.

---
## Codding
React is a library, not a framework, so we can plugin react as a simple \<script> to our document like
```html
<!-- react-->
<script src="https://unpkg.com/react@16/umd/react.development.js"></script>
<!-- react-dom-->
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<!-- babel-->
<script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
```

After we plugin react - we can use `ReactDOM global variable`.
```jsx
ReactDOM.render(<h1>Hello world</h1>, document.getElementById('root'))
```
**ReactDOM.render** gets *React Component* as the first argument and *DOM-element* as element where we want to mount our
component. \
If we try to `mount two components` to one element - `last one will appear`.

#### Stateful/Stateless components
```jsx
// element from function
let App = () => <p>Simple Component</p>
// and with class
class ComponentFromClass extends React.Component {
  render(){ 
    return (<p>Simple Component</p>)
  }
}
```
If component `created with class` - `jsx` should be put `inside return statement of render method`. \
Components created `with class - stateful components`, with a state, components created `with functions - stateless`,
means doesn't have a state. \
After React 16.8 - and `useState()` hook - functional components also can have a state, so we cannot divide them by
way the component was created anymore. \
It's divided by purpose, if you need only presentation component - you should keep it dumb, if you need calculate a lot -
use container, or stateful component. Restricting yourself of adding state everywhere - you make application logic more 
clear, you know that all calculation and logic is lying in the containers, and all presentation logic divided from data
is in the stateless components.

|Class based |Functional Components|
|:---|:---|
|Access to `state` via `this`| Access to `useState()` via `state`|
|Can use Lifecycle Hooks|Cannot use Lifecycle Hooks|

#### className
```jsx
ReactDOM.render(<h1 className="redColor">Hello world</h1>, $('#root'));
```
Since we write not html but jsx, and we in .js file - we cannot use html's class="redColor", it's a reserved word, so
we use jsx `className`.

#### Component returns one node 
Each `component should return ONE NODE!` we cannot return from render(){return (\<a/> \<p/>)}, we should do:
```jsx
return (<div><a/> <p/></div>)
```
Another way to do that is add multiple components in `<React.Fragment>` and return it.

#### Props
Each component has properties, they stored in `this.props in stateful components`, and `first argument of the function in
stateless`. They `passed` to the component `as attributes`. *this.props* is read-only.

```jsx
<React.Fragment> {/* Comment inside jsx */} </React.Fragment>;
```

#### Building components
We can easily build page with objects. Like making a long list of paragraphs from array of objects.
```jsx
const newsTemplate = this.props.news.map((item, index) => {
    return <div key={index}> <p className="news_text">{item.text}</p> </div>;
  });
```
`key={index}` - we need key to set **unique** if to the element. Index is not the best choice, better use element id, or
some hash.

#### Conditional return
We can decide to return an element like here:
```jsx
return (<div>{newsAvailable ? <p>News</p> : null}</div>);
```

Or choose a style for the element with template string:
```jsx
return (<div>{someElement} <p className={`${newsAvailable ? '' : 'optional class'}`}> News</p> </div>)
```

#### Additional methods in React Components
We can create like: \
* *renderNews = () => {}* -> `context isn't lost`, we still have access to `this.props`;
* *renderNews() {}* - `context lost`, React does something with functions - so context lost in this way. To make regular
   function declaration work - we need to bind them in constructor of component.
```jsx
constructor () {this.renderNews = this.renderNews.bind(this)} // looks like shit
// or
toggleShowingPersons = function (e) {
    this.setState({showPersons: !e.target.checked});
}.bind(this) // still not very nice
```

#### PropTypes validation library
This is a library for validating component properties. Kind like Joi for mongoose.
```jsx
MyComponent.propTypes = {optionalArray: PropTypes.array.isRequired}
```
> Note: Doesn't work with production build version, it's only for development, because validation - is a heavy
> operation.

```jsx
MyComponent.propTypes = {
  propTypes: {
    optionalProperty: PropTypes.array, .bool, .func, .number, .object, .string, .symbol,
    optionalUnion: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, PropTypes.instanceOf(Message)]),
    optionalObjectWithShape: PropTypes.shape({ color: PropTypes.string.isRequired, fontSize: PropTypes.number}),
    requiredFunc: React.PropTypes.func.isRequired,
    requiredAny: React.PropTypes.any.isRequired,
  }
}
```

---
### State
Available only `in stateful component`. \
To work with state-depended properties we should `set the "initial state"` to them. To do this we should `implement the
"state"` property. Always *change state via **this.setState** method*. \
Try not to `read this.state after setState()` - because of a `queue`, you can get state before your previous state 
change actually fired, `instead do actions in setState callback` - it will fire after setState fired.
```jsx
class Article extends React.Component {
    state = {myState: 'initial'};
    handleEvent(e) {
      /*setState receives optional callback or list of callbacks to do stuff after state change*/
      this.setState({myState: 'changed'}, [() => { /* do work after state changed */ })]
    };
}
// or even pass function to setState
this.setState((state, props) => {counter: state.counter + props.step});
```
When you `change the state of component` - it *involves **render method** of the component* which state was changed. \
You cannot call *setSate() inside render()* - *recursion* will occur. \
`render` - is a pretty heavy operation so try to run it fewer times. \
If `parent component re-rendered` - all `children re-rendered too`.

#### changing state trick
Be careful with `setState({prop: this.state.prop})`, `setState` - doesn't change the state immediately, it `adds change
event in queue`. If you want to reference some value after method fires, it can return previous (past) value.
`setState({prop: this.state.prop++})` - will `never work properly`: \
1. initial value of prop is 0;
2. We insert event "change state to {prop: 0}" in queue.
3. Postponement worked, prop became 1.
4. change event fired prop is back to 0 again. That's it :grimacing:.

#### eventListeners
`JSX syntax supports` a lot of `events listeners` that you can add to the components.
```jsx
<a href="#" onClick={this.handleReadMoreClick}>Read more...</a>
handleReadMoreClick = (e) => {} // should be arrow function
```
`event handlers` should be done `only with arrow function`, otherwise context is lost.

#### event.target vs event.currentTarget
If you have onClick on div with paragraph inside and User clicks on paragraph:
e.target === paragraph, the element which caused the event, on what event was born, which user interacted with.
e.currentTarget === div, the element that has handler function registered, which handler was attached to.

### Uncontrolled vs controlled component
#### ref in class components
`Controlled`- form, input, textarea, select elements usually has their `own state`, and update `depends on user input`.
This `doesn't work with logic of components state in React`. To make that work in React style - we should delegate to
React state all changes made by user in those components, so we're like don't allow those elements make their changes by
themselves, only with our know, and only via state of the component. `Elements with their "own" state` that fully 
`controlled by React component state called em... controlled`.

`Uncontrolled` component means it has `no event/change state handlers`, means it doesn't have explicit calls to setState
in front of controlled component. You need to *create reference* in *Component constructor* to have some information
about uncontrolled component:
```jsx
// Create ref in constructor
constructor(props) {
      this.input = React.createRef(); // creating referense object, you can assign there any element you want at any 
      // time and just use it.
    }
/* Older way: This is automatically create the referense object, already assigned add it directly in some element */
<input ref={(inputElem) => this.someInput = inputElem}> {/* this is accessible this.someInput for current component */}  
{/* Or you can add some action directly to the lement.*/}
<input ref={(inputElem) => inputElem.focus()}>
```
Then you should set reference to some element via "refs" attribute to get the value of uncontrolled.
```jsx
// To set initial value for uncontrolled component "defaultValue" can be used.
<input ref={this.input} defaultValue="Some value..."></input> // adding reference to uncontrolled component
```
So now from some other event handler we can get value of uncontrolled element:
```jsx
<button onClick={(e) => alert(this.input.current.value);}></button>
```
You can have `ref` attribute on every React component.

#### ref in functional component
Since in functional components you cannot use `React.createRef()`, there is hook that helps us `useRef()`
```jsx
/* Somewhere in the func component */
const toggle = useRef(null);
useEffect(() => {
   /* componentDidMount */
    toggle.current.click();
  }, [])
return <input ref={toggle} type='checkbox'/>;
```


#### Component lifecycle
Every component has lifecycle, like component will be rendered, rendered, deleted etc.

`Mounting` \
These methods are called in the following order when an instance of a component is being created and inserted into the
DOM:
1. constructor()
2. static getDerivedStateFromProps()
3. render()
4. componentDidMount() - this is the place when component mounted to the DOM, and we have ability to use refs here, so if
 we want to manage timeouts, ajax, and interaction with other libraries - this is the place where we should do so.

`Updating` \
These methods are called in the following order when a component is being re-rendered:
1. static getDerivedStateFromProps(newProps, state){return newState || null}
2. shouldComponentUpdate()
3. render()
4. getSnapshotBeforeUpdate()
5. componentDidUpdate()

`Unmounting` \
This method is called when a component is being removed from the DOM:
1. componentWillUnmount()

`Error Handling` \
These methods are called when there is an error during rendering, in a lifecycle method, or in the constructor of
any child component:
1. static getDerivedStateFromError()
2. componentDidCatch()

Each component also provides some other APIs:
* setState()
* forceUpdate()

Class Properties
* defaultProps
* displayName

Instance Properties
* props
* state

Pay attention on `componentWillReceiveProps - deprecated`, we should change it to `getDerivedStateFromProps`.

If we cannot pass some logic between parent and child, or because of two not connected components - we can use
`EventEmitter` on the [client side](https://raw.githubusercontent.com/Olical/EventEmitter/master/EventEmitter.js)

We can import in react:
* import A from 'A' - default import
* import {A} from 'A' - named import
* import * as A from 'A' - all in namespace A import

Export
* export default A
* export const A
* export {A}

### <Redirect>
from react router dom will navigate to a new location. The new location **will override the current location** in the
history stack, like server-side redirects (HTTP 3xx) do. So when you press the back button - you'll be on the same page.

```jsx
<Route exact path="/">
  {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
  {/* If you need user to has ability to come back - use push */}
  {loggedIn ? this.props.history.push('/dashboard')}
  {/* Also history has same method with replace behavior */ }
  {loggedIn ? this.props.history.replace('/dashboard')}
</Route>
```

### Guard
Some of our component you wish user can see only if he is authenticated. So you'll render components conditionally. 

### 404
If you have unknown path requested, you want to show your 404 page. You can do this by adding route without path, 
should be last in switch.
```jsx
<Route render={() => <h1> We don't know how you get here. </h1>}/>
```

## Lazy loading component.
When user reaches the application it loads the bundle. Bundle contains all the code, components, and all the
application. But it is not necessary sometimes to download all the code, we can separate them in chunks. So we can load the code only for components user
requesting. 
 
 
 ```jsx
const asyncComponent = (importComponent) => {
  return (props) => {
    const [state, setState] = useState({component: null});

    useEffect(() => {
      importComponent().then(loadedComponent => {
        setState({component: loadedComponent.default})
      })
    }, [])

    const Component = state.component;
    return state.component ? <Component {...props}/> : null;
  };
};

const AsyncNewPosts = asyncComponent(() => import('../../components/NewPost/NewPost'));

render() {
  <Route path={'/newPost'} component={AsyncNewPosts}/>
}
```

### React.lazy
Same feature, but out of the box.
```jsx
const AsyncNewPosts = React.lazy(() => import('../../components/NewPost/NewPost'));
```
Also useful component Suspense.
```jsx
import React, { Suspense } from 'react';
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route component={OtherComponent}/>
        </Switch>  
      </Suspense>
    </div>
  );
}
```

## BasePath for React
Client -> server -> React. When User reaches your application, first he reaches server, and then server should return index.html with react code that knows about the route user wanted. /
It's ok if you host on //my-app.com, base path is /. /
But what if you host on //my-server.com/my-app ?
```jsx
class App extends React.Component {
  render() {
    return (
        <BrowserRouter basename='/my-app' {/* default is '/' */}>
          <Blog/>
        </BrowserRouter>
    );
  }
}

export default App;
```