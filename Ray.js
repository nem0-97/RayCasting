//use hard object and factory function so can encapsulate private instance variables(not needed)
function createRay(x,y,dx,dy,color){//x,y are start, dx/dy are x and y components of vector representing direction
  return{
    draw(panel){
      const ray = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      ray.setAttribute('x1', x)
      ray.setAttribute('y1', y)
      ray.setAttribute('x2', x+dx)
      ray.setAttribute('y2', y+dy)
      ray.setAttribute('stroke', color)
      ray.setAttribute('stroke-width', .3)
      ray.setAttribute('opacity', .4)
      panel.appendChild(ray)
    },
    view(x1,y1){
      dx=x1-x
      dy=y1-y
    },
    cast(bounds){
      const denom=dy*(bounds.x1-bounds.x2)-dx*(bounds.y1-bounds.y2)
      if(denom===0) return

      const t=((x-bounds.x1)*(bounds.y1-bounds.y2)-(y-bounds.y1)*(bounds.x1-bounds.x2))/denom
      const u= (dx*(y-bounds.y1)-dy*(x-bounds.x1))/denom
      if(u>0 && u<1 && t>0){
        return {x:x+t*dx,y:y+t*dy}
      }
    }
  }
}
