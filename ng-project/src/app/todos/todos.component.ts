import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { MyService } from '../services/my-service.service';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from "../components/todo-item/todo-item.component";
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from "../pipes/filter-todos.pipe";

@Component({
  selector: 'app-todos',
  imports: [
    TodoItemComponent, 
    FormsModule,
    FilterTodosPipe,
    CommonModule
],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  // myService = inject(MyService);
  data: any;
  datas: any = signal<Array<Todo>>([]);
  searchTerm = signal('');

  constructor(
    private myService: MyService,
  ) {
    this.data = this.myService.getData();
    this.datas.set(this.myService.getData());
  }
  

  ngOnInit(): void {
    debugger;
    console.log(this.myService.getData());

    this.myService.getTodosFromApi().pipe(
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    ).subscribe((data) => {
      this.datas.set(data);
    });


  }

  updateTodoItem(todoItem: Todo) {
    this.datas.update((todos: any) => {
      return todos.map((todo: any) => {
        if (todoItem.id === todo.id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      })
    });
  }

}
