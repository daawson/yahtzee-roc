let dices = document.getElementsByClassName("cube");
let t = [0,0,0,0,0];
let visible = [true, true, true, true, true];
let currentThrow = 0;
let points = 0;

function init(){
    for (let i = 0; i < dices.length; i++) {
        dices[i].classList.add('invisible');
        visible[i] = false;
        t[i] = 0;
    }
    document.getElementsByTagName('button');

}
function roll(e, force = false){
    if(!force) {
        if (currentThrow === 0) {
            for (let i = 0; i < dices.length; i++) {
                dices[i].classList.remove('invisible');
                visible[i] = true;
                let a = Math.floor(Math.random() * 6) + 1;
                let r = 0;
                for(let b = 0; b < a; b++){
                    r = Math.floor(Math.random() * 6) + 1;
                }
                t[i] = r;
                dices[i].src = "img/d" + r + ".svg";
            }
            e.disabled = true;
            currentThrow++;
        } else if (currentThrow === 1) {
            for (let i = 0; i < dices.length; i++) {
                if (visible[i] === false) {
                    visible[i] = true;
                    dices[i].classList.remove('invisible');
                    let a = Math.floor(Math.random() * 6) + 1;
                    let r = 0;
                    for(let b = 0; b < a; b++){
                        r = Math.floor(Math.random() * 6) + 1;
                    }
                    t[i] = r;
                    dices[i].src = "img/d" + r + ".svg";
                }
            }
            e.disabled = true;
            currentThrow++;
        } else if (currentThrow === 2) {
            for (let i = 0; i < dices.length; i++) {
                if (visible[i] === false) {
                    visible[i] = true;
                    dices[i].classList.remove('invisible');
                    let a = Math.floor(Math.random() * 6) + 1;
                    let r = 0;
                    for(let b = 0; b < a; b++){
                        r = Math.floor(Math.random() * 6) + 1;
                    }
                    t[i] = r;
                    dices[i].src = "img/d" + r + ".svg";
                }
            }
            e.disabled = true;
            currentThrow++;
        }
    }
    else {
        for (let i = 0; i < dices.length; i++) {
            visible[i] = true;
            dices[i].classList.remove('invisible');
        }
        t[0] = 2;
        dices[0].src = "img/d2.svg";
        t[1] = 3;
        dices[1].src = "img/d3.svg";
        t[2] = 3;
        dices[2].src = "img/d3.svg";
        t[3] = 4;
        dices[3].src = "img/d4.svg";
        t[4] = 5;
        dices[4].src = "img/d5.svg";
    }
}

// noinspection JSUnusedGlobalSymbols
function forceOn(n){
    for (let i = 0; i < dices.length; i++) {
        visible[i] = true;
        dices[i].classList.remove('invisible');
        t[i] = n;
        dices[i].src = "img/d"+n+".svg";
    }
}
function newGame(){
    currentThrow = 0;
    let buttons = document.getElementsByTagName("button");
    for(let i = 0; i < buttons.length; i++){
        buttons[i].disabled = false;
    }
    for(let i = 1; i <= 13; i++){
        document.getElementById("p"+i).innerText = "0";
    }

    document.getElementById("bonus").innerText = "0";
    points = 0;
    document.getElementById('points').innerText = "Score: 0";
    init();
    roll(document.getElementById("roll"));
}
function checkRemove(e){

    if(visible[e.id-1] === true && currentThrow < 3){
        visible[e.id-1] = false;
        document.getElementById(e.id).classList.add("invisible");
        document.getElementById("roll").disabled = false;
    }
}

let numPoints = 0;
function checkByNummer(e, n) {
    e.disabled = true;
    let c = 0;
    for(let i = 0; i < t.length; i++){
        if(t[i] === n){
            c+=t[i];
        }
    }
    document.getElementById("p"+n).innerText = c+"";
    numPoints += c;
    points += c;


    if(numPoints >= 63){
        if(!document.getElementById("bonus").innerText.endsWith("35")){
            points+=35;
            document.getElementById("bonus").innerText = "35";
        }
    }

    currentThrow = 0;
    document.getElementById('points').innerText = "Score: "+points;


    roll(document.getElementById('roll'));
}

function checkThreeSame(e){
    e.disabled = true;
    let threesame = false;

    for(let i = 0; i < t.length; i++){
        const result = t.filter(a => a === t[i]).length;
        if(result >= 3){
            threesame = true;
        }
    }

    if(threesame){
        let c = 0;
        for(let i = 0; i < t.length; i++)  c+= t[i];
        points+=c;
        document.getElementById("p7").innerText = c+"";
    }


    currentThrow = 0;
    document.getElementById('points').innerText = "Score: "+points;
    roll(document.getElementById('roll'));
}

function checkCaree(e){
    e.disabled = true;
    let fourofkind = false;

    for(let i = 0; i < t.length; i++){
        const result = t.filter(a => a === t[i]).length;
        if(result >= 4){
            fourofkind = true;
        }
    }

    if(fourofkind){
        let c = 0;
        for(let i = 0; i < t.length; i++)  c+= t[i];
        points+=c;
        document.getElementById("p8").innerText = c+"";
    }

    currentThrow = 0;
    document.getElementById('points').innerText = "Score: "+points;
    roll(document.getElementById('roll'));
}

function checkFullHouse(e){
    e.disabled = true;
    let threesame = false;
    let twosame = false;

    for(let i = 0; i < t.length; i++){
        const result = t.filter(a => a === t[i]).length;
        if(result === 2){
            threesame = true;
        }
        else if(result === 3){
            twosame = true;
        }
        else{}
    }

    if(threesame && twosame){
        points+=25;
        document.getElementById("p9").innerText = "25";
    }


    currentThrow = 0;
    document.getElementById('points').innerText = "Score: "+points;
    roll(document.getElementById('roll'));
}

function checkKlStraat(e){
    e.disabled = true;
    t.sort();
    let accept = false;
    let start = t[0];
    let c = 1;
    for(let i = 0; i < t.length; i++){
        const result = t.filter(a => a === i).length;
        if(result >= 2) t.splice(i-1,1);
    }
    for(let i = 0; i < t.length; i++) {
        if (t[i] === start + i) {
            accept = true;
            c++;
        }
    }


    if(accept && c >= 5){
        points+=30;
        document.getElementById("p10").innerText = "30";
    }

    currentThrow = 0;
    document.getElementById('points').innerText = "Score: "+points;
    roll(document.getElementById('roll'));
}

function checkGrStraat(e){
    e.disabled = true;
    t.sort();
    let accept = false;
    let c = 0;
    for(let i = 0; i < t.length; i++){

        if(t[0] === 1) {
            if (t[i] === i + 1) {
                accept = true;
                c++;
            }
        }
        else if(t[0] === 2){
            if(t[i] === i + 2){
                accept = true;
                c++;
            }
        }

    }

    if(accept && c === 5){
        points+=40;
        document.getElementById("p11").innerText = "40";
    }

    currentThrow = 0;
    document.getElementById('points').innerText = "Score: "+points;
    roll(document.getElementById('roll'));
}


function checkYahtzee(e){
    e.disabled = true;
    let allSame = false;

    for(let i = 0; i < t.length; i++){
        const result = t.filter(a => a === t[i]).length;
        if(result === 5){
            allSame = true;
        }
    }

    if(allSame){
        points+=50;
        document.getElementById("p12").innerText = "50";
    }


    currentThrow = 0;
    document.getElementById('points').innerText = "Score: "+points;
    roll(document.getElementById('roll'));
}
function checkChance(e){
    e.disabled = true;
    let c = 0;
    for(let i = 0; i < t.length; i++){
            c+=t[i];
    }
    document.getElementById("p13").innerText = ""+c;
    points += c;

    currentThrow = 0;
    document.getElementById('points').innerText = "Score: "+points;
    roll(document.getElementById('roll'));
}
