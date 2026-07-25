import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, Todo } from './todo.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'MEAN Stack Todo List';
  todos: Todo[] = [];
  newTodoTitle = '';
  editingTodo: Todo | null = null;
  editTitle = '';

  private todoService = inject(TodoService);

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (data) => this.todos = data,
      error: (err) => console.error('Error fetching todos:', err)
    });
  }

  addTodo(): void {
    if (!this.newTodoTitle.trim()) return;
    
    const newTodo = { title: this.newTodoTitle.trim(), completed: false };
    this.todoService.addTodo(newTodo).subscribe({
      next: (todo) => {
        this.todos.unshift(todo);
        this.newTodoTitle = '';
      },
      error: (err) => console.error('Error adding todo:', err)
    });
  }

  toggleComplete(todo: Todo): void {
    const updated = { completed: !todo.completed };
    this.todoService.updateTodo(todo._id!, updated).subscribe({
      next: (updatedTodo) => {
        const index = this.todos.findIndex(t => t._id === updatedTodo._id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      },
      error: (err) => console.error('Error updating todo:', err)
    });
  }

  startEdit(todo: Todo): void {
    this.editingTodo = todo;
    this.editTitle = todo.title;
  }

  cancelEdit(): void {
    this.editingTodo = null;
    this.editTitle = '';
  }

  saveEdit(): void {
    if (!this.editingTodo || !this.editTitle.trim()) return;
    
    const updated = { title: this.editTitle.trim() };
    this.todoService.updateTodo(this.editingTodo._id!, updated).subscribe({
      next: (updatedTodo) => {
        const index = this.todos.findIndex(t => t._id === updatedTodo._id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
        this.editingTodo = null;
        this.editTitle = '';
      },
      error: (err) => console.error('Error updating todo:', err)
    });
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter(t => t._id !== id);
      },
      error: (err) => console.error('Error deleting todo:', err)
    });
  }
}
