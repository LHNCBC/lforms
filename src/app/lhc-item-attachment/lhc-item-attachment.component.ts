import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LhcDataService } from '../../lib/lhc-data.service';
import language from '../../../language-config.json';

// Thanks to https://github.com/mistralworks/ng-file-model/blob/master/ng-file-model.js
// and https://embed.plnkr.co/plunk/7BBYAa

@Component({
    selector: 'lhc-item-attachment',
    templateUrl: './lhc-item-attachment.component.html',
    styleUrls: ['./lhc-item-attachment.component.css'],
    standalone: false
})
export class LhcItemAttachmentComponent {
  @Input() item: any;
  @Input() labelledBy: string;
  @ViewChild('fileInput') fileInput: ElementRef;

  fileName: string;

  constructor(public lhcDataService: LhcDataService) {}

  onChange(changeEvent: Event) {
    // @ts-ignore
    const { files } = changeEvent.target;

    if (files) {
      let newFile = files[0];
      const item = this.item;
      if (!newFile.type) {
        // Per the FHIR specification, we can't proceed without a mime
        // type.
        alert(language.unknownFileType);
        newFile = null; // don't proceed
      }
      else if (item.allowedAttachmentTypes &&
        item.allowedAttachmentTypes.indexOf(newFile.type) < 0) {
        const types = item.allowedAttachmentTypes;
        alert(language.mimeTypeNotPermitted
            .replace('{lformsParam1}', newFile.name)
            .replace('{lformsParam2}', types.slice(0, -1).join(', '))
            .replace('{lformsParam3}', types.slice(-1)));
        newFile = null; // don't proceed
      }
      else if (newFile.size >  item.maxAttachmentSize) {
        const msg = language.maxAttachmentSizeExceeded
            .replace('{lformsParam1}', newFile.name)
            .replace('{lformsParam2}', item.maxAttachmentSize);
        alert(msg);
        newFile = null; // don't proceed
      }
      else if (newFile.size > 500000000) {
        if (!confirm(language.largeFileConfirmation)) {
          newFile = null; // don't proceed
        }
      }
      if (!newFile) {
        this.fileInput.nativeElement.value = '';  // clear the field
      }
      item._fileInfo = newFile;
      if (newFile && !item._useURL) {
        this.createAttachment(item); // see & binding above
      }
      // else Wait for the "create attachment" click
    }
  }


  /**
   * Deletes an attachment for an item.
   */
  removeAttachment(item): void {
    delete item.value;
    delete item._attachmentName;
    delete item._attachmentURL;
    delete item._fileInfo;
    delete item._useURL;

    this.lhcDataService.onItemValueChange(this.item, null, null, true);
  }


  /**
   * Creates an attachment for an item based on the data entered by the
   * user.
   */
  createAttachment(item): void {
    if (!item._fileInfo && !item._attachmentURL) {
      alert(language.attachmentFileOrUrlRequired);
    }
    else {
      item.value = {title: item._attachmentName || item._fileInfo?.name};

      const value = item.value;
      if (item._attachmentURL) {
        value.url = item._attachmentURL;
      }

      // uploaded file
      if (item._fileInfo) { // attach the data too
        const fileInfo = item._fileInfo;
        value.contentType = fileInfo.type;

        if (fileInfo.lastModified) {
          value.creation = new Date(fileInfo.lastModified).toISOString();
        } else if (fileInfo.lastModifiedDate) { // IE 11
          value.creation = fileInfo.lastModifiedDate.toISOString();
        }

        item.value._progress = 0.001; // 0.1% of loading; non-zero to trigger display
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          const data = loadEvent.target.result as string;
          const commaIndex = data.indexOf(',');
          if (data.indexOf('data:') !== 0 || commaIndex < 0) {
            alert(language.unableToAttachFile);
            throw new Error('data URL did not start with expected prefix, but with ' +
              data.slice(0, 30));
          }
          delete value._progress;
          value.data = data.slice(commaIndex + 1);

          this.lhcDataService.onItemValueChange(this.item, null, null, true);
        };
        reader.onprogress = (progressEvent) => {
          item._progress = progressEvent.loaded / progressEvent.total;
        };
        reader.readAsDataURL(fileInfo);
      }
      // url and title
      else {
        this.lhcDataService.onItemValueChange(this.item, null, null, true);
      }
    }
  }


  /**
   * Downloads the item's Attachment.
   * @param attachment the FHIR Attachment.
   * @param event the click event object
   * @return a "data:" URL (base 64)
   */
  downloadAttachment(attachment, event): void {
    if (attachment.data) {
      const a = event.target;
      const originalHref = a.href;
      a.href = 'data:' + (attachment.contentType ? attachment.contentType : '') + ';base64,' + attachment.data;
      a.download = attachment.title;
      setTimeout(() => {
        a.href = originalHref;
      }, 0);
    }
  }
}
