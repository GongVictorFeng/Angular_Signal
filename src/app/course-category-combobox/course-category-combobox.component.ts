import {Component, input, model} from '@angular/core';
import {CourseCategory} from "../models/course-category.model";

@Component({
  selector: 'course-category-combobox',
  standalone: true,
  imports: [],
  templateUrl: './course-category-combobox.component.html',
  styleUrl: './course-category-combobox.component.scss'
})
export class CourseCategoryComboboxComponent {

  label = input.required<string>();

  value = model<CourseCategory>()

  onCategoryChanged(category: string) {
    this.value.set(category as CourseCategory);
  }
}
