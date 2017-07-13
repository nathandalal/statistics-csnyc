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
 * Sets the active tab given the URL.
 * The activeTab is given an empty parameter as default in order to avoid setting null paths to active tabs.
 *
 * The tabs user is responsible for calling this method as it will be most likely used to change a React state.
 */
function set(tabs, activeTab = "") {
  let activeTabSet = false
  tabs.map(tab => {
    if (activeTab == tab.path)
      tab.active = activeTabSet = true
    return tab
  })

  if (!activeTabSet) tabs[0].active = true

  return tabs

}

module.exports = {
  verifyOneActiveTab: verify,
  setActiveTabState: set
}