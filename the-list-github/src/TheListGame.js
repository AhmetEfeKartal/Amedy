import React, { useState } from "react";

const TARGET_LIST = ["Bangkok", "London", "Paris", "Dubai", "Singapore"];
const MAX_ATTEMPTS = 6;
const LIST_LENGTH = 5;

const getFeedback = (guess, target) => {
  return guess.map((item, index) => {
    if (item.toLowerCase() === target[index].toLowerCase()) return "green";
    if (target.some(t => t.toLowerCase() === item.toLowerCase())) return "yellow";
    return "gray";
  });
};

export default function TheListGame() {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState(Array(LIST_LENGTH).fill(""));
  const [feedbacks, setFeedbacks] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const handleChange = (value, index) => {
    const newGuess = [...currentGuess];
    newGuess[index] = value;
    setCurrentGuess(newGuess);
  };

  const handleSubmit = () => {
    if (currentGuess.some(item => item.trim() === "")) return;
    const feedback = getFeedback(currentGuess, TARGET_LIST);
    setGuesses([...guesses, currentGuess]);
    setFeedbacks([...feedbacks, feedback]);
    setCurrentGuess(Array(LIST_LENGTH).fill(""));
    if (
      feedback.every(f => f === "green") ||
      guesses.length + 1 === MAX_ATTEMPTS
    ) {
      setGameOver(true);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">The List</h1>
      <p className="mb-4">Guess the top 5 most visited cities in the world.</p>

      {guesses.map((guess, i) => (
        <div key={i} className="flex space-x-2 mb-2">
          {guess.map((item, j) => (
            <div
              key={j}
              className={\`flex-1 p-2 border rounded text-center capitalize font-medium \${feedbacks[i][j] === "green" ? "bg-green-400" : feedbacks[i][j] === "yellow" ? "bg-yellow-300" : "bg-gray-300"}\`}
            >
              {item}
            </div>
          ))}
        </div>
      ))}

      {!gameOver && (
        <div className="flex space-x-2 mb-4">
          {currentGuess.map((item, index) => (
            <input
              key={index}
              value={item}
              onChange={e => handleChange(e.target.value, index)}
              className="flex-1 p-2 border rounded"
              placeholder={\`#\${index + 1}\`}
            />
          ))}
        </div>
      )}

      {!gameOver && (
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Guess
        </button>
      )}

      {gameOver && (
        <div className="mt-4 font-semibold text-lg">
          Game Over! The correct list was: {TARGET_LIST.join(", ")}
        </div>
      )}
    </div>
  );
}