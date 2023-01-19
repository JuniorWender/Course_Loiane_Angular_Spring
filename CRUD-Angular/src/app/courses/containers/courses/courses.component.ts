import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Course } from './../../model/course';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  courses$: Observable<Course[]> | null = null;;

  constructor(
    private CoursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
    ) {
    this.refresh();
  }

  refresh(){
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

  onAdd(){
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id ], { relativeTo: this.route });
  }

  onRemove(course: Course){
    this.CoursesService.remove(course._id).subscribe(() => {
      this.refresh();
      this.snackBar.open('Curso removido Com Sucesso!','X',{ duration:5000, verticalPosition: 'top', horizontalPosition: 'center' });
    },
    () => this.onError('Erro ao tentar remover o curso!')
    );
  }

}
