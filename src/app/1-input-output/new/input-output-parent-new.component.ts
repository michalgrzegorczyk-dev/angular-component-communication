import {Component, input} from "@angular/core";

@Component({
  selector: 'app-1-input-output-parent-new',
  standalone: true,
  template: `<h1>app-1-input-output-parent-new</h1>`,
})
export class InputOutputParentNewComponent {
  parentInput = input('initial');
}
