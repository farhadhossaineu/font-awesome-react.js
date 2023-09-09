import HomePage from "./component/HomePage";

function App() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <HomePage child={<h1>hi</h1>} />
    </div>
  );
}

export default App;
