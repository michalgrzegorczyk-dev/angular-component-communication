// container component
import {Component, AfterContentInit, ElementRef, contentChild, contentChildren} from "@angular/core";
import {ContentProjectionChildComponent} from "../content-projection-child.component";

@Component({
  selector: 'app-8-content-projection-parent-old',
  template: `
    <div class="container">
      <ng-content select="[header]"/>
      <ng-content/>
    </div>
  `,
  standalone: true,
  imports: [ContentProjectionChildComponent],
})
export class ContentProjectionParentOldComponent implements AfterContentInit {
  headerContent = contentChild<ElementRef>('header');
  items = contentChildren<ContentProjectionChildComponent>(ContentProjectionChildComponent);

  ngAfterContentInit(): void {
    // Access projected content here
    console.log('Header:', this.headerContent()?.nativeElement.textContent);
    this.items().forEach(item => console.log(item.title));
  }
}
