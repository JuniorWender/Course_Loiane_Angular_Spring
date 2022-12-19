import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { Course } from '../model/course';
import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  courses$: Observable<Course[]>;

  displayedColumns = [ 'Name','Category' ];

  // CoursesService: CoursesService;

  constructor(private CoursesService: CoursesService,public dialog: MatDialog) {
    // this.courses = [];
    // this.CoursesService = new CoursesService();
    this.courses$ = this.CoursesService.list().pipe(
      catchError(error => {
        this.onError('Erro ao tentar carregar cursos');
        return of([])
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void{

  }

}
