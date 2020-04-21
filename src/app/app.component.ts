import { Component } from '@angular/core';
import { FamiliyFormData } from './model/Entities/Example/familily';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'reactiveFormsLearning';
  formFields = new FamiliyFormData().FormData;
}
