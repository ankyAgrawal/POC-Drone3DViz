import { NumberSymbol } from '@angular/common';
import { Directive, ElementRef, OnInit } from '@angular/core';
import { Viewer, Cesium3DTileset, IonResource,Cartesian3,HeadingPitchRoll,Transforms,Math} from 'cesium';
import Quaternion from 'cesium/Source/Core/Quaternion';

@Directive({
  selector: '[appCesium]'
})
export class CesiumDirective implements OnInit {
  viewer:any
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.viewer = new Viewer(this.el.nativeElement);
    this.viewer.scene.primitives.add(new Cesium3DTileset({ url: IonResource.fromAssetId(96188) }));

    // put dummy model in the space
    let position = this.getPosition(-87.6231,41.89910,800)
    let orientation = this.getOrientation(Math.toRadians(135),0,0,position)
    this.addmodel("red",position,orientation);
    let e = this.viewer.entities.getById("red")
    let x = 1
    while(x!=2000){
      e.position = this.getPosition(position.x+x,position.y,position.z)
      x+=1;
      setTimeout(function(){},1000)
    }

    
  }

  addmodel(id:string,position:Cartesian3,orientation:Quaternion):void{
    this.viewer.entities.removeAll();
    const entity = this.viewer.entities.add({
      name: id,
      position: position,
      orientation: orientation,
      model: {
        uri: "../assets/3dModels/DJIModel.glb",
        minimumPixelSize: 128,
        maximumScale: 20000,
      },
    });
    this.viewer.trackedEntity = entity;
  }

  getPosition(lat:number,lon:number,alt:number):Cartesian3{
    return Cartesian3.fromDegrees(lat,lon,alt);
  }

  getOrientation(heading:number,pitch:number,roll:NumberSymbol,position:Cartesian3):Quaternion{
    const hpr = new HeadingPitchRoll(heading, pitch, roll);
    const orientation = Transforms.headingPitchRollQuaternion(position,hpr);
    return orientation;
  }









}
