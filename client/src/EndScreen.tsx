interface Resources {
  [resource: string]: number
}

interface PayState {
  total: number
  cost: Resources
  possibleMoves: number[]
}

export function EndScreen({
  gameWinner,
  playerColor,
  turn,
  payState,
}: {
  gameWinner: string
  playerColor: string
  turn: string
  payState: PayState
}) {
  return (
    <>
      {gameWinner !== "" ? (
        <div className={`main-menu`}>
          <div className="menu-message">{`${gameWinner} Player Wins!`}</div>
          <button
            className="menu-button"
            onClick={() => {
              if (playerColor === turn && payState.possibleMoves.length === 0) {
                // restart function
              }
            }}
          >
            Restart
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </>
  )
}
