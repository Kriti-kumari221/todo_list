import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskFormComponent implements OnChanges {
  @Input() taskToEdit: Task | null = null;
  @Output() taskAdded = new EventEmitter<Task>();
  @Output() taskUpdated = new EventEmitter<Task>();
  @Output() cancelEditEvent = new EventEmitter<void>();

  @ViewChild('taskForm') taskForm!: NgForm;

  task: Task = { title: '', description: '', completed: false };
  isEditing = false;
  submitting = false;

  constructor(private taskService: TaskService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['taskToEdit'] && changes['taskToEdit'].currentValue) {
      this.task = { ...this.taskToEdit! };
      this.isEditing = true;
    }
  }

  onSubmit() {
    if (!this.task.title.trim()) return;
    this.submitting = true;

    if (this.isEditing && this.task._id) {
      this.taskService.updateTask(this.task._id, this.task).subscribe({
        next: (updated) => {
          this.taskUpdated.emit(updated);
          this.resetForm();
          this.submitting = false;
        },
        error: (err) => {
          console.error(err);
          this.submitting = false;
        }
      });
    } else {
      this.taskService.createTask(this.task).subscribe({
        next: (created) => {
          this.taskAdded.emit(created);
          this.resetForm();
          this.submitting = false;
        },
        error: (err) => {
          console.error(err);
          this.submitting = false;
        }
      });
    }
  }

  cancel() {
    this.resetForm();
    this.cancelEditEvent.emit();
  }

  resetForm() {
    this.task = { title: '', description: '', completed: false };
    this.isEditing = false;
    if(this.taskForm) this.taskForm.resetForm();
  }
}
