# 1-input-output

## Input and output decorators

Most basic way of communication between components is using input and 
output decorators. To achieve this, we need to have added the `@Input()` and `@Output()` decorators
to the child component and pass this data from the parent component. 
We can do it old way, which is using the `@Input()` and `@Output()` decorators, or we can make it
new way, with signals `input()`

Moreover, using inputs in old way, we can inherit the value from the parent component if 
we extend that parent component using ```inputs: ['parentInput'],``` in ```@Component``` metadata. It's not very common practice but for sure it's possible and good to 
know about it. What's more, it doesn't work like that with signals approach. 


```typescript
// in app-child component
@Input() input1 = '';

// in parent component
<app-child [input1]="parentInput" />

// vs signals
  
// in app-child component
input1 = input('initial');

// in parent component
<app-child [input1]="input1Signal()" />
```

You can see full set of examples in ```src/app/1-input-output``` folder.
