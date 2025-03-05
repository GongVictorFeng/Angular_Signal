import {Component, computed, effect, signal} from '@angular/core';
import {Course, sortCoursesBySeqNo} from "../models/course.model";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CoursesCardListComponent} from "../courses-card-list/courses-card-list.component";
import { CoursesServiceWithFetch } from '../services/courses-fetch.service';
import { CoursesService } from '../services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';
import { MessagesService } from '../messages/messages.service';

@Component({
    selector: 'home',
    imports: [
        MatTabGroup,
        MatTab,
        CoursesCardListComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

    #courses = signal<Course[]>([]);

    beginnerCourses = computed(() => this.#courses().filter(course => course.category === 'BEGINNER'));
    advancedCourses = computed(() => this.#courses().filter(course => course.category === 'ADVANCED'));

    constructor(private coursesService: CoursesService, private dialog: MatDialog, private messageService: MessagesService) {

        effect(() => {
            console.log('Beginner courses', this.beginnerCourses());
            console.log('Advanced courses', this.advancedCourses());
        });
        this.loadCourses().then(() => {
            console.log('Courses loaded:' , this.#courses());
        });
    }

    async loadCourses() {
        try{
            const courses = await this.coursesService.loadAllCourses();
            this.#courses.set(courses.sort(sortCoursesBySeqNo));
        }
        catch(err) {
            this.messageService.showMessage("Error loading courses", "error")
            console.error(err);
        }
    }

    onCourseUpdated(updatedCourse: Course) {
        const courses = this.#courses();
        const newCourses = courses.map(course => course.id === updatedCourse.id ? updatedCourse : course);
        this.#courses.set(newCourses);
    }

    async onAddCourse() {
        const newCourse = await openEditCourseDialog(
            this.dialog, 
            {
                mode: 'create',
                title: "Create New Course"
            }
        );
        const newCourses = [...this.#courses(), newCourse];
        this.#courses.set(newCourses);
    }

    async onCourseDeleted(courseId: string) {
        try {
            await this.coursesService.deleteCourse(courseId);
            const courses = this.#courses();
            const newCourses = courses.filter(course => course.id !== courseId);
            this.#courses.set(newCourses);
        }
        catch(err) {
            this.messageService.showMessage("Error deleting courses", "error")
            console.error(err);
        }
    }
}
