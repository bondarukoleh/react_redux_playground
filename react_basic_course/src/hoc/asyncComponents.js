import React, {useState, useEffect} from 'react';

const asyncComponent = (importComponent) => {
  return (props) => {
    const [state, setState] = useState({component: null});

    useEffect(() => {
      console.log('From the async function');
      importComponent().then(loadedComponent => {
        setState({component: loadedComponent.default})
      })
    }, [])

    const Component = state.component;
    return state.component ? <Component {...props}/> : null;
  };
};

export default asyncComponent;