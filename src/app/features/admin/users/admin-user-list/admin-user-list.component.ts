import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { User } from "src/app/core/models/user.model";
import { UserService } from "src/app/core/services/user.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent {
displayedColumns = ["name", "role", "tasksStatus", "totalTasks", "status", "actions"];
  dataSource = new MatTableDataSource<User & { taskStats?: any }>([]);
  loading = false;

  filterValues = {
    name: '',
    role: ''
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const searchTerms = JSON.parse(filter);
      const matchesName =
        !searchTerms.name ||
        data.name.toLowerCase().includes(searchTerms.name.toLowerCase());
      const matchesRole =
        !searchTerms.role || data.role.toLowerCase() === searchTerms.role.toLowerCase();
      return matchesName && matchesRole;
    };
  }

  toggleUserStatus(user: any & { taskStats?: any }, isActive: boolean) {
  const newStatus = isActive ? "active" : "deactive";
    console.log("id and stat", user._id,newStatus );
    
  this.userService.updateUserStatus(user._id, newStatus).subscribe({
    next: (res: any) => {
      user.status = res.data.user.status; // Update local data after API call
      console.log(`User ${user.name} status updated to ${user.status}`);
    },
    error: (err) => {
      console.error("Error updating user status:", err);
      // Optionally, revert the toggle if API fails
      user.status = isActive ? "deactive" : "active";
    }
  });
}


  loadUsers() {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (users: any) => {
        console.log("users laod from api ",users); 
          this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
        this.dataSource.data = users.data.users;
         console.log("users dataSource.data ", this.dataSource.data); 
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  applyMultiFilter() {
    this.dataSource.filter = JSON.stringify(this.filterValues);
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  viewUser(user: User) { console.log("View", user); }
  editUser(user: User) { console.log("Edit", user); }
  deleteUser(user: User) { console.log("Delete", user); }

}
