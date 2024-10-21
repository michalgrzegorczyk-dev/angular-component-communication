import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {InputOutputParentOldComponent} from "./input-output-parent-old.component";

@Component({
  selector: 'app-1-input-output-child-old',
  standalone: true,
  template: `
    <h1>app-1-input-output-child-old</h1>
    <p>Input 1: {{ input1 }}</p>
    <p>Input 2: {{ input2 }}</p>
    <p>Input 3: {{ input3Internal }}</p>
    <p>Input 4: {{ parentInput }}</p>
  `,
})
export class InputOutputChildOldComponent extends InputOutputParentOldComponent implements OnInit {
  @Input() input1 = '';
  @Input({
    required: true,
    alias: 'aliasInput',
    transform: (val: string) => val + '!'
  })
  input2 = '';

  @Output() output = new EventEmitter<void>();

  @Input()
  set inputSetter(val: string) {
    this.input3Internal = val;
  }

  input3Internal = '';

  ngOnInit(): void {
    this.parentOutput.emit('ParentOutput from Child');
  }
}
