---
title: "Programming language"
pubDatetime: 2023-10-23T16:00:00Z
tags: ["database"]
draft: false
description: '"The limits of my language mean the limits of my world."'
---

_This is a learning note of the video course [programming language on Cousera](https://www.coursera.org/learn/programming-languages)_

## Overview

Programming language is an interesting topic. As a developer, we hear such argument all the time: Which programming language is the best? Is the functional programming language better than object-oriented programming? What should I do when I learn a new programming language?

In this course, all of these questions have been answered clearly.

// TODO

## The pieces of a programming language

Before jumping into the details of the programming language, it's vital to know the combination of a PL and where should we spend our energy. We list the essential pieces for defining and learning _any_ programming language:

- Syntax: How to express something in a PL? For example, how to introduce a function?
- Semantics: What does this statement mean or evaluated?
- Idioms: What are the common approaches to using the language features to express computations?
- Libraries: What has been implemented and offered to you by default?
- Tools: What is available for manipulating programs in the language?

In this blog series, we'll concentrate on semantics and idioms. While AI tools like ChatGPT simplify understanding the syntax and API of specific programming languages and libraries, the essence of proficiently writing in a programming language lies not in its syntax, but in its semantics and idioms.

## Functional programming and object-oriented programming

FP (functional programming) and OOP (object-oriented programming) are prealent programming paradigms. Neither is a one-size-fits-all solution. They're employed in distinct scenarios. Let's illustrate this with an example.

Suppsoe we are designing a programming language for planimetry. In this language, we have four funcdamental data structures:

- NoPoint
- Point
- Line
- LineSegment

We provide built-in functions for these structures to facilitate program development:

- Simplify: return the simplified shape of given shape
- Intersect: return the intersection of two given shape
- Shift: move the given shape a given distence

To clarify the requirements, the following table illustrate them.

![Our planimetry PL](https://raw.githubusercontent.com/ShroXd/img-hosting/main/blog/2023-10-23-7wmRZu.png)

Using a functional programming language, it becomes straightforward to implement and expand our PL in a columnar format. Below is the pseudo-code.

It's important to note that while we utilize `is_x` in the upcoming PL, static functional programming offers a superior feature for this task: pattern matching. We'll delve into its details in future discussions.

```python
def simplify(shape):
    if is_no_point(shape):
        # handle no point
    elif is_point(shape):
        # handle point
    # ...
```

If we wish to introcude a new function _spin_, that accepts a shape and an angle and returns the rotated shape, it would be straightforward. This is because we can incorporate the function without altering any existing code.

```python
def spin(shape):
    if is_no_point(shape):
        # handle no point
    elif is_point(shape):
        # handle point
    # ...
```

However, introducing a new shape, square, and ensuring all our functions accommodate this addition would be quite challenging. This is because it necessitates modifications to every function in our program.

```python
type Square

def simplify(shape):
    # ...
    elif is_square(shape):
        # handle new shape

def intersect(shape):
    # ...
    elif is_square(shape):
        # handle new shape

# ...
```

In contrast, Object-Oriented Programming (OOP) is the complete opposite. While it facilitates implementing and extending the program row-wise, it struggles to achieve the same column-wise.

```python
class NoPoint:
    def simplify():
        # handle no point

    def intersect():
        # handle no point

class Point:
    def simplify():
        # handle point

    def intersect():
        # handle point

# ...
```

And it's easy to add a new shape.

```python
class Square:
    # ...
```

But if we want to add a new function _spin_, we need to add it to all data structures.

```python
class NoPoint:
    def spin():
        # handle no point

class Point:
    def spin():
        # handle point

# ...
```

## Functional programming (FP)

Functional programming (FP) is a paradigram that views computation as the evaluation of mathematical functions, avoiding mutable data and state changes. While FP encompasses many topics, this blog will highlight its core features. Grasping these concepts is the foundation for improve programming skills and delving deeper into advanced FP knowledge.

### Lexical scope and closure

Before discussing the lexical scope, it's important to understand environment of the programming language. Generally, environment provides a mechanism for storing and accessing variables. In a real PL implementation, the data structure for creating environment is a complex topic, but we skip it in this blog to focus on the core concept.

For explain the environment, let's use the hash table to implement it.

![environment based on hash table](https://raw.githubusercontent.com/ShroXd/img-hosting/main/blog/2023-10-24-IywPKU.png)

Based on this design, it's easy to implement the algorithm of creating and searching bindings.

```python
env = {}

def add(name, value = None):
    env[name] = value

def find(name):
    return env.get(name, None)
```

Environment explains the way to creating and accessing variables and functions, but in a real program, having only one global environment is useless (I'm not saying JavaScript). Sometimes we may need to create **nested** environments. Scope is the concept which address the question about how to create new environment and connect them together.

In programming language, scope is a concept about the region or portion of the code where a variable or function binding is accessible. The lexical scope is a common design of most programming language. The term "lexical" signifies that the scope is determined by the physical location of variable and functions in the source code. Here is an example:

```python
test_var = "outer scope value"

def myFunction():
    test_var = "inner scope value"
    print(test_var)

myFunction() # inner scope value
print(test_var) # outer scope value
```

In different programming language, there are different ways to create a scope. But the evaluation rules of lexical scope is not changed.

In summary, the concept of an environment in programming provides the mechanism for storing and accessing variables, while lexical scope determines the rules and structuresfor creating and navigating these environments.

Based on these understanding, we can explain a important understanding of the function in PL's runtime: A function is composed of **code** and need to work with the **environment**. The code determines the logic of the function, and the environment determines the values of each bindings (include variables and functions). We can use a _pair_ to illustrate it.

![code and env](https://raw.githubusercontent.com/ShroXd/img-hosting/main/blog/2023-10-24-ZE3rzG.png)

This _pair_ is also called **function closure** or just **closure**. The precise definition of the closure is that _record_ some variables from its lexical scope, it retains access to variables from an outer function even after that outer function has finished executing. Here is an example.

```typescript
const variable = "outter value";

function fnBuilder(param: string) {
  const variable = "inner value";
  return () => param + variable;
}

const fn = fnBuilder("param value "); // param value inner value
```

When we assign the returing function from `fnBuilder` to `fn`, we not only assign the code of the lambda function, but also provide the environment of the lambda function. Therefore, the `fn` can access `variable` in the `fnBuilder` even though the `fnBuilder` has finished and poped from the executing stack.

### High order function

Drawing from the principles of lexical scope and closures, functional programming introduces a powerful idiom: the high-order function. This concept pertains to functions that act upon other functions. Specifically, a high-order function fulfills at least one of the following criteria:

1. Takes one or more functions as arguments
2. Returns a function

This idiom facilitates higher abstraction, resulting in more succinct and expressive code. To illustrate, consider a scenario where we have an array of integers and the task is to subtract 10 from each number in the array. Without the knowledge of high-order functions, one might typically resort to a basic `for` loop to achieve this.

```python
nums = [1, 2, 3]
doubled = []

for num in nums:
    doubled.append(nums * 10)    # 1
```

Indeed, but the challenge arises when we intertwine the logic for iterating over the array with the logic for processing its elements. This conflation can complicate future development. A more refined approach is to leverage map and lambda functions, which effectively decouple these logics.

```python
doubled = list(map(lambda num: num * 2, numbers))
```

In the refactored code, we're using `map` to apply the lambda function to each element. Which makes the it's easy to replace the process function even during the runtime.

Another famous example is the `reduce`. We may call it `fold` in some programming language.

```typescript
const nums = [1, 2, 3];
const sum = nums.reduce((acc, curr) => acc + curr, 0);
```

Because of using high order function, it's pretty easy to understand the logic.

#### Combining functions

In practical programming, we often work with numerous functions. To maximize code reusability and build robust applications, it's beneficial to craft new functions by combining existing ones. Let's explore this through the example of compose.

```javascript
const compose = (f, g) => x => f(g(x));

// utils
const double = x => x * 2;
const increment = x => x + 1;
const incrementThenDouble = compose(double, increment);
```

This pattern can be extended to pipeline operator.

```javascript
const pipeline =
  (...fns) =>
  initVal =>
    fus.reduce((acc, fn) => fn(acc), initVal);

const incrementThenDouble = pipeline(increment, double);
```

Certainly. Due to JavaScript's limited support for high-order functions, it's more typical to use arrays to implement this pattern. A prime example is the middleware feature in Koa. You can refer to the [source code](https://github.com/koajs/koa/blob/dbf4b8f41286befd53dfd802740f2021441435bf/lib/application.js#L12) for a deeper understanding.

```javascript
middleware = []

// push callback fns to the middleware array
use(fn) {
    // check if fn is a function
    middleware.push(fn)
}

// return a request handler callback, it compose the callback fns and use it to build the request handler
callback() {
    const fn = compose(middleware)
    const handleRequest = (req, res) => {
        const ctx = createContext(req, res)
        if (!ctxStorage) {
            return handleRequest(ctx, fn)
        }
        // ...
    }
}
```

#### Curring and partial application

Currying means the technique that a function take the first conceptual argument and return another function that takes the second conceptual argument. Lexical scope is essential to this technique working correctly. Here is a basic example.

```javascript
const add = (x, y, z) => x + y + z;
const curriedAdd = x => y => z => x + y + z;
```

A more advanced usage of this pattern is not pass all arguments to the function, developer may provide fewer and use the resulting closure later. This is called _partial application_.

```javascript
const fixedAdd = curriedAdd(1)(2);
```

By using this pattern, we can limit some arguments and provide a clear API to the user of our function. Here is an example to use this pattern to handle the event of button on the website.

```javascript
const bindEvent => element => eventName => callbackFn => element.addEventListener(eventName. callbackFn)

const bindEventToBtn = bindEvent(btn);
const bindClickToBtn = bindEventToBtn('click');
bindClickToBtn(() => console.log('Button was clicked!'));
```

### Recursion

### Pattern matching

## OOP

### Subclassing and inheritance

### dispatch and double dispatch

### Duck typing

## Discussion

### Relationships of high order function and double dispatch

// TODO: code block and env

### Static and dynamic typing

### Hiding and reuse things

fp: high order fns
oop: class inherit / mixin / interface
getter/setter, private fn
