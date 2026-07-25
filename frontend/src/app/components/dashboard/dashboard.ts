import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar';
import { TaskListComponent } from '../task-list/task-list';
import { TaskFormComponent } from '../task-form/task-form';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, TaskListComponent, TaskFormComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  taskToEdit: Task | null = null;
  loading = true;

  constructor(private taskService: TaskService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (!this.authService.getToken()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        if(err.status === 401) {
          this.authService.logout();
        }
        this.loading = false;
      }
    });
  }

  onTaskAdded(task: Task) {
    this.tasks.push(task);
  }

  onTaskUpdated(task: Task) {
    const index = this.tasks.findIndex(t => t._id === task._id);
    if (index !== -1) {
      this.tasks[index] = task;
    }
    this.taskToEdit = null;
  }

  onTaskDeleted(taskId: string) {
    this.tasks = this.tasks.filter(t => t._id !== taskId);
  }

  editTask(task: Task) {
    this.taskToEdit = task;
  }

  cancelEdit() {
    this.taskToEdit = null;
  }
}
