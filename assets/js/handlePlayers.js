let container = document.querySelector('.ToCont');
let modalAdd = document.querySelector('.ModalADD');
let modalBTN = document.querySelector('#addPlayerBtn');
let modalClose = document.querySelector('#closeModalADD');
let addPlayer = document.querySelector('#addPlayer');



let dataUrl = 'http://127.0.0.1:5500/assets/dataSet/players.json';


async function getData(){
    try{
    let data = await fetch(dataUrl);
    data = await data.json();
    return data;}
    catch(err){
        console.log(err);
    }
}

async function test(){
    let players = JSON.parse(localStorage.getItem('players'));
    if(players){
    players.forEach(p => {
        let newf = document.createElement('div');
        newf.classList.add('playerCard');
        newf.innerHTML = `
            <p id="RAT">${p.rating}</p>
            <img src="${p.photo}">
            <div class='intopCard'>
                <p>${p.name}</p>
                <img src="${p.flag}">
                <img src="${p.logo}">
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
        `;

        container.insertAdjacentElement('beforeend', newf);
    });}
}

modalBTN.addEventListener('click',function(){
    modalAdd.style.display = 'flex';
})

modalClose.addEventListener('click',function(){
    modalAdd.style.display = 'none';
})


addPlayer.addEventListener('click',function(){
    let name    = modalAdd.querySelector('#playerName').value;
    let pac     = modalAdd.querySelector('#playerPac').value;
    let sho     = modalAdd.querySelector('#playerSho').value;
    let pas     = modalAdd.querySelector('#playerPas').value;
    let dri     = modalAdd.querySelector('#playerDri').value;
    let def     = modalAdd.querySelector('#playerDef').value;
    let phy     = modalAdd.querySelector('#playerPhy').value;
    let country = modalAdd.querySelector('#playerCountry').value;

    let playerList = JSON.parse(localStorage.getItem('players'))|| [];

    let player = {
        name: name,
        photo: "https://cdn.sofifa.net/players/158/023/25_120.png",
        position: "RW",
        nationality: country,
        flag: "https://cdn.sofifa.net/flags/ar.png",
        club: "Inter Miami",
        logo: "https://cdn.sofifa.net/meta/team/239235/120.png",
        rating: 93,
        pace: pac,
        shooting: sho,
        passing: pas,
        dribbling: dri,
        defending: def,
        physical: phy
    }
    playerList.push(player);
    localStorage.setItem("players", JSON.stringify(playerList));
    window.location.reload();
})




test();

window.onload = function(){
    modalAdd.style.display = 'none';
}