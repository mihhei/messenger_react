import React, {useState} from 'react';
import { TodoForma } from './components/TodoForma';
import { TodoList } from './components/TodoList';
import { IMessage_Date, ITodo } from './interfaces';
import { MessageInput } from './components/MessageInput';
import { MessageOutput } from './components/MessageOutput';


const App: React.FC = () => {

   
const [todos, setTodos] = useState<ITodo[]>([]);

let chatName_exist:boolean = false;

const addHandler = (title:string) => {
  const newTodo: ITodo = {
    title:title,
    id: Date.now(),
    completed: false,
    container: []
    
  }
  todos.map(todo=> {
    if (todo.title === title){chatName_exist=true;
    alert("Chat with same name already exist!!!");}
    return todos;
}); 

if (!chatName_exist){
  setTodos(prev => [newTodo, ...prev]); 
  }
  chatName_exist=false;
  
}

const toggleHandler = (id: number) => {
  setTodos(prev => 
    prev.map(todo => {
      if (todo.id === id){
        return {...todo,
        completed:!todo.completed}
    }else{return {...todo, completed:false}}
  })
  )


}

const removeHandler = (id: number) => {
  setTodos(prev => prev.filter(todo=> todo.id !== id));

}

const addMessageHandler = (msg:IMessage_Date) => {
 setTodos(
   todos.map(todo => {
      if (todo.completed){todo.container.push(msg)}
        return todo;
    }
    ))
}

  

  return (
    <>
    
    <div className="grid_wrapper">
      <div className="leftFrame_Input">
      <TodoForma onAdd={addHandler}/>
      </div>
      <div className="leftFrame_ChatList">
      <TodoList todos={todos} onToggle={toggleHandler} /*onRemove={removeHandler}*//>
      </div>
      <div className="rightFrame_Input">
        <MessageInput todos={todos} addMessage={addMessageHandler}/>
      </div>
      <div className="rightFrame_Output MessageDiv">
        <MessageOutput todos={todos}/>
      </div>
    </div>
    </>
  );
}

export default App;
