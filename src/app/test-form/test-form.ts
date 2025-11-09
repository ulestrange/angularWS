import { Component, inject } from '@angular/core';
import {DatePipe } from '@angular/common'
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-form',
  imports: [ReactiveFormsModule, FormsModule, DatePipe],
  templateUrl: './test-form.html',
  styleUrl: './test-form.scss'
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



  private fb = inject (FormBuilder);

  userForm = this.fb.group({
    name: [''],
    phonenumber: [''],
    email: [],
    dob: [null],
    tags:this.fb.array([])
  });

  onSubmit() {
    console.log('forms submitted with ');
    console.table(this.userForm.value);
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
