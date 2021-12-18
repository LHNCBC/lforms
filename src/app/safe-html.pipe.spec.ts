import { SafeHtmlPipe } from './safe-html.pipe';
import { DomSanitizer,BrowserModule } from '@angular/platform-browser';
import { inject, TestBed } from '@angular/core/testing';

describe('SafeHtmlPipe', () => {
  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          BrowserModule
        ]
      });


  });

  let pipe;

  it('create an instance', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    pipe = new SafeHtmlPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  })); 
  
});
