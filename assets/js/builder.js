

let xPos = null;
let yPos = null;


let defCount = 0;
let midCount = 0;
let attCount = 0;
let playersOnField = 0;

let arr = [];

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
document.querySelector('.fieldLayout').style.display = 'none';

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
        grassR.style.display = 'none'; 
        grassC.appendChild(grassR);
    }
    grass.appendChild(grassC);
}

let delay = 0;
const grassSpots = document.querySelectorAll('.grassSpot');

grassSpots.forEach((grassR) => {
    setTimeout(() => {
        grassR.style.display = 'block';
    }, delay);
    delay += 5; 
});


setTimeout(() => {
    document.querySelector('.fieldLayout').style.display = 'flex';
}, delay); 




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
                    document.body.appendChild(newf);
                    newf.style.left = (xPos - newf.offsetWidth / 2) + "px";
                    newf.style.top = (yPos - newf.offsetHeight / 2) + "px";
                    if(p.positionSpot == "def" && p.position != 'gk') {
                        defCount++;
                    }
                    if(p.positionSpot == "mid") {
                        midCount++;
                    }
                    if(p.positionSpot == "att") {
                        attCount++;
                    }
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
                      if(p.position ==='gk'){isGKalready=true;}
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

function createPoint(xPercent, yPercent, posF) {
    const container = document.querySelector('.field');
    const point = document.createElement('div');
    point.setAttribute('id','thisformPoint');
    point.classList.add(`${posF}`);
    point.className = `${posF}`;
    point.style.left = `${xPercent}%`;
    point.style.top = `${yPercent}%`;
  
    container.appendChild(point);
  }
  



  function form4_4_2() {
    createPoint(50, 95, 'def');  
    createPoint(10, 80, 'def'); createPoint(30, 80, 'def'); createPoint(70, 80, 'def'); createPoint(90, 80, 'def'); 
    createPoint(10, 60, 'mid'); createPoint(35, 60, 'mid'); createPoint(65, 60, 'mid'); createPoint(90, 60, 'mid'); 
    createPoint(40, 30, 'att'); createPoint(60, 30, 'att'); 
    
}

function form4_3_3() {
    createPoint(50, 95, 'def');  
    createPoint(10, 80, 'def'); createPoint(30, 80, 'def'); createPoint(70, 80, 'def'); createPoint(90, 80, 'def'); 
    createPoint(20, 60, 'mid'); createPoint(50, 60, 'mid'); createPoint(80, 60, 'mid'); 
    createPoint(20, 30, 'att'); createPoint(50, 30, 'att'); createPoint(80, 30, 'att'); 
    
}

function form4_2_3_1() {
    createPoint(50, 95, 'def');  
    createPoint(10, 80, 'def'); createPoint(30, 80, 'def'); createPoint(70, 80, 'def'); createPoint(90, 80, 'def'); 
    createPoint(30, 70, 'mid'); createPoint(70, 70, 'mid'); 
    createPoint(15, 50, 'mid'); createPoint(50, 50, 'mid'); createPoint(85, 50, 'mid'); 
    createPoint(50, 30, 'att');
   
}

function form3_5_2() {
    createPoint(50, 95, 'def');  
    createPoint(20, 80, 'def'); createPoint(50, 80, 'def'); createPoint(80, 80, 'def'); 
    createPoint(10, 60, 'mid'); createPoint(30, 60, 'mid'); createPoint(50, 60, 'mid'); createPoint(70, 60, 'mid'); createPoint(90, 60, 'mid'); 
    createPoint(40, 30, 'att'); createPoint(60, 30, 'att');
    
}

function form3_4_3() {
    createPoint(50, 95, 'def');  
    createPoint(20, 80, 'def'); createPoint(50, 80, 'def'); createPoint(80, 80, 'def'); 
    createPoint(10, 60, 'mid'); createPoint(35, 60, 'mid'); createPoint(65, 60, 'mid'); createPoint(90, 60, 'mid'); 
    createPoint(20, 30, 'att'); createPoint(50, 30, 'att'); createPoint(80, 30, 'att');
}

function form5_3_2() {
    createPoint(50, 95, 'def');  
    createPoint(5, 80, 'def'); createPoint(25, 80, 'def'); createPoint(50, 80, 'def'); createPoint(75, 80, 'def'); createPoint(95, 80, 'def'); 
    createPoint(30, 60, 'mid'); createPoint(50, 60, 'mid'); createPoint(70, 60, 'mid'); 
    createPoint(40, 30, 'att'); createPoint(60, 30, 'att');

}

function form5_4_1() {
    createPoint(50, 95, 'def');  
    createPoint(5, 70, 'def'); createPoint(25, 70, 'def'); createPoint(50, 70, 'def'); createPoint(75, 70, 'def'); createPoint(95, 70, 'def'); 
    createPoint(10, 50, 'mid'); createPoint(35, 50, 'mid'); createPoint(65, 50, 'mid'); createPoint(90, 50, 'mid'); 
    createPoint(50, 30, 'att');
   
}



let formSelect = document.getElementById('formations@');

formSelect.addEventListener('change', function() {


    arr = [];
    document.querySelectorAll('.playerCardV2').forEach(dx=>{
        let xf = document.getElementById(dx.id);
        xf.style.display = 'block';
        dx.remove()
    })
    document.querySelectorAll('#thisformPoint').forEach(po=>{
        po.remove();
    })


    if (formSelect.value === '4-4-2') {
        document.querySelectorAll('#thisformPoint').forEach(tp=>{
            tp.remove();
        })
        form4_4_2();
        document.getElementById('formationCount').innerText = formSelect.value;
    } else if (formSelect.value === '4-3-3') {
        document.querySelectorAll('#thisformPoint').forEach(tp=>{
            tp.remove();
        })
        form4_3_3();
        document.getElementById('formationCount').innerText = formSelect.value;
    } else if (formSelect.value === '4-2-3-1') {
        document.querySelectorAll('#thisformPoint').forEach(tp=>{
            tp.remove();
        })
        form4_2_3_1();
        document.getElementById('formationCount').innerText = formSelect.value;
    } else if (formSelect.value === '3-5-2') {
        document.querySelectorAll('#thisformPoint').forEach(tp=>{
            tp.remove();
        })
        form3_5_2();
        document.getElementById('formationCount').innerText = formSelect.value;
    } else if (formSelect.value === '3-4-3') {
        document.querySelectorAll('#thisformPoint').forEach(tp=>{
            tp.remove();
        })
        form3_4_3();
        document.getElementById('formationCount').innerText = formSelect.value;
    } else if (formSelect.value === '5-3-2') {
        document.querySelectorAll('#thisformPoint').forEach(tp=>{
            tp.remove();
        })
        form5_3_2();
        document.getElementById('formationCount').innerText = formSelect.value;
    } else if (formSelect.value === '5-4-1') {
        document.querySelectorAll('#thisformPoint').forEach(tp=>{
            tp.remove();
        })
        form5_4_1();
        document.getElementById('formationCount').innerText = formSelect.value;
    } else if (formSelect.value === '4-1-4-1') {
        document.querySelectorAll('#thisformPoint').forEach(tp=>{
            tp.remove();
        })
        form4_1_4_1();
        document.getElementById('formationCount').innerText = formSelect.value;
    } else if (formSelect.value === '4-4-1-1') {
        document.querySelectorAll('#thisformPoint').forEach(tp=>{
            tp.remove();
        })
        form4_4_1_1();
        document.getElementById('formationCount').innerText = formSelect.value;
    } else if (formSelect.value === '4-1-2-1-2') {
        document.querySelectorAll('#thisformPoint').forEach(tp=>{
            tp.remove();
        })
        form4_1_2_1_2();
        document.getElementById('formationCount').innerText = formSelect.value;
    } else if (formSelect.value === '4-2-2-2') {
        document.querySelectorAll('#thisformPoint').forEach(tp=>{
            tp.remove();
        })
        form4_2_2_2();
        document.getElementById('formationCount').innerText = formSelect.value;
    } else if (formSelect.value === '4-3-1-2') {
        document.querySelectorAll('#thisformPoint').forEach(tp=>{
            tp.remove();
        })
        form4_3_1_2();
        document.getElementById('formationCount').innerText = formSelect.value;
    } else if (formSelect.value === '3-4-1-2') {
        document.querySelectorAll('#thisformPoint').forEach(tp=>{
            tp.remove();
        })
        form3_4_1_2();
        document.getElementById('formationCount').innerText = formSelect.value;
    } else if (formSelect.value === '4-5-1') {
        document.querySelectorAll('#thisformPoint').forEach(tp=>{
            tp.remove();
        })
        form4_5_1();
        document.getElementById('formationCount').innerText = formSelect.value;
    }

    makethecards();
});


function makethecards() {
    let points = document.querySelectorAll('#thisformPoint');
    let data = JSON.parse(localStorage.getItem('players'));
    for(let i = 0;i<points.length;i++){
    for(let j = 0;j<data.length;j++){
    
        
            let point = points[i];
            let p = data[j];

            if (i === 0 && p.position === 'gk') {
                let newf = document.createElement('div');
                newf.classList.add('playerCardV2');
                document.getElementById(`player-${p.id}`).style.display = 'none';
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
                document.body.appendChild(newf);

                // Get the position of the point and adjust card placement
                const rect = point.getBoundingClientRect();
                const x = rect.left + window.scrollX;
                const y = rect.top + window.scrollY;
                newf.style.left = (x - newf.offsetWidth / 2) + "px";
                newf.style.top = (y - newf.offsetHeight / 2) + "px";
            }else if(i>0 && point.className === 'def' && p.positionSpot === 'def' && p.position != 'gk' && arr.indexOf(p) === -1){
                let newf = document.createElement('div');
                newf.classList.add('playerCardV2');
                document.getElementById(`player-${p.id}`).style.display = 'none';
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
                document.body.appendChild(newf);

                // Get the position of the point and adjust card placement
                const rect = point.getBoundingClientRect();
                const x = rect.left + window.scrollX;
                const y = rect.top + window.scrollY;
                newf.style.left = (x - newf.offsetWidth / 2) + "px";
                newf.style.top = (y - newf.offsetHeight / 2) + "px";
                
                arr.push(p);
                break;
            }else if(i>0 && point.className === 'mid' && p.positionSpot === 'mid' && arr.indexOf(p) === -1){
                let newf = document.createElement('div');
                newf.classList.add('playerCardV2');
                document.getElementById(`player-${p.id}`).style.display = 'none';
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
                document.body.appendChild(newf);

                // Get the position of the point and adjust card placement
                const rect = point.getBoundingClientRect();
                const x = rect.left + window.scrollX;
                const y = rect.top + window.scrollY;
                newf.style.left = (x - newf.offsetWidth / 2) + "px";
                newf.style.top = (y - newf.offsetHeight / 2) + "px";
                arr.push(p);
                break;
            }else if(i>0 && point.className === 'att' && p.positionSpot === 'att' && arr.indexOf(p) === -1){
                let newf = document.createElement('div');
                newf.classList.add('playerCardV2');
                document.getElementById(`player-${p.id}`).style.display = 'none';
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
                document.body.appendChild(newf);

                // Get the position of the point and adjust card placement
                const rect = point.getBoundingClientRect();
                const x = rect.left + window.scrollX;
                const y = rect.top + window.scrollY;
                newf.style.left = (x - newf.offsetWidth / 2) + "px";
                newf.style.top = (y - newf.offsetHeight / 2) + "px";
                arr.push(p);
                break;
            }
            
        };
        
    };}


let btn_R = document.getElementById('resetBtn');

btn_R.addEventListener('click',  function(){

    arr = [];
    document.querySelectorAll('.playerCardV2').forEach(dx=>{
        let xf = document.getElementById(dx.id);
        xf.style.display = 'block';
        dx.remove()
    })
    document.querySelectorAll('#thisformPoint').forEach(po=>{
        po.remove();
    })

    document.getElementById('formationCount').innerText = '0-0-0';
})

document.body.addEventListener('mousemove',function(){
    document.querySelectorAll('.bottomCard').forEach(lel=>{
        if(lel.parentElement.matches(':hover')){
            lel.style.display =  'flex';
            lel.parentElement.style.height = '120px';
        } else{
            lel.style.display =  'none';
            lel.parentElement.style.height = '65px';
            
        }
    })

})
