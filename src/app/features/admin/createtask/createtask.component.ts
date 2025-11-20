import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/core/services/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from "src/app/core/services/auth.service";
import { RegisterRequest } from "src/app/core/models/user.model";
@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.css']
})
export class CreatetaskComponent {
 taskForm!: FormGroup;
  loading = false;

  users: any = []; // store users
  taskId: string | null = null;
isEditMode = false;
  constructor(private fb: FormBuilder, private userService: UserService, private taskService: TaskService, private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {

    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['pending'],
      priority: ['medium'],
      dueDate: [''],
      assignedTo: [''] // store userId here
    });

    // Fetch all users
    this.userService.getAllUsers().subscribe((res: any) => {
      this.users = res.data.users;   
      console.log("users from createtask",this.users);
      
    });

     this.taskId = this.route.snapshot.paramMap.get("id");  
    
  if (this.taskId) {
    this.isEditMode = true;
    this.loadTaskData(this.taskId);

  }}

  loadTaskData(id: string) {
  this.taskService.getTaskById(id).subscribe((res: any) => {
    const t = res.data;
    console.log("load patch data", t);
    
    this.taskForm.patchValue({
      title: t.task.title,
      description: t.task.description,
      status: t.task.status,
      priority: t.task.priority,
      dueDate: t.task.dueDate,
      assignedTo: t.task.assignedTo._id
    });
    
    
  });
}



  submitTask() {
  if (this.taskForm.invalid) return;

  const payload = this.taskForm.value;

  //  UPDATE MODE
  if (this.isEditMode && this.taskId) {
    this.taskService.updateTask(this.taskId, payload).subscribe({
      next: () => {
        alert("Task updated successfully!");
        this.router.navigate(["admin/tasks"]);
      },
      error: () => alert("Error updating task")
    });
    return;
  }

  // 🔥 CREATE MODE
  this.taskService.createTask(payload).subscribe({
    next: () => {
      alert("Task created!");
      this.taskForm.reset();
      this.router.navigate(["admin/tasks"]);
    },
    error: () => alert("Error creating task")
  });
}

}