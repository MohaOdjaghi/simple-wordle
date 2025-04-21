let selectedWord = "";
let wordLength = 0;
let words = [];

function loadWords() {
  fetch('words.json')
    .then(res => res.json())
    .then(data => {
      words = data.words.filter(word => word.length >= 4 && word.length <= 7);
      startGame();
    })
    .catch(err => console.error("Error loading words:", err));
}

function getRandomWord() {
  const index = Math.floor(Math.random() * words.length);
  return words[index];
}

function displayWordInfo(word) {
  wordLength = word.length;
  document.getElementById("word-length").innerText = Word length: ${wordLength};
  document.getElementById("first-letter").innerText = First letter: ${word[0].toUpperCase()};
}

function checkGuess() {
  const input = document.getElementById("guess");
  const guess = input.value.trim().toLowerCase();
  if (guess.length !== wordLength) {
    alert("Guess must match the word length.");
    return;
  }

  let feedback = "";
  for (let i = 0; i < wordLength; i++) {
    if (guess[i] === selectedWord[i]) {
      feedback += <span class="correct">${guess[i]}</span>;
    } else if (selectedWord.includes(guess[i])) {
      feedback += <span class="wrong-position">${guess[i]}</span>;
    } else {
      feedback += <span class="wrong">${guess[i]}</span>;
    }
  }

  document.getElementById("feedback").innerHTML = feedback;
  input.value = "";
}

function startGame() {
  selectedWord = getRandomWord();
  displayWordInfo(selectedWord);
}

document.getElementById("submit").addEventListener("click", checkGuess);

loadWords();