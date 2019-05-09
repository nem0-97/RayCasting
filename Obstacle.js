//stuff rays interact with
class Boundry{
  constructor(x1,y1,x2,y2,color){
    this.x1=x1
    this.x2=x2
    this.y1=y1
    this.y2=y2
    this.color=color
  }
  draw(panel){
    const bound = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    bound.setAttribute('x1', this.x1)
    bound.setAttribute('y1', this.y1)
    bound.setAttribute('x2', this.x2)
    bound.setAttribute('y2', this.y2)
    bound.setAttribute('stroke', this.color)
    panel.appendChild(bound)
  }
}
