import { CourseFormComponent } from './courses/containers/course-form/course-form.component';
import { CoursesComponent } from './courses/containers/courses/courses.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '' , component: CoursesComponent },
  // { path: 'new' , component: CourseFormComponent },
  { path: 'edit/:id' , component: CourseFormComponent },
  { path: '' , pathMatch: 'full' , redirectTo: 'courses' },
  { path: 'courses' , loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
