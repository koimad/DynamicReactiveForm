import { FormTabComponent } from './form-tab/form-tab.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { TextBoxComponent } from './text-box/textBox.component';
import { GroupBoxComponent } from './group-box/group-box.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { CheckBoxComponent } from './check-box/check-box.component';
import { ComboBoxComponent } from './combo-box/combo-box.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { CudGridComponent } from './cud-grid/cud-grid.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';


export const componentMapper = {
  textBox: TextBoxComponent,
  textBlock: TextAreaComponent,
  group: GroupBoxComponent,
  checkBox: CheckBoxComponent,
  comboBox: ComboBoxComponent,
  datePicker: DatePickerComponent,
  radioButton: RadioButtonComponent,
  cudGrid: CudGridComponent,
  formTab: FormTabComponent,
  dragDrop: DragDropComponent
};

export enum ComponentTypes {}
