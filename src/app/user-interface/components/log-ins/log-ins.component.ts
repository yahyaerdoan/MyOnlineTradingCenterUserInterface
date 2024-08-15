import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../entities/user';

@Component({
  selector: 'app-log-ins',
  templateUrl: './log-ins.component.html',
  styleUrl: './log-ins.component.scss'
})
export class LogInsComponent implements OnInit{

  constructor(private formBuilder: FormBuilder){}

  formGroup!: FormGroup;
  submitted: boolean = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.formGroup = this.formBuilder.group({
      userNameOrEmail: ["", Validators.required],
      password: ["", Validators.required]
    })
  }
  
  get validate(){
    return this.formGroup.controls;
  }

  onSubmit(user: User){
    this.submitted = true;
    if(this.formGroup.invalid)
      return;

    // Continue with your form submission logic
    console.log('Form Submitted:', this.formGroup.value);
  }
}
