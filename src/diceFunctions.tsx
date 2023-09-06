export const eventDice = [
  "brigand attack",
  "trade",
  "plentiful harvest",
  "celebration",
  "event card",
  "event card",
]

export function diceRoll() {
  return Math.ceil(Math.random() * 6)
}
