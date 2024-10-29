# Mastering Component Communication in Angular

## Intro

### Before we start
<i>Hey Angular devs! This guide explores the ways components can talk to each other - 
from simple one-way data passing to more complex interactions. It focuses on showing you
different communication methods, without diving too deep into each one (that would make
this post endless!) 😉</i>

### Let's begin
When building Angular applications, it's important to understand how
different parts can share information. This is called component communication.
Today, I'll cover all possible ways to make components talk to each other,
including some less obvious methods that can help share information.

It's worth remembering that some of these approaches are better than
others in specific cases, but for sure it's always good to know all the
possibilities. This way, you can pick the best solution for your case in you application.
<u>The key is the critical thinking and understanding context of the problem.</u>

Every approach will be explained in detail, with
[code examples](https://github.com/michalgrzegorczyk-dev/angular-component-communication)
that you can run and test by yourself. The code examples in the blog post will be simplified,
as possible, so I really recommend you to check the full examples in the repository.


### Here's what we'll cover:

- Common Approaches
  - `@Input` and `@Output` decorators
  - Setter methods with `@Input` decorator
  - `OnChanges` lifecycle hook with `@Input` decorators
  - `@Injectable` services
  - `@ViewChild` and `@ViewChildren` decorators
  - Routing Parameters and Queries (`/:id` and `?query=param`)
  - Template reference variables (`#`)
  - Parent component injection into child components
  - `@Input` and `@Output` inheritance
  - `@ContentChild` and `@ContentChildren` with `<ng-content>`

- Modern Approaches (Angular v16/17+)
  - `input()` and `output()`
  - `viewChild()` and `viewChildren()`
  - `<ng-content>` with `contentChild()` and `contentChildren()`
  - Routing with `@Input()` and `withComponentInputBinding()`
