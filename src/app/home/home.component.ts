import {Component, signal} from '@angular/core';
import {Course} from "../models/course.model";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CoursesCardListComponent} from "../courses-card-list/courses-card-list.component";
import { CoursesServiceWithFetch } from '../services/courses-fetch.service';

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

    courses = signal<Course[]>([]);

    constructor(private coursesService: CoursesServiceWithFetch) {
        this.loadCourses().then(() => {
            console.log("Courses loaded");
        });
    }

    async loadCourses() {
        try{
            const courses = await this.coursesService.loadAllCourses();
            this.courses.set(courses);
        }
        catch(error) {
            alert("Error loading courses");
            console.error("Error loading courses", error);
        }
    }
}
