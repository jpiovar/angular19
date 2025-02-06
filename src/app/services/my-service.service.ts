import { inject, Injectable } from '@angular/core';
import { Todo } from '../model/todo.type';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MyService {
  http = inject(HttpClient);
  private data: Array<Todo> = [{
    id: 1,
    title: 'Todo 1',
    completed: false,
    userId: 1
  },{
    id: 2,
    title: 'Todo 2',
    completed: false,
    userId: 1
  },{
    id: 3,
    title: 'Todo 3',
    completed: false,
    userId: 1
  }];
  getData(): any[] {
    return this.data;
  }
  addData(newData: any) {
    this.data.push(newData);
  }
  getTodosFromApi(apiUrl: string = 'https://jsonplaceholder.typicode.com/todos') {
    return this.http.get<Array<Todo>>(apiUrl);
  }
}