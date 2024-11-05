## ContentChild and ContentChildren in Angular

<img src="/public/img/projection.png" alt="x" style="width: 500px; height: auto;">

Here's how to work with projected content in Angular components! 
While `ViewChild` and `ViewChildren` handle elements in a component's template,
`ContentChild` and `ContentChildren` deal with content that's projected between
component tags. This advanced feature helps you manage content passed
from parent components.

#### Practical Uses of Content Projection
1. Card component might have a predefined style and layout
   (like header, body, and footer areas), but the actual content of these areas
   can be projected by the parent component, allowing for versatile reuse across
   different parts of an application.
2. Tab set component where each tab’s content is projected from a
   parent component, allowing each tab content to be uniquely defined while using the
   same tab navigation system.

| Status | Description                                                                                                                                                               |
|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ❌ | Content is only available after the `ngAfterContentInit` lifecycle hook, not during initialization.                                                                       |
| ❌ | Component initialization cannot access or manipulate projected content.                                                                                                   |
| ❌ | Lacks strong typing, making it harder to ensure type safety for projected content.                                                                                            |
| ⚠️ | Using multiple ng-content slots adds complexity, but enables powerful component compositions when used carefully. |
| ✅ | Creates flexible and reusable components through content projection features.                                                                                                      |
| ✅ | Provides direct access to projected content, making it easy to interact with nested elements.                                                                                                                       |


### Traditional Approach Explained
The classic way uses `@ContentChild()` and `@ContentChildren()` decorators along 
with the `<ng-content>` tag. This combination gives you flexible ways to 
project and manage content.

```typescript
// Parent component with content projection slots.
@Component({
  selector: 'app-parent',
  template: `
    <div class="parent">
      <ng-content select="[header]" />
      <ng-content />
    </div>
  `
})
class ContainerComponent implements AfterContentInit {
  @ContentChild('header') 
  headerContent: ElementRef;

  @ContentChildren(ItemComponent) 
  items: QueryList<ItemComponent>;

  ngAfterContentInit() {
    // Access projected content after initialization.
    this.items.forEach(item => console.log(item.title));
  }
}

// Example usage in a parent component.
@Component({
  template: `
    <app-container>
      <app-item title="Item 1" />
      <app-item title="Item 2" />
    </app-container>
  `
})
```

### Modern Signal-Based Approach
Angular 17+ introduces signal-based versions with `contentChild()` and `contentChildren()`
functions. They work similarly, but give you the power of signals.

Full set of examples around this topic you can find in the [src/app/8-component-projection](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/8-component-projection) folder.
