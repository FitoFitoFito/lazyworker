# lazyworker
Interact with the DOM when using AJAX.

The lazyworker object have a few methods that can be used to interact with an interactive DOM that uses AJAX.

Methods:
- wait(): The wait() method will return a promise which will be fulfilled once the condition evaluates to a truthy value.
  - wait(condition, conditionArg, timeout, evalTime) parameters:
    - condition: It's a Function.
    - conditionArg: It is the argument we can pass to the condition (if any).
    - timeout: It is the max elapsed time to wait for the promise to resolve.
    - evalTime: It is the time between evaluations.

By default, the "conditionArg" parameter will be set to "null", this is because in case you need to pass a function to the "condition" parameter that doesn't take an argument, you won't have to worry about setting this to null.


- getElement(): The getElement(cssSelector: string) method will capture and return an element from the DOM, therefore, we will pass any css selector as an argument.
  :Read more about css selectors: https://developer.mozilla.org/es/docs/Web/CSS/CSS_Selectors


- getAllElements(): Similar to getElement() method, the getAllElements(cssSelector: string) method will capture and return all element from the DOM (it will return an array), therefore, we will pass any css selector as an argument.
  :Read more about css selectors: https://developer.mozilla.org/es/docs/Web/CSS/CSS_Selectors


- clickIt(): The clickIt() method will simulate a mouse click.
  - Steps the method will follow:
    - First, it will move the mouse to the center of the argument, an "HTMLelement".
    - Second, it will permform a left mouse click after 200ms.


- sleep(): The sleep(seconds) method will simulate a stop in the code.
