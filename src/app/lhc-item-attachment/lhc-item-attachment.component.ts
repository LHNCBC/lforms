import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LhcDataService } from '../../lib/lhc-data.service';

// Thanks to https://github.com/mistralworks/ng-file-model/blob/master/ng-file-model.js
// and https://embed.plnkr.co/plunk/7BBYAa

@Component({
  selector: 'lhc-item-attachment',
  templateUrl: './lhc-item-attachment.component.html',
  styleUrls: ['./lhc-item-attachment.component.css']
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
        alert('Unknown file type.  Please ensure the file has an ' +
          'appropriate extension');
        newFile = null; // don't proceed
      }
      else if (item.allowedAttachmentTypes &&
        item.allowedAttachmentTypes.indexOf(newFile.type) < 0) {
        const types = item.allowedAttachmentTypes;
        alert('The file ' + newFile.name + ' is not one of the mime types ' +
          'permitted by this questionnaire (' + types.slice(0, -1).join(', ') +
          ' and ' + types.slice(-1) + ').  Please make sure your file has ' +
          'an appropriate file extension for its type in its filename.');
        newFile = null; // don't proceed
      }
      else if (newFile.size >  item.maxAttachmentSize) {
        const msg = 'The file ' + newFile.name + ' exceeds the maximum ' +
          'attachment size of ' + item.maxAttachmentSize + ' bytes permitted by ' +
          'this questionnaire.  If you can specify the file with a URL, ' +
          'use the button to open the URL field and enter that instead.';
        alert(msg);
        newFile = null; // don't proceed
      }
      else if (newFile.size > 500000000) {
        const msg = 'Adding a large file as an attachment might cause your ' +
          'computer to run low on memory.  There is a button to enter a ' +
          'URL instead of attaching the file data.  Are you sure you want ' +
          'to attach the file data?';
        if (!confirm(msg)) {
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
   * Creates an attachment for an item based on the data entered by the
   * user.
   */
  removeAttachment(item): void {
    delete item.value;
    delete item._attachmentName;
    delete item._attachmentURL;
    delete item._fileInfo;
    delete item._useURL;
  }


  /**
   * Creates an attachment for an item based on the data entered by the
   * user.
   */
  createAttachment(item): void {
    if (!item._fileInfo && !item._attachmentURL) {
      alert('An attachment must have either a file or a URL (or both).');
    }
    else {
      item.value = {title: item._attachmentName || item._fileInfo?.name};

      const value = item.value;
      if (item._attachmentURL) {
        value.url = item._attachmentURL;
      }

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
            alert('Unable to attach the file data.');
            throw new Error('data URL did not start with expected prefix, but with ' +
              data.slice(0, 30));
          }
          delete value._progress;
          value.data = data.slice(commaIndex + 1);
        };
        reader.onprogress = (progressEvent) => {
          item._progress = progressEvent.loaded / progressEvent.total;
        };
        reader.readAsDataURL(fileInfo);
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
