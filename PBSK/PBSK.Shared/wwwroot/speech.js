window.speakText = function (text) {
    if (!text || !('speechSynthesis' in window)) {
        return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
};

const numberToString = {
    3: 'threes',
    4: 'fours',
    5: 'fives',
    6: 'sixes',
    7: 'sevens',
    8: 'eights',
    9: 'nines',
    10: 'tens',
    11: 'elevens'
};

window.speakScore = function (scoreText, playTill, winByTwo) {
    const scorePart = String(scoreText).split('.')[0];
    const scoreValues = scorePart.match(/\d+/g) || [];

    if (scoreValues.length < 3) {
        window.speakText(scoreText);
        return;
    }

    const score1 = Number(scoreValues[0]);
    const score2 = Number(scoreValues[1]);
    const serverNumber = Number(scoreValues[2]);

    let speech = getSpecialScoreSpeech(score1, score2, serverNumber);

    if (!speech) {
        speech = `${score1} ${score2} ${serverNumber}`;
    }

    if (isAboutToWin(score1, score2, Number(playTill), Boolean(winByTwo))) {
        speech += ' Game point.';
    }

    const serverText = String(scoreText).split('.')[1];
    if (serverText) {
        speech += `. ${serverText.trim()}`;
    }

    window.speakText(speech);
};

function getSpecialScoreSpeech(score1, score2, serverNumber) {
    if (score1 === 1 && score2 === 1 && serverNumber === 1) {
        return 'Ones';
    }
    if (score1 === 1 && score2 === 1 && serverNumber === 2) {
        return 'Ones on a 2';
    }
    if (score1 === 1 && score2 === 0 && serverNumber === 1) {
        return '1 0 1, class is in session';
    }
    if (score1 === 2 && score2 === 2 && serverNumber === 2) {
        return 'Twos';
    }
    if (score1 === 3 && score2 === 2 && serverNumber === 1) {
        return '3 2 1, blast off';
    }
    if (score1 === 2 && score2 === 2 && serverNumber === 1) {
        return 'Twos on a 1';
    }
    if (score1 > 2 && score1 === score2 && score1 <= 11) {
        return `${numberToString[score1] || score1} on a ${serverNumber}`;
    }
    if (score1 === 4 && score2 === 1 && serverNumber === 1) {
        return 'What is the 4 1 1, its';
    }
    if (score1 === 9 && score2 === 1 && serverNumber === 1) {
        return '9 1 1, what is your emergency, the emergency is';
    }
    if (score1 === 10 && score2 === 4) {
        return `10 4, over and out on a ${serverNumber}`;
    }
    if (score1 === 9 && score2 === 5) {
        return `Working 9 to 5 on a ${serverNumber}`;
    }

    return '';
}

function isAboutToWin(score1, score2, playTill, winByTwo) {
    return score1 + 1 === playTill && (!winByTwo || score1 - score2 >= 2);
}

let globalKeyHandler;

window.registerGlobalKeyHandler = function (dotNetHelper) {
    window.unregisterGlobalKeyHandler();

    globalKeyHandler = function (event) {
        const target = event.target;
        const isHandledByHome = target instanceof Element && target.closest('.home-page');
        const isEditing = target instanceof Element &&
            target.closest('input, textarea, select, button, [contenteditable="true"]');

        if (isHandledByHome || isEditing) {
            return;
        }

        const supportedKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Spacebar'];
        if (supportedKeys.includes(event.key)) {
            event.preventDefault();
            dotNetHelper.invokeMethodAsync('HandleGlobalKeyDown', event.key);
        }
    };

    document.addEventListener('keydown', globalKeyHandler);
};

window.unregisterGlobalKeyHandler = function () {
    if (globalKeyHandler) {
        document.removeEventListener('keydown', globalKeyHandler);
        globalKeyHandler = undefined;
    }
};
