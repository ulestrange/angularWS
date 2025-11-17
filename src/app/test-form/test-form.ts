import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common'
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../users/user.service';
import { Router } from '@angular/router';
import { User } from '../users/user.interface';


@Component({
  selector: 'app-test-form',
  imports: [ReactiveFormsModule, FormsModule, DatePipe],
  templateUrl: './test-form.html',
  styleUrl: './test-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestForm {


  //   userName = new FormControl('fdafd');

  //   dob = new FormControl('')

  // updateName() {
  //     this.userName.setValue(this.userName.value + ' is the greatest');
  //   }



  // userForm  = new FormGroup (
  //   {
  //     name: new FormControl(''),
  //     phonenumber: new FormControl(''),
  //     email: new FormControl(''),
  //     dob: new FormControl(null)
  //   }
  // )



  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  user = input<User | undefined>();

  userForm: FormGroup;

  constructor() {

    if (this.user()) {
      console.log(this.user()?.name || "nothing");
    }

    this.userForm = this.fb.group({
      name: [''],
      phonenumber: [''],
      email: [''],
      dob: [null],
      tags: this.fb.array([])
    })


    effect(() => {
      const user = this.user();
      if (user) {
        this.userForm.patchValue({
          name: user.name,
          phonenumber: user.phonenumber,
          email: user.email,
          dob: user.dob ? new Date(user.dob).toISOString().substring(0, 10) : '',
        });

        this.tags.clear();

        user.tags.forEach(tag => {
          this.tags.push(this.fb.control(tag));
        });


      }
    });




  }

  onSubmit() {
    console.log('forms submitted with ');
    console.table(this.userForm.value);


    const currentUser = this.user();

    if (!currentUser || !currentUser._id) {

      this.createNew(this.userForm.value as User);
    } else {

      this.updateExisting(currentUser._id, this.userForm.value as User)
    }
  }


  updateExisting(id: string, updatedValues: User) {
    this.userService.updateUser(id, { ...updatedValues })
      .subscribe({
        next: response => {
          this.router.navigateByUrl('/user-list')
        },
        error: (err: Error) => {
          console.log(err.message);
          // this.message = err
        }
      })
  }


  createNew(formValues: User) {
    this.userService.addUser({ ...formValues })
      .subscribe({
        next: response => {
          this.router.navigateByUrl('/user-list')
        },
        error: (err: Error) => {
          console.log(err.message);
          // this.message = err
        }
      })
  }


  addTag(): void {
    const tagControl = this.fb.control('');
    this.tags.push(tagControl);
  }

  get tags(): FormArray {
    return this.userForm.get('tags') as FormArray;
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }


}
