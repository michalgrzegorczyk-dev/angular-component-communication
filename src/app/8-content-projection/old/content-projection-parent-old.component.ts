// container component
import {Component, AfterContentInit, ContentChild, ElementRef, ContentChildren, QueryList} from "@angular/core";
import {ContentProjectionChildComponent} from "../content-projection-child.component";

@Component({
  selector: 'app-8-content-projection-parent-new',
  template: `
    <div class="container">
      <ng-content select="[header]"/>
      <ng-content/>
    </div>
  `,
  standalone: true,
  imports: [ContentProjectionChildComponent],
})
export class ContentProjectionParentNewComponent implements AfterContentInit {
  @ContentChild('header') headerContent!: ElementRef;

  @ContentChildren(ContentProjectionChildComponent)
  items!: QueryList<ContentProjectionChildComponent>;

  ngAfterContentInit() {
    // Access projected content here
    console.log('Header:', this.headerContent?.nativeElement.textContent);
    this.items.forEach(item => console.log(item.title));
  }
}
