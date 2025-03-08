import {Component, input, output} from '@angular/core';
import {Lesson} from "../../models/lesson.model";
import {ReactiveFormsModule} from "@angular/forms";
import {LessonsService} from "../../services/lessons.service";
import {MessagesService} from "../../messages/messages.service";

@Component({
    selector: 'lesson-detail',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './lesson-detail.component.html',
    styleUrl: './lesson-detail.component.scss'
})
export class LessonDetailComponent {

    lesson = input.required<Lesson | null>();
    lessonUpdated = output<Lesson>();
    cancel = output();

    constructor(private messageService: MessagesService, private lessonsService: LessonsService){}

    onCancel() {
        this.cancel.emit();
    }

    async onSave(description: string) {
        try {
            const updatedLesson = await this.lessonsService.saveLesson(this.lesson()!.id, {description:description});
            this.lessonUpdated.emit(updatedLesson);
        } 
        catch (err) {
            console.error(err);
            this.messageService.showMessage("Failed to save the lesson", 'error');
        }
    }

}
