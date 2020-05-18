/**
 * @package SMART -> Super Machine Learning/Artificial Intelligent Robot Tracker
 * @version 0.0.1
 * @author Bryce Cary <FRC TEAM 4541>
 * @author Ryan Bode <FRC TEAM 4541>
 */

//  Clear Console
console.clear();

//  Imports
import Constants from "./Constants";
import EWindow from "./window";
import { app, BrowserWindow } from "electron";

// Initial Console Echo
console.log(`Starting ${Constants.app_name.short}`);

// Global Variables
let k_window: any;

// New window
EWindow.main(app, BrowserWindow);
