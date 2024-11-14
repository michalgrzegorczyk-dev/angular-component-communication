# Mastering Component Communication in Angular

<img src="/public/img/img0.png" alt="Inputs and Outputs" style="width: 450px; height:450px">


## Intro
Hey Angular devs! This guide explores the ways components can talk to each other - 
from simple one-way data passing to more complex interactions, like passing the data via router. It focuses on showing you
different communication methods, without diving too deep into each one, because that would make
this post endless! 😉

When building Angular applications, it's important to understand how
different parts can share information. This is called component communication and
today, I'll cover all possible ways to make components talk to each other,
including some less obvious methods that can help share information.

It's worth remembering that some of these approaches are better than
others in specific cases, but for sure it's always good to know all the
possible ways to share the data and choose wisely. This way, you can pick the best solution for your case in you application.
<u>The key is the critical thinking and understanding context of the problem.</u>

Every approach will be explained in detail, with
[code examples](https://github.com/michalgrzegorczyk-dev/angular-component-communication/tree/master/src/app)
that you can run and test by yourself. The code examples in the blog post will be simplified,
as possible, so I really recommend you to check the full examples in the repository.


### Here's what we'll cover:

- Input and Output
  - `@Input` and `@Output` decorators
  - `input()` and `output()` with signals
  - Setter methods with `@Input` decorator
  - `@Input` and `@Output` inheritance
  - `OnChanges` lifecycle hook with `@Input` decorators
- Services
  - `@Injectable` services
- Component injection
- Template variables
  - Template reference variables (`#`)
- Content Projection
  - `@ContentChild` and `@ContentChildren` with `<ng-content>`
  - `contentChild()` and `contentChildren()` with signals
- View and Query List
  - `@ViewChild` and `@ViewChildren` decorators
  - `viewChild()` and `viewChildren()` with signals
- Routing
  - Routing Parameters and Queries (`/:id` and `?query=param`)
  - Routing with `@Input()` and `withComponentInputBinding()` 
  - Routing objects
---
