import React from 'react';

type InputFieldProps = {
  tag: string,
  getText(tag:string, text:string):void,
  value: string,
};

export const InputField: React.FC<InputFieldProps> = ({ tag, getText, value }) => {

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    getText(tag, event.target.value);
  };
  return (
    <input
      placeholder={"Place here " + tag + " text!"}
      onChange={changeHandler}
      value={value}
    ></input>
  );
};
