import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { User } from '../../user.interface'



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

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phonenumber: ['', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]],
    email: ['', [Validators.required, Validators.email]],
    dob: [null]
  });

  // Signal for submitted user
  private submittedUser = signal<User | null>(null);
  user = computed(() => this.submittedUser());

  onSubmit() {
    if (this.form.valid) {
      const { name, phonenumber, email, dob } = this.form.value 

      
  if (!name || !phonenumber || !email) {
    //the required should prevent this - but needed for compiling.
    return;
  }

      this.submittedUser.set({
        name,
        phonenumber,
        email,
        dob: dob ? new Date(dob) : undefined,
      });
    }
  }





  }

