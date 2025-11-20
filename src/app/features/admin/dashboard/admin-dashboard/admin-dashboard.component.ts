import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/core/services/task.service";
import { Task } from "src/app/core/models/task.model";
import { Router } from "@angular/router";
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
 totalTasks = 0;
  pendingTasks = 0;
  inProgressTasks = 0;
  completedTasks = 0;
  highPriorityTasks = 0;
  mediumPriorityTasks = 0;
  lowPriorityTasks = 0;
  tasks: Task[] = [];
  recentTasks: Task[] = [];
  upcomingTasks: Task[] = [];
  loading = false;

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.taskService.getUserTasks().subscribe({
      next: (res: any) => {
        
        this.tasks = res.data.tasks;

        this.calculateStatistics();
        this.getRecentTasks();
        this.getUpcomingTasks();
        this.loading = false;
      },
      error: (error) => {
        console.error("Error loading dashboard data:", error);
        this.loading = false;
      },
    });
  }

  calculateStatistics(): void {
    this.totalTasks = this.tasks.length;
    this.pendingTasks = this.tasks.filter(
      (t) => t.status === "pending"
    ).length;
    this.inProgressTasks = this.tasks.filter(
      (t) => t.status === "in-progress"
    ).length;
    this.completedTasks = this.tasks.filter(
      (t) => t.status === "completed"
    ).length;

    this.highPriorityTasks = this.tasks.filter(
      (t) => t.priority === "high"
    ).length;
    this.mediumPriorityTasks = this.tasks.filter(
      (t) => t.priority === "medium"
    ).length;
    this.lowPriorityTasks = this.tasks.filter(
      (t) => t.priority === "low"
    ).length;
  }

  getRecentTasks(): void {
    // Get 5 most recently updated tasks
    this.recentTasks = [...this.tasks]
      .sort((a, b) => {
        const dateA = a.updatedAt
          ? new Date(a.updatedAt).getTime()
          : 0;
        const dateB = b.updatedAt
          ? new Date(b.updatedAt).getTime()
          : 0;
        return dateB - dateA;
      })
      .slice(0, 5);
  }

  getUpcomingTasks(): void {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    this.upcomingTasks = this.tasks
      .filter((task) => {
        if (!task.dueDate) return false;
        const dueDate = new Date(task.dueDate);
        return (
          dueDate >= today &&
          dueDate <= nextWeek &&
          task.status !== "completed"
        );
      })
      .sort((a, b) => {
        const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
        const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
        return dateA - dateB;
      })
      .slice(0, 5);
  }

  getCompletionPercentage(): number {
    if (this.totalTasks === 0) return 0;
    return Math.round((this.completedTasks / this.totalTasks) * 100);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case "completed":
        return "primary";
      case "in-progress":
        return "accent";
      case "pending":
        return "warn";
      default:
        return "";
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
    const today = new Date();
    const taskDate = new Date(dateObj);
    const diffTime = taskDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;

    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  navigateToTasks(): void {
    this.router.navigate(["/admin/tasks"]);
  }

  navigateToTask(task: Task): void {
    // Navigate to task detail or task list filtered by this task
    this.router.navigate(["/admin/tasks"]);
  }

}
