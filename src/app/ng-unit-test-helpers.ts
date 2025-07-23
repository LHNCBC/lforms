// Helper functions for angular unit tests.

import { TestBed } from '@angular/core/testing';
import {InternalUtil} from "./../lib/lforms/internal-utils.js";


/**
 *  Returns the element with the ID constructed for the given item and answer.
 *  Handles needed escaping of the CSS selector.
 * @param element the component's element
 * @param item an item from an LForms items array
 * @param answer an answer from the item's answers array
 */
export function getItemAnswerElem(element, item, answer) {
 return element.querySelector('#' +
    InternalUtil.getItemAnswerId(item, answer).replaceAll('|', '\\|'));
}
