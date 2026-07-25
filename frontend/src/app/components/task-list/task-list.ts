import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
  providers: [DatePipe]
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() editEvent = new EventEmitter<Task>();
  @Output() deleteEvent = new EventEmitter<string>();

  constructor(private taskService: TaskService, private datePipe: DatePipe) {}

  get progressPercentage(): number {
    if (this.tasks.length === 0) return 0;
    const completed = this.tasks.filter(t => t.completed).length;
    return Math.round((completed / this.tasks.length) * 100);
  }

  toggleComplete(task: Task) {
    if (!task._id) return;
    const updatedTask = { ...task, completed: !task.completed };
    this.taskService.updateTask(task._id, updatedTask).subscribe({
      next: (res) => {
        task.completed = res.completed;
      },
      error: (err) => console.error(err)
    });
  }

  editTask(task: Task) {
    this.editEvent.emit(task);
  }

  deleteTask(id: string | undefined) {
    if(!id) return;
    if(confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.deleteEvent.emit(id);
        },
        error: (err) => console.error(err)
      });
    }
  }

  formatDate(date: any): string {
    return this.datePipe.transform(date, 'MMM d, yyyy') || '';
  }
}
