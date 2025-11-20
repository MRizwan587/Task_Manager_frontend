import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Task } from "../models/task.model";

@Injectable({
  providedIn: "root",
})
export class TaskService {


   private apiUrl = 'http://localhost:5000/api'; // your API endpoint

  constructor(private http: HttpClient) {}

  // Simulate HTTP get using Observable with proper typing
  getUserTasks(): Observable<Task[]> {
    // Simulate a small delay to mimic network request
    return this.http.get<Task[]>(`${this.apiUrl}/tasks/admin/all`);
  }

  getsingleuserTasks(id: string): Observable<any> {
    // Simulate a small delay to mimic network request
    
    return this.http.get<Task[]>(`${this.apiUrl}/users/${id}/tasks`);
  }

  createTask(taskData: any) {
  return this.http.post(`${this.apiUrl}/tasks`, taskData);
}

getTaskById(id: string) {
  return this.http.get(`${this.apiUrl}/tasks/${id}`);
}

updateTask(id: string, data: any) {
  return this.http.put(`${this.apiUrl}/tasks/${id}`, data);
}


deleteTask(id: string) {
  return this.http.delete(`${this.apiUrl}/tasks/${id}`);
}

}
