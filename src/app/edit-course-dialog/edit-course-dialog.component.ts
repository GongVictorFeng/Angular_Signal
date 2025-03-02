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

  constructor(
      private dialog: MatDialog, 
      private dialogRef: MatDialogRef<EditCourseDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: EditCourseDialogData,
      private fb: FormBuilder
    ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: this.data.course?.title,
      longDescription: this.data.course?.longDescription,
      category: this.data.course?.category,
      iconUrl: this.data.course?.iconUrl
    })
  }

  onClose() {
    this.dialogRef.close();
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

