import React, {useRef} from 'react';
import { IMessage_Date } from '../interfaces';
import { ITodo } from '../interfaces';

type MessageInputProps = {
    todos: ITodo[],
    addMessage (msg:IMessage_Date):void
}



export const MessageInput: React.FC<MessageInputProps> = ({
    todos,
    addMessage
    }) => {
    const setNewMessage = ():void => {
        let rightNow=new Date();
        let time =rightNow.toString().split("").splice(16,5);
        let timeString =time[0]+time[1]+time[2]+time[3]+time[4];
            const new_message_date: IMessage_Date = {
                message:ref.current!.value,
                date:timeString,
                id:Date.now()
            }
            
            ref.current!.value='';
    
            addMessage (new_message_date);
            

    }

 
    const ref = useRef<HTMLInputElement>(null);
    const keyPressHandler = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            if (ref.current!.value===''){alert("Please enter message!!!");
        }else{ setNewMessage();
            
        }
    }
    }

    const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        setNewMessage();
    }
    
    return (
        <div className="inputWrapper">
        <div className="input-field wh mt2 ml1">
            <input 
            ref={ref}
            //onChange={changeHandler}
            //value={title}
            type="text" 
            id="title2" 
            placeholder="Input message"
            onKeyPress={keyPressHandler}
            />
    
        </div>
        <button className="waves-effect waves-light btn enter_btn" onClick={onClickHandler}>Enter</button>
        </div>
    );

}