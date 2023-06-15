/** The lazyworker object have a few methods that can be used to
 *  interact with an interactive DOM that uses AJAX.
 */
const lazyworker = {

  /** The wait() function will return a promise which will be fullfiled
   *  once the codition evaluates to a truthy value.
   *
   *  wait() will have 4 parameters:
   *  - condition: It's a Function.
   *  - keyElement: (string) The element we want to wait for, it depends on the condition.
   *  - timeout: It is the max elapsed time to wait for the promise to resolve.
   *  - evalTime: It is the time between evaluations.
   */
  wait (condition, keyElement, timeout=8000, evalTime=500){
    return new Promise((res, rej)=>{
      // Let's define our starting time.
      const startTime = Date.now();
  
      // This function will be call every "evalTime"ms to evaluate the "condition".
      function runCondition(){
  
        // Elapsed time of runCondition().
        const elapsedTime = Date.now() - startTime;
  
        if(condition(keyElement)){
          res(condition(keyElement));
  
        }else if(elapsedTime >= timeout){
          rej(new Error('Timeout >>> Element not found'));
  
        }else{
          setTimeout(()=>{runCondition()}, evalTime);
        };
      };
      runCondition();
    });
  },

  /**The getElement() function will (as the name suggests) capture and return
   * an element from the DOM, therefore we will pass any css selector as an argument.
   *
   * cssSelector: string
   *
   * https://developer.mozilla.org/es/docs/Web/CSS/CSS_Selectors
   */
  getElement (cssSelector){
    const el = document.querySelector(cssSelector);
    if(el){
      return el;
    };
  },

  /**Similar to getElement() function, the getAllElements() function will (as the name suggests) capture and return
   * all element from the DOM (it will return an array), therefore we will pass any css selector as an argument.
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

  /**The clickIt() function will simulate a mouse click.
   *
   * First, it will move the mouse to the center of the argument, an "HTMLelement".
   * Second, it will permform a left mouse click.
   */
  clickIt (HTMLelement){
    return new Promise((res, rej)=>{
      if(!HTMLelement){
        rej(new Error('Impossible to click. HTML Element not found'));
      };

      const domRect = HTMLelement.getBoundingClientRect();
      const centerX = domRect.left + domRect.width / 2;
      const centerY = domRect.top + domRect.height / 2;

      const moveMouse = new MouseEvent('mousemove', {
        clientX: centerX,
        clientY: centerY
      });

      const mouseClick = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });

      HTMLelement.addEventListener('mousemove', res);
      HTMLelement.dispatchEvent(moveMouse);

      HTMLelement.addEventListener('click', res);
      setTimeout(()=>{
        HTMLelement.dispatchEvent(mouseClick);
      },200);
    });
  },

  /** The sleep*() function will simulate a stop on the code */
  sleep (time){
    return new Promise(res=>{
      setTimeout(()=>{res()}, time);
    });
  }
};

