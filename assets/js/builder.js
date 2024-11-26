

const playerTable = document.getElementById('playertable');
let players = JSON.parse(localStorage.getItem('players'));

if(players){
    players.forEach(p => {
        let newf = document.createElement('li')
        newf.setAttribute('id', `player-${p.id}`);
        let innerTab = `
        <div class="inPcard">
            <span>
                <img src="${p.photo}">
            </span>
            <span>
                <p>${p.name}</p>
            </span>
        </div>
        `;
        newf.innerHTML = innerTab;
        playerTable.insertAdjacentElement('beforeend',newf);
    });
}



