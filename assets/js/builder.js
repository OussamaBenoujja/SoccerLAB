let xPos = null;
let yPos = null;

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
            <span>
                <p>${p.name}</p>
            </span>
        </div>`;
        playerTable.insertAdjacentElement('beforeend', newf);
    });
}

let grass = document.querySelector('.grass');
grass.style.display = 'inline-block';

for (let i = 0; i < 25; i++) {
    let grassC = document.createElement('div');
    grassC.style.display = 'flex';
    grassC.style.margin = '0';
    grassC.style.padding = '0';

    for (let j = 0; j < 16; j++) {
        let grassR = document.createElement('div');
        grassR.classList.add('grassSpot'); // Use class instead of id
        grassR.style.backgroundColor = (i + j) % 2 === 0 ? '#007517' : '#005c12';
        grassR.style.width = '30px';
        grassR.style.height = '30px';
        grassC.appendChild(grassR);
    }
    grass.appendChild(grassC);
}

window.addEventListener('DOMContentLoaded', function () {
    const dragItems = document.querySelectorAll(".dragCard");

    dragItems.forEach(dragItem => {
        let playerNum = Number(dragItem.id.slice(7));

        let data = JSON.parse(localStorage.getItem('players'));
        data.forEach(p => {
            if (p.id === playerNum) {
                dragItem.addEventListener("dragstart", function (event) {
                    event.dataTransfer.setData("Text", event.target.id);
                });

                dragItem.addEventListener("dragend", function (event) {
                    xPos = event.clientX;
                    yPos = event.clientY;
                    console.log('No longer dragging!');
                    console.log(`X: ${xPos} Y: ${yPos}`);

                    let newf = document.createElement('div');
                    newf.classList.add('playerCard');
                    newf.setAttribute('id', `player-${p.id}`);
                    newf.innerHTML = `
                        <p id="RAT">${p.rating}</p>
                        <img id='playerImg' src="${p.photo}">
                        <div class='intopCard'>
                            <p>${p.name}</p>
                            <img src="${p.flag}">
                            <p>${p.position}</p>
                        </div>
                        <div class='midCard'>
                            <p>${p.pace} PAC</p>
                            <p>${p.shooting} SHO</p>
                            <p>${p.passing} PAS</p>
                            <p>${p.dribbling} DRI</p>
                            <p>${p.defending} DEF</p>
                            <p>${p.physical} PHY</p>
                        </div>
                        <div class="cardActions">
                            <button class="btn-update">Update</button>
                            <button class="btn-delete">Delete</button>
                        </div>
                    `;
                    newf.style.position = 'absolute';
                    newf.style.zIndex = '99';
                    newf.style.left = xPos + "px";
                    newf.style.top = yPos + "px";

                    document.body.appendChild(newf); // Corrected line
                });
            }
        });
    });
});



