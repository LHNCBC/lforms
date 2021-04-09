import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  private _windowWidth$: BehaviorSubject<number> = null;
  private _viewModeClass$: BehaviorSubject<string> = null;
  //public windowWidth: Observable<number> = this._windowWidth$.asObservable();

  constructor() { 
    this._windowWidth$ = new BehaviorSubject(window.innerWidth);
    this._viewModeClass$ = new BehaviorSubject('lhc-view-lg');
    console.log("in window.service constructor: " + this._windowWidth$.getValue());
  }
  
  getWindowWidth(): number {
    return this._windowWidth$.getValue();
  }

  getViewModeClass(): string {
    return this._viewModeClass$.getValue();
  }

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

  getEleStyle(): object {
    let width = this._windowWidth$.getValue();
    let viewClass = this._viewModeClass$.getValue();
    console.log(viewClass)
    return viewClass === "lhc-view-lg" ? {"width": width/2 + "px"} : null;
  }

  get windowWidth() {
    return this._windowWidth$.asObservable();
  }

  get viewModeClass() {
    return this._viewModeClass$.asObservable();
  }
}
