# Mastering Component Communication in Angular

## Intro
When you build apps with Angular, you need to know how different
parts of your app can share information. This is called component
communication. 

In this blog post, I'll cover possible ways to make 
components talk to each other, such as: also i will talk about 
features that are not taken into account ragarding to communication 

- Simple ways that are used most often
  - `@Input` and `@Output`, 
  - Setter methods
  - `OnChanges` lifecycle hook
  - Services
  - `@ViewChild` and `@ViewChildren`
  - Routing Params and Queries
  - Template reference variables
- Modern approaches (signals)
  - `input()`, `output()`
  - `viewChild()`, `viewChildren()`
  - router input //todo
- Rarely used techniques that can be helpful sometimes
  - Injecting parent components into child components
  - `@Input` Inheritance

I'll also highlight some Angular features that aren't usually 
thought of as communication features, but can actually help components 
share information.

Some of these ways are better than others. But it's good to know all
of them. This way, you can pick the best one for your project.

<u>The key here is a critical thinking and understanding of the problem.</u>

I'll show you examples of each way. By the end, you'll know lots of
ways to make your Angular app's parts work together. Also, you can
check every example by yourself here: <link to github and live demo>.

Ready to learn? Let's start!
