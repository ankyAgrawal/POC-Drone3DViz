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

  
    let position2 = this.getPosition(-87.615972,41.907947,300)
    let orientation2 = this.getOrientation(Math.toRadians(135),0,0,position2)
    this.addmodel("green",position2,orientation2,true);
    // let e2 = this.viewer.entities.getById("green")

    // put dummy model in the space
    let position = this.getPosition(-87.6231,41.9000,450)
    let orientation = this.getOrientation(Math.toRadians(135),0,0,position)
    this.addmodel("red",position,orientation,true);
    let e = this.viewer.entities.getById("red")


    
    

    
  }

  addmodel(id:string,position:Cartesian3,orientation:Quaternion,trackedEntity:boolean):void{
    // this.viewer.entities.removeAll();
    const entity = this.viewer.entities.add({
      name: id,
      position: position,
      orientation: orientation,
      model: {
        uri: "../assets/3dModels/DJIModel.glb",
        minimumPixelSize: 64,
        maximumScale: 2000,
      },
    });
    if(trackedEntity)
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
