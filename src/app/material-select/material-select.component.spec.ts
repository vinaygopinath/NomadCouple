/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement, EventEmitter } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { MaterialSelectComponent } from './material-select.component';

const DEFAULT_PLACEHOLDER = 'Choose an option';
const SOME_ITEMS = ['ABC', 'DEF', 'GHI'];

describe('Component: MaterialSelect', () => {
  let component;

  beforeEach(() => {
    component = new MaterialSelectComponent();
  });

  it('should create an instance', () => {
    expect(component).toBeDefined();
  });

  describe('Defaults', () => {

    it('should hide the dropdown by default', () => {
      expect(component.isActive).toBeFalsy();
    });

    it('should use ' + DEFAULT_PLACEHOLDER + ' as the default placeholder text', () => {
      expect(component.placeholderText).toBe(DEFAULT_PLACEHOLDER);
    });

    it('should default to an empty array of items', () => {
      expect(component.items).toEqual([]);
    });

    it('should create an EventEmitter for onItemSelected', () => {
      expect(component.onItemSelected instanceof EventEmitter).toBeTruthy();
    });

  });

  describe('toggleDropdownState', () => {

    it('should exist', () => {
      expect(component.toggleDropdownState).toBeDefined();
    });

    it('should toggle the dropdown', () => {
      let mockEvent = new Event('click');

      component.toggleDropdownState(mockEvent);

      expect(component.isActive).toBeTruthy();
    });

    it('should prevent event propagation', () => {
      let mockEvent = new Event('click');
      spyOn(mockEvent, 'stopPropagation');

      component.toggleDropdownState(mockEvent);

      expect(mockEvent.stopPropagation).toHaveBeenCalled();
    });

  });

  describe('closeDropdown', () => {

    it('should exist', () => {
      expect(component.closeDropdown).toBeDefined();
    });

    it('should close the dropdown', () => {
      component.closeDropdown();

      expect(component.isActive).toBeFalsy();
    });
  });

  describe('notifyItemSelection', () => {

    it('should exist', () => {
      expect(component.notifyItemSelection).toBeDefined();
    });

    it('should save the selected item', () => {
      component.items = SOME_ITEMS;
      let someItem = SOME_ITEMS[0];

      component.notifyItemSelection(someItem);

      expect(component.selectedItem).toBe(someItem);
    });

    it('should notify the parent component with the selected item', () => {
      component.items = SOME_ITEMS;
      let someItem = SOME_ITEMS[0];
      spyOn(component.onItemSelected, 'emit');
      component.notifyItemSelection(someItem);

      expect(component.onItemSelected.emit).toHaveBeenCalledWith(someItem);
    });
  });
});
