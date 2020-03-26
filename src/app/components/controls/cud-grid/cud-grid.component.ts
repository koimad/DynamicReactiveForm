import { Component, OnInit, Input } from "@angular/core";
import { ErrorStateMatcher } from "@angular/material";
import { ComponentErrorMapper } from "../component-error-mapper";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "src/app/model/form-item-definition";

@Component({
  selector: "cud-grid",
  templateUrl: "./cud-grid.component.html",
  styleUrls: ["./cud-grid.component.css"]
})
export class CudGridComponent implements OnInit {
  errorMapper: ErrorStateMatcher;

  @Input()
  field: FieldConfig;
  @Input()
  group: FormGroup;

  constructor() {
    this.errorMapper = new ComponentErrorMapper();
  }

  ngOnInit() {}
}
