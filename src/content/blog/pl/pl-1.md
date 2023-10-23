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

## FP

### Closure

### High order fn

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
