import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { TaskService } from "src/app/core/services/task.service";
import { Task } from "src/app/core/models/task.model";

@Component({
  selector: "app-user-task-list",
  templateUrl: "./user-task-list.component.html",
  styleUrls: ["./user-task-list.component.css"],
})
export class UserTaskListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    "title",
    "description",
    "status",
    "priority",
    "dueDate",
    "actions",
  ];
  dataSource = new MatTableDataSource<Task>([]);
  loading = false;
  user: any= null;
  userId: any= null;
  filterValues = {
  title: '',
  description: '',
  dueDate: '',
  status: '',
  priority: ''
};

statusOptions = ['pending', 'in-progress', 'completed'];
priorityOptions = ['low', 'medium', 'high'];



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user")!);
    
    this.userId = this.user.id;
    
     if (this.userId) {
    
    this.loadTasks(this.userId);
  }

this.dataSource.filterPredicate = (data: Task, filter: string) => {
  const searchTerms = JSON.parse(filter);

  const matchesTitle =
    !searchTerms.title ||
    data.title.toLowerCase().includes(searchTerms.title.toLowerCase());

  const matchesDescription =
    !searchTerms.description ||
    data.description?.toLowerCase().includes(searchTerms.description.toLowerCase());

  const matchesDueDate =
    !searchTerms.dueDate ||
    this.formatDate(data.dueDate).toLowerCase().includes(searchTerms.dueDate.toLowerCase());

  const matchesStatus =
    !searchTerms.status ||
    data.status.toLowerCase() === searchTerms.status.toLowerCase();

  const matchesPriority =
    !searchTerms.priority ||
    data.priority.toLowerCase() === searchTerms.priority.toLowerCase();

  return matchesTitle && matchesDescription && matchesDueDate && matchesStatus && matchesPriority;
};
  }
applyMultiFilter(): void {
  this.dataSource.filter = JSON.stringify(this.filterValues);
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadTasks(id: any): void {
    this.loading = true;
    this.taskService. getsingleuserTasks(id).subscribe({
      next: (tasks: any) => {
        this.dataSource.data = tasks.data.tasks;
        console.log("task user !!!!",tasks);
        
        this.loading = false;
      },
      error: (error) => {
        console.error("Error loading tasks:", error);
        this.loading = false;
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getStatusColor(status: string): string {
     switch (status) {
    case 'completed':
      return 'green';
    case 'in-progress':
      return '#2196F3'; // blue
    case 'pending':
      return 'orange';
    default:
      return 'gray';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case "high":
        return "warn";
      case "medium":
        return "accent";
      case "low":
        return "primary";
      default:
        return "";
    }
  }

  formatDate(date: string | Date | undefined): string {
    if (!date) return "No due date";
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  editTask(task: Task): void {
    console.log("Edit task:", task);
    // Implement edit functionality
  }

  deleteTask(task: Task): void {
    console.log("Delete task:", task);
    // Implement delete functionality
  }

  viewTask(task: Task): void {
    console.log("View task:", task);
    // Implement view functionality
  }
}
