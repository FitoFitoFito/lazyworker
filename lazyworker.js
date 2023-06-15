/** The lazyworker object have a few methods that can be used to
 *  interact with an interactive DOM that uses AJAX.
 */
const lazyworker = {

  /** The wait() method will return a promise which will be fulfilled
   *  once the condition evaluates to a truthy value.
   *
   *  wait() will have 4 parameters:
   *  - condition: It's a Function.
   *  - conditionArg: It is the argument we can pass to the condition (if any).
   *  - timeout: It is the max elapsed time to wait for the promise to resolve.
   *  - evalTime: It is the time between evaluations.
   */
  wait (condition, conditionArg=null, timeout=10000, evalTime=500){
    return new Promise((res, rej)=>{
      // Let's define the starting time.
      const startTime = Date.now();
  
      // This function will be call every "evalTime"ms to evaluate the "condition".
      function runCondition(){
  
        // Elapsed time of runCondition().
        const elapsedTime = Date.now() - startTime;

        // If the condition evaluated is not a falsy value then resolve with whatever the condition returns.
        if(conditionArg !== null && condition(conditionArg)){
          res(condition(conditionArg));
  
        }else if(elapsedTime >= timeout){
          rej(new Error('Timeout >>> Element not found'));
  
        }else if(conditionArg === null){
          res(condition());

        }else{
          setTimeout(()=>{runCondition()}, evalTime);
        };
      };
      runCondition();
    });
  },

  /** The getElement() method will capture and return an element from the 
   *  DOM, therefore, we will pass any css selector as an argument.
   *
   *  cssSelector: string
   *
   *  https://developer.mozilla.org/es/docs/Web/CSS/CSS_Selectors
   */
  getElement (cssSelector){
    const el = document.querySelector(cssSelector);
    if(el){
      return el;
    };
  },

  /** Similar to getElement() method, the getAllElements() method will capture 
   *  and return all element from the DOM (it will return an array), therefore,
   *  we will pass any css selector as an argument.
   *
   * cssSelector: string
   *
   * https://developer.mozilla.org/es/docs/Web/CSS/CSS_Selectors
   */
  getAllElements (cssSelector){
    const el = document.querySelectorAll(cssSelector);
    if(el){
      return el;
    };
  },

  /** The clickIt() method will simulate a mouse click.
   *
   *  First, it will move the mouse to the center of the argument, an "HTMLelement".
   *  Second, it will permform a left mouse click.
   */
  clickIt (HTMLelement){
    return new Promise((res, rej)=>{
      if(!HTMLelement){
        rej(new Error('Impossible to click. HTML Element not found'));
      };

      // Get the center coordinates of the element.
      const domRect = HTMLelement.getBoundingClientRect();
      const centerX = domRect.left + domRect.width / 2;
      const centerY = domRect.top + domRect.height / 2;

      // Let's create the mouse event to move the mouse to the center of the element.
      const moveMouse = new MouseEvent('mousemove', {
        clientX: centerX,
        clientY: centerY
      });

      // Let's create the mouse event to click on the element.
      const mouseClick = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });

      // Wait for the "mousemove" event to trigger such event.
      HTMLelement.addEventListener('mousemove', res);
      // Execute the event.
      HTMLelement.dispatchEvent(moveMouse);

      // Wait for the "click" event to trigger such event.
      HTMLelement.addEventListener('click', res);
      // Execute the event after 200ms.
      setTimeout(()=>{
        HTMLelement.dispatchEvent(mouseClick);
      },200);
    });
  },

  /** The sleep(seconds) method will simulate a stop in the code */
  sleep (time){
    return new Promise(res=>{
      setTimeout(()=>{res()}, time*1000);
    });
  }
};