import React, { useState } from 'react';
import { TodoForma } from './components/TodoForma';
import { TodoList } from './components/TodoList';
import { IMessage_Date, ITodo } from './interfaces';
import { MessageInput } from './components/MessageInput';
import { MessageOutput } from './components/MessageOutput';
import { ContextMenu } from './components/ContextMenu';

const App: React.FC = () => {

  const [todos, setTodos] = useState<ITodo[]>([]);

  let chatName_exist:boolean = false;

  const addHandler = (title:string) => {
    const newTodo: ITodo = {
      title,
      id: Date.now(),
      completed: false,
      container: [],
      showContext: false,
      x:"0px",
      y:"0px",

    };
    todos.map((todo) => {
      if (todo.title === title) {
        chatName_exist = true;
        alert('Chat with same name already exist!!!');
      }
      return todos;
    });

    if (!chatName_exist) {
      setTodos((prev) => [newTodo, ...prev]);
    }
    chatName_exist = false;
  };

  const toggleHandler = (id: number) => {
    setTodos((prev) => prev.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      } return { ...todo, completed: false };
    }));
  };

  const removeHandler = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const addMessageHandler = (msg:IMessage_Date) => {
    setTodos(
      todos.map((todo) => {
        if (todo.completed) { todo.container.push(msg); }
        return todo;
      }),
    );
  };
  const contextHandler = (id: number) => {
    window.addEventListener("click", ()=>{
      setTodos((prev) => prev.map((todo) => {
        if (todo.showContext === true) {
          return {
            ...todo,
            showContext: false,
          };
        } return todo;
      }));
    }
    )
    
      setTodos((prev) => prev.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            showContext: !todo.showContext,
          };
        } return { ...todo, showContext: false };
      }));
    };
    
    


  

  return (
    <>

      <div className="grid_wrapper">
        <div className="leftFrame_Input">
          <TodoForma onAdd={addHandler} />
        </div>
        <div className="leftFrame_ChatList">
          <TodoList todos={todos} onToggle={toggleHandler} onContext={contextHandler}/* onRemove={removeHandler} *//>
          <ContextMenu todos={todos} onRemove={removeHandler}/>
        </div>
        <div className="rightFrame_Input">
          <MessageInput todos={todos} addMessage={addMessageHandler} />
        </div>
        <div className="rightFrame_Output">
          <MessageOutput todos={todos} />
        </div>
      </div>
    </>
  );
};

export default App;
