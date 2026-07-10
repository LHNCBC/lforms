import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

/**
 * LForms-specific Angular CDK OverlayContainer.
 *
 * Adds a marker class (`lhc-form-overlay-container`) to the shared
 * `cdk-overlay-container` element so that any ng-zorro widget mounted via the
 * CDK overlay (popovers, date / time pickers, tooltips, etc.) lives under a
 * selector that the scoped vendor stylesheet can target. Without this marker,
 * the `:where(.lhc-form-overlay-container) ...` rules emitted by
 * tools/postcss-lforms-scope would not match overlay content.
 *
 * See https://github.com/LHNCBC/lforms/issues/169
 */
@Injectable({ providedIn: 'root' })
export class LhcOverlayContainer extends OverlayContainer {
  /** Class added to the cdk-overlay-container hosting LForms overlays. */
  static readonly OVERLAY_CONTAINER_CLASS = 'lhc-form-overlay-container';

  /**
   * Public entry point the CDK calls before attaching any overlay. Overriding
   * it (rather than only the protected `_createContainer`) guarantees the
   * marker class is applied even if a future CDK version changes how/when the
   * container element is created. `classList.add` is idempotent, so re-applying
   * on every overlay open is safe and cheap.
   */
  override getContainerElement(): HTMLElement {
    const element = super.getContainerElement();
    element.classList.add(LhcOverlayContainer.OVERLAY_CONTAINER_CLASS);
    return element;
  }
}
