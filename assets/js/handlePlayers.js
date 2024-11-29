

let container = document.querySelector('.ToCont');
let modalAdd = document.querySelector('.ModalADD');
let modalBTN = document.querySelector('#addPlayerBtn');
let modalClose = document.querySelector('#closeModalADD');
let addPlayer = document.querySelector('#addPlayer');

async function test() {
    let players = JSON.parse(localStorage.getItem('players'));
    if (players) {
        players.forEach(p => {
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
            container.insertAdjacentElement('beforeend', newf);

            
            let deleteBtn = newf.querySelector('.btn-delete');
            deleteBtn.addEventListener('click', function () {
                let playerList = JSON.parse(localStorage.getItem('players')) || [];
                playerList = playerList.filter(player => player.id !== p.id);
                localStorage.setItem('players', JSON.stringify(playerList));
                newf.remove();
            });

            
            let updateBtn = newf.querySelector('.btn-update');
            updateBtn.addEventListener('click', function () {
                modalAdd.style.display = 'flex';
                modalAdd.querySelector('#playerName').value = p.name;
                modalAdd.querySelector('#playerPosition').value = p.position;
                modalAdd.querySelector('#playerPac').value = p.pace;
                modalAdd.querySelector('#playerSho').value = p.shooting;
                modalAdd.querySelector('#playerPas').value = p.passing;
                modalAdd.querySelector('#playerDri').value = p.dribbling;
                modalAdd.querySelector('#playerDef').value = p.defending;
                modalAdd.querySelector('#playerPhy').value = p.physical;

                
                addPlayer.onclick = function () {
                    p.name = modalAdd.querySelector('#playerName').value;
                    p.position = modalAdd.querySelector('#playerPosition').value;
                    p.pace = modalAdd.querySelector('#playerPac').value;
                    p.shooting = modalAdd.querySelector('#playerSho').value;
                    p.passing = modalAdd.querySelector('#playerPas').value;
                    p.dribbling = modalAdd.querySelector('#playerDri').value;
                    p.defending = modalAdd.querySelector('#playerDef').value;
                    p.physical = modalAdd.querySelector('#playerPhy').value;

                    
                    let playerList = JSON.parse(localStorage.getItem('players')) || [];
                    const index = playerList.findIndex(player => player.id === p.id);
                    if (index > -1) playerList[index] = p;
                    localStorage.setItem('players', JSON.stringify(playerList));
                    window.location.reload();
                };
            });
            updateBtn.style.display = 'none';
            deleteBtn.style.display = 'none';
        });
    }
}


modalBTN.addEventListener('click',function(){
    modalAdd.style.display = 'flex';
})

modalClose.addEventListener('click',function(){
    modalAdd.style.display = 'none';
})


addPlayer.addEventListener('click', function () {
    let name = modalAdd.querySelector('#playerName').value;
    let imageInput = modalAdd.querySelector('#playerImage'); // File input
    let playerPos = modalAdd.querySelector('#playerPosition').value;
    let pac = modalAdd.querySelector('#playerPac').value;
    let sho = modalAdd.querySelector('#playerSho').value;
    let pas = modalAdd.querySelector('#playerPas').value;
    let dri = modalAdd.querySelector('#playerDri').value;
    let def = modalAdd.querySelector('#playerDef').value;
    let phy = modalAdd.querySelector('#playerPhy').value;
    let country = modalAdd.querySelector('#playerCountry').value;

    let spot;
    if(playerPos==="gk"||playerPos==="cb"||playerPos==="rb"||playerPos==="lb"||playerPos==="rwb"||playerPos==="lwb"){
        spot = 'def';
        console.log('it didnt work');
    }else if(playerPos==="cam"||playerPos==="cm"||playerPos==="cdm"||playerPos==="rm"||playerPos==="lm"){
        spot = 'mid';
    }else if(playerPos==="st"||playerPos==="cf"||playerPos==="rw"||playerPos==="lw"){
        spot = 'att';
    }


    let rat = parseInt((parseInt(pac)+parseInt(sho)+parseInt(pas)+parseInt(dri)+parseInt(def)+parseInt(phy))/6);

    let playerList = JSON.parse(localStorage.getItem('players')) || [];

    // Check if a file was selected
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const imgBase = e.target.result; 
            let playerIdCounter = localStorage.getItem('playerIdCounter') || 0;
            playerIdCounter++;
            localStorage.setItem('playerIdCounter', playerIdCounter);
            let player = {
                id: playerIdCounter,
                name: name,
                photo: imgBase,
                position: playerPos,
                positionSpot: spot,
                nationality: country,
                flag: `https://cdn.sofifa.net/flags/${country.toLowerCase()}.png`,
                club: "Inter Miami",
                logo: "https://cdn.sofifa.net/meta/team/239235/120.png",
                rating: rat,
                pace: pac,
                shooting: sho,
                passing: pas,
                dribbling: dri,
                defending: def,
                physical: phy
            };

            playerList.push(player);
            localStorage.setItem("players", JSON.stringify(playerList));
            window.location.reload(); 
        };

        reader.readAsDataURL(imageInput.files[0]); 
    } else {
        alert("Please select an image file.");
    }
});


container.addEventListener('mouseover', function (e) {
    if (e.target.closest('.playerCard')) {
        const playerCard = e.target.closest('.playerCard');
        const midCard = playerCard.querySelector('.midCard');
        const rating = playerCard.querySelector('#RAT');
        const updateBtn = playerCard.querySelector('.btn-update');
        const deleteBtn = playerCard.querySelector('.btn-delete');
        
        const originalHTML = midCard.dataset.originalHtml || midCard.innerHTML;
        midCard.dataset.originalHtml = originalHTML; 
        
        rating.style.display = 'none';
        updateBtn.style.display = 'block';
        deleteBtn.style.display = 'block';

        midCard.innerHTML = `

        `;
        
        playerCard.addEventListener('mouseout', function mouseOutHandler(event) {
            if (!playerCard.contains(event.relatedTarget)) {
                midCard.innerHTML = originalHTML;
                rating.style.display = 'block';
                updateBtn.style.display = 'none';
                deleteBtn.style.display = 'none';
                playerCard.removeEventListener('mouseout', mouseOutHandler);
            }
        });
    }
});



test();

window.onload = function(){
    modalAdd.style.display = 'none';
}

