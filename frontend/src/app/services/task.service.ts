import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Task } from '../models/task';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/api/tasks';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<any>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      map(response => response.tasks)
    );
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<any>(this.apiUrl, task, { headers: this.getHeaders() }).pipe(
      map(response => response.task)
    );
  }

  updateTask(id: string, task: Task): Observable<Task> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, task, { headers: this.getHeaders() }).pipe(
      map(response => response.task)
    );
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
