# Mastering Component Communication in Angular

## Introduction
When you build apps with Angular, you need to know how different
parts of your app can share information. This is called component
communication. In this blog post, I'll cover all possible ways to make 
components talk to each other, such as:

- Simple ways that are used most often
  - `@Input` and `@Output`, 
  - Setter methods
  - `OnChanges` lifecycle hook
  - Services
  - `@ViewChild` and `@ViewChildren`
  - Routing Params and Queries
  - Template reference variables
- Modern approaches (signals)
  - `input()` and `output()`
  - `viewChild()` and `viewChildren()`
  - router input //todo
- Rarely used techniques that can be helpful sometimes
  - Injecting parent components into child components
  - `@Input` inheritance

I'll also highlight some features that aren't usually 
thought of as component communication, but can actually help to 
share information.

Some of these ways are better than others. But it's good to know all
of them. This way, you can pick the best one for your case.

❗<u>The key here is a critical thinking and understanding context of the problem.</u>

I'll show you examples of each way. By the end, you'll know lots of
ways to make your Angular app's parts work together. Also, you can
check every example by yourself [under this link.](https://github.com/michalgrzegorczyk-dev/angular-component-communication)

Ready to learn? Let's start!
