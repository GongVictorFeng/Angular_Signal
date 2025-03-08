import {Component, ElementRef, signal, viewChild} from '@angular/core';
import {LessonsService} from "../services/lessons.service";
import {Lesson} from "../models/lesson.model";
import {LessonDetailComponent} from "./lesson-detail/lesson-detail.component";

@Component({
    selector: 'lessons',
    imports: [
        LessonDetailComponent
    ],
    templateUrl: './lessons.component.html',
    styleUrl: './lessons.component.scss'
})
export class LessonsComponent {

    mode = signal<'master' | 'detail'>('master');
    lessons = signal<Lesson[]>([]);
    selectedLesson = signal<Lesson | null>(null)
    searchInput = viewChild.required<ElementRef>('search');

    constructor(private lessonsService: LessonsService){}

    async onSearch() {
        const query = this.searchInput()?.nativeElement.value;
        this.lessons.set(await this.lessonsService.loadLessons({query}));
    }

    onLessonSelected(lesson: Lesson) {
        this.mode.set('detail');
        this.selectedLesson.set(lesson);
    }

    onCancel() {
        this.mode.set('master');
    }

    onLessonUpdated(updatedLesson: Lesson) {
        this.lessons.update(lessons => lessons.map(lesson => lesson.id === updatedLesson.id ? updatedLesson: lesson));
        this.mode.set('master');
    }
}
