export interface ITodo {
    title:string,
    id:number,
    completed:boolean,
    container: any[],
    showContext: boolean,
    x:string,
    y:string
}

export interface IMessage_Date {
    message: string,
    date: string,
    id:number
}
