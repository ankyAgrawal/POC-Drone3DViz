import { Directive, ElementRef, OnInit } from '@angular/core';
import { Viewer, Cesium3DTileset, IonResource} from 'cesium';

@Directive({
  selector: '[appCesium]'
})
export class CesiumDirective implements OnInit {

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const viewer = new Viewer(this.el.nativeElement);
    viewer.scene.primitives.add(new Cesium3DTileset({ url: IonResource.fromAssetId(96188) }));
  }

}
