import { Todo } from '../types/todo';

const key = "todos";
const db = localStorage;
export function GetTodos(): Todo[] {
    return JSON.parse(db.getItem(key)!);
}

function initTodos() {
    if (db.getItem(key) == null)
        db.setItem(key, JSON.stringify([]));
}

export function UpdateTodo(todo: Todo) {
    const todos: Todo[] = JSON.parse(db.getItem(key)!);
    const index = todos.findIndex(x => x.id === todo.id)!;
    let _todo: Todo = todos.find(x => x.id === todo.id)!;
    _todo = todo;
    todos[index] = _todo;
    db.setItem(key, JSON.stringify(todos));
}

export function CreateTodo(todo: Todo) {
    if (FindTodo(todo.id)?.id) {
        UpdateTodo(todo);
    } else {
        let todos: Todo[] = JSON.parse(db.getItem(key)!);
        if (todos == null)
            initTodos();

        todos.push(todo);
        db.setItem(key, JSON.stringify(todos));
    }
}

export function FindTodo(id: string): Todo {
    const todos: Todo[] = JSON.parse(db.getItem(key)!);
    return todos.find(x => x.id === id)!;
}

export function generateID(): string {
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}