import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyFormComponent } from './components/my-form/my-form.component';
import { FormBuilderExtended } from './components/my-form/FormBuilderExtended';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { GroupBoxComponent } from './components/controls/group-box/group-box.component';
import { TextBoxComponent } from './components/controls/text-box/textBox.component';
import { DynamicElementDirective } from './components/controls/directives/dynamic-element.directive';
import { TextAreaComponent } from './components/controls/text-area/text-area.component';
import { CheckBoxComponent } from './components/controls/check-box/check-box.component';
import { ComboBoxComponent } from './components/controls/combo-box/combo-box.component';
import { DatePickerComponent } from './components/controls/date-picker/date-picker.component';
import { RadioButtonComponent } from './components/controls/radio-button/radio-button.component';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';
import { CudGridComponent } from './components/controls/cud-grid/cud-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    MyFormComponent,
    GroupBoxComponent,
    TextBoxComponent,
    DynamicElementDirective,
    TextAreaComponent,
    CheckBoxComponent,
    ComboBoxComponent,
    DatePickerComponent,
    RadioButtonComponent,
    CudGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    { provide: FormBuilderExtended, useClass: FormBuilderExtended },
    { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'noop' }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    TextBoxComponent,
    GroupBoxComponent,
    RadioButtonComponent,
    ComboBoxComponent,
    DatePickerComponent,
    CheckBoxComponent,
    CudGridComponent
  ]
})
export class AppModule {}
