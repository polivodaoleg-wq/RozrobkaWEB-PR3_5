import Pokemon from './pokemon.js';
import { random, countClicks } from './utils.js';

const $btn = document.getElementById('btn-kick');
const $btnSuper = document.getElementById('btn-kick-super');
const $logs = document.getElementById('logs');

const character = new Pokemon({
    name: 'Pikachu',
    defaultHP: 100,
    selectors: 'character',
    selectorsName: 'character',
});

const enemy = new Pokemon({
    name: 'Charmander',
    defaultHP: 100,
    selectors: 'enemy',
    selectorsName: 'enemy',
});

const trackThunderJolt = countClicks(6);
const trackSuperKick = countClicks(6);

function generateLog(firstPerson, secondPerson, count) {
    const { name: firstName } = firstPerson;
    const { name: secondName, damageHP, defaultHP } = secondPerson;

    const logs = [
        `${firstName} вспомнил что-то важное, но неожиданно ${secondName}, не помня себя от испуга, ударил в предплечье врага. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} поперхнулся, и за это ${secondName} с испугу приложил прямой удар коленом в лоб врага. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} забылся, но в это время наглый ${secondName}, приняв волевое решение, неслышно подойдя сзади, ударил. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} пришел в себя, но неожиданно ${secondName} случайно нанес мощнейший удар. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} поперхнулся, но в то время ${secondName} нехотя раздробил кулаком <вырезанно цензурой> противника. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} удивился, а ${secondName} пошатнувшись влепил подлый удар. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} высморкался, но неожиданно ${secondName} провел дробящий удар. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} пошатнулся, и внезапно наглый ${secondName} беспричинно ударил в ногу противника. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} расстроился, как вдруг, неожиданно ${secondName} случайно влепил стопой в живот соперника. -${count}, [${damageHP}/${defaultHP}]`,
        `${firstName} пытался что-то сказать, но вдруг, неожиданно ${secondName} со скуки, разбил бровь сопернику. -${count}, [${damageHP}/${defaultHP}]`
    ];
    return logs[random(logs.length) - 1];
}

$btn.addEventListener('click', function () {
    const left = trackThunderJolt('Thunder Jolt');
    if (left < 0) {
        $btn.disabled = true;
        return;
    }
    console.log('Kick');
    const countCharacter = random(20);
    const countEnemy = random(20);
    character.changeHP(countCharacter);
    enemy.changeHP(countEnemy);
    
    const $p = document.createElement('p');
    $p.innerText = generateLog(character, enemy, countEnemy); 
    $logs.insertBefore($p, $logs.children[0]);

    if (character.damageHP === 0 || enemy.damageHP === 0) {
        $btn.disabled = true;
        if ($btnSuper) $btnSuper.disabled = true;
    }
});

if ($btnSuper) {
    $btnSuper.addEventListener('click', function () {
        const left = trackSuperKick('Super Attack');
        if (left < 0) {
            $btnSuper.disabled = true;
            return;
        }
        console.log('Super Kick');
        const countCharacter = random(35);
        const countEnemy = random(35);
        character.changeHP(countCharacter);
        enemy.changeHP(countEnemy);
        
        const $p = document.createElement('p');
        $p.innerText = generateLog(character, enemy, countEnemy); 
        $logs.insertBefore($p, $logs.children[0]);

        if (character.damageHP === 0 || enemy.damageHP === 0) {
            $btn.disabled = true;
            if ($btnSuper) $btnSuper.disabled = true;
        }
    });
}

function init() {
    console.log('Start Game!');
    character.renderHP();
    enemy.renderHP();
}

init();