window.alert("Trabalho de Maiara grupo: Paulo Iago, Wilson Neto, Carlos Eduardo, Eduardo Araujo e Gustavo Felicio.");
console.log("Código feito por Iago ヅ");

const numbers = document.querySelectorAll('.numbers');
const result = document.querySelector('.result span');
const signs = document.querySelectorAll('.sign');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const negative = document.querySelector('.negative');
const comma = document.querySelector('.comma');
const percent= document.querySelector('.percent');

let firstValue = "";
let isFirstValue = false;
let secondValue = "";
let isSecondValue = false;
let currentSign = "";
let resultValue = 0;

// Configuração dos áudios
const audio = new Audio('./confetti.mp3'); // Áudio para o botão "="
const audio2 = new Audio('./partyhorn.mp3'); // Áudio para o botão "(:"

comma.addEventListener('click', () => {
    if (isFirstValue === false) {
        getFirstValue('.');
    } else {
        getSecondValue('.');
    }
});

numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        let atr = e.target.getAttribute('value');
        if (isFirstValue === false) {
            getFirstValue(atr);
        } else {
            getSecondValue(atr);
        }
    });
});

function getFirstValue(el) {
    if (!firstValue.toString().includes('.') || el !== '.') {
        if (firstValue.toString().replace(/,/g, '').length < 6) {
            firstValue += el;
            result.innerHTML = formatNumber(parseFloat(firstValue.replace(/,/g, '')));
            adjustFontSize(result);
        }
    }
}

function getSecondValue(el) {
    if (!secondValue.toString().includes('.') || el !== '.') {
        if (secondValue.toString().replace(/,/g, '').length < 6 && firstValue !== "" && currentSign !== "") {
            secondValue += el;
            result.innerHTML = formatNumber(parseFloat(secondValue.replace(/,/g, '')));
            adjustFontSize(result);
        }
    }
}

function getSign() {
    signs.forEach(signButton => {
        signButton.addEventListener('click', (e) => {
            if (firstValue && !isFirstValue) {
                currentSign = e.target.getAttribute('value');
                isFirstValue = true;
                result.innerHTML = formatNumber(parseFloat(firstValue.replace(/,/g, '')));
            }
        });
    });
}
getSign();

equals.addEventListener('click', () => {
    audio.play(); // Reproduz o áudio quando o botão "=" é clicado
    launchConfetti(); // Lança o confetti
    result.innerHTML = "";
    if (currentSign === "+") {
        resultValue = parseFloat(firstValue) + parseFloat(secondValue);
    } else if (currentSign === "-") {
        resultValue = parseFloat(firstValue) - parseFloat(secondValue);
    } else if (currentSign === "x") {
        resultValue = parseFloat(firstValue) * parseFloat(secondValue);
    } else if (currentSign === "/") {
        resultValue = parseFloat(firstValue) / parseFloat(secondValue);
    }
    result.innerHTML = formatNumber(resultValue);
    firstValue = resultValue.toString();
    secondValue = "";
    isFirstValue = false;
    checkResultLength();
});

negative.addEventListener('click', () => {
    result.innerHTML = "";
    if (firstValue !== "") {
        firstValue = (-parseFloat(firstValue)).toString();
        result.innerHTML = formatNumber(parseFloat(firstValue));
    }
});

clear.addEventListener('click', () => {
    result.innerHTML = 0;
    firstValue = "";
    isFirstValue = false;
    secondValue = "";
    isSecondValue = false;
    currentSign = "";
    resultValue = 0;
});

percent.addEventListener('click', () => {
    audio2.play(); // Reproduz o áudio quando o botão "(: é clicado
    launchConfetti2(); // Lança o confetti 2
});

function formatNumber(num) {
    return num.toLocaleString('pt-BR', { maximumFractionDigits: 5 });
}

function adjustFontSize(element) {
    const digitCount = element.innerHTML.replace(/,/g, '').length;
    if (digitCount > 8) {
        element.classList.add('small-font');
    } else {
        element.classList.remove('small-font');
    }
}

function launchConfetti() {
    const equalsButton = document.querySelector('.equals');
    const buttonRect = equalsButton.getBoundingClientRect();
    const x = (buttonRect.left + buttonRect.width / 2) / window.innerWidth;
    const y = (buttonRect.top + buttonRect.height / 2) / window.innerHeight;
    
    confetti({
        particleCount: 190,
        spread: 360,
        origin: { x, y },
        colors: ['#00FFFC', '#FC00FF', '#fffc00'],
        startVelocity: 18,
        gravity: 0.9,
        shapes: ['triangle', 'circle', 'square'],
        ticks: 50,
        scalar: 1.2,
    });
}

function launchConfetti2() {
    const percentButton = document.querySelector('.percent');
    const buttonRect = percentButton.getBoundingClientRect();
    const x = (buttonRect.left + buttonRect.width / 2) / window.innerWidth;
    const y = (buttonRect.top + buttonRect.height / 2) / window.innerHeight;
    
    const duration = 6 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        }));
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        }));
    }, 250);
}
