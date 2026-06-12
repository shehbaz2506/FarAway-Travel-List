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
      <Stats items={items} />
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

function Stats({items}) {

  if(!items.length)
    return(
      <p className="stats">
        <em>Start Adding Some Items to your packing list ✍️</em>
      </p>
    )

  const numItems = items.length;
  const numPacked=items.filter(item=> item.packed).length;


  //function to calculate percentage

  const percentage= Math.round(numPacked / numItems *100);

  return (
    <footer className="stats">
      {percentage === 100 ? "You got Everything! Ready to Go ✈️":<em>🧳You have {numItems} items on your list , and you already packed {numPacked}({percentage}%</em>} 
      
    </footer>
  );
}

export default App;
