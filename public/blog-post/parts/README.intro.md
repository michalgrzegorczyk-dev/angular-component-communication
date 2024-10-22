# Mastering Component Communication in Angular

## Introduction

When building applications with Angular, it's important to know how 
different parts of your application can share information. This is called 
component communication, and today I'll cover all possible 
ways to make components talk to each other and also points
out the ones that are not typically considered as component
communication itself, but can actually help to share information.

### Here's the list of topics that will be covered

- Most common approaches
  - `@Input` and `@Output` decorators
  - Setter methods with `@Input` decorator
  - `OnChanges` lifecycle hook combined with `@Input` decorators
  - `@Injectable` services
  - `@ViewChild` and `@ViewChildren` decorators
  - Routing Params and Queries, e.g. `/:id` and `?query=param`
  - Template reference variables `#`
  - Injecting parent components into child components
  - `@Input` and `@Output` inheritance
  - Using `@ContentChild` and `@ContentChildren` with `<ng-content>`
- Modern approaches, Angular v17+
  - `input()` and `output()`
  - `viewChild()` and `viewChildren()`
  - `<ng-content>` with `contentChild()` and `contentChildren()`
  - Routing with `@Input()` and usage of `withComponentInputBinding()`

It's worth to remember that some of these approaches are better than 
others in specific cases, but for sure it's always good to know all the 
possibilities. This way, you can pick the best solution for your case in you application. 
<u>The key is the critical thinking and understanding context of the problem.</u>

Every approach will be explained in detail, with
[code examples](https://github.com/michalgrzegorczyk-dev/angular-component-communication)
that you can run and test by yourself. FYI, code examples in the blog post will be simplified, 
ass possible, so I really recommend you to check the full examples in the repository.

Ready to learn? Let's start! 💪
