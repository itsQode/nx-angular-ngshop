import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ui-gallery',
    templateUrl: './gallery.component.html',
    styles: []
})
export class GalleryComponent implements OnInit {
    selectedImage = '';

    @Input() images: string[] = [];

    ngOnInit(): void {
        if (this.images.length) {
            this.selectedImage = this.images[0];
        }
    }

    onChangeSelectedImage(index: number) {
        this.selectedImage = this.images[index];
    }

    get hasImages() {
        return this.images?.length > 0;
    }
}
