export default function Keyboard({ onKey, usedKeys = {} }) {
  const rows = [
    "QWERTYUIOP".split(""),
    "ASDFGHJKL".split(""),
    ["Enter", ..."ZXCVBNM".split(""), "Backspace"]
  ];

  const getKeyColor = (key) => {
    if (!usedKeys[key]) return "bg-gray-300 dark:bg-gray-600";
    switch (usedKeys[key]) {
      case "correct":
        return "bg-green-500 dark:bg-green-600 text-white";
      case "present":
        return "bg-yellow-500 dark:bg-yellow-600 text-white";
      case "absent":
        return "bg-gray-500 dark:bg-gray-700 text-white";
      default:
        return "bg-gray-600 dark:bg-gray-600";
    }
  };

  const getKeySize = (key) => {
    if (key === "Enter" || key === "Backspace") return "px-3 text-xs sm:text-sm";
    return "px-2 sm:px-3";
  };

  return (
    <div className="mt-3 w-full max-w-lg mx-auto">
      {rows.map((row, i) => (
        <div key={i} className="flex justify-center mb-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKey(key)}
              className={`
                ${getKeyColor(key)}
                ${getKeySize(key)}
                py-4 mx-1 rounded font-bold text-sm sm:text-base
                transition-colors duration-200
                hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400
                active:scale-95
              `}
            >
              {key === "Backspace" ? (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z" 
                    clipRule="evenodd" 
                  />
                </svg>
              ) : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}