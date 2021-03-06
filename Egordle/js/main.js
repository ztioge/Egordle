document.addEventListener("DOMContentLoaded", () => {
  createSquares();

  let guessedWords = [[]];
  let availableSpace = 1;
  let guessedWordCount = 0;

  let word="dairy"

  const keys = document.querySelectorAll(".keyboard-row button");

  //To know which word we are guessing
  function getCurrentWordArr(){
    const numberOfGuessedWords = guessedWords.length
    return guessedWords[numberOfGuessedWords - 1];
  }

  //To update the word we are currently guessing
  function updateGuessedWords(letter){
    const currentWordArr = getCurrentWordArr();

    if(currentWordArr && currentWordArr.length < 5){
      currentWordArr.push(letter);

      const availableSpaceEl = document.getElementById(String(availableSpace))
      availableSpace = availableSpace + 1;

      availableSpaceEl.textContent = letter;
    }
  }

  function getTileColor(letter, index)  {
    const isCorrectLetter = word.includes(letter)
    if (!isCorrectLetter) {
      return "rgb(58, 58, 60)";
    }

    const letterInThatPosition = word.charAt(index);
    const isCorrectPosition = (letter === letterInThatPosition);

    if (isCorrectPosition) {
      return "rgb(83, 141, 78)";
    }

    return "rgb(181, 159, 59)";
  }

  function  handleSubmitWord(){
    const currentWordArr = getCurrentWordArr();

    if(currentWordArr.length !== 5){
      window.alert("Word must be 5 letters");
    }

    const currentWord = currentWordArr.join("");

    //Intentar entender esta linea
    const firstLetterId = guessedWordCount * 5 + 1;
    const interval = 200;
    currentWordArr.forEach((letter, index) => {
      setTimeout(() => {
        const tileColor = getTileColor(letter, index);
        const letterId = firstLetterId + index;
        const letterEl = document.getElementById(letterId);
        letterEl.classList.add("animate__flipInX");
        letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
      }, interval * index)
    });

    guessedWordCount+=1


    if (currentWord === word) {
      window.alert("Congratulations");
    }

    if (guessedWords.length === 6) {
      window.alert(`Sorry you have no more guesses! The word is ${word}.`);
    }

    guessedWords.push([])
  }

  //Creates de board
  function createSquares()  {
    const gameBoard = document.getElementById("board");

    for (let index = 0; index < 30; index++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.classList.add("animate_animated");
      square.setAttribute("id", index + 1);
      gameBoard.appendChild(square);
    }
  }

  function handleDeleteLetter(){
      const currentWordArr = getCurrentWordArr();
      const removedLetter =  currentWordArr.pop();

      guessedWords[guessedWords.length - 1] = currentWordArr
      const lastLetterEl = document.getElementById(String(availableSpace - 1))
      lastLetterEl.textContent = ''
      availableSpace = availableSpace - 1;
  }


    for (let i = 0; i < keys.length; i++) {
      keys[i].onclick = ({target}) => {
        const letter = target.getAttribute("data-key");

        if(letter === 'enter'){
          handleSubmitWord();
          return;
        }

        if(letter === "del"){
          handleDeleteLetter();
          return;
        }

        updateGuessedWords(letter);
      };
    }


})
