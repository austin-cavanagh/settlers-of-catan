interface Resources {
  [resource: string]: number
}

interface PayState {
  total: number
  cost: Resources
  possibleMoves: number[]
}

// export function StartScreen({
//   gameStarted,
//   playerColor,
//   turn,
//   payState,
//   startGame,
// }: {
//   gameStarted: boolean
//   playerColor: string
//   turn: string
//   payState: PayState
//   startGame: function startGame() {

//   }
// }) {
//   return (
//     <>
//       {gameStarted === false ? (
//         <div className={`main-menu`}>
//           <button
//             className="menu-button"
//             onClick={() => {
//               if (playerColor === turn && payState.possibleMoves.length === 0) {
//                 startGame()
//               }
//             }}
//           >
//             Start Game
//           </button>
//         </div>
//       ) : (
//         <div></div>
//       )}
//     </>
//   )
// }
