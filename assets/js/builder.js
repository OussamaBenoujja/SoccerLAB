

let xPos = null;
let yPos = null;


let defCount = 0;
let midCount = 0;
let attCount = 0;
let playersOnField = 0;


let isGKalready = false;

const playerTable = document.getElementById('playertable');
let players = JSON.parse(localStorage.getItem('players'));

if (players) {
    players.forEach(p => {
        let newf = document.createElement('li');
        newf.setAttribute('id', `player-${p.id}`);
        newf.classList.add('dragCard');
        newf.draggable = true;
        newf.innerHTML = `
        <div class="inPcard">
            <span>
                <img src="${p.photo}">
            </span>
            <span id="withinspan34">
                <p id='withinspan44'>${p.name}</p>
                <p>${p.position}</p>
            </span>
        </div>`;
        playerTable.insertAdjacentElement('beforeend', newf);
    });
}

let grass = document.querySelector('.grass');
let _Filed = document.querySelector('#fieldOutline');

_Filed.style.display = 'none';

grass.style.display = 'inline-block';


for (let i = 0; i < 25; i++) {
    let grassC = document.createElement('div');
    grassC.style.display = 'flex';
    grassC.style.margin = '0';
    grassC.style.padding = '0';

    for (let j = 0; j < 16; j++) {
        let grassR = document.createElement('div');
        grassR.classList.add('grassSpot'); 
        grassR.style.backgroundColor = (i + j) % 2 === 0 ? '#007517' : '#005c12';
        grassR.style.width = '25px';
        grassR.style.height = '25px';
        grassC.appendChild(grassR);
    }
    grass.appendChild(grassC);
}

let outlineA =  document.createElement('div');
outlineA.setAttribute('id','outA');
outlineA.style.height = '250px';
outlineA.style.width = '400px';
outlineA.style.backgroundColor= 'rgba(255,0,0,0.4)';
outlineA.style.zIndex = '1000';
_Filed.appendChild(outlineA);
let outlineM =  document.createElement('div');
outlineM.setAttribute('id','outM');
outlineM.style.height = '125px';
outlineM.style.width = '400px';
outlineM.style.backgroundColor= 'rgba(0,255,0,0.4)';
outlineM.style.zIndex = '1000';
_Filed.appendChild(outlineM);
let outlineD =  document.createElement('div');
outlineD.setAttribute('id','outD');
outlineD.style.height = '250px';
outlineD.style.width = '400px';
outlineD.style.backgroundColor= 'rgba(255,0,0,0.4)';
outlineD.style.zIndex = '1000';
_Filed.appendChild(outlineD);


let playerV2 = document.querySelectorAll('.playerCardV2');

playerV2.forEach(p=>{
    if(p.matches(':hover')){
        p.zIndex = '1000';
        alert('ok you hovered over it!!!')
    }
})



window.addEventListener('DOMContentLoaded', function () {
    const dragItems = document.querySelectorAll(".dragCard");

    dragItems.forEach(dragItem => {
        let playerNum = Number(dragItem.id.slice(7));

        let data = JSON.parse(localStorage.getItem('players'));
        data.forEach(p => {
            if (p.id === playerNum) {
                let canDrop;
                dragItem.addEventListener("dragstart", function (event) {
                    event.dataTransfer.setData("Text", event.target.id);
                    let outA = document.getElementById('outA');
                    let outM = document.getElementById('outM');
                    let outD = document.getElementById('outD');
                    _Filed.style.display = 'flex';
                    if(p.positionSpot=="def"){
                        outA.style.backgroundColor = 'rgba(255,0,0,0.4)';
                        outM.style.backgroundColor = 'rgba(255,0,0,0.4)';
                        outD.style.backgroundColor = 'rgba(0,255,0,0.4)';
                        canDrop = outD;
                    }else if(p.positionSpot=="mid"){
                        outA.style.backgroundColor = 'rgba(255,0,0,0.4)';
                        outD.style.backgroundColor = 'rgba(255,0,0,0.4)';
                        outM.style.backgroundColor = 'rgba(0,255,0,0.4)';
                        canDrop = outM;
                    }else if(p.positionSpot=="att"){
                        outM.style.backgroundColor = 'rgba(255,0,0,0.4)';
                        outD.style.backgroundColor = 'rgba(255,0,0,0.4)';
                        outA.style.backgroundColor = 'rgba(0,255,0,0.4)';
                        canDrop = outA;
                    }
                });

                dragItem.addEventListener("dragend", function (event) {
                    _Filed.style.display = 'none';
                    const field = document.querySelector('.field');
                    if( p.position==='gk'&& isGKalready===true){
                        alert('goal keeper already set in formation!!');
                    }
                    else if(canDrop.matches(':hover') && playersOnField <= 10) {
                    
                    console.log('mouse is over the element now');
                    xPos = event.clientX;
                    yPos = event.clientY;
                    console.log('No longer dragging!');
                    console.log(`X: ${xPos} Y: ${yPos}`);

                    let newf = document.createElement('div');
                    newf.classList.add('playerCardV2');
                    newf.setAttribute('id', `player-${p.id}`);
                    newf.innerHTML = `
                                    <div class='theCard'>
                                        <div class='topCard'>
                                            <span class='topCardLeft'>
                                            <p id="Rating">99</p>
                                            <p id='Pos'>${p.position}</p>
                                            <img src='${p.flag}'>
                                            </span>
                                            <span class='topCardRight'>
                                            <img src='${p.photo}'>
                                            </span>
                                        </div>
                                        <div class='bottomCard'>
                                            <span class='playerName'>
                                            <p id='player-Name'>${p.name}</p>
                                            </span>
                                            <span class='playerInfo'>
                                            <div class='playerInfoInn'>
                                                <p>PAC ${p.pace}</p>
                                                <p>SHO ${p.shooting}</p>
                                                <p>PAS ${p.passing}</p>
                                            </div>
                                            <div class='playerInfoInn'>
                                                <p>DRI ${p.dribbling}</p>
                                                <p>DEF ${p.defending}</p>
                                                <p>PHY ${p.physical}</p>
                                            </div>
                                            
                                            </span>
                                        </div>
                                        
                                        </div>
                    `;
                    newf.style.position = 'absolute';
                    newf.style.zIndex = '99';
                    newf.style.left = xPos + "px";
                    newf.style.top = yPos + "px";
                    document.body.appendChild(newf); 
                    if(p.positionSpot=="def" && p.position!='gk'){defCount++}
                    if(p.positionSpot=="mid"){midCount++}
                    if(p.positionSpot=="att"){attCount++}
                    document.getElementById('formationCount').innerText = `${defCount}-${midCount}-${attCount}`;
                    playersOnField++;
                    dragItem.style.display = 'none';
                    newf.oncontextmenu = function (e) {
                        e.preventDefault();
                        xPos = event.clientX;
                        yPos = event.clientY;
                        let rightMenu = document.createElement('div');
                        rightMenu.setAttribute('id','rightMenu');
                        rightMenu.innerHTML =`
                            <lable>REMOVE</lable>
                        `;
                        rightMenu.style.backgroundColor = 'white';
                        rightMenu.style.padding = '10px';
                        rightMenu.style.color = 'black';
                        rightMenu.style.width = '100px';
                        rightMenu.style.position = 'absolute';
                        rightMenu.style.zIndex = '100';
                        rightMenu.style.left = xPos + "px";
                        rightMenu.style.top = yPos + "px";
                        //rightMenu.style.outline = 'rgba(255,0,0,0.4) solid 100px';
                        document.body.appendChild(rightMenu);
                        rightMenu.addEventListener('click',function(){
                            rightMenu.remove();
                            newf.remove();
                            dragItem.style.display = 'block';
                            if(p.position='gk'){isGKalready=false;}
                        })
                      }
                      if(p.position='gk'){isGKalready=true;}
                    }
                });
            }
        });
    });
});


let arrRight = document.childNodes;

arrRight.forEach(it => {
    it.addEventListener('click',function(){
        document.getElementById("rightMenu").remove();
    })
});

document.body.addEventListener('mousemove',function(){
    document.querySelectorAll('grassSpot').forEach(it=>{
        alert('worked');
        if(it.matches("::hover")){
            it.style.backgroundColor = 'black';
        }
    })
    
})
