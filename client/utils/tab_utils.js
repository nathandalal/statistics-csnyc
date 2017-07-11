/*
 * verifyOneActiveTab(tabs)
 * 
 * Accepts an array of objects, where each one of these objects contains an "active" key.
 * This method verifies that one and only one object is "active".
 * 
 * Returns valid tabs array.
 */
function verify(tabs) {
  let activeTabs = 0
  tabs.forEach(tab => {
    if (tab.active) activeTabs++
  })

  return activeTabs == 1
}

/*
 * resetActiveTabState(tabs)
 *
 * If no tabs are active or more than one tab is activated, this is considered an error state.
 * The first tab will be activated and all other tabs will be turned off.
 *
 * The tabs user is responsible for calling this method as it will be most likely used to change a React state.
 */
function reset(tabs) {
  tabs.map(tab => {
    tab.active = false
    return tab
  })

  tabs[0].active = true

  return tabs

}

module.exports = {
  verifyOneActiveTab: verify,
  resetActiveTabState: reset
}