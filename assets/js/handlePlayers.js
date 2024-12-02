

let container = document.querySelector('.ToCont');
let modalAdd = document.querySelector('.ModalADD');
let modalBTN = document.querySelector('#addPlayerBtn');
let modalClose = document.querySelector('#closeModalADD');
let addPlayer = document.querySelector('#addPlayer');
let updPlayer = document.querySelector('#updPlayer');
async function test() {
    let players = JSON.parse(localStorage.getItem('players'));
    if (players) {
        players.forEach(p => {
            let newf = document.createElement('div');
            newf.classList.add('playerCard');
            newf.setAttribute('id', `player-${p.id}`);
            newf.innerHTML = `
                <div id='fixiated'>
                <p id="RAT">${p.rating}</p>
                <div id='span34'>
                <img id='playerImg' src="${p.photo}">
                </div>
                </div>
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
    addPlayer.style.display = 'none';
    updPlayer.style.display = 'block';
    modalAdd.style.display = 'flex';

   
    modalAdd.querySelector('#playerName').value = p.name;
    modalAdd.querySelector('#playerPosition').value = p.position;
    modalAdd.querySelector('#playerPac').value = p.pace;
    modalAdd.querySelector('#playerSho').value = p.shooting;
    modalAdd.querySelector('#playerPas').value = p.passing;
    modalAdd.querySelector('#playerDri').value = p.dribbling;
    modalAdd.querySelector('#playerDef').value = p.defending;
    modalAdd.querySelector('#playerPhy').value = p.physical;
    modalAdd.querySelector('#playerCountry').value = p.nationality;

    
    updPlayer.onclick = function () {
        const updatedName = modalAdd.querySelector('#playerName').value;
        const updatedPosition = modalAdd.querySelector('#playerPosition').value;
        const updatedPace = modalAdd.querySelector('#playerPac').value;
        const updatedShooting = modalAdd.querySelector('#playerSho').value;
        const updatedPassing = modalAdd.querySelector('#playerPas').value;
        const updatedDribbling = modalAdd.querySelector('#playerDri').value;
        const updatedDefending = modalAdd.querySelector('#playerDef').value;
        const updatedPhysical = modalAdd.querySelector('#playerPhy').value;
        const updatedCountry = modalAdd.querySelector('#playerCountry').value;
        const imageInput = modalAdd.querySelector('#playerImage');

        
        if (
            updatedPace > 99 || updatedShooting > 99 || updatedPassing > 99 ||
            updatedDribbling > 99 || updatedDefending > 99 || updatedPhysical > 99 ||
            !updatedPace || !updatedShooting || !updatedPassing ||
            !updatedDribbling || !updatedDefending || !updatedPhysical
        ) {
            alert('Stat numbers cannot be empty or over 99!!!');
            return;
        }
        if (updatedName.length < 1 || updatedName.match(/\d+/)) {
            alert('Name cannot be empty or contain numbers');
            return;
        }
        if (!updatedPosition.trim()) {
            alert('Pick a player position');
            return;
        }
        if (!updatedCountry.trim()) {
            alert('Pick a player nationality');
            return;
        }

        
        if (imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                p.name = updatedName;
                p.photo = e.target.result; 
                p.position = updatedPosition;
                p.pace = updatedPace;
                p.shooting = updatedShooting;
                p.passing = updatedPassing;
                p.dribbling = updatedDribbling;
                p.defending = updatedDefending;
                p.physical = updatedPhysical;
                p.nationality = updatedCountry;
                p.flag = `https://cdn.sofifa.net/flags/${updatedCountry.toLowerCase()}.png`;

                savePlayerData(p);
            }
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            p.name = updatedName;
            p.position = updatedPosition;
            p.pace = updatedPace;
            p.shooting = updatedShooting;
            p.passing = updatedPassing;
            p.dribbling = updatedDribbling;
            p.defending = updatedDefending;
            p.physical = updatedPhysical;
            p.nationality = updatedCountry;
            p.flag = `https://cdn.sofifa.net/flags/${updatedCountry.toLowerCase()}.png`;

            savePlayerData(p);
        }
        modalAdd.style.display = 'none';
    };
});

            function savePlayerData(updatedPlayer) {
                let playerList = JSON.parse(localStorage.getItem('players')) || [];
                const index = playerList.findIndex(player => player.id === updatedPlayer.id);
                if (index > -1) {
                    playerList[index] = updatedPlayer; 
                }
                localStorage.setItem('players', JSON.stringify(playerList)); 
                const playerCard = document.querySelector(`#player-${updatedPlayer.id}`);
                playerCard.querySelector('#RAT').textContent = updatedPlayer.rating;
                playerCard.querySelector('#playerImg').src = updatedPlayer.photo;
                playerCard.querySelector('.intopCard').innerHTML = `
                    <p>${updatedPlayer.name}</p>
                    <img src="${updatedPlayer.flag}">
                    <p>${updatedPlayer.position}</p>
                `;
                playerCard.querySelector('.midCard').innerHTML = `
                    <p>${updatedPlayer.pace} PAC</p>
                    <p>${updatedPlayer.shooting} SHO</p>
                    <p>${updatedPlayer.passing} PAS</p>
                    <p>${updatedPlayer.dribbling} DRI</p>
                    <p>${updatedPlayer.defending} DEF</p>
                    <p>${updatedPlayer.physical} PHY</p>
                `;
            }
            updateBtn.style.display = 'none';
            deleteBtn.style.display = 'none';
        });
    }
}


modalBTN.addEventListener('click',function(){
    modalAdd.style.display = 'flex';
    addPlayer.style.display = 'block';
    updPlayer.style.display = 'none';
})

modalClose.addEventListener('click',function(){
    modalAdd.style.display = 'none';
})


addPlayer.addEventListener('click', function () {

    let name = modalAdd.querySelector('#playerName').value;
    let imageInput = modalAdd.querySelector('#playerImage'); 
    let playerPos = modalAdd.querySelector('#playerPosition').value;
    let pac = modalAdd.querySelector('#playerPac').value;
    let sho = modalAdd.querySelector('#playerSho').value;
    let pas = modalAdd.querySelector('#playerPas').value;
    let dri = modalAdd.querySelector('#playerDri').value;
    let def = modalAdd.querySelector('#playerDef').value;
    let phy = modalAdd.querySelector('#playerPhy').value;
    let country = modalAdd.querySelector('#playerCountry').value;

    if(pac>99||sho>99||pas>99||dri>99||def>99||phy>99||pac===''||sho===''||pas===''||dri===''||def===''||phy===''){
        alert('Stat numbers can not be empty or over 99!!!');
        return;
    }
    if(name.length<1||name.match(/\d+/)){
        alert('name can not be empty or contain numbers');
        return;
    }
    if(playerPos===' '){
        alert('pick a player position');
        return;
    }
    if(country===' '){
        alert('pick a player nationality');
        return;
    }

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



