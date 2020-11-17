import React from 'react';
import { ITodo } from '../interfaces';

type TodoListProps = {
    todos: ITodo[],
    onToggle(id:number):void,
    onContext(id:number):void,
    /* onRemove(id:number):void */
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onContext,
  /* onRemove */
}) => (
  <ul className="wh">
      {
      todos.map((todo) => {
      const classes = ['waves-effect waves-light btn wh'];
      if (todo.completed) {
        classes.push('teal accent-3');
      }
      return (
        <li className="todo ml1" key={todo.id} onClick={onToggle.bind(null, todo.id)} onContextMenu={
          (event:React.MouseEvent)=>{event.preventDefault();
             todo.x= event.pageX+"px";
        todo.y=event.pageY+"px";
        onContext(todo.id)}
        }>
          <span className={classes.join(' ')}>{todo.title}</span>
        </li>

      );
    })}

  </ul>

)
