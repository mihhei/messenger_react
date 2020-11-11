import React, { useRef } from 'react';
import { IMessage_Date, ITodo } from '../interfaces';

type MessageInputProps = {
  todos: ITodo[],
  addMessage(msg: IMessage_Date): void
}

export const MessageInput: React.FC<MessageInputProps> = ({
  todos,
  addMessage,
}) => {

  const setNewMessage = (input_text:string): void => {
    const rightNow = new Date();
    const time = rightNow.toString().split('').splice(16, 5);
    const timeString = time[0] + time[1] + time[2] + time[3] + time[4];
    const new_message_date: IMessage_Date = {
      message: input_text,
      date: timeString,
      id: Date.now(),
    };

    ref.current!.value = '';

    addMessage(new_message_date);
  };

  const ref = useRef<HTMLInputElement>(null);
  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      cheking ();
    }
  };

  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    cheking();
  };


  const cheking = ():void => {
    if (ref.current!.value !== '') {
      if (ref.current!.value.match(/\/wiki text/g)){
        setWikiText(ref.current!.value);
      }
      else{
        setNewMessage(ref.current!.value);
      }
    }

  }

  const setWikiText = (inputSearch:string):void => {
    const result =  (/\/wiki text/g).exec(inputSearch);
    const wiki_search = inputSearch.slice(0,result!.index).trim();
        let url = "https://en.wikipedia.org/w/api.php"; 
        url = url + "?origin=*";
        const params:{[unit: string]: string;} = {
          action: "query",
          list: "search",
          srsearch: wiki_search,
          format: "json"
      };
Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

        fetch(url)
            .then(function(response){return response.json();})
            .then(function(response) {
              if (response.query.search.length){
                if (response.query.search[0].title === wiki_search){
                    setNewMessage(response.query.search[0].snippet);
                }else{
                  setNewMessage("No match found!!!");
                }

              }else{
                setNewMessage("Incorrect input!!!");

              }
                
            })
            .catch(function(error){console.log(error);});



  }

  return (
    <div className="inputWrapper">
      <div className="input-field wh mt2 ml1">
        <input
          ref={ref}
          // onChange={changeHandler}
          // value={title}
          type="text"
          id="title2"
          placeholder="Input message"
          onKeyPress={keyPressHandler}
        />

      </div>
      <button className="waves-effect waves-light btn enter_btn" onClick={onClickHandler}>Enter</button>
    </div>
  );
};
