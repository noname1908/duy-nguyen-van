# Problem 4: Three ways to sum to n

## 1. Using `for` loop

- Less complex and more efficient than the others.
- Easier for others dev to read and understand

```js
function sum_to_n_a(n: number): number {
  let sum = 0;

  // looping from i = 1 to number
  // in each iteration, i is increased by 1
  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}
```

## 2. Using recursion

- Less efficient and slower than `1`

```js
function sum_to_n_b(n: number): number {
  if (n > 0) {
    // sum of number and the result of the function itself
    // with decreasing the number by 1 as the argument
    return n + sum_to_n_b(n - 1);
  } else {
    return n;
  }
}
```

## 3. Using `reduce`

- Less efficient and slower than `1` and `2`
- Less code than the others (shorter code)

```js
function sum_to_n_c(n: number): number {
  // create an array of number sequence, then reduce it
  return Array.from(
    {
      length: n,
    },
    (_, i) => i + 1
  ).reduce((sum, num) => (sum += num), 0);
}
```
