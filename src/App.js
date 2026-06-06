import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far Away🧳</h1>;
}

function Form() {
  //controlled elements is in three peices

  const [description, setDescription] = useState("");
  const [quantity , setQuantity] = useState(1)

  function handleSubmit(e) {
    e.preventDefault(); // prevents the browser or elemt actions and stops it - like reloading of page on clicking submit

    if(!description) return; //if no description no call of object 

    const newitem = {description , quantity, packed:false, id:Date.now()}
    console.log(newitem)

    setDescription('')
    setQuantity(1)
  }



  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What Do you need for your 😃 trip?</h3>
      <select value={quantity} onChange={(e)=> { setQuantity(Number(e.target.value))}}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
// conditionally setting the style class using the ternarie operator
function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>🧳You have X items on your list , and you already packed X (X%)</em>
    </footer>
  );
}

export default App;
