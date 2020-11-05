import React, {useState} from 'react';

interface TodoFormProps {
    onAdd (title:string):void
}

export const TodoForma: React.FC<TodoFormProps> = props => {
    const [title, setTitle] = useState<string>('');

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const keyPressHandler = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            props.onAdd(title.toLowerCase());
            setTitle('');
        }
    }


    return (
        <div className="input-field mt2 ml1">
            <input 
            onChange={changeHandler}
            value={title}
            type="text" 
            id="title" 
            placeholder="Input chat name"
            onKeyPress={keyPressHandler}
            />
    
            
        </div>
    );
}