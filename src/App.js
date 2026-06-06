function App() {
  return <div className="app">
    <Logo />
    <Form />
    <PackingList />
    <Stats />
  </div>
}

function Logo() {
  return <h1>🧳Far Away🌴</h1>;
}

function Form() {
  return <div className="add-form">
    <h3>What Do you need for your 😃 trip?</h3>
  </div>
}

function PackingList() {
  return <div className="list">
    LIST
  </div>
}

function Stats() {
  return <footer>
    <em>
    🧳You have X items on your list , and you already packed X (X%)
    </em>
  </footer>
}

export default App;
