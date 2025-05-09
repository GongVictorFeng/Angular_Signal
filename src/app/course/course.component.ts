import { Component, OnInit, signal } from '@angular/core';
import { Course } from '../models/course.model';
import { Lesson } from '../models/lesson.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'course',
  standalone: true,
  imports: [],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent implements OnInit{

  course = signal<Course | null>(null);

  lessons = signal<Lesson[]>([]);

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.course.set(this.route.snapshot.data['course']);
    this.lessons.set(this.route.snapshot.data['lessons'])
  }
}
