import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcAutocompleteComponent } from './lhc-autocomplete.component';

describe('LhcAutocompleteComponent', () => {
  let component: LhcAutocompleteComponent;
  let fixture: ComponentFixture<LhcAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LhcAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('keepDataModel()', ()=>{
    it('should return false if the value changes', ()=> {
      let changes={value: {previousValue: 'a', currentValue: 'b'}};
      expect(component.keepDataModel(changes)).toBe(false);
    });

    describe('for prefetched lists', ()=>{
      it('should return true if the form was previously not ready and the list changes', ()=>{
        let changes={
          isFormReady: {previousValue: false, currentValue: true},
          options: {previousValue: {acOptions: {listItems: []}},
                    currentValue: {acOptions: {listItems: ['a']}}}
        };
        expect(component.keepDataModel(changes)).toBe(true);
      });

      it('should return true if the form was previously not ready and the list changes but is empty', ()=>{
        let changes={
          isFormReady: {previousValue: false, currentValue: true},
          options: {previousValue: {acOptions: {listItems: undefined}},
                    currentValue: {acOptions: {listItems: []}}}
        };
        expect(component.keepDataModel(changes)).toBe(true);
      });

      it('should return false if the form is ready and the list changes', ()=>{
        component.isFormReady = true;
        let changes={
          options: {previousValue: {acOptions: {listItems: ['a']}},
                    currentValue: {acOptions: {listItems: ['b']}}}
        };
        expect(component.keepDataModel(changes)).toBe(false);
      });
    });

    describe('for search lists', ()=>{
      describe('when the form was not ready', ()=>{
        it('should return true if the url changes', ()=>{
          let changes={
            options: {previousValue: {acOptions: {url: 'a'}},
                      currentValue: {acOptions: {url: 'b'}}}
          };
          expect(component.keepDataModel(changes)).toBe(true);
        });

        it('should return true if the fhir property changes', ()=>{
          let changes={
            options: {previousValue: {acOptions: {fhir: 'a'}},
                      currentValue: {acOptions: {fhir: 'b'}}}
          };
          expect(component.keepDataModel(changes)).toBe(true);
        });
      });


      describe('when the form has been ready', ()=>{
        // If something the user does changes what is being searched, we clear
        // the data model.

        it('should return false if the url changes', ()=>{
          component.isFormReady = true;
          expect(component.isFormReady).toBe(true);
          let changes={
            options: {previousValue: {acOptions: {url: 'a'}},
                      currentValue: {acOptions: {url: 'b'}}}
          };
          expect(component.keepDataModel(changes)).toBe(false);
        });

        it('should return false if the fhir property changes', ()=>{
          component.isFormReady = true;
          let changes={
            options: {previousValue: {acOptions: {fhir: 'a'}},
                      currentValue: {acOptions: {fhir: 'b'}}}
          };
          expect(component.keepDataModel(changes)).toBe(false);
        });
      });
    });
  });
});
