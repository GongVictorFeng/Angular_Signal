import {Component, effect, Inject, inject, OnInit, signal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../models/course.model";
import {EditCourseDialogData} from "./edit-course-dialog.data.model";
import {CoursesService} from "../services/courses.service";
import {LoadingIndicatorComponent} from "../loading/loading.component";
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CourseCategoryComboboxComponent} from "../course-category-combobox/course-category-combobox.component";
import {CourseCategory} from "../models/course-category.model";
import { firstValueFrom } from 'rxjs';
import { MessagesService } from '../messages/messages.service';

@Component({
  selector: 'edit-course-dialog',
  standalone: true,
  imports: [
    LoadingIndicatorComponent,
    ReactiveFormsModule,
    CourseCategoryComboboxComponent
  ],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss'
})
export class EditCourseDialogComponent implements OnInit {

  form!: FormGroup;
  category = signal<CourseCategory>("BEGINNER");

  constructor(
      private dialog: MatDialog, 
      private dialogRef: MatDialogRef<EditCourseDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: EditCourseDialogData,
      private fb: FormBuilder,
      private coursesService: CoursesService,
      private messageService: MessagesService
    ) {
      effect(() => {
        console.log(`Course category bi-directional binding: ${this.category()}`)
      })
    }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: this.data.course?.title,
      longDescription: this.data.course?.longDescription,
      iconUrl: this.data.course?.iconUrl
    })
    this.category.set(this.data.course?.category ?? "BEGINNER");
  }

  onClose() {
    this.dialogRef.close();
  }

  async onSave() {
    const courseProps = this.form.value as Partial<Course>;
    courseProps.category = this.category();
    if (this.data.mode === 'update') {
      await this.saveCourse(this.data.course!.id, courseProps);
    }
    else if (this.data.mode === 'create') {
      await this.createCourse(courseProps);
    }
  }

  private async createCourse(course: Partial<Course>) {
    try {
      const newCourse = await this.coursesService.createCourse(course);
      this.dialogRef.close(newCourse);
    } 
    catch (err) {
      this.messageService.showMessage("Failed to create the course.", 'error');
      console.error(err);
    }
  }

  private async saveCourse(courseId: string, changes: Partial<Course>) {
    try {
      const updatedCourse = await this.coursesService.saveCourse(courseId, changes);
      this.dialogRef.close(updatedCourse);
    }
    catch(err) {
      this.messageService.showMessage("Failed to save the course.", 'error');
      console.error(err);
    }
  }

}

export async function openEditCourseDialog(dialog: MatDialog, data: EditCourseDialogData) {
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.width = "400px";
  config.data = data;

  const close$ = dialog.open(EditCourseDialogComponent, config).afterClosed();
  return firstValueFrom(close$)
}

