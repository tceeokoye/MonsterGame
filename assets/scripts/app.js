const ATTACK_VALUE =10;
const MONSTER_ATTACK_VALUE = 14
const STRONG_ATTACK_VALUE =17
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK"
const MODE_STRONG_ATTACK = "STRONG_ATTACK"
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";


let battleLog = [];

function getMAxLifeValue(){
    const enteredValue = prompt("Maximium life for you and the monster", "100");


   const parsedValue = parseInt(enteredValue);
   if (isNaN(parsedValue) || parsedValue <= 0){
      throw {message: "invalid user inpute, not a number"};
    }
return parsedValue;
}  

let chosenMaxLife;
try{ 
    chosenMaxLife = getMAxLifeValue();
}   catch (error){
    console.log(error);
    chosenMaxLife = 100;
    alert("you entered something wrong so defult value of 100 was used!")
}



// const enteredValue = prompt("Maximium life for you and the monster", "100");


// let chosenMaxLife = parseInt(enteredValue);
// let battleLog = [];

// if (isNaN(chosenMaxLife) || chosenMaxLife <= 0){
//     chosenMaxLife = 100;
// }

//let chosenMaxLife =100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife)

function writeToLog (ev, val, monsterHealth, playerHealth){
    let logEntry;
    switch (ev){
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry = {
                event: ev,
                value: val,
                target: "MONSTER",
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth,
            };
            break;
        case LOG_EVENT_PLAYER_STRONG_STRONG_ATTACK:
            logEntry = {
                event: ev,
                value: val,
                target: "MONSTER",
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth,
            };
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry ={
                event: ev,
                value: val,
                target: "PLAYER",
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth,   
            }
            break;
        case LOG_EVENT_PLAYER_HEAL:
            logEntry ={
                event: ev,
                value: val,
                target: "PLAYER",
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth,   
            }
            break;
        case LOG_EVENT_GAME_OVER:
            logEntry ={
                event: ev,
                value: val,
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth,   
            }
            break;
            default:
                logEntry = {};
       
       
    }

//     if(ev === LOG_EVENT_PLAYER_ATTACK){
//         logEntry = {
//             event: ev,
//             value: val,
//             target: "MONSTER",
//             finalMonsterHealth: monsterHealth,
//             finalPlayerHealth: playerHealth,
//         };
       
//     }
//     else if (ev === LOG_EVENT_PLAYER_STRONG_STRONG_ATTACK) {
//         logEntry ={
//             event: ev,
//             value: val,
//             target: "MONSTER",
//             finalMonsterHealth: monsterHealth,
//             finalPlayerHealth: playerHealth,   
//         }
       
//     }
//     else if (ev === LOG_EVENT_MONSTER_ATTACK){
//         logEntry ={
//             event: ev,
//             value: val,
//             target: "PLAYER",
//             finalMonsterHealth: monsterHealth,
//             finalPlayerHealth: playerHealth,   
//         }
       
//     }
//     else if (ev === LOG_EVENT_PLAYER_HEAL) {
//         logEntry ={
//             event: ev,
//             value: val,
//             target: "PLAYER",
//             finalMonsterHealth: monsterHealth,
//             finalPlayerHealth: playerHealth,   
//         }
        
//     }
//     else if(ev ===LOG_EVENT_GAME_OVER){
//         logEntry ={
//             event: ev,
//             value: val,
//             finalMonsterHealth: monsterHealth,
//             finalPlayerHealth: playerHealth,   
//         }
   
//     }
   battleLog.push(logEntry);

 }

function reset(value){
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife)
}

function endRound(){
    const initialPlayerHealth = currentPlayerHealth;
    const PlayerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -=PlayerDamage
    writeToLog(LOG_EVENT_MONSTER_ATTACK, 
        PlayerDamage, 
        currentMonsterHealth, 
        currentPlayerHealth);
    if(currentPlayerHealth <=0 && hasBonusLife === true){
        hasBonusLife = false;
        removeBonusLife;
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth)
        alert("bonus life saved you");
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert("You WON!");
        writeToLog(
            LOG_EVENT_GAME_OVER, 
            "PLAYER WON",
            currentMonsterHealth, 
            currentPlayerHealth);
    } else if (currentPlayerHealth <=0 && currentMonsterHealth >0){
        alert ("you lost");
        writeToLog(
            LOG_EVENT_GAME_OVER, 
            "MONSTER WON",
            currentMonsterHealth, 
            currentPlayerHealth);
    }
    else if (currentMonsterHealth <=0 && currentPlayerHealth <=0){
        alert ("Draw")
        writeToLog(
            LOG_EVENT_GAME_OVER, 
            "A DRAW",
            currentMonsterHealth, 
            currentPlayerHealth);
    }
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0 || 
        currentPlayerHealth <=0 && currentMonsterHealth >0 ||
        currentMonsterHealth <=0 && currentPlayerHealth <=0 ){
        reset(chosenMaxLife)
    }
}

function attachMonster (mode) {
    const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE: STRONG_ATTACK_VALUE;
    const logEvent = mode === MODE_ATTACK 
    ? LOG_EVENT_PLAYER_ATTACK
    : LOG_EVENT_PLAYER_STRONG_STRONG_ATTACK;
   // if (mode === MODE_ATTACK){
    //    maxDamage = ATTACK_VALUE;
   //     logEvent = LOG_EVENT_PLAYER_ATTACK
   // } else if (mode === MODE_STRONG_ATTACK){
   //     maxDamage = STRONG_ATTACK_VALUE;
   //     logEvent = LOG_EVENT_PLAYER_STRONG_STRONG_ATTACK;
   // }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -=damage;
    writeToLog(
        logEvent, 
        damage,
        currentMonsterHealth, 
        currentPlayerHealth);
    endRound() 
}

function attackHandler() {
    attachMonster("ATTACK")
}

function strongAttackHandler(){
    attachMonster ("STRONG_ATTACK")
}

function healPlayerHandler(){
    let healValue;
    if(currentPlayerHealth >=chosenMaxLife - HEAL_VALUE){
        alert ("you can't heal more than your max initial health")
        healValue = chosenMaxLife - HEAL_VALUE
    } else{
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(
        LOG_EVENT_PLAYER_HEAL, 
        healValue,
        currentMonsterHealth, 
        currentPlayerHealth);
    endRound()
}

function printLogHandler(){
 // types of loop
 // 1. for loop
    // for (let i = 10; i>0; i--){
    //     console.log(i);
    // }
    
    // 1b for (let i =0; i < battleLog.length; i++){
    //     console.log(battleLog[i]);
    // }
    // 2. let j = 0;
    // while(j<3){
    //     console.log("------")
    //     j++;
    // }
 // console.log(battleLog)
 // 3. for of loop
//  let i =0;
//  for (const logEntry of battleLog){
//     console.log(logEntry);
//     console.log(i)
//     i++;
 //}

// . for in loop
let i =0;
 for (const logEntry of battleLog){
    console.log(`#${i}`);
    for (const key in logEntry){
        console.log(key);
        console.log(logEntry[key]);
    }
    i++
 }
}


attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);