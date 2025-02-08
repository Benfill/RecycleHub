import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageHandlerService {

  constructor() { }

  // handleFileInput(event: Event) {
  //   const target = event.target as HTMLInputElement;

  //   const files = target.files as FileList;

  //   const file = files[0];

  //   this.form.value.Photo = file;

  //   if (file) this.saveFile(file);
  // }
}
