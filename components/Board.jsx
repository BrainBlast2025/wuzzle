import Tile from "./Tile";

export default function Board({ guesses, currentGuess, targetWord }) {
  const getStatus = (letter, index, word, isCurrentGuess) => {
    if (!letter || !word || word.length !== 5 || isCurrentGuess) return "";
    if (letter === targetWord[index]) return "correct";
    if (targetWord.includes(letter)) return "present";
    return "absent";
  };

  // Calculate empty rows needed (total 6 rows - completed guesses - current guess row)
  const emptyRows = 6 - guesses.length - (currentGuess ? 1 : 0);

  return (
    <div className="grid gap-2 mb-4 w-full max-w-xs sm:max-w-md mx-auto">
      {/* Completed guesses */}
      {guesses.map((word, rowIndex) => (
        <div key={rowIndex} className="flex gap-2 justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Tile
              key={i}
              letter={word?.[i] || ""}
              status={getStatus(word?.[i], i, word, false)}
              position={rowIndex * 5 + i}
            />
          ))}
        </div>
      ))}
      
      {/* Current guess row (only show if game is still playing) */}
      {currentGuess && guesses.length < 6 && (
        <div className="flex gap-2 justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Tile
              key={i}
              letter={currentGuess?.[i] || ""}
              status={getStatus(currentGuess?.[i], i, currentGuess, true)}
              position={guesses.length * 5 + i}
            />
          ))}
        </div>
      )}

      {/* Empty rows (only show if game is still playing) */}
      {emptyRows > 0 && Array.from({ length: emptyRows }).map((_, rowIndex) => (
        <div key={`empty-${rowIndex}`} className="flex gap-2 justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Tile
              key={i}
              letter=""
              status=""
            />
          ))}
        </div>
      ))}
    </div>
  );
}