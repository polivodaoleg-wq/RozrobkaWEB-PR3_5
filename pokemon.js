class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({ name, defaultHP, selectors, selectorsName }) {
        super(selectorsName);
        this.name = name;
        this.defaultHP = defaultHP;
        this.damageHP = defaultHP;
        this.selectors = selectors;
    }

    renderHP = function () {
        this.renderHPText();
        this.renderProgressbarHP();
    }

    renderHPText = function () {
        const { damageHP, defaultHP, elHP } = this;
        elHP.innerText = `${damageHP} / ${defaultHP}`;
    }

    renderProgressbarHP = function () {
        const { damageHP, elProgressbar } = this;
        elProgressbar.style.width = `${damageHP}%`;
    }

    changeHP = function (count, cb) {
        if (this.damageHP < count) {
            this.damageHP = 0;
            alert(`Бідний ${this.name} програв бій!`);
        } else {
            this.damageHP -= count;
        }
        this.renderHP();

        if (typeof cb === 'function') {
            cb();
        }
    }
}

export default Pokemon;