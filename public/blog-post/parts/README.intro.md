# Mastering Component Communication in Angular

## Intro

During working on this article, I've noticed that there are many ways to
"communicate" in Angular, but not all of them are considered as component communication
by some developers - for me, it's the same level of discussion like choosing
tabs over spaces for indentation and vice versa. I would suggest focus on 
the main topic and learn as much as possible about it 😉. Also, I would
like to mention that this article intended for Angular developers who,
has some experience with the framework and wants to learn more about 
component communication.

When building applications with Angular, it's important to know how 
different parts of your application can share information. This is called 
component communication, and today I'll cover all possible 
ways to make components talk to each other and also points
out the ones that are less considered as component
communication itself, but can actually help to share information.

It's worth to remember that some of these approaches are better than
others in specific cases, but for sure it's always good to know all the
possibilities. This way, you can pick the best solution for your case in you application.
<u>The key is the critical thinking and understanding context of the problem.</u>

Every approach will be explained in detail, with
[code examples](https://github.com/michalgrzegorczyk-dev/angular-component-communication)
that you can run and test by yourself. FYI, code examples in the blog post will be simplified,
ass possible, so I really recommend you to check the full examples in the repository.


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
