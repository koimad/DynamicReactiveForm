import { Component } from '@angular/core';
import { FamiliyFormData } from './model/Entities/Example/familily';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Reactive Forms Learning';

  public formFields = new FamiliyFormData().FormData;
}
