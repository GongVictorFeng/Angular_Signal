import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Lesson } from "../models/lesson.model";
import { LessonsService } from "../services/lessons.service";
import { inject } from "@angular/core";

export const courseLessonsResolver: ResolveFn<Lesson[]> = 
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const lessonsService = inject(LessonsService);
        const courseId = route.params['id'];
        if (!courseId) {
            return [];
        }
        return lessonsService.loadLessons({courseId});
    }