import React from 'react';
import { ITodo } from '../interfaces';

type MessageOutputProps = {
    todos: ITodo[],
    
}

export const MessageOutput: React.FC<MessageOutputProps> = ({todos}) => {


return (
    <ul className="messageDiv">
       {todos.map(todo=>{
           if (todo.completed){
               return todo.container.map(msg=> {
                return (<li className="Message" key={msg.id}>{msg.message}
                <span className="Date">{msg.date}</span></li>
                )
               })
               }  
           })
           
        }
    </ul>
  )  
}

