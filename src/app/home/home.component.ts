import {Component, computed, effect, signal} from '@angular/core';
import {Course, sortCoursesBySeqNo} from "../models/course.model";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CoursesCardListComponent} from "../courses-card-list/courses-card-list.component";
import { CoursesServiceWithFetch } from '../services/courses-fetch.service';
import { CoursesService } from '../services/courses.service';

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

    constructor(private coursesService: CoursesService) {

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
        catch(error) {
            alert("Error loading courses");
            console.error("Error loading courses", error);
        }
    }
}
