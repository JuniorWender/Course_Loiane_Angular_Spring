import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Course } from './../../model/course';

import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  form = this.formBuilder.group({
    _id: [''],
    name: [''],
    category: ['']
    // name: new FormControl<string>(''), // Declarar assim é a msm coisa que o debaixo
    // name: new FormControl('',{ nonNullable: true }),
  });

  constructor(private formBuilder: NonNullableFormBuilder, // Isso é a mesma coisa que => name: new FormControl('',{ nonNullable: true }), / porém para todos os campos
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    });
  }

  onCancel() {
    this.location.back();
  }

  onSubmit() {
    console.log(this.form.value);
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
