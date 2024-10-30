import { NgModule } from '@angular/core';
import { MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckBoxComponent } from './components/controls/check-box/check-box.component';
import { ComboBoxComponent } from './components/controls/combo-box/combo-box.component';
import { ComponentErrorMapper } from './components/controls/component-error-mapper';
import { CudGridComponent } from './components/controls/cud-grid/cud-grid.component';
import { FormNumberCellComponent } from './components/controls/cud-grid/form-number-cell/form-number-cell.component';
import { FormTextCellComponent } from './components/controls/cud-grid/form-text-cell/form-text-cell.component';
import { DatePickerComponent } from './components/controls/date-picker/date-picker.component';
import { DynamicElementDirective } from './components/controls/directives/dynamic-element.directive';
import { DragDropComponent } from './components/controls/drag-drop/drag-drop.component';
import { FormTabComponent } from './components/controls/form-tab/form-tab.component';
import { GroupBoxComponent } from './components/controls/group-box/group-box.component';
import { RadioButtonComponent } from './components/controls/radio-button/radio-button.component';
import { TextAreaComponent } from './components/controls/text-area/text-area.component';
import { TextBoxComponent } from './components/controls/text-box/textBox.component';
import { FormBuilderExtended } from './components/my-form/FormBuilderExtended';
import { MyFormComponent } from './components/my-form/my-form.component';
import { MaterialModule } from './material.module';
import { DisplayValueChangedComponent } from './components/display-value-changed/display-value-changed.component';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgGridModule,AgGridAngular } from 'ag-grid-angular';
import { JsonPrettyPrintPipe } from './components/my-form/jsonPrettyPrint';

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
        CudGridComponent,
        FormTabComponent,
        FormTextCellComponent,
        FormNumberCellComponent,
        DragDropComponent,
        DisplayValueChangedComponent,
        JsonPrettyPrintPipe
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        AgGridModule,
        AgGridAngular        
    ],
    providers: [
        { provide: FormBuilderExtended, useClass: FormBuilderExtended },
        { provide: UntypedFormBuilder, useClass: FormBuilderExtended },
        { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: 'noop' },
        { provide: ComponentErrorMapper, useClass: ComponentErrorMapper },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
