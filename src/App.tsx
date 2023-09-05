import { useEffect, useState } from "react"

import city from "./Cards/other/city-back.jpg"
import blueRoad from "./cards/blue-player/blue-road.jpg"
import blueSettlement from "./cards/blue-player/blue-settlement.jpg"

import {
  startCenterCards,
  CenterCard,
  RegionCard,
  startRegionCards,
  blueStartHand,
  redStartHand,
} from "./centerCards.tsx"

import {
  CardDefinition,
  blueStartingCards,
  redStartingCards,
} from "./startingCards.tsx"

import { diceRoll } from "./diceFunctions.tsx"

interface ResourceTracker {
  lumber: number
  gold: number
  grain: number
  brick: number
  wool: number
  ore: number
  skillPoints: number
  progressPoints: number
  commercePoints: number
  strengthPoints: number
  victoryPoints: number
}

const startingResources: ResourceTracker = {
  lumber: 1,
  gold: 0,
  grain: 1,
  brick: 1,
  wool: 1,
  ore: 1,
  skillPoints: 0,
  progressPoints: 0,
  commercePoints: 0,
  strengthPoints: 0,
  victoryPoints: 2,
}

interface OpenExpandTiles {
  left: OpenSpotsObject
  right: OpenSpotsObject
}

interface OpenSpotsObject {
  building: string
  index: number
}

const startingOpenExpandTiles: OpenExpandTiles = {
  left: { building: "road", index: 26 },
  right: { building: "road", index: 30 },
}

interface BuildMode {
  active: string
  buildingType: string
  possibleMoves: number[]
  victoryPoints: number
  image: string
}

const startBuildMode: BuildMode = {
  active: "",
  buildingType: "",
  possibleMoves: [],
  victoryPoints: 0,
  image: "",
}

interface BuildRegion {
  active: string
  buildSpots: number[]
  resourceType1: string | undefined
  diceNumber1: number | undefined
  image1: string | undefined
  resourceType2: string | undefined
  diceNumber2: number | undefined
  image2: string | undefined
}

const startBuildRegion: BuildRegion = {
  active: "",
  buildSpots: [],
  resourceType1: "",
  diceNumber1: 0,
  image1: "",
  resourceType2: "",
  diceNumber2: 0,
  image2: "",
}

const startColors: string[] = new Array(55).fill("transparent")

const startSettlements: number[] = [27, 29]

function App() {
  // cards setup
  const [centerCards, setCenterCards] = useState<CenterCard[]>(startCenterCards)

  // states for turns
  const [collectedCards, setCollectedCards] = useState({
    blue: false,
    red: false,
  })
  const [turn, setTurn] = useState<string>("blue")
  const [collectResources, setCollectResources] = useState<boolean>(false)

  // player cards
  const [blueHand, setBlueHand] = useState(blueStartHand)
  const [redHand, setRedHand] = useState(redStartHand)

  const [regionCards, setRegionCards] = useState<RegionCard[]>(startRegionCards)

  // red player
  const [blueColors, setBlueColors] = useState<string[]>(startColors)
  const [redColors, setRedColors] = useState<string[]>(startColors)
  const [buildMode, setBuildMode] = useState(startBuildMode)
  const [buildRegion, setBuildRegion] = useState(startBuildRegion)

  const [blueOpenExpandTiles, setBlueOpenExpandTiles] =
    useState<OpenExpandTiles>(startingOpenExpandTiles)
  const [redOpenExpandTiles, setRedOpenExpandTiles] = useState<OpenExpandTiles>(
    {
      left: { building: "road", index: 26 },
      right: { building: "road", index: 30 },
    }
  )
  const [blueSettlements, setBlueSettlements] =
    useState<number[]>(startSettlements)
  const [redSettlements, setRedSettlements] =
    useState<number[]>(startSettlements)

  const [blueResources, setBlueResources] =
    useState<ResourceTracker>(startingResources)
  const [redResources, setRedResources] =
    useState<ResourceTracker>(startingResources)

  const [blueCards, setBlueCards] =
    useState<CardDefinition[]>(blueStartingCards)
  const [redCards, setRedCards] = useState<CardDefinition[]>(redStartingCards)

  useEffect(() => {
    setBlueResources(blueResources => {
      const newResources: ResourceTracker = { ...blueResources }

      Object.keys(blueResources).forEach(resourceKey => {
        // typecast?
        const resource = resourceKey as keyof ResourceTracker

        // update victory, commerce, strength points
        if (
          resource === "victoryPoints" ||
          resource === "commercePoints" ||
          resource === "strengthPoints" ||
          resource === "progressPoints" ||
          resource === "skillPoints"
        ) {
          const newCount: number = blueCards.reduce((acc: number, currCard) => {
            return acc + currCard[resource]
          }, 0)
          newResources[resource] = newCount
        } else {
          // update resource points
          const newCount: number = blueCards.reduce((acc: number, currCard) => {
            if (resource === currCard.resourceType) {
              acc += currCard.resourceCount
            }
            return acc
          }, 0)
          newResources[resource] = newCount
        }
      })

      return newResources
    })

    setRedResources(redResources => {
      const newResources: ResourceTracker = { ...redResources }

      Object.keys(redResources).forEach(resourceKey => {
        // typecast?
        const resource = resourceKey as keyof ResourceTracker

        // update victory, commerce, strength points
        if (
          resource === "victoryPoints" ||
          resource === "commercePoints" ||
          resource === "strengthPoints" ||
          resource === "progressPoints" ||
          resource === "skillPoints"
        ) {
          const newCount: number = redCards.reduce((acc: number, currCard) => {
            return acc + currCard[resource]
          }, 0)
          newResources[resource] = newCount
        } else {
          // update resource points
          const newCount: number = redCards.reduce((acc: number, currCard) => {
            if (resource === currCard.resourceType) {
              acc += currCard.resourceCount
            }
            return acc
          }, 0)
          newResources[resource] = newCount
        }
      })

      return newResources
    })

    setBlueOpenExpandTiles(blueOpenExpandTiles => {
      const { left: leftTile, right: rightTile } = blueOpenExpandTiles
      let leftBuilding = leftTile.building
      let leftIndex = leftTile.index
      let rightBuilding = rightTile.building
      let rightIndex = rightTile.index

      // left side
      if (blueCards[leftIndex].image !== "" && leftIndex > 22) {
        leftIndex--
        leftBuilding = leftBuilding === "road" ? "settlement" : "road"
      }

      // right side
      if (blueCards[rightIndex].image !== "" && rightIndex < 32) {
        rightIndex++
        rightBuilding = rightBuilding === "road" ? "settlement" : "road"
      }

      // if index is 22 or 32 set building to none
      if (leftIndex <= 22) leftBuilding = "none"
      if (rightIndex >= 32) rightBuilding = "none"

      blueOpenExpandTiles.left.building = leftBuilding
      blueOpenExpandTiles.left.index = leftIndex
      blueOpenExpandTiles.right.building = rightBuilding
      blueOpenExpandTiles.right.index = rightIndex

      return blueOpenExpandTiles
    })

    setRedOpenExpandTiles(redOpenExpandTiles => {
      const { left: leftTile, right: rightTile } = redOpenExpandTiles
      let leftBuilding = leftTile.building
      let leftIndex = leftTile.index
      let rightBuilding = rightTile.building
      let rightIndex = rightTile.index

      // left side
      if (redCards[leftIndex].image !== "" && leftIndex > 22) {
        leftIndex--
        leftBuilding = leftBuilding === "road" ? "settlement" : "road"
      }

      // right side
      if (redCards[rightIndex].image !== "" && rightIndex < 32) {
        rightIndex++
        rightBuilding = rightBuilding === "road" ? "settlement" : "road"
      }

      // if index is 22 or 32 set building to none
      if (leftIndex <= 22) leftBuilding = "none"
      if (rightIndex >= 32) rightBuilding = "none"

      redOpenExpandTiles.left.building = leftBuilding
      redOpenExpandTiles.left.index = leftIndex
      redOpenExpandTiles.right.building = rightBuilding
      redOpenExpandTiles.right.index = rightIndex

      return redOpenExpandTiles
    })

    setBlueSettlements(blueSettlements => {
      const newArray: number[] = []
      blueCards.forEach((card, index) => {
        if (card.buildingType === "settlement") newArray.push(index)
      })
      return newArray
    })

    setRedSettlements(redSettlements => {
      const newArray: number[] = []
      redCards.forEach((card, index) => {
        if (card.buildingType === "settlement") newArray.push(index)
      })
      return newArray
    })
  }, [blueCards, redCards])

  function addResource(card: CardDefinition) {
    setBlueCards(cards => {
      return cards.map(currCard => {
        if (card === currCard) {
          if (currCard.rotation === currCard.maxRotation) {
            return card
          }
          currCard.resourceCount++
          return { ...currCard, rotation: currCard.rotation - 90 }
        }
        return currCard
      })
    })
  }

  function payResource(card: CardDefinition) {
    setBlueCards(cards => {
      return cards.map(currCard => {
        if (card === currCard) {
          if (currCard.rotation === currCard.minRotation) {
            return card
          }
          currCard.resourceCount--
          return { ...currCard, rotation: currCard.rotation + 90 }
        }
        return currCard
      })
    })
  }

  function selectedCenterCard(stack: CenterCard) {
    const building = stack.cardStack
    const cards = stack.cardsInStack
    // create new color array and set all colors to transparent
    const newColors = new Array(55).fill("transparent")

    // if stack is a road
    if (turn === "blue") {
      if (
        building === "road" &&
        (blueOpenExpandTiles.left.building === "road" ||
          blueOpenExpandTiles.right.building === "road")
      ) {
        // highlighting possible moves and tracking which tiles
        const possibleMoves: number[] = []
        if (building === blueOpenExpandTiles.left.building) {
          newColors[blueOpenExpandTiles.left.index] = "green"
          possibleMoves.push(blueOpenExpandTiles.left.index)
        }
        if (building === blueOpenExpandTiles.right.building) {
          newColors[blueOpenExpandTiles.right.index] = "green"
          possibleMoves.push(blueOpenExpandTiles.right.index)
        }
        setBuildMode(buildMode => {
          buildMode.active = turn
          buildMode.buildingType = building
          buildMode.possibleMoves = possibleMoves
          buildMode.victoryPoints = 0
          buildMode.image = blueRoad
          return buildMode
        })
      }
    }

    if (turn === "red") {
      if (
        building === "road" &&
        (redOpenExpandTiles.left.building === "road" ||
          redOpenExpandTiles.right.building === "road")
      ) {
        // highlighting possible moves and tracking which tiles
        const possibleMoves: number[] = []
        if (building === redOpenExpandTiles.left.building) {
          newColors[redOpenExpandTiles.left.index] = "green"
          possibleMoves.push(redOpenExpandTiles.left.index)
        }
        if (building === redOpenExpandTiles.right.building) {
          newColors[redOpenExpandTiles.right.index] = "green"
          possibleMoves.push(redOpenExpandTiles.right.index)
        }
        setBuildMode(buildMode => {
          buildMode.active = turn
          buildMode.buildingType = building
          buildMode.possibleMoves = possibleMoves
          buildMode.victoryPoints = 0
          buildMode.image = blueRoad
          return buildMode
        })
      }
    }

    // if stack is a settlement
    if (turn === "blue") {
      if (
        building === "settlement" &&
        (blueOpenExpandTiles.left.building === "settlement" ||
          blueOpenExpandTiles.right.building === "settlement")
      ) {
        // highlighting possible moves and tracking which tiles
        const possibleMoves: number[] = []
        if (building === blueOpenExpandTiles.left.building) {
          newColors[blueOpenExpandTiles.left.index] = "green"
          possibleMoves.push(blueOpenExpandTiles.left.index)
        }
        if (building === blueOpenExpandTiles.right.building) {
          newColors[blueOpenExpandTiles.right.index] = "green"
          possibleMoves.push(blueOpenExpandTiles.right.index)
        }
        setBuildMode(buildMode => {
          buildMode.active = turn
          buildMode.buildingType = building
          buildMode.possibleMoves = possibleMoves
          buildMode.victoryPoints = 1
          buildMode.image = blueSettlement
          return buildMode
        })
      }
    }

    if (turn === "red") {
      if (
        building === "settlement" &&
        (redOpenExpandTiles.left.building === "settlement" ||
          redOpenExpandTiles.right.building === "settlement")
      ) {
        // highlighting possible moves and tracking which tiles
        const possibleMoves: number[] = []
        if (building === redOpenExpandTiles.left.building) {
          newColors[redOpenExpandTiles.left.index] = "green"
          possibleMoves.push(redOpenExpandTiles.left.index)
        }
        if (building === redOpenExpandTiles.right.building) {
          newColors[redOpenExpandTiles.right.index] = "green"
          possibleMoves.push(redOpenExpandTiles.right.index)
        }
        setBuildMode(buildMode => {
          buildMode.active = turn
          buildMode.buildingType = building
          buildMode.possibleMoves = possibleMoves
          buildMode.victoryPoints = 1
          buildMode.image = blueSettlement
          return buildMode
        })
      }
    }

    // if stack is a city
    if (building === "city" && blueSettlements.length !== 0) {
      const possibleMoves: number[] = blueSettlements
      possibleMoves.forEach(move => {
        newColors[move] = "green"
      })
      setBuildMode(buildMode => {
        buildMode.active = turn
        buildMode.buildingType = building
        buildMode.possibleMoves = possibleMoves
        buildMode.victoryPoints = 2
        buildMode.image = city
        return buildMode
      })
    }

    if (turn === "blue") setBlueColors(newColors)
    if (turn === "red") setRedColors(newColors)
  }

  function buildCard(index: number) {
    // reset colors back to default
    const newColors = new Array(55).fill("transparent")

    // if the index is included in possible moves change card
    if (buildMode.possibleMoves.includes(index)) {
      if (turn === "blue") {
        setBlueCards(
          blueCards.map((card, currIndex) => {
            // if we find the card update it
            if (index === currIndex) {
              return {
                ...card,
                display: "yes",
                buildingType: buildMode.buildingType,
                victoryPoints: buildMode.victoryPoints,
                image: buildMode.image,
              }
            }
            // if not the card return card
            return card
          })
        )
      }

      if (turn === "red") {
        setRedCards(
          redCards.map((card, currIndex) => {
            // if we find the card update it
            if (index === currIndex) {
              return {
                ...card,
                display: "yes",
                buildingType: buildMode.buildingType,
                victoryPoints: buildMode.victoryPoints,
                image: buildMode.image,
              }
            }
            // if not the card return card
            return card
          })
        )
      }

      // if building settlement we must also place 2 region cards
      if (buildMode.buildingType === "settlement") {
        // get 2 regions from top of region card stack
        const regionCard1: RegionCard | undefined = regionCards.shift()
        const regionCard2: RegionCard | undefined = regionCards.shift()

        setRegionCards(regionCards)

        // check if regions go on left or right
        let direction = blueCards[index - 2].display === "no" ? "left" : "right"
        let moves: number[] = []
        if (direction === "left") {
          moves.push(index - 12)
          moves.push(index + 10)
        }
        if (direction === "right") {
          moves.push(index - 10)
          moves.push(index + 12)
        }

        if (turn === "blue") {
          setBlueCards(blueCards => {
            blueCards[moves[0]].buildingType = regionCard1?.buildingType
            blueCards[moves[0]].resourceType = regionCard1?.resourceType
            blueCards[moves[0]].diceNumber = regionCard1?.diceNumber
            blueCards[moves[0]].image = regionCard1?.image

            blueCards[moves[1]].buildingType = regionCard2?.buildingType
            blueCards[moves[1]].resourceType = regionCard2?.resourceType
            blueCards[moves[1]].diceNumber = regionCard2?.diceNumber
            blueCards[moves[1]].image = regionCard2?.image
            return blueCards
          })
        }

        if (turn === "red") {
          setRedCards(redCards => {
            redCards[moves[0]].buildingType = regionCard1?.buildingType
            redCards[moves[0]].resourceType = regionCard1?.resourceType
            redCards[moves[0]].diceNumber = regionCard1?.diceNumber
            redCards[moves[0]].image = regionCard1?.image

            redCards[moves[1]].buildingType = regionCard2?.buildingType
            redCards[moves[1]].resourceType = regionCard2?.resourceType
            redCards[moves[1]].diceNumber = regionCard2?.diceNumber
            redCards[moves[1]].image = regionCard2?.image
            return redCards
          })
        }
      }
    }

    // turn off build mode and reset variables
    setBuildMode(buildMode => {
      buildMode.active = ""
      buildMode.buildingType = ""
      buildMode.possibleMoves = []
      buildMode.victoryPoints = 0
      buildMode.image = ""
      return buildMode
    })

    // set colors
    if (turn === "blue") setBlueColors(newColors)
    if (turn === "red") setRedColors(newColors)
  }

  function endTurn() {
    setTurn(turn => {
      return turn === "blue" ? "red" : "blue"
    })
  }

  function startGame() {}

  console.log("red", redOpenExpandTiles)
  console.log("blue", blueOpenExpandTiles)

  return (
    <>
      <div className="window">
        <div className="player-hand">
          <div className="card blue"></div>
          <div className="card blue"></div>
          <div className="card blue"></div>
        </div>

        <div className="board">
          {/* red board */}
          <div className="player-board rotate">
            {redCards.map((card: CardDefinition, index: number) => {
              if (card.type === "region") {
                return (
                  <div
                    className="card red"
                    key={index}
                    style={{
                      backgroundImage: `url(${card.image})`,
                      transform: `rotate(${card.rotation}deg)`,
                      outline: `5px solid ${redColors[index]}`,
                    }}
                  ></div>
                )
              }

              return (
                <div
                  className="card red"
                  key={index}
                  onClick={() => {
                    if (buildMode.active === "red") buildCard(index)
                  }}
                  style={{
                    backgroundImage: `url(${card.image})`,
                    outline: `5px solid ${redColors[index]}`,
                  }}
                >
                  {` ${card.index} ${card.type}`}
                </div>
              )
            })}
          </div>

          {/* center cards */}
          <div className="centerCards">
            {centerCards.map((stack, index) => {
              return (
                <div
                  className="card noBackground"
                  key={index}
                  style={{ backgroundImage: `url(${stack.image})` }}
                  onClick={() => {
                    if (!buildRegion.active) selectedCenterCard(stack)
                  }}
                ></div>
              )
            })}
          </div>

          {/* blue board */}
          <div className="player-board rotate">
            {blueCards.map((card: CardDefinition, index: number) => {
              if (card.type === "region") {
                return (
                  <div
                    className="card"
                    key={index}
                    style={{
                      backgroundImage: `url(${card.image})`,
                      transform: `rotate(${card.rotation}deg)`,
                      outline: `5px solid ${blueColors[index]}`,
                    }}
                  ></div>
                )
              }

              return (
                <div
                  className="card"
                  key={index}
                  onClick={() => {
                    if (buildMode.active === "blue") buildCard(index)
                  }}
                  style={{
                    backgroundImage: `url(${card.image})`,
                    outline: `5px solid ${blueColors[index]}`,
                  }}
                >
                  {` ${card.index} ${card.type}`}
                </div>
              )
            })}
          </div>
        </div>

        <div className="statsBar">
          <div className="resourceTracker">
            <div className="resource">{`Turn: ${turn}`}</div>
            <div className="resource">{`Brick: ${blueResources.brick}`}</div>
            <div className="resource">{`Gold: ${blueResources.gold}`}</div>
            <div className="resource">{`Grain: ${blueResources.grain}`}</div>
            <div className="resource">{`Lumber: ${blueResources.lumber}`}</div>
            <div className="resource">{`Ore: ${blueResources.ore}`}</div>
            <div className="resource">{`Wool: ${blueResources.wool}`}</div>
            <div className="resource">{`Victory Points: ${blueResources.victoryPoints}`}</div>
            <div className="resource">{`Commerce Points: ${blueResources.commercePoints}`}</div>
            <div className="resource">{`Strength Points: ${blueResources.strengthPoints}`}</div>
            <div className="resource">{`Progress Points: ${blueResources.progressPoints}`}</div>
            <div className="resource">{`Skill Points: ${blueResources.skillPoints}`}</div>
          </div>
          <button className="end-turn">Start Game</button>
          <button className="end-turn" onClick={endTurn}>
            End Turn
          </button>
          <button className="end-turn" onClick={diceRoll}>
            Roll Dice
          </button>
        </div>
      </div>
    </>
  )
}

export default App
