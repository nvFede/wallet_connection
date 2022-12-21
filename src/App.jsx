import WalletConnectBtn from "./components/WalletConnectBtn";

function App() {
  return (
    <div className="App h-screen flex flex-col justify-between">
      <WalletConnectBtn
        styles={{
          backgroundColor: "blue",
          padding: "8px 2px",
          width: "200px",
          borderRadius: "5px",
          color: "white",
        }}
      />
    </div>
  );
}

export default App;
