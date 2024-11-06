import { useEffect, useState } from "react";
import styles from "./styles.module.css";

function App() {
  // tre' sa faci un Array cu useState
  // si acel array va tine tot continutul butoanelor adica '', 'X', '0'

  const [data, setData] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [gameEnded, setGameEnded] = useState(false);
  const [message, setMessage] = useState("");
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);

  const handleClick = (index) => {
    if (data[index] === "") {
      const arr = [...data];
      arr[index] = turn;
      setData(arr);
      setTurn((currentTurn) => invert(currentTurn));
    }
  };

  const invert = (symbol) => {
    return symbol === "X" ? "0" : "X";
  };

  const checkFilledArray = (data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === "") {
        return false;
      }
    }
    return true;
  };

  const checkRowsCondition = (data) => {
    if (data[0] !== "" && data[0] === data[1] && data[1] === data[2]) {
      return true;
    }
    if (data[3] !== "" && data[3] === data[4] && data[4] === data[5]) {
      return true;
    }
    if (data[6] !== "" && data[6] === data[7] && data[7] === data[8]) {
      return true;
    }
    return false;
  };

  const checkColumnsCondition = (data) => {
    if (data[0] !== "" && data[0] === data[3] && data[3] === data[6]) {
      return true;
    }
    if (data[1] !== "" && data[1] === data[4] && data[4] === data[7]) {
      return true;
    }
    if (data[2] !== "" && data[2] === data[5] && data[5] === data[8]) {
      return true;
    }
    return false;
  };

  const checkDiagonalsCondition = (data) => {
    if (data[0] !== "" && data[0] === data[4] && data[4] === data[8]) {
      return true;
    }
    if (data[2] !== "" && data[2] === data[4] && data[4] === data[6]) {
      return true;
    }
    return false;
  };

  // o functie ce primeste ca si parametru array-ul (data) adica ["X", "0", ....]
  // si trebuie sa returnezi true daca toate elementele sunt diferite de ""
  // false daca se gaseste macar unul gol

  useEffect(() => {
    if (checkRowsCondition(data)) {
      setGameEnded(true);
      setMessage(`Player ${invert(turn)} has won the game by matching a row!`);
      return;
    }
    if (checkColumnsCondition(data)) {
      setGameEnded(true);
      setMessage(
        `Player ${invert(turn)} has won the game by matching a column!`
      );
      return;
    }
    if (checkDiagonalsCondition(data)) {
      setGameEnded(true);
      setMessage(
        `Player ${invert(turn)} has won the game by matching a diagonal!`
      );
      return;
    }
    if (checkFilledArray(data)) {
      setGameEnded(true);
      setMessage(`It's a draw`);
      return;
    }
  }, [data, turn]);

  useEffect(() => {
    if (gameEnded) {
      if (turn === "X") {
        setOWins(oWins + 1);
      } else {
        setXWins(xWins + 1);
      }
      alert(message);
      setData(Array(9).fill(""));
    }
  }, [gameEnded, message]);


  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <h1>TicTacToe</h1>
        <p> X = {xWins}</p>
        <p>0 = {oWins}</p>
        <div className={styles.container}>
          {data.map((value, index) => (
            <button key={index} onClick={() => handleClick(index)}>
              {value}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
export default App;
