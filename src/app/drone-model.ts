class DroneModel{
    id:string
    color:string
    constructor (id:string,color:string) {
        this.id =id
        this.color = color
    }

    get_id(){
        return this.id
    }

    get_color(){
        return this.color
    }

    function createModel(url, height) {
        viewer.entities.removeAll();
      
        const default_position = Cesium.Cartesian3.fromDegrees(
            41.879198,
            -87.635814,
          height
        );
        const heading = Cesium.Math.toRadians(135);
        const pitch = 0;
        const roll = 0;
        const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        const orientation = Cesium.Transforms.headingPitchRollQuaternion(
          default_position,
          hpr
        );
      
        const entity = viewer.entities.add({
          name: url,
          position: default_position,
          orientation: orientation,
          model: {
            uri: url,
            minimumPixelSize: 128,
            maximumScale: 20000,
          },
        });
        viewer.trackedEntity = entity;
      }
}