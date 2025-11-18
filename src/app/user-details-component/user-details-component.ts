import { Component, inject, Pipe } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { UserService } from '../users/user.service';
import { Observable } from 'rxjs';
import { User } from '../users/user.interface';
import { AsyncPipe, DatePipe } from '@angular/common';
import { TestForm } from '../test-form/test-form';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-details-component',
  imports: [RouterModule, AsyncPipe, TestForm, DatePipe, MatCardModule, MatButton],
  templateUrl: './user-details-component.html',
  styleUrl: './user-details-component.scss'
})
export class UserDetailsComponent {

  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private router = inject(Router);
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  id: string = "";
  showForm: boolean = false;
  user$: Observable<User> | undefined


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || "";

    if (this.id) {
      this.user$ = this.userService.getUserById(this.id)

    }
  }
  deleteUser() {
    this.openConfirmDeleteDialog();
  }


  deleteItem(): void {
    if (this.id) {
      this.userService.deleteUser(this.id)
        .subscribe({
          next: response => {
            this.router.navigateByUrl('/user-list')
          },
          error: (err: Error) => {
            console.log(err.message);
            this.openErrorSnackBar(err.message)
          }
        })
    }
  }

  editUser(): void {
    this.showForm = true;
  }

  cancelEdit(): void {
    this.showForm = false;
  }

  openConfirmDeleteDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: "Delete User ",
        message: "Are you sure you want to delete a user"
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // User clicked "Yes", perform the delete operation
        this.deleteItem();
      }
    });

  }


  openErrorSnackBar(message: string): void {
  this.snackBar.open(message, 'Dismiss', {
    duration: 15000, // Set the duration for how long the snackbar should be visible (in milliseconds)
    panelClass: ['error-snackbar'], // You can define custom styles for the snackbar
  });
}


}
