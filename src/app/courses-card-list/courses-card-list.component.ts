import {Component, input, output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Course} from "../models/course.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';

@Component({
    selector: 'courses-card-list',
    imports: [
        RouterLink
    ],
    templateUrl: './courses-card-list.component.html',
    styleUrl: './courses-card-list.component.scss'
})
export class CoursesCardListComponent {

    courses = input.required<Course[]>();   
    courseUpdated = output<Course>();
    courseDeleted = output<string>();
    
    constructor(private dialog: MatDialog) {}

    async onEditCourse(course: Course) {
        const newCourse = await openEditCourseDialog(this.dialog, {
            mode: 'update',
            title: "Update Existing Course",
            course: course
        });

        if(newCourse) {
            console.log('Course edited:', newCourse);
            this.courseUpdated.emit(newCourse);
        }
    }

    onCourseDeleted(courseId: string) {
        this.courseDeleted.emit(courseId);
    }
}


