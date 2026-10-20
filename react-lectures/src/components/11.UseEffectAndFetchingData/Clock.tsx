/**
 * The lifecycle of a component: mount → update(s) → unmount
 */
const Clock = () => {

  /**
   * 1. React calls the component function and learns what should be on the screen.
   */
  return <div>Clock</div>
}

export default Clock





















  /**
   * 2. Runs AFTER the component is mounted (shown on the screen).
   * The Clock asks the browser to call tick() once a second.
   *
   * 3. Every second, tick() calls setDate(). React knows the state changed,
   * calls the component again and updates the DOM with the new time.
   */











 
/**
     * 4. Cleanup: runs when the Clock is removed from the screen (unmount).
     * Without it, the timer would keep running forever (a memory leak).
     */







