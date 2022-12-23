import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  form = this.formBuilder.group({
    name: [''],
    category: ['']
    // name: new FormControl<string>(''), // Declarar assim é a msm coisa que o debaixo
    // name: new FormControl('',{ nonNullable: true }),
  });

  constructor(private formBuilder: NonNullableFormBuilder, // Isso é a mesma coisa que => name: new FormControl('',{ nonNullable: true }), / porém para todos os campos
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location) {
    // this.form
  }

  ngOnInit() {

  }

  onCancel() {
    this.location.back();
  }

  onSubmit() {
    this.service.save(this.form.value)
    .subscribe(result => this.onSuccess(), error => this.onError());
  }

  private onSuccess(){
    this.snackBar.open('Curso Salvo Com Sucesso!','',{ duration:5000 });
    this.onCancel();
  }

  private onError(){
    this.snackBar.open('Erro ao tentar salvar','',{ duration:5000 });
  }
}
