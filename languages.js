/* languages.js — All language configs, snippets, reference cards */

const LANGUAGES = [
  /* ── WEB ── */
  { id:'javascript', name:'JavaScript', short:'JS',  cat:'Web',      cm:'javascript', run:'js',
    color:'#f7df1e', bg:'#333', ext:'.js', runnable:true,
    starter:`// JavaScript — Live Execution Enabled ▶
console.log("Hello, DevLab!");

// Variables & Types
const greeting = "World";
let count = 42;

// Functions
function greet(name) {
  return \`Hello, \${name}! Count: \${count}\`;
}

console.log(greet(greeting));

// Array methods
const nums = [1, 2, 3, 4, 5];
const doubled = nums.map(n => n * 2);
console.log("Doubled:", doubled);

// Destructuring
const { PI, E } = Math;
console.log(\`PI = \${PI.toFixed(4)}, E = \${E.toFixed(4)}\`);

// Async simulation
setTimeout(() => console.log("Async: 500ms later!"), 500);
`},

  { id:'typescript', name:'TypeScript', short:'TS', cat:'Web', cm:'javascript', run:'ts',
    color:'#3178c6', bg:'#1e1e1e', ext:'.ts', runnable:false,
    starter:`// TypeScript — Syntax Highlighting
interface User {
  id: number;
  name: string;
  email?: string;
}

type Status = "active" | "inactive" | "pending";

class UserService {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
    console.log(\`Added: \${user.name}\`);
  }

  findById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }
}

// Generic function
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

const service = new UserService();
service.addUser({ id: 1, name: "Alice" });
`},

  { id:'html', name:'HTML', short:'HTML', cat:'Web', cm:'htmlmixed', run:'html',
    color:'#e34f26', bg:'#2d2d2d', ext:'.html', runnable:true,
    starter:`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>DevLab Preview</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #1a1a2e, #16213e);
      color: #eee;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
    }
    .card {
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 16px;
      padding: 40px;
      text-align: center;
      max-width: 400px;
    }
    h1 { font-size: 2rem; margin-bottom: 10px; }
    .badge {
      display: inline-block;
      background: #cba6f7;
      color: #000;
      padding: 4px 14px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: bold;
    }
    button {
      margin-top: 20px;
      background: #cba6f7;
      border: none;
      color: #000;
      padding: 10px 24px;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      font-weight: bold;
      transition: transform 0.2s;
    }
    button:hover { transform: translateY(-2px); }
  </style>
</head>
<body>
  <div class="card">
    <h1>🧪 DevLab</h1>
    <p>HTML renders live in the Preview tab!</p>
    <span class="badge">Live Preview ▶</span>
    <br/>
    <button onclick="this.textContent='Clicked! ✓'">Click Me</button>
  </div>
</body>
</html>
`},

  { id:'css', name:'CSS', short:'CSS', cat:'Web', cm:'css', run:'css',
    color:'#1572b6', bg:'#1a1a1a', ext:'.css', runnable:false,
    starter:`/* CSS — Stylesheet */
:root {
  --primary: #cba6f7;
  --secondary: #89b4fa;
  --bg: #1e1e2e;
  --radius: 8px;
}

/* Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: var(--bg);
  color: #cdd6f4;
  line-height: 1.6;
}

/* Flexbox layout */
.container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Grid example */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

/* Animation */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: var(--radius);
  padding: 1.5rem;
  animation: pulse 2s ease infinite;
}
`},

  { id:'php', name:'PHP', short:'PHP', cat:'Web', cm:'php', run:'ext',
    color:'#777bb4', bg:'#1a1a2a', ext:'.php', runnable:false,
    starter:`<?php
// PHP — Server-side scripting

// Variables & types
$name = "DevLab";
$version = 1.0;
$features = ["editor", "themes", "runner"];

// Functions
function greet(string $name): string {
    return "Hello, {$name}!";
}

echo greet($name) . PHP_EOL;

// Arrays
foreach ($features as $i => $feature) {
    echo "{$i}: {$feature}" . PHP_EOL;
}

// Classes
class Database {
    private array $records = [];

    public function insert(array $record): void {
        $this->records[] = $record;
    }

    public function count(): int {
        return count($this->records);
    }
}

$db = new Database();
$db->insert(["id" => 1, "name" => "Alice"]);
echo "Records: " . $db->count();
?>
`},

  /* ── SYSTEMS ── */
  { id:'c', name:'C', short:'C', cat:'Systems', cm:'text/x-csrc', run:'ext',
    color:'#a8b9cc', bg:'#1a1a1a', ext:'.c', runnable:false,
    starter:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Structures
typedef struct {
    char name[50];
    int age;
    float score;
} Student;

// Function prototype
void printStudent(const Student* s);

int main() {
    // Basic I/O
    printf("Hello from C!\\n");

    // Arrays
    int nums[] = {1, 2, 3, 4, 5};
    int n = sizeof(nums) / sizeof(nums[0]);
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += nums[i];
    }
    printf("Sum: %d\\n", sum);

    // Struct usage
    Student s = {"Alice", 20, 95.5f};
    printStudent(&s);

    // Dynamic memory
    int* arr = (int*)malloc(5 * sizeof(int));
    for (int i = 0; i < 5; i++) arr[i] = i * i;
    printf("Squares: ");
    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);
    free(arr);

    return 0;
}

void printStudent(const Student* s) {
    printf("Student: %s, Age: %d, Score: %.1f\\n",
           s->name, s->age, s->score);
}
`},

  { id:'cpp', name:'C++', short:'C++', cat:'Systems', cm:'text/x-c++src', run:'ext',
    color:'#00599c', bg:'#1a1a2a', ext:'.cpp', runnable:false,
    starter:`#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <memory>
using namespace std;

// Template class
template<typename T>
class Stack {
    vector<T> data;
public:
    void push(T item) { data.push_back(item); }
    T pop() {
        T item = data.back();
        data.pop_back();
        return item;
    }
    bool empty() const { return data.empty(); }
    size_t size() const { return data.size(); }
};

// Inheritance
class Animal {
protected:
    string name;
public:
    Animal(string n) : name(n) {}
    virtual string speak() const = 0;  // Pure virtual
    virtual ~Animal() = default;
};

class Dog : public Animal {
public:
    Dog(string n) : Animal(n) {}
    string speak() const override {
        return name + " says: Woof!";
    }
};

int main() {
    // STL & lambdas
    vector<int> nums = {5, 3, 8, 1, 9, 2};
    sort(nums.begin(), nums.end());
    for_each(nums.begin(), nums.end(),
             [](int n){ cout << n << " "; });
    cout << "\\n";

    // Smart pointers
    auto dog = make_unique<Dog>("Buddy");
    cout << dog->speak() << "\\n";

    // Template usage
    Stack<string> stack;
    stack.push("Hello"); stack.push("World");
    while (!stack.empty()) cout << stack.pop() << " ";

    return 0;
}
`},

  { id:'rust', name:'Rust', short:'RS', cat:'Systems', cm:'rust', run:'ext',
    color:'#f74c00', bg:'#1a1010', ext:'.rs', runnable:false,
    starter:`// Rust — Systems Programming Language

use std::collections::HashMap;

// Struct with methods
#[derive(Debug)]
struct Calculator {
    history: Vec<f64>,
}

impl Calculator {
    fn new() -> Self {
        Calculator { history: Vec::new() }
    }

    fn add(&mut self, a: f64, b: f64) -> f64 {
        let result = a + b;
        self.history.push(result);
        result
    }
}

// Enum with data
#[derive(Debug)]
enum Shape {
    Circle(f64),
    Rectangle(f64, f64),
    Triangle(f64, f64, f64),
}

impl Shape {
    fn area(&self) -> f64 {
        match self {
            Shape::Circle(r) => std::f64::consts::PI * r * r,
            Shape::Rectangle(w, h) => w * h,
            Shape::Triangle(a, b, c) => {
                let s = (a + b + c) / 2.0;
                (s * (s-a) * (s-b) * (s-c)).sqrt()
            }
        }
    }
}

fn main() {
    // Ownership & borrowing
    let s1 = String::from("hello");
    let s2 = s1.clone();
    println!("{} {}", s1, s2);

    // Pattern matching
    let shapes = vec![
        Shape::Circle(5.0),
        Shape::Rectangle(4.0, 6.0),
    ];
    for shape in &shapes {
        println!("{:?} area: {:.2}", shape, shape.area());
    }

    // HashMap
    let mut scores: HashMap<&str, i32> = HashMap::new();
    scores.insert("Alice", 95);
    scores.insert("Bob", 88);
    for (name, score) in &scores {
        println!("{}: {}", name, score);
    }
}
`},

  { id:'go', name:'Go', short:'Go', cat:'Systems', cm:'go', run:'ext',
    color:'#00aed8', bg:'#0d1117', ext:'.go', runnable:false,
    starter:`package main

import (
    "fmt"
    "sort"
    "strings"
)

// Interface
type Shape interface {
    Area() float64
    Perimeter() float64
}

// Struct implementing interface
type Rectangle struct {
    Width, Height float64
}

func (r Rectangle) Area() float64      { return r.Width * r.Height }
func (r Rectangle) Perimeter() float64 { return 2 * (r.Width + r.Height) }

// Goroutine + channel
func worker(id int, ch chan<- string) {
    ch <- fmt.Sprintf("Worker %d done", id)
}

// Closure
func counter() func() int {
    n := 0
    return func() int {
        n++
        return n
    }
}

func main() {
    // Basics
    fmt.Println("Hello from Go!")

    // Slices & maps
    fruits := []string{"banana", "apple", "cherry"}
    sort.Strings(fruits)
    fmt.Println(strings.Join(fruits, ", "))

    // Interface usage
    var s Shape = Rectangle{Width: 4, Height: 6}
    fmt.Printf("Area: %.1f, Perimeter: %.1f\\n", s.Area(), s.Perimeter())

    // Channels
    ch := make(chan string, 3)
    for i := 1; i <= 3; i++ {
        go worker(i, ch)
    }
    for i := 0; i < 3; i++ {
        fmt.Println(<-ch)
    }

    // Closure
    count := counter()
    fmt.Println(count(), count(), count())
}
`},

  /* ── JVM ── */
  { id:'java', name:'Java', short:'Java', cat:'JVM', cm:'text/x-java', run:'ext',
    color:'#ed8b00', bg:'#1a1200', ext:'.java', runnable:false,
    starter:`import java.util.*;
import java.util.stream.*;

// Main class
public class Main {

    // Generic class
    static class Pair<A, B> {
        final A first;
        final B second;
        Pair(A a, B b) { this.first = a; this.second = b; }
        @Override public String toString() {
            return "(" + first + ", " + second + ")";
        }
    }

    // Interface & Lambda
    @FunctionalInterface
    interface Transformer<T> {
        T transform(T input);
    }

    public static void main(String[] args) {
        // Collections & Streams
        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        int sumOfEvenSquares = nums.stream()
            .filter(n -> n % 2 == 0)
            .mapToInt(n -> n * n)
            .sum();
        System.out.println("Sum of even squares: " + sumOfEvenSquares);

        // Map
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 88);
        scores.entrySet().stream()
              .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
              .forEach(e -> System.out.println(e.getKey() + ": " + e.getValue()));

        // Generic pair
        Pair<String, Integer> pair = new Pair<>("Age", 25);
        System.out.println(pair);

        // Lambda
        Transformer<String> upper = String::toUpperCase;
        System.out.println(upper.transform("hello world"));
    }
}
`},

  { id:'kotlin', name:'Kotlin', short:'KT', cat:'JVM', cm:'text/x-kotlin', run:'ext',
    color:'#7f52ff', bg:'#1a1020', ext:'.kt', runnable:false,
    starter:`// Kotlin — Modern JVM Language

// Data class
data class User(
    val id: Int,
    val name: String,
    val email: String? = null
)

// Sealed class
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val message: String) : Result<Nothing>()
}

// Extension function
fun String.isPalindrome(): Boolean =
    this == this.reversed()

// Coroutine-style (simulated)
fun fetchUser(id: Int): Result<User> =
    if (id > 0) Result.Success(User(id, "User$id"))
    else Result.Error("Invalid ID")

fun main() {
    // Data class & destructuring
    val (id, name) = User(1, "Alice", "alice@example.com")
    println("User: $id - $name")

    // When expression
    val result = fetchUser(1)
    when (result) {
        is Result.Success -> println("Got: ${result.data}")
        is Result.Error   -> println("Error: ${result.message}")
    }

    // Collections & lambdas
    val numbers = (1..10).toList()
    val evenSquares = numbers.filter { it % 2 == 0 }.map { it * it }
    println("Even squares: $evenSquares")

    // Extension function
    println("racecar isPalindrome: ${"racecar".isPalindrome()}")

    // Null safety
    val nullableStr: String? = null
    println(nullableStr?.length ?: "null!")
}
`},

  { id:'scala', name:'Scala', short:'SC', cat:'JVM', cm:'text/x-scala', run:'ext',
    color:'#dc322f', bg:'#1a0a0a', ext:'.scala', runnable:false,
    starter:`// Scala — Functional + OOP

// Case class (immutable by default)
case class Point(x: Double, y: Double) {
  def distanceTo(other: Point): Double = {
    val dx = x - other.x
    val dy = y - other.y
    Math.sqrt(dx*dx + dy*dy)
  }
}

// Trait (like interface)
trait Describable {
  def describe: String
}

// Pattern matching
def classify(n: Int): String = n match {
  case 0          => "zero"
  case n if n < 0 => "negative"
  case n if n % 2 == 0 => s"even: $n"
  case n          => s"odd: $n"
}

object Main extends App {
  // Collections
  val nums = List(1, 2, 3, 4, 5)
  val result = nums.filter(_ % 2 == 0).map(_ * 3)
  println(s"Result: $result")

  // Case class
  val p1 = Point(0, 0)
  val p2 = Point(3, 4)
  println(f"Distance: ${p1.distanceTo(p2)}%.2f")

  // Pattern matching
  List(0, -1, 4, 7).foreach(n => println(classify(n)))

  // For comprehension
  val pairs = for {
    x <- 1 to 3
    y <- 1 to 3
    if x != y
  } yield (x, y)
  println(s"Pairs: ${pairs.take(4)}")
}
`},

  /* ── SCRIPTING ── */
  { id:'python', name:'Python', short:'PY', cat:'Scripting', cm:'python', run:'python',
    color:'#3776ab', bg:'#0d1117', ext:'.py', runnable:true,
    starter:`# Python — Live Execution Enabled ▶
print("Hello, DevLab!")

# List comprehensions
squares = [x**2 for x in range(1, 11)]
print(f"Squares: {squares}")

# Dictionary
student = {"name": "Alice", "grade": "A", "score": 98}
print(f"Student: {student['name']}, Score: {student['score']}")

# Functions & closures
def make_counter(start=0):
    count = [start]
    def increment(by=1):
        count[0] += by
        return count[0]
    return increment

counter = make_counter(10)
print(counter(), counter(5), counter())

# Classes
class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def magnitude(self):
        return (self.x**2 + self.y**2) ** 0.5

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(3, 4)
v2 = Vector(1, 2)
v3 = v1 + v2
print(f"{v1} + {v2} = {v3}, |v1| = {v1.magnitude()}")

# Generator
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
print([next(fib) for _ in range(10)])
`},

  { id:'ruby', name:'Ruby', short:'RB', cat:'Scripting', cm:'ruby', run:'ext',
    color:'#cc342d', bg:'#1a0505', ext:'.rb', runnable:false,
    starter:`# Ruby — Elegant Scripting

# Symbols & hashes
person = { name: "Alice", age: 30, role: :developer }
puts "Hello, #{person[:name]}!"

# Blocks & iterators
(1..10).select { |n| n.even? }
       .map    { |n| n ** 2 }
       .each   { |n| print "#{n} " }
puts

# Classes with mixins
module Greetable
  def greet
    "Hello, I'm #{name}!"
  end
end

class User
  include Greetable
  attr_accessor :name, :email

  def initialize(name, email)
    @name, @email = name, email
  end

  def to_s
    "#{name} <#{email}>"
  end
end

user = User.new("Bob", "bob@example.com")
puts user.greet
puts user

# Proc & Lambda
double = ->(x) { x * 2 }
triple = proc { |x| x * 3 }
puts [1,2,3].map(&double).inspect
puts [1,2,3].map(&triple).inspect
`},

  { id:'bash', name:'Bash', short:'SH', cat:'Scripting', cm:'shell', run:'ext',
    color:'#4eaa25', bg:'#0a1a0a', ext:'.sh', runnable:false,
    starter:`#!/bin/bash
# Bash — Shell Scripting

echo "Hello from Bash!"

# Variables
NAME="DevLab"
VERSION=1.0

echo "App: $NAME v$VERSION"

# Arrays
LANGUAGES=("Python" "JavaScript" "C++" "Rust" "Go")
echo "Languages: ${#LANGUAGES[@]}"
for lang in "${LANGUAGES[@]}"; do
    echo "  - $lang"
done

# Functions
say_hello() {
    local name=$1
    echo "Hello, ${name:-World}!"
}

say_hello "Alice"
say_hello

# Conditionals
check_number() {
    local num=$1
    if [ $num -gt 0 ]; then
        echo "$num is positive"
    elif [ $num -lt 0 ]; then
        echo "$num is negative"
    else
        echo "zero"
    fi
}

check_number 5
check_number -3
check_number 0

# String manipulation
str="  Hello World  "
echo "Upper: ${str^^}"
echo "Lower: ${str,,}"
echo "Length: ${#str}"
`},

  /* ── DATA ── */
  { id:'sql', name:'SQL', short:'SQL', cat:'Data', cm:'sql', run:'sql',
    color:'#336791', bg:'#0d1a2d', ext:'.sql', runnable:true,
    starter:`-- SQL — Live In-Browser Execution ▶

-- Create tables
CREATE TABLE employees (
  id      INTEGER PRIMARY KEY,
  name    TEXT NOT NULL,
  dept    TEXT,
  salary  REAL,
  joined  TEXT
);

CREATE TABLE departments (
  id     INTEGER PRIMARY KEY,
  name   TEXT,
  budget REAL
);

-- Insert data
INSERT INTO employees VALUES (1, 'Alice',   'Engineering', 95000, '2020-01-15');
INSERT INTO employees VALUES (2, 'Bob',     'Marketing',   72000, '2021-03-22');
INSERT INTO employees VALUES (3, 'Carol',   'Engineering', 105000,'2019-07-01');
INSERT INTO employees VALUES (4, 'David',   'HR',          68000, '2022-05-10');
INSERT INTO employees VALUES (5, 'Eve',     'Engineering', 115000,'2018-09-15');
INSERT INTO employees VALUES (6, 'Frank',   'Marketing',   78000, '2020-11-30');

INSERT INTO departments VALUES (1, 'Engineering', 500000);
INSERT INTO departments VALUES (2, 'Marketing',   200000);
INSERT INTO departments VALUES (3, 'HR',          150000);

-- Basic SELECT
SELECT * FROM employees ORDER BY salary DESC;

-- Aggregation
SELECT dept,
       COUNT(*) AS headcount,
       ROUND(AVG(salary), 2) AS avg_salary,
       MAX(salary) AS max_salary
FROM employees
GROUP BY dept
ORDER BY avg_salary DESC;

-- WHERE + filter
SELECT name, salary
FROM employees
WHERE dept = 'Engineering' AND salary > 100000
ORDER BY salary DESC;
`},

  { id:'r', name:'R', short:'R', cat:'Data', cm:'r', run:'ext',
    color:'#2165b6', bg:'#0d1a2d', ext:'.r', runnable:false,
    starter:`# R — Statistical Computing

# Vectors
x <- c(2, 4, 6, 8, 10)
y <- c(1, 3, 5, 7, 9)

cat("Mean x:", mean(x), "\n")
cat("SD x:", sd(x), "\n")
cat("Correlation:", cor(x, y), "\n")

# Data frame
df <- data.frame(
  name  = c("Alice", "Bob", "Carol", "David"),
  score = c(85, 92, 78, 96),
  grade = c("B", "A", "C", "A")
)

# Subset
top_students <- df[df$score >= 90, ]
print(top_students)

# Apply family
scores <- list(math = c(90, 85, 92), english = c(78, 88, 95))
means <- sapply(scores, mean)
print(means)

# Function
z_score <- function(x) {
  (x - mean(x)) / sd(x)
}

data <- c(10, 20, 30, 40, 50, 60, 70)
cat("Z-scores:", round(z_score(data), 2), "\n")
`},

  /* ── MARKUP / CONFIG ── */
  { id:'markdown', name:'Markdown', short:'MD', cat:'Markup', cm:'markdown', run:'ext',
    color:'#083fa1', bg:'#0d1117', ext:'.md', runnable:false,
    starter:`# DevLab Documentation

## Overview

**DevLab** is a *programmer's laboratory* — an interactive code editor with:

- ✅ Syntax highlighting for **30+ languages**
- ✅ Live execution (JS, HTML, Python, SQL)
- ✅ 30 themes (dark & light)
- ✅ Reference panels & snippets

## Quick Start

1. Select a language from the sidebar
2. Write your code in the editor
3. Press **▶ Run** or \`Ctrl+Enter\`

## Code Example

\`\`\`python
def hello(name: str) -> str:
    return f"Hello, {name}!"

print(hello("DevLab"))
\`\`\`

## Tables

| Language | Runnable | Category |
|----------|----------|----------|
| JavaScript | ✓ Live | Web |
| Python | ✓ Live | Scripting |
| SQL | ✓ Live | Data |
| HTML | ✓ Preview | Web |

> 💡 **Tip:** Press \`Ctrl+Shift+T\` to open the theme picker

---

*Made with DevLab — Your Programmer's Lab*
`},

  { id:'json', name:'JSON', short:'{}', cat:'Markup', cm:'javascript', run:'json',
    color:'#292929', bg:'#1a1a1a', ext:'.json', runnable:true,
    starter:`{
  "name": "DevLab",
  "version": "1.0.0",
  "description": "Programmer's Laboratory",
  "features": {
    "languages": 30,
    "themes": 30,
    "liveExecution": ["javascript", "python", "sql", "html"],
    "editor": "CodeMirror"
  },
  "author": {
    "name": "Developer",
    "url": "https://github.com"
  },
  "dependencies": {
    "codemirror": "5.65.16",
    "skulpt": "latest"
  },
  "config": {
    "tabSize": 2,
    "wordWrap": false,
    "autoCloseBrackets": true,
    "lineNumbers": true,
    "theme": "mocha"
  },
  "tags": ["editor", "lab", "programming", "themes"],
  "active": true,
  "score": 9.8
}
`},

  { id:'yaml', name:'YAML', short:'YML', cat:'Markup', cm:'yaml', run:'ext',
    color:'#cb171e', bg:'#1a0505', ext:'.yaml', runnable:false,
    starter:`# YAML Configuration
name: devlab
version: "1.0"
description: Programmer's Laboratory

server:
  host: localhost
  port: 3000
  ssl: true

database:
  type: postgres
  host: db.example.com
  port: 5432
  credentials:
    username: admin
    password: ${DB_PASSWORD}

features:
  - name: editor
    enabled: true
    config:
      tabSize: 2
      theme: mocha
  - name: themes
    enabled: true
    count: 30

environments:
  development:
    debug: true
    log_level: debug
  production:
    debug: false
    log_level: error

languages:
  web:
    - javascript
    - typescript
    - html
    - css
  systems:
    - c
    - cpp
    - rust
    - go
`},

  { id:'xml', name:'XML', short:'XML', cat:'Markup', cm:'xml', run:'ext',
    color:'#f60', bg:'#1a0d00', ext:'.xml', runnable:false,
    starter:`<?xml version="1.0" encoding="UTF-8"?>
<devlab version="1.0">
  <metadata>
    <name>DevLab</name>
    <description>Programmer's Laboratory</description>
    <author>Developer</author>
  </metadata>

  <languages>
    <category name="Web">
      <language id="js" runnable="true">
        <name>JavaScript</name>
        <extension>.js</extension>
        <color>#f7df1e</color>
      </language>
      <language id="html" runnable="true">
        <name>HTML</name>
        <extension>.html</extension>
      </language>
    </category>
    <category name="Systems">
      <language id="cpp">
        <name>C++</name>
        <extension>.cpp</extension>
        <compiler>g++</compiler>
      </language>
    </category>
  </languages>

  <themes>
    <theme type="dark" name="mocha" default="true"/>
    <theme type="dark" name="dracula"/>
    <theme type="light" name="github-light"/>
  </themes>
</devlab>
`},

  /* ── FUNCTIONAL ── */
  { id:'haskell', name:'Haskell', short:'HS', cat:'Functional', cm:'haskell', run:'ext',
    color:'#5e5086', bg:'#0d0a1a', ext:'.hs', runnable:false,
    starter:`-- Haskell — Pure Functional Programming

module Main where

import Data.List (sort, group, nub)
import Data.Char (toUpper, toLower)

-- Type signatures
factorial :: Integer -> Integer
factorial 0 = 1
factorial n = n * factorial (n - 1)

-- Higher-order functions
applyTwice :: (a -> a) -> a -> a
applyTwice f x = f (f x)

-- List comprehension
pythagorean :: Int -> [(Int, Int, Int)]
pythagorean n = [(a, b, c) |
  c <- [1..n], b <- [1..c], a <- [1..b],
  a^2 + b^2 == c^2]

-- Maybe monad
safeDivide :: Double -> Double -> Maybe Double
safeDivide _ 0 = Nothing
safeDivide x y = Just (x / y)

main :: IO ()
main = do
  putStrLn "Hello from Haskell!"

  -- Factorial
  print $ map factorial [0..10]

  -- Higher order
  print $ applyTwice (+3) 10   -- 16
  print $ applyTwice (*2) 3    -- 12

  -- List ops
  print $ pythagorean 20

  -- Maybe
  print $ safeDivide 10 2
  print $ safeDivide 10 0
`},

  { id:'lua', name:'Lua', short:'Lua', cat:'Scripting', cm:'lua', run:'ext',
    color:'#000080', bg:'#0a0a1a', ext:'.lua', runnable:false,
    starter:`-- Lua — Lightweight Scripting

-- Variables & basic types
local name = "DevLab"
local version = 1.0
local active = true

print(string.format("App: %s v%.1f", name, version))

-- Tables (arrays + objects)
local languages = {"Python", "JavaScript", "C++", "Rust"}
for i, lang in ipairs(languages) do
    print(string.format("  %d. %s", i, lang))
end

-- Functions & closures
local function make_adder(n)
    return function(x) return x + n end
end

local add5 = make_adder(5)
print("add5(10) =", add5(10))

-- Metatables (OOP)
local Vector = {}
Vector.__index = Vector

function Vector.new(x, y)
    return setmetatable({x=x, y=y}, Vector)
end

function Vector:magnitude()
    return math.sqrt(self.x^2 + self.y^2)
end

function Vector:__tostring()
    return string.format("Vector(%g, %g)", self.x, self.y)
end

local v = Vector.new(3, 4)
print(tostring(v), "magnitude:", v:magnitude())
`},

  { id:'perl', name:'Perl', short:'PL', cat:'Scripting', cm:'perl', run:'ext',
    color:'#0073a1', bg:'#0a0d1a', ext:'.pl', runnable:false,
    starter:`#!/usr/bin/perl
use strict;
use warnings;
use POSIX qw(floor ceil);

# Variables
my $name = "DevLab";
my @languages = ("Python", "JavaScript", "Perl", "Ruby");
my %scores = (Alice => 95, Bob => 88, Carol => 92);

print "Hello from $name!\\n";

# Arrays
printf "Languages: %s\\n", join(", ", @languages);
my @sorted = sort @languages;
print "Sorted: @sorted\\n";

# Hashes
foreach my $key (sort keys %scores) {
    printf "  %-10s: %d\\n", $key, $scores{$key};
}

# Regular expressions
my $text = "The quick brown fox jumps over the lazy dog";
my @words = ($text =~ /\\b\\w{4}\\b/g);
printf "4-letter words: %s\\n", join(", ", @words);

# Subroutines
sub greet {
    my ($person, $greeting) = @_;
    $greeting //= "Hello";
    return "$greeting, $person!";
}

print greet("Alice"), "\\n";
print greet("Bob", "Hi"), "\\n";
`},

  /* ── MOBILE ── */
  { id:'swift', name:'Swift', short:'SW', cat:'Mobile', cm:'swift', run:'ext',
    color:'#f05138', bg:'#1a0a05', ext:'.swift', runnable:false,
    starter:`// Swift — Apple Platforms

import Foundation

// Struct with protocol
protocol Describable {
    var description: String { get }
}

struct Point: Describable, CustomStringConvertible {
    var x, y: Double

    var description: String { "Point(\(x), \(y))" }

    func distance(to other: Point) -> Double {
        let dx = x - other.x, dy = y - other.y
        return (dx*dx + dy*dy).squareRoot()
    }
}

// Enum with associated values
enum NetworkResult<T> {
    case success(T)
    case failure(Error)
    case loading
}

// Generic function
func findMax<T: Comparable>(_ array: [T]) -> T? {
    return array.max()
}

// Optionals & guard
func processUser(name: String?) -> String {
    guard let name = name, !name.isEmpty else {
        return "No user"
    }
    return "Hello, \(name)!"
}

// Main
let p1 = Point(x: 0, y: 0)
let p2 = Point(x: 3, y: 4)
print("\(p1) to \(p2): \(p1.distance(to: p2))")

let nums = [3, 1, 4, 1, 5, 9, 2, 6]
if let max = findMax(nums) { print("Max: \(max)") }

print(processUser(name: "Alice"))
print(processUser(name: nil))
`},

  { id:'dart', name:'Dart', short:'DT', cat:'Mobile', cm:'dart', run:'ext',
    color:'#0175c2', bg:'#0a1020', ext:'.dart', runnable:false,
    starter:`// Dart — Flutter's Language

import 'dart:math';

// Mixin
mixin Flyable {
  void fly() => print('$runtimeType is flying!');
}

// Abstract class
abstract class Animal {
  final String name;
  Animal(this.name);
  String speak();
  @override String toString() => '$name';
}

// Concrete class with mixin
class Bird extends Animal with Flyable {
  Bird(String name) : super(name);
  @override String speak() => 'Tweet!';
}

// Generic class
class Stack<T> {
  final _items = <T>[];
  void push(T item) => _items.add(item);
  T pop() => _items.removeLast();
  bool get isEmpty => _items.isEmpty;
}

// Async (simulated)
Future<String> fetchData() async {
  await Future.delayed(Duration(milliseconds: 100));
  return 'Data loaded!';
}

void main() async {
  // Classes & mixins
  final bird = Bird('Eagle');
  print('${bird.speak()} — ${bird}');
  bird.fly();

  // Null safety
  String? nullable;
  print(nullable ?? 'Was null');

  // Collections
  final nums = List.generate(5, (i) => pow(i+1, 2));
  print('Squares: $nums');

  // Async
  final result = await fetchData();
  print(result);

  // Generic stack
  final stack = Stack<int>();
  [1, 2, 3].forEach(stack.push);
  while (!stack.isEmpty) print(stack.pop());
}
`},

  /* ── SPREADSHEET ── */
  { id:'excel', name:'Excel Formulas', short:'XL', cat:'Spreadsheet', cm:'javascript', run:'ext',
    color:'#217346', bg:'#0a1a0a', ext:'.xlsx', runnable:false,
    starter:`// Excel Formula Reference — Common Formulas

/* ── LOOKUP & REFERENCE ──────────────────
   VLOOKUP(value, table, col, [exact])
   =VLOOKUP(A2, $B$2:$D$100, 3, FALSE)

   INDEX + MATCH (better than VLOOKUP)
   =INDEX(C2:C100, MATCH(A2, B2:B100, 0))

   XLOOKUP (Excel 365+)
   =XLOOKUP(A2, B:B, C:C, "Not found")

── MATH ──────────────────────────────────
   =SUM(A1:A10)
   =SUMIF(B:B, "Sales", C:C)
   =SUMIFS(C:C, A:A, "Q1", B:B, ">1000")
   =AVERAGE(A1:A10)
   =AVERAGEIF(B:B, ">50", C:C)

── TEXT ──────────────────────────────────
   =CONCAT(A1, " ", B1)
   =TEXT(A1, "dd/mm/yyyy")
   =LEFT(A1, 5)
   =RIGHT(A1, 3)
   =MID(A1, 2, 4)
   =LEN(A1)
   =TRIM(A1)
   =UPPER(A1) / LOWER(A1)
   =SUBSTITUTE(A1, "old", "new")

── DATE ──────────────────────────────────
   =TODAY()   =NOW()
   =DATEDIF(A1, B1, "D")   -- Days diff
   =EOMONTH(A1, 1)         -- End of next month
   =WORKDAY(A1, 10)        -- 10 workdays from date

── CONDITIONAL ───────────────────────────
   =IF(A1>10, "High", "Low")
   =IFS(A1<50,"F", A1<70,"C", A1<90,"B", TRUE,"A")
   =IFERROR(VLOOKUP(...), "Not found")

── ARRAY (Ctrl+Shift+Enter or = in 365) ─
   =UNIQUE(A:A)
   =SORT(B:B, 1, -1)
   =FILTER(A:C, B:B="Sales")
   =SEQUENCE(10, 1, 1, 2)
*/

// Sample data model for reference:
const sampleData = [
  { name: "Alice",  dept: "Engineering", salary: 95000 },
  { name: "Bob",    dept: "Marketing",   salary: 72000 },
  { name: "Carol",  dept: "Engineering", salary: 105000 },
];
// Equivalent Excel SUM: =SUMIF(B:B, "Engineering", C:C)
const engSalary = sampleData
  .filter(r => r.dept === "Engineering")
  .reduce((s, r) => s + r.salary, 0);
console.log("Engineering total:", engSalary);
`},

  { id:'sheets', name:'Google Sheets', short:'GS', cat:'Spreadsheet', cm:'javascript', run:'ext',
    color:'#0f9d58', bg:'#0a1a10', ext:'.gs', runnable:false,
    starter:`// Google Apps Script — Sheets Automation

/**
 * Google Sheets Custom Function
 * Use in a cell: =GREET(A1)
 */
function GREET(name) {
  return "Hello, " + name + "!";
}

/**
 * Read & write sheet data
 */
function processData() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  const values = range.getValues();

  // Headers in row 1
  const headers = values[0];
  const rows = values.slice(1);

  // Process each row
  const results = rows.map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });

  Logger.log(JSON.stringify(results.slice(0,3)));
  return results;
}

/**
 * Auto-format on edit
 */
function onEdit(e) {
  const range = e.range;
  const value = e.value;

  if (typeof value === 'number' && value < 0) {
    range.setFontColor('#ff0000');
  } else {
    range.setFontColor('#000000');
  }
}

/**
 * Send email summary
 */
function sendDailySummary() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getRange("A1:D10").getValues();
  const html = data.map(r => "<tr>" +
    r.map(c => "<td>"+c+"</td>").join("") +
    "</tr>").join("");

  MailApp.sendEmail({
    to: "user@example.com",
    subject: "Daily Summary",
    htmlBody: "<table>" + html + "</table>"
  });
}

/* ── USEFUL FORMULAS (paste in cells) ──────────────
   =IMPORTRANGE("url", "Sheet1!A:Z")
   =QUERY(A:D, "SELECT A,B WHERE C > 100 ORDER BY B")
   =ARRAYFORMULA(IF(A2:A="","",A2:A&" "&B2:B))
   =REGEXMATCH(A2, "^[0-9]+$")
   =GOOGLEFINANCE("GOOG","price")
*/
`},

  /* ── ASSEMBLY ── */
  { id:'asm', name:'Assembly x86', short:'ASM', cat:'Systems', cm:'text/x-asm', run:'ext',
    color:'#6e4c13', bg:'#0d0a05', ext:'.asm', runnable:false,
    starter:`; x86-64 Assembly (NASM Syntax)
; Assemble: nasm -f elf64 hello.asm -o hello.o
; Link:     ld hello.o -o hello

section .data
    msg     db  "Hello, DevLab!", 10  ; 10 = newline
    msglen  equ $ - msg

    fmt_int db  "Number: %d", 10, 0

section .bss
    buffer resb 64              ; Reserve 64 bytes

section .text
    global _start

; ── Print string helper ──
print_string:
    ; rdi = address, rsi = length
    mov rax, 1          ; syscall: write
    mov rdi, 1          ; stdout
    ; rsi = string (already set)
    ; rdx = length (already set)
    syscall
    ret

_start:
    ; Print hello message
    mov rax, 1          ; write syscall
    mov rdi, 1          ; file descriptor (stdout)
    mov rsi, msg        ; message address
    mov rdx, msglen     ; message length
    syscall             ; invoke OS

    ; Simple arithmetic
    mov rax, 100        ; rax = 100
    mov rbx, 42         ; rbx = 42
    add rax, rbx        ; rax = 142
    sub rbx, 10         ; rbx = 32
    imul rax, rbx       ; rax = 142 * 32 = 4544

    ; Stack operations
    push rax            ; push result
    pop  rcx            ; pop to rcx

    ; Comparison & jump
    cmp rcx, 4544
    je  equal           ; jump if equal
    jmp done

equal:
    ; ... handle equal case

done:
    ; Exit program
    mov rax, 60         ; exit syscall
    xor rdi, rdi        ; exit code 0
    syscall
`},

];

/* ═══════════════════════════════════════════
   REFERENCE DATA — snippets & syntax per lang
═══════════════════════════════════════════ */

const LANG_REFERENCE = {
  javascript: {
    snippets: [
      { title:'Arrow Function', code:`const fn = (x) => x * 2;\nconsole.log(fn(5)); // 10`, desc:'ES6 arrow function' },
      { title:'Destructuring', code:`const { a, b } = obj;\nconst [x, y] = arr;`, desc:'Object & array destructuring' },
      { title:'Spread/Rest', code:`const merged = {...obj1, ...obj2};\nconst [first, ...rest] = arr;`, desc:'Spread operator' },
      { title:'Promise / Async', code:`async function getData() {\n  const res = await fetch(url);\n  return res.json();\n}`, desc:'Async/await pattern' },
      { title:'Array Methods', code:`arr.map(x => x*2)\n   .filter(x => x>5)\n   .reduce((a,b) => a+b, 0)`, desc:'Functional array methods' },
      { title:'Class', code:`class Animal {\n  constructor(name) { this.name = name; }\n  speak() { return \`\${this.name}!\`; }\n}`, desc:'ES6 class syntax' },
    ],
    syntax: [
      { title:'Variables', code:`var x = 1;    // function scope\nlet y = 2;    // block scope\nconst z = 3;  // immutable` },
      { title:'Types', code:`typeof "str"   // "string"\ntypeof 42      // "number"\ntypeof true    // "boolean"\ntypeof {}      // "object"\ntypeof null    // "object" (quirk!)\ntypeof Symbol()// "symbol"` },
      { title:'Control Flow', code:`if (cond) {}\nelse if (cond) {}\nelse {}\n\nfor (let i=0; i<n; i++)\nfor (const x of arr)\nfor (const k in obj)\nwhile (cond)\nswitch(x) { case 1: ... }` },
    ],
    tips: [
      { title:'Use === not ==', code:`// Bad: 0 == "0"  // true!\n// Good: 0 === "0" // false`, desc:'Strict equality avoids coercion bugs' },
      { title:'Optional Chaining', code:`const name = user?.profile?.name ?? "Anonymous";`, desc:'Safe access with ?. and ?? ' },
      { title:'Array.from shortcuts', code:`Array.from({length: 5}, (_, i) => i + 1);\n// [1, 2, 3, 4, 5]`, desc:'Quick array generation' },
    ]
  },
  python: {
    snippets: [
      { title:'List Comprehension', code:`squares = [x**2 for x in range(10)]\nevens = [x for x in range(20) if x%2==0]`, desc:'Concise list building' },
      { title:'Dict Comprehension', code:`d = {k: v**2 for k, v in items.items()}`, desc:'Dict from expression' },
      { title:'*args & **kwargs', code:`def fn(*args, **kwargs):\n    print(args)    # tuple\n    print(kwargs)  # dict`, desc:'Variable arguments' },
      { title:'Context Manager', code:`with open("file.txt", "r") as f:\n    content = f.read()`, desc:'Auto-close resources' },
      { title:'Dataclass', code:`from dataclasses import dataclass\n@dataclass\nclass Point:\n    x: float\n    y: float`, desc:'Auto __init__ & __repr__' },
      { title:'Enumerate + Zip', code:`for i, val in enumerate(lst):\n    ...\nfor a, b in zip(list1, list2):\n    ...`, desc:'Paired iteration' },
    ],
    syntax: [
      { title:'String Methods', code:`s = "Hello World"\ns.upper()         # HELLO WORLD\ns.lower()         # hello world\ns.split()         # ["Hello","World"]\ns.strip()         # strip whitespace\ns.replace("o","0")# Hell0 W0rld\nf"Value: {x}"     # f-string` },
      { title:'List Operations', code:`lst = [1,2,3,4,5]\nlst.append(6)\nlst.extend([7,8])\nlst.insert(0, 0)\nlst.pop()       # remove last\nlst.sort()\nlst.reverse()\nlen(lst)` },
      { title:'Slicing', code:`lst = [0,1,2,3,4,5]\nlst[2:4]    # [2,3]\nlst[:3]     # [0,1,2]\nlst[::2]    # [0,2,4] every 2nd\nlst[::-1]   # reversed` },
    ],
    tips: [
      { title:'Walrus Operator :=', code:`if n := len(data):\n    print(f"Got {n} items")`, desc:'Python 3.8+ assignment expression' },
      { title:'Unpacking', code:`a, *b, c = [1,2,3,4,5]\n# a=1, b=[2,3,4], c=5`, desc:'Extended unpacking with *' },
      { title:'any() & all()', code:`any(x > 5 for x in lst)  # True if any\nall(x > 0 for x in lst)  # True if all`, desc:'Useful predicate functions' },
    ]
  },
  sql: {
    snippets: [
      { title:'SELECT with JOIN', code:`SELECT u.name, o.total\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id\nWHERE o.total > 100\nORDER BY o.total DESC\nLIMIT 10;`, desc:'Basic join pattern' },
      { title:'GROUP BY + HAVING', code:`SELECT dept, COUNT(*) cnt, AVG(salary) avg_sal\nFROM employees\nGROUP BY dept\nHAVING COUNT(*) > 2\nORDER BY avg_sal DESC;`, desc:'Aggregate with filter' },
      { title:'CTE (Common Table Expression)', code:`WITH top_earners AS (\n  SELECT * FROM employees\n  WHERE salary > 90000\n)\nSELECT dept, COUNT(*) FROM top_earners\nGROUP BY dept;`, desc:'Named subquery' },
      { title:'Window Function', code:`SELECT name, salary,\n  RANK() OVER (PARTITION BY dept\n               ORDER BY salary DESC) AS rank\nFROM employees;`, desc:'Ranking within groups' },
      { title:'Subquery', code:`SELECT name FROM employees\nWHERE salary > (\n  SELECT AVG(salary) FROM employees\n);`, desc:'Inline subquery' },
      { title:'CASE Expression', code:`SELECT name,\n  CASE\n    WHEN salary > 100000 THEN 'Senior'\n    WHEN salary > 70000  THEN 'Mid'\n    ELSE 'Junior'\n  END AS level\nFROM employees;`, desc:'Conditional values' },
    ],
    syntax: [
      { title:'DDL (Structure)', code:`CREATE TABLE name (col TYPE [constraints]);\nALTER TABLE name ADD COLUMN col TYPE;\nDROP TABLE name;\nCREATE INDEX idx ON tbl(col);` },
      { title:'DML (Data)', code:`INSERT INTO tbl (cols) VALUES (vals);\nUPDATE tbl SET col = val WHERE cond;\nDELETE FROM tbl WHERE cond;\nINSERT OR REPLACE INTO tbl ...` },
      { title:'Aggregates', code:`COUNT(*)  COUNT(DISTINCT col)\nSUM(col)  AVG(col)\nMIN(col)  MAX(col)\nGROUP_CONCAT(col, sep)` },
    ],
    tips: [
      { title:'NULL handling', code:`WHERE col IS NULL     -- not = NULL!\nCOALESCE(col, default) -- first non-null\nNULLIF(col, 0)         -- returns null if 0`, desc:'NULL is not equal to anything' },
      { title:'String patterns', code:`WHERE name LIKE 'A%'   -- starts with A\nWHERE name LIKE '%son'  -- ends with son\nWHERE name LIKE '%ohn%' -- contains ohn`, desc:'LIKE pattern matching' },
      { title:'Date functions', code:`DATE('now')           -- today\nDATE('now', '-7 days') -- last week\nSTRFTIME('%Y', date)  -- extract year`, desc:'SQLite date expressions' },
    ]
  },
  html: {
    snippets: [
      { title:'HTML5 Boilerplate', code:`<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8"/>\n  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\n  <title>Page Title</title>\n</head>\n<body>\n</body>\n</html>`, desc:'Standard HTML5 template' },
      { title:'Flexbox Container', code:`<div style="display:flex; gap:1rem;\n  align-items:center; justify-content:space-between;">\n  <div>Left</div>\n  <div>Right</div>\n</div>`, desc:'Flexbox layout' },
      { title:'CSS Grid', code:`<div style="display:grid;\n  grid-template-columns: repeat(3,1fr); gap:1rem;">\n  <div>1</div><div>2</div><div>3</div>\n</div>`, desc:'Grid layout' },
      { title:'Form', code:`<form action="/submit" method="POST">\n  <input type="text" name="name" placeholder="Name"/>\n  <input type="email" name="email"/>\n  <button type="submit">Send</button>\n</form>`, desc:'Basic form' },
      { title:'Semantic Layout', code:`<header>...</header>\n<nav>...</nav>\n<main>\n  <article>...</article>\n  <aside>...</aside>\n</main>\n<footer>...</footer>`, desc:'HTML5 semantic structure' },
    ],
    syntax: [
      { title:'Common Tags', code:`<h1>-<h6>  Headings\n<p>        Paragraph\n<a href>   Link\n<img src alt> Image\n<ul><li>   List\n<table>    Table\n<div>      Block container\n<span>     Inline container` },
      { title:'Input Types', code:`text  email  password  number\ndate  time  checkbox  radio\nfile  range  color  search\ntel   url   submit   reset` },
    ],
    tips:[
      { title:'Meta tags for SEO', code:`<meta name="description" content="...">\n<meta property="og:title" content="...">\n<meta name="robots" content="index,follow">`, desc:'Search engine optimization' },
      { title:'Accessible buttons', code:`<button type="button"\n  aria-label="Close dialog"\n  onclick="close()">\n  ×\n</button>`, desc:'Always use aria-label for icon buttons' },
    ]
  },
  cpp: {
    snippets: [
      { title:'Vector operations', code:`#include <vector>\n#include <algorithm>\nvector<int> v = {5,1,3,2,4};\nsort(v.begin(), v.end());\nv.push_back(6);\nfor(auto x : v) cout << x << " ";`, desc:'STL vector' },
      { title:'Smart Pointer', code:`#include <memory>\nauto ptr = make_unique<MyClass>(args);\nauto sptr = make_shared<MyClass>(args);\n// auto-deleted when out of scope`, desc:'RAII memory management' },
      { title:'Lambda', code:`auto sq = [](int x) { return x*x; };\nvector<int> v = {1,2,3,4,5};\ntransform(v.begin(), v.end(),\n  v.begin(), sq);`, desc:'Lambda expressions' },
    ],
    syntax:[
      { title:'Memory', code:`int* p = new int(5);    // heap\ndelete p;               // free\nint arr[10];            // stack\nint* a = new int[10];   // heap array\ndelete[] a;` },
      { title:'References', code:`int& ref = x;    // reference\nconst int& cr = x; // const ref\nvoid fn(int& x) { x++; } // modify` },
    ],
    tips:[
      { title:'const everywhere', code:`const int MAX = 100;\nvoid fn(const string& s); // pass by const ref\nconst int* ptr;  // ptr to const int`, desc:'Use const to prevent bugs' },
    ]
  },
  java: {
    snippets:[
      { title:'Streams API', code:`List.of(1,2,3,4,5).stream()\n  .filter(n -> n % 2 == 0)\n  .map(n -> n * n)\n  .collect(Collectors.toList());`, desc:'Java 8+ streams' },
      { title:'Optional', code:`Optional.ofNullable(value)\n  .map(String::toUpperCase)\n  .orElse("default");`, desc:'Null-safe chaining' },
      { title:'Record (Java 16+)', code:`record Point(int x, int y) {}\nvar p = new Point(1, 2);\nSystem.out.println(p.x());`, desc:'Immutable data class' },
    ],
    syntax:[
      { title:'Access Modifiers', code:`public    - visible everywhere\nprotected - class + subclasses\ndefault   - same package only\nprivate   - class only` },
    ],
    tips:[
      { title:'String.format vs %s', code:`String.format("Hi %s, you are %d", name, age);\n// Java 15+:\n"Hi %s, you are %d".formatted(name, age);`, desc:'Modern string formatting' },
    ]
  }
};

// Default reference for languages without specific data
function getDefaultReference(lang) {
  return {
    snippets:[
      { title:'Hello World', code: lang.starter ? lang.starter.split('\n').slice(0,6).join('\n') : `// ${lang.name}\nconsole.log("Hello World!");`, desc:`Basic ${lang.name} program` }
    ],
    syntax:[
      { title:'Run Externally', code:`// ${lang.name} doesn't run in browser.\n// Use one of these:\n// - replit.com\n// - leetcode.com/playground\n// - godbolt.org (compilers)\n// - ideone.com`, desc:'External execution options' }
    ],
    tips:[
      { title:'Online Compilers', code:`replit.com       — Full IDE online\nideone.com       — Paste & run\ngodbolt.org      — Compiler explorer\nonlinegdb.com    — Debug online\ncodechef.com/ide — Multiple langs`, desc:'Run ${lang.name} online instantly' }
    ]
  };
}

function getLangReference(langId) {
  return LANG_REFERENCE[langId] || getDefaultReference(LANGUAGES.find(l=>l.id===langId) || {name:langId});
}
