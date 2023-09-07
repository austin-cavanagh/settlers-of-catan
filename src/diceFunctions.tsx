import brigandAttack from "./Cards/event-dice/brigand-attack.png"
import celebration from "./Cards/event-dice/celebration.png"
import eventCard from "./Cards/event-dice/event-card.png"
import plentifulHarvest from "./Cards/event-dice/plentiful-harvest.png"
import trade from "./Cards/event-dice/trade.png"

import one from "./Cards/production-dice/one.png"
import two from "./Cards/production-dice/two.png"
import three from "./Cards/production-dice/three.png"
import four from "./Cards/production-dice/four.png"
import five from "./Cards/production-dice/five.png"
import six from "./Cards/production-dice/six.png"

export interface EventDie {
  name: string
  image: string
}

export const eventDice: EventDie[] = [
  { name: "brigand attack", image: brigandAttack },
  { name: "celebration", image: celebration },
  { name: "event card", image: eventCard },
  { name: "event card", image: eventCard },
  { name: "plentiful harvest", image: plentifulHarvest },
  { name: "trade", image: trade },
]

export interface ProductionDie {
  number: number
  image: string
}

export const productionDice: ProductionDie[] = [
  { number: 1, image: one },
  { number: 2, image: two },
  { number: 3, image: three },
  { number: 4, image: four },
  { number: 5, image: five },
  { number: 6, image: six },
]

export function productionRoll() {
  const index = Math.floor(Math.random() * 6)
  return productionDice[index]
}

export function eventRoll() {
  const index = Math.floor(Math.random() * 6)
  return eventDice[index]
}
