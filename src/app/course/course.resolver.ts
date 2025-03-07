import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { CoursesService } from "../services/courses.service";
import { inject } from "@angular/core";
import { Course } from "../models/course.model";

export const courseResolver: ResolveFn<Course | null> = 
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        
        const coursesService = inject(CoursesService);
        const courseId = route.params['id'];

        if (!courseId) {
            return null;
        }
        return coursesService.getCourseById(courseId);
    }