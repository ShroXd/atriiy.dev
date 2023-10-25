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

Sppose we will design a programming language for the planimetry. In our PL, we have 4 basic data structures:

- NoPoint
- Point
- Line
- LineSegment

For these data structures, we offers some built-in functions for developing program based on them.

- Simplify: return the simplified shape of given shape
- Intersect: return the intersection of two given shape
- Shift: move the given shape a given distence

To make the requirements clearly, we can use the following table to illustrate them.

![Our planimetry PL](https://raw.githubusercontent.com/ShroXd/img-hosting/main/blog/2023-10-23-7wmRZu.png)

If we are using the functional programming language, it would pretty simple to implement and extend our PL _in column_. Here is the pseudo-code.

There's something worth mentioning, although we use `is_x` in the following PL, but in a static functional programming, we have better feature to finish this work, which is the pattern matching. We will explain the details of it in the future.

```python
def simplify(shape):
    if is_no_point(shape):
        # handle no point
    elif is_point(shape):
        # handle point
    # ...
```

And if we want to add a new function _spin_ accepting a shape and angle, returnning the spinned shape. It would be a easy work. Because we can add that function directly without changing any existing code.

```python
def spin(shape):
    if is_no_point(shape):
        # handle no point
    elif is_point(shape):
        # handle point
    # ...
```

But if we want to add a new shape _square_ and let all of our functions support this new shape, it would be pretty painful. Because we need to change all functions in our program.

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

In contrast, OOP is complete opposite. It can implement and extend the program in rows easily but hard to do the same in columns.

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

Based on the lexical scope and closures, we can use a powerful idiom in the functional programming: the high order function. It is a concept refers to functions that operate on other functions. Specifically, a high-order function does at least one of the following:

1. Takes one or more functions as arguments
2. Returns a function

This idiom allows greater abstraction and can lead to more concise and expressive code. To describe this, let's suppose a requirements. We have a integer array and the requirement is to minus 10 to each number in the given array. If we don't know the high-order function, we may use a simple `for` loop to finish this work.

```python
nums = [1, 2, 3]
doubled = []

for num in nums:
    doubled.append(nums * 10)    # 1
```

This is correct, but the problem is that we put the logic for **iterate** the given array and the logic for **processing** the elements from the array at the same place. It makes the development in the future difficult. Thus, a mroe common solution is to use the `map` and `lambda` to decouple the logic.

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

In the real program, we usually need to program with lots of functions. To reuse the existing code and create robust program, it's useful to create new functions that are just combinations of other functions. Here is a example of `compose`.

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

Of course, because the weak supporting for high order function in JavaScript, it's more common to use an array to implement this pattern. A good example is the middleware feature of `Koa`. Here is the [source code](https://github.com/koajs/koa/blob/dbf4b8f41286befd53dfd802740f2021441435bf/lib/application.js#L12).

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
