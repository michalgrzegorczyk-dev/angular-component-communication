## When it can feel like communication

### `@ContentChild` and `@ContentChildren`
While `@ContentChild` involves interaction with projected content, it's 
not traditionally considered component communication in the same way as 
`@ViewChild`. In `@ViewChild`, there’s a direct line between the parent and 
child components for controlling behavior, but `@ContentChild` is more about 
a child adapting to or interacting with content passed down from the parent, 
typically through `<ng-content>`.

### `*ngTemplateOutlet`
I wouldn't consider using `*ngTemplateOutlet` as traditional component 
communication because it's more about template projection and dynamic 
rendering than direct interaction between components. However, it does 
involve data passing between the parent and the dynamically rendered 
template, which can be seen as a form of indirect communication.

## Outro
That's it, we  finally reached to the end of the blog post. I covered all the 
ways of component communication in Angular, showed cases for old syntax and
most recent with usage of signals. I really hope you enjoyed reading it. 
If you have any questions, feel free to ask in the comments below. 

Thanks for reading! <br/>
