import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {firstValueFrom} from "rxjs";
import {Course} from "../models/course.model";
import {GetCoursesResponse} from "../models/get-courses.response";


@Injectable({
  providedIn: "root"
})
export class CoursesService {

  env = environment;

  constructor(private http: HttpClient) {
  }

  async loadAllCourses(): Promise<Course[]> {
    const courses$ = this.http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses`);
    const response = await firstValueFrom(courses$);
    return response.courses
  }

  async getCourseById(courseId: string): Promise<Course> {
    const course$ = this.http.get<Course>(`${this.env.apiRoot}/courses/${courseId}`);
    return firstValueFrom(course$);
  }

  async createCourse(course: Partial<Course>): Promise<Course> {
    const course$ = this.http.post<Course>(`${this.env.apiRoot}/courses`, course);
    return firstValueFrom(course$)
  }

  async saveCourse(courseId: string, changes: Partial<Course>): Promise<Course> {
    const course$ = this.http.put<Course>(`${this.env.apiRoot}/courses/${courseId}`, changes);
    return firstValueFrom(course$)
  }

  async deleteCourse(courseId: string): Promise<Course> {
    const delete$ = this.http.delete<Course>(`${this.env.apiRoot}/courses/${courseId}`);
    return firstValueFrom(delete$);
  }
}
