document.addEventListener('DOMContentLoaded', function () {
  const world = document.getElementById('world')
  world.setAttribute('style', 'background: black')

  //get mouse location relative to world drawing to
  function mouseLocation (event) {
    const rect = world.getBoundingClientRect()

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }
  /*set up*/
  const raySources=[]
  raySources.push(new RaySource(600,100,-Math.PI,Math.PI,'red'))
  const walls=[]
  const screenEdges=[]
  let ses=false
  /*drawing*/
  function draw(){
    world.setAttribute('width', window.innerWidth)//resize to window
    world.setAttribute('height', window.innerHeight)
    screenEdges.length=0
    screenEdges.push(new Boundry(0,0,window.innerWidth,0,'black'))
    screenEdges.push(new Boundry(window.innerWidth,0,window.innerWidth,window.innerHeight,'black'))
    screenEdges.push(new Boundry(window.innerWidth,window.innerHeight,0,window.innerHeight,'black'))
    screenEdges.push(new Boundry(0,window.innerHeight,0,0,'black'))

    world.innerHTML = ''//clear
    //draw
    for(const wall of walls){
      wall.draw(world)
    }
    for(const se of screenEdges){
      se.draw(world)
    }
    for(const rs of raySources){
      rs.cast(walls.concat(screenEdges))
      rs.draw(world)
    }
  }
  let tool
  /*key event handler*/
  document.addEventListener('keydown', event => {
    if(event.key==='s'||event.key==='S'){
      tool='Source'
    }else if(event.key==='o'||event.key==='O'){
      tool='Obstacle'
    }
  })
  /*mouse event handlers*/
  let pt1
  world.addEventListener('mousedown', event => {
    const mousePos=mouseLocation (event)
    if(tool==='Source'){
      raySources.push(new RaySource(mousePos.x,mousePos.y,Number(document.getElementById('min').value),Number(document.getElementById('max').value),document.getElementById('col').value))
      draw()
    }else if(tool==='Obstacle'){
      pt1=mousePos
    }
  })
  world.addEventListener('mouseup', event => {
    const mousePos=mouseLocation (event)
    if(tool==='Obstacle'){
      walls.push(new Boundry(pt1.x,pt1.y,mousePos.x,mousePos.y,document.getElementById('col').value))
      draw()
    }
  })

  /*draw loop*/
  draw()
  //setInterval(draw, 3)//draw every 33 milliseconds
})
