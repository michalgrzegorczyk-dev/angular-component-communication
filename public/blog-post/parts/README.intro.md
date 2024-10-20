# Mastering Component Communication in Angular

## Introduction
When building applications with Angular, it's important to know how 
different parts of your app can share information. This is called 
component communication. This blog post covers all possible 
ways to make components talk to each other and also points
out the ones that are not typically considered as component
communication, but can actually help to share information.

Here's the list of topics that will be covered:

- Approaches frequently used, and recommended
  - `@Input` and `@Output`
  - Setter methods
  - `OnChanges` lifecycle hook
  - Services
  - `@ViewChild` and `@ViewChildren`
  - Routing Params and Queries
  - Template reference variables
  - Injecting parent components into child components
  - `@Input` and `@Output` inheritance
- Modern approaches, Angular V17+
  - `input()` and `output()`
  - `viewChild()` and `viewChildren()`
  - `withComponentInputBinding()`
- Approaches not considered as component communication
  - Component projection
  - Using `@ContentChild` and `@ContentChildren`
  - `*ngTemplateOutlet`
  - Passing data via router resolvers
  - Using `@HostListener` and `@HostBinding`
  - WebAPI, like `localStorage`, `broadcastChannel`, etc.

Some of these approaches are better than others in specific cases.
But for sure it's good to know all of them. This way, you can pick 
the best one for your case. <u>The key here is a critical 
thinking and understanding context of the problem.</u>

Every approach will be explained in detail, with
[code examples](https://github.com/michalgrzegorczyk-dev/angular-component-communication)
that you can run and test by yourself.

Ready to learn? Let's start! 💪
