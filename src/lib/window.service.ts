import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

/**
 * Get the real time size (and styles) from the window object.
 */
export class WindowService {

  private _windowWidth$: BehaviorSubject<number> = null;
  private _viewMode$: BehaviorSubject<string> = null; 

  constructor() { 
    this._windowWidth$ = new BehaviorSubject(window.innerWidth);
    this._viewMode$ = new BehaviorSubject('lg'); // lg, md, sm
  }
  

  /**
   * Get the window's current width as a number
   * @returns the value of the window's width
   */
  getWindowWidth(): number {
    return this._windowWidth$.getValue();
  }
  

  /**
   * Get view mode as a string
   * @returns the view mode value
   */
  getViewMode(): string {
    return this._viewMode$.getValue();
  }


  /**
   * Set the width
   * @param width the window's current width
   */
  setWindowWidth(width: number): void {
    this._windowWidth$.next(width)

    let viewMode:string;
    
    // small screen
    if (width <= 400) {
      viewMode = 'sm';
    }      
    // medium screen
    else if (width <= 600) {
      viewMode = 'md';
    }
    // large screen
    else {
      viewMode = 'lg';
    }
    this._viewMode$.next(viewMode);
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
  get viewMode(): Observable<string> {
    return this._viewMode$.asObservable();
  }

}
