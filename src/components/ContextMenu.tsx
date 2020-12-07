import React from 'react';
import { ITodo } from '../interfaces';

type ContextMenuProps = {
    todos: ITodo[],
    onRemove(id:number):void
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  todos,
  onRemove
}) => (
    <div>
    {todos.map((todo) => {
      if (todo.showContext) {
          return (
              <div className="custom_menu" style={{ top: todo.y, left: todo.x }}>
                  <div className="cm_item" onClick={onRemove.bind(null, todo.id)}>Delete chat</div>
                  <div className="cm_item">Rename chat</div>
                  
              </div>
          )
      }

    })}

  </div>

);