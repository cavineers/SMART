/**
 * @package SMART -> Super Machine Learning/Artificial Intelligent Robot Tracker
 * @version 0.0.1
 * @author Bryce Cary <FRC TEAM 4541>
 * @author Ryan Bode <FRC TEAM 4541>
 */
//  Clear Console
console.clear();
//  Imports
let CONSTANTS = require("./Constants");
let { ElectronWindow, WindowClassListenerType } = require("./window");
// Initial Console Echo
console.log(`Starting ${CONSTANTS.name.short}`);
// Global Variables
let k_window;
// Instantiate
k_window = new ElectronWindow();
// On complete
k_window.on(WindowClassListenerType.Ready, () => {
    k_window.show();
});
