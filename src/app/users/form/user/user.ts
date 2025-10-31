import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { User } from '../../user.interface'
import { UserService } from '../../user.service';



@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: `./user.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'user-form-container'
  }
})

export class UserFormComponent {

  private fb = new FormBuilder();

  private userService = inject(UserService);


  // Signals for state
  loading = signal(false);
  success = signal(false);
  error = signal<string | null>(null);


  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phonenumber: ['', [Validators.required, Validators.pattern(/^08[3-9]\d{7}$/)]],
    email: ['', [Validators.required, Validators.email]],
    dob: [null]
  });



  onSubmit() {
    if (this.form.valid) {
     // const { name, phonenumber, email, dob } = this.form.value

      const payload = this.form.value as User;


      this.loading.set(true);
      this.success.set(false);
      this.error.set(null);



      this.userService.createUser(payload).subscribe({
        next: () => {
          this.loading.set(false);
          this.success.set(true);
          this.form.reset();
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err.message || 'Failed to save data');
        }
      });

    }


  }

  


  get dob()  { 
    return this.form.get('dob') ;
  }

    get name()  { 
    return this.form.get('name') ;
  }

}

