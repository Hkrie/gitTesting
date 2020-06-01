const a=[
    "a",

    "e",

    "i",
    "o",
    "u",

    "ka",
    "ke",
    "ki",
    "ko",
    "ku",

    "sa",
    "se",
    "shi",
    "so",
    "su",

    "ta",
    "te",
    "chi",
    "to",
    "tsu",

    "ha",
    "he",
    "hi",
    "ho",
    "fu",

    "na",
    "ne",
    "ni",
    "no",
    "nu",

    "ma",
    "me",
    "mi",
    "mo",
    "mu",

    "ya",
    "yu",
    "yo",

    "ra",
    "re",
    "ri",
    "ro",
    "ru",

    "wa",
    "we",
    "wi",
    "wo",
];
document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('btn_jVoc').addEventListener('click', () => {
        const element = document.getElementById('output1');
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        const elementSolution = document.getElementById('output1solutions');
        while (elementSolution.firstChild) {
            elementSolution.removeChild(elementSolution.firstChild);
        }
        document.getElementById('solution').classList.remove('show');


        for(let i = 0; i<10;i++){
            const out = document.createElement('li');
            const outSolution = document.createElement('li');

            out.classList.add('vocabular');
            outSolution.classList.add('vocabular');

            let rnd = Math.floor(Math.random()*47);
            out.innerHTML = a[rnd];
            outSolution.innerHTML = japaneseCharacters[rnd];

            document.getElementById('output1').appendChild(out);
            document.getElementById('output1solutions').appendChild(outSolution);
        }
    });


    document.getElementById('btn_jVocShow').addEventListener('click', () => {
        document.getElementById('solution').classList.add('show');
    });





});






