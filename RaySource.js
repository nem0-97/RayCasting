//produces rays
class RaySource{
  constructor(x,y,minAngle,maxAngle,color){//angles in range -PI to PI in radians
    this.x=x
    this.y=y
    this.color=color
    this.rays=[]
    for(let i=minAngle;i<maxAngle;i+=.018){
      const dx=5
      const dy=5
      this.rays.push(createRay(x,y,200*Math.cos(i),200*Math.sin(i),color))
    }
  }
  move(x,y){
    this.x=x
    this.y=y
  }
  draw(panel){
    for(const r of this.rays){
      r.draw(panel)
    }
  }
  cast(bounds){
    for(const r of this.rays){
      let closest
      let dist=Infinity
      for(const b of bounds){
        const pt=r.cast(b)
        if(pt){
          const h = Math.sqrt((this.x-pt.x)**2+(this.y-pt.y)**2)
          if(dist>h){
            dist=h
            closest=pt
          }
        }
      }
      if(closest)
        r.view(closest.x,closest.y)
      /*else
        r.view(,)*/
    }
  }
}
