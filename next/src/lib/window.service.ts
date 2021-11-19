import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })

/**
 * Get the real time size (and styles) from the window object.
 */
export class WindowService {

  private _windowWidth$: BehaviorSubject<number> = null;
  private _viewModeClass$: BehaviorSubject<string> = null;
  //public windowWidth: Observable<number> = this._windowWidth$.asObservable();

  constructor() { 
    this._windowWidth$ = new BehaviorSubject(window.innerWidth);
    this._viewModeClass$ = new BehaviorSubject('lhc-view-lg');
    //console.log("in window.service constructor: " + this._windowWidth$.getValue());
  }
  
  /**
   * Get the window's current width as a number
   * @returns the value of the window's width
   */
  getWindowWidth(): number {
    return this._windowWidth$.getValue();
  }
  
  /**
   * Get view mode CSS class as a string
   * @returns the CSS class string for view mode
   */
  getViewModeClass(): string {
    return this._viewModeClass$.getValue();
  }

  /**
   * Set the width
   * @param width the window's current width
   */
  setWindowWidth(width: number): void {
    this._windowWidth$.next(width)

    let viewClass:string;
    
    // small screen
    if (width <= 400)  //480
      viewClass = "lhc-view-sm";
      // medium screen
    else if (width <= 600)  //800
      viewClass = "lhc-view-md";
    // large screen
    else {
      viewClass = "lhc-view-lg";
    }
    this._viewModeClass$.next(viewClass);
  }

  /**
   * Get a CSS style for DOM element (the input field)
   * @returns an object of CSS style
   */
  getEleStyle(): object {
    let width = this._windowWidth$.getValue();
    let viewClass = this._viewModeClass$.getValue();
    console.log(viewClass)
    return viewClass === "lhc-view-lg" ? {"width": width/2 + "px"} : null;
  }

  /**
   * Get the window's current width as an obserable
   * @returns a number as an observable
   */
  get windowWidth(): Observable<number> {
    return this._windowWidth$.asObservable();
  }

  /**
   * Get view mode CSS class as an obserable
   * @returns a CSS class string as an observable
   */
  get viewModeClass(): Observable<string> {
    return this._viewModeClass$.asObservable();
  }

}
