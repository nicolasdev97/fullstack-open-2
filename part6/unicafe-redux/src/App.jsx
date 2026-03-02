const App = ({ store }) => {
  const state = store.getState();

  const handleGood = () => {
    store.dispatch({ type: "GOOD" });
  };

  const handleOk = () => {
    store.dispatch({ type: "OK" });
  };

  const handleBad = () => {
    store.dispatch({ type: "BAD" });
  };

  const handleZero = () => {
    store.dispatch({ type: "ZERO" });
  };

  return (
    <div>
      <button onClick={handleGood}>good</button>
      <button onClick={handleOk}>ok</button>
      <button onClick={handleBad}>bad</button>
      <button onClick={handleZero}>reset stats</button>

      <div>good {state.good}</div>
      <div>ok {state.ok}</div>
      <div>bad {state.bad}</div>
    </div>
  );
};

export default App;
