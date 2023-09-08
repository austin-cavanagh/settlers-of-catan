import { CardDefinition } from "./startingCards"

export function boostedRegion(playerCards: CardDefinition[]) {
  const boostedRegions: number[] = []
  const leftRegions = [11, 33]
  const rightRegions = [21, 43]
  const middleRegions = [13, 15, 17, 19, 35, 37, 39, 41]

  playerCards.forEach((card, index) => {
    if (leftRegions.includes(index) && card.display === "yes") {
      console.log(index)
      if (card.resourceType === playerCards[index + 1].resourceMultiplyer) {
        boostedRegions.push(index)
      }
    }

    if (rightRegions.includes(index) && card.display === "yes") {
      if (card.resourceType === playerCards[index - 1].resourceMultiplyer) {
        boostedRegions.push(index)
      }
    }

    if (middleRegions.includes(index) && card.display === "yes") {
      if (card.resourceType === playerCards[index + 1].resourceMultiplyer) {
        boostedRegions.push(index)
      }

      if (card.resourceType === playerCards[index - 1].resourceMultiplyer) {
        boostedRegions.push(index)
      }
    }
  })

  return boostedRegions
}
