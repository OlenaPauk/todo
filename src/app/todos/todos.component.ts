
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

export interface ITodos {
  id: number
  todo: string,
  complete: boolean,
  date: Date
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  newTodo = '';
  todos: ITodos[] =
    [
      {
        id: Date.now() + 1,
        todo: 'Buy milk',
        complete: false,
        date: new Date()
      },
      {
        id: Date.now() + 2,
        todo: 'Buy car',
        complete: false,
        date: new Date()
      },
    ]
  constructor() { }

  ngOnInit(): void {
    if (!localStorage.length) {
      this.getLocalStor();
    }

    this.getLocalStorage();
  }
  date: Observable<Date> = new Observable(time => {
    setInterval(() => {
      time.next(new Date())
    }, 1000);
  })
  getLocalStorage() {
    if (localStorage.getItem('Todos') === null) {
      this.todos = this.todos;
    } else {
      this.todos = JSON.parse(localStorage.getItem('Todos') || '')
    }
  }
  getLocalStor() {
    localStorage.setItem(
      'Todos', JSON.stringify(this.todos)
    )
  }
  addTodo() {
    if (this.newTodo.trim()) {
      const newT: ITodos = {
        id: Date.now(),
        todo: this.newTodo,
        complete: false,
        date: new Date()
      }
      this.todos.unshift(newT);
      this.newTodo = '';
      this.getLocalStor();
    }
  }
  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.getLocalStor();
  }
  completeTodo(id: number) {
    const idx = this.todos.findIndex(i => i.id === id);
    this.todos[idx].complete = !this.todos[idx].complete;
    this.getLocalStor()


  }
}
