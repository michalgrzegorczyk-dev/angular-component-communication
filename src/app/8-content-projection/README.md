## ContentChild and ContentChildren

<img src="/public/img/projection.png" alt="x" style="width: 500px; height: auto;">

### Component Projection with Content Child & Content Children
While `ViewChild` and `ViewChildren`, works with elements, in a component's template,
 `ContentChild` and `ContentChildren` works with projected content (content between 
component tags). This feature allows a component to query and manipulate content 
that is projected into it from a parent component.

#### Traditional approach
The traditional method uses `@ContentChild()` and `@ContentChildren()` decorators to 
access projected content. These decorators work together with `<ng-content>` tag to 
enable flexible content projection patterns.

| Status | Description                                                                               |
|--------|-------------------------------------------------------------------------------------------|
| ❌ | Only accessible after ngAfterContentInit lifecycle hook.                                  |
| ❌ | Cannot access projected content during component initialization.                          |
| ❌ | Multiple ng-content slots can make the template structure complex and hard to understand. |
| ✅ | Enables flexible component composition through content projection.                        |
| ✅ | Allows dynamic interaction with projected content.                                        |

```typescript
// parent component
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
    // Access projected content here.
    this.items.forEach(item => console.log(item.title));
  }
}

// Usage in parent.
@Component({
  template: `
    <app-container>
      <app-item title="Item 1" />
      <app-item title="Item 2" />
    </app-container>
  `
})
```

#### Modern Approach with Signals
In Angular 17+, there is also equivalent `contentChild()` and `contentChildren()` functions, 
that works the same but again, as signals.

Full set of examples around this topic you can find in the [src/app/8-component-projection](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app/8-component-projection) folder.
