import {  useState } from "react";



function App() {

  const [items , SetItems] = useState([]);

  function handleAddItems(item){
    SetItems(items=> [...items , item])
  }

  function handleDeleteItem(id){
    SetItems(items=>items.filter(item=> item.id !==id))
  }

  function handleToggleItem(id){
    SetItems(items=> 
      items.map(item => 
        item.id === id ? {...item , packed :!item.packed} : item));
  }


  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList  items={items} onDeleteItem={handleDeleteItem} onToggleItems={handleToggleItem}/>
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far Away🧳</h1>;
}

function Form({onAddItems}) {
  //controlled elements is in three peices

  const [description, setDescription] = useState("");
  const [quantity , setQuantity] = useState(1)
  
  

  function handleSubmit(e) {
    e.preventDefault(); // prevents the browser or elemt actions and stops it - like reloading of page on clicking submit

    if(!description) return; //if no description no call of object 
    
    const newitem = {description , quantity, packed:false, id:Date.now()}
    console.log(newitem)

    onAddItems(newitem)

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

function PackingList({items,onDeleteItem,onToggleItems}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItems={onToggleItems}  />
        ))}
      </ul>
    </div>
  );
}


// conditionally setting the style class using the ternarie operator
function Item({ item, onDeleteItem,onToggleItems }) {
  return (
    <li>
      <input type="checkbox" value={item.checked}  onChange={()=>onToggleItems(item.id)}/>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={()=> onDeleteItem(item.id)}>❌</button>
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
