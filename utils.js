export function random(num) {
    return Math.ceil(Math.random() * num);
}

export function countClicks(maxLimit = 6) {
    let count = 0;
    return function (btnName) {
        count++;
        const leftClicks = maxLimit - count;
        console.log(`Кнопка "${btnName}" натиснута. Загалом кліків: ${count}`);

        if (leftClicks > 0) {
            console.log(`Залишилось натискань: ${leftClicks}`);
        } else {
            console.log(`Ліміт натискань "${btnName}" вичерпано!`);
        }
        return leftClicks;
    };
}