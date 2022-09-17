# DEEL questions

## 1. What is the difference between Component and PureComponent? give an example where it might break my app.

A pure component only re-renders when specified props passed by the parent or when its internal state changes. On the other hand, normal Components always re-renders when the parent component re-renders.
A Component might break the app if there's some change in the child that triggers a change in the parent component (a callback inside `useEffect`, for example), causing an infinite loop.
A PureComponent can have unexpected behavior if the correct re-render logic is not set either in `shouldComponentUpdate` or `React.memo`.
Also, useless re-renders can make the app slower than expected.

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
When we use `shouldComponentUpdate` we define when the Context should re-render, and their children as well. Since Contexts tend to have many children a developer might miss a prop in `shouldComponentUpdate`, preventing some nested child to correctly re-rendered.

## 3. Describe 3 ways to pass information from a component to its PARENT.

1. We can a use a Context and a hook that changes some value for the Context, this way the parent can be aware of changes.

2. Using a global state library such as Redux.

3. Using a callback prop passed to the child, this way the parent can decide what to do with the value passed by the callback, for example the `onChange` prop in the input.

## 4. Give 2 ways to prevent components from re-rendering.

We can prevent component by re-rendering transforming it into a PureComponent, but if we only want to deal with state change re-render we can use:

1. `useMemo` and memoize values, preventing recalculation and re-rendering. We just have to carefully using it, it improves performance, but takes more memory.

2. `useRef`, it does not trigger a re-render, so if we do not depend on a value to make state updates, we can use `useRef`.

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

Fragments are elements that only exist in React's virtual DOM, which means it doesn't render in the final HTML. We need to use it because every component must have only 1 root element, so if we don't need a `div` or any other element, we can use the fragment to create a wrapper around the siblings that won't hurt performance. 

Here is a case where react would break:

```jsx
const MyComponent = () => {
  return (
   <div>Hello</div>
   <div>World</div>
  )
}
```

## 6. Give 3 examples of the HOC pattern.

1. Inject a component

```jsx
function withHeader(Component) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return <>
        <Header />
        <Component {...this.props} />
      </>
    }
  };
}
```

2. Inject some property

```jsx
// `api` could  be some class or axios instance
const withApi = (Component, api) => {
  return (props) => {
    <Component api={api} {...props}/>
  }
}
```

3. Share some state logic between components

```js
const withCounter = (Component) => {
  const [counter, setCounter] = useState(0);

  const increaseCounter = () => {
    setCounter(counter + 1);
  }

  return (props) => {
    <Component counter={counter} increaseCounter={increaseCounter} {...props}> 
  }
}
```


## 7. what's the difference in handling exceptions in promises, callbacks and async...await.
Even though we can we `try...catch` for all of the cases, `promises` and `async...await` (which are promises under the hood) cases can be handled by chaining the `.catch` method when using the function. Also if we don't wait for the promise, the code will run asynchronously, and the promise will be catched when the callstack is empty, but callbacks will just throw the errors right away.

## 8. How many arguments does setState take and why is it async.

It takes 2 arguments, the new state and a callback that triggers when the state change is complete. React needs to calculate what changed and update the component (or not) which takes time, therefore, to prevent the UI from freezing, the state update is asynchronous.

## 9. List the steps needed to migrate a Class to Function Component.

1. Replace state the functions `componentDidUpdate` and `componentDidMount` with `useEffect` hook.

2. Remove the `this` keyword.

3. Convert class methods into functions or `consts` within the functional component scope (if need, also use `useRef`).

4. Remove the `render()` method and leave only `return` from it.

5. Convert the `state` using the `useState` hook. And replace every `setState` call.

6. If it is a PureComponent, wrap it into the `React.memo` HOC.

## 10. List a few ways styles can be used with components.

1. Normal CSS files.

2. Styled Components as a CSS-in-JS approach.

3. Inline styles.

4. Tailwind CSS for a quick setup and less code.

## 11. How to render an HTML string coming from the server.

We can use `dangerouslySetInnerHTML` prop in a `div`.