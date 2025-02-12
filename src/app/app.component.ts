import { Component } from '@angular/core';
import { FamiliyFormData } from './model/Entities/Example/familily';
import { MyFormComponent } from './components/my-form/my-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MyFormComponent]
})
export class AppComponent {
  public title = 'Reactive Forms Learning';

  public formFields = new FamiliyFormData().FormData;
}

