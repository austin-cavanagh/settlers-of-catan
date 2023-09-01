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
  active: boolean
  buildingType: string
  possibleMoves: number[]
  victoryPoints: number
  image: string
}

const startBuildMode: BuildMode = {
  active: false,
  buildingType: "",
  possibleMoves: [],
  victoryPoints: 0,
  image: "",
}

interface BuildRegion {
  active: boolean
  buildSpots: number[]
  resourceType1: string | undefined
  diceNumber1: number | undefined
  image1: string | undefined
  resourceType2: string | undefined
  diceNumber2: number | undefined
  image2: string | undefined
}

const startBuildRegion: BuildRegion = {
  active: false,
  buildSpots: [],
  resourceType1: "",
  diceNumber1: 0,
  image1: "",
  resourceType2: "",
  diceNumber2: 0,
  image2: "",
}

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
  const [buildMode, setBuildMode] = useState(startBuildMode)
  const [buildRegion, setBuildRegion] = useState(startBuildRegion)

  // player cards
  const [blueHand, setBlueHand] = useState(blueStartHand)
  const [redHand, setRedHand] = useState(redStartHand)

  // blue player
  const [blueCards, setBlueCards] =
    useState<CardDefinition[]>(blueStartingCards)
  const [blueResources, setBlueResources] =
    useState<ResourceTracker>(startingResources)
  const [blueOpenExpandTiles, setBlueOpenExpandTiles] =
    useState<OpenExpandTiles>(startingOpenExpandTiles)
  const [blueSettlements, setBlueSettlements] = useState<number[]>([27, 29])

  // red player
  const [redCards, setRedCards] = useState<CardDefinition[]>(redStartingCards)

  const [colors, setColors] = useState<string[]>(
    new Array(55).fill("transparent")
  )

  // variable that tells me if I am building
  // store which card I clicked to build - I think the card already checks if i can build it
  // and which tiles I can actually click on that are valid places to go
  // region card stack and building regions
  const [regionCards, setRegionCards] = useState<RegionCard[]>(startRegionCards)

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

    setBlueSettlements(blueSettlements => {
      const newArray: number[] = []
      blueCards.forEach((card, index) => {
        if (card.buildingType === "settlement") newArray.push(index)
      })
      return newArray
    })
  }, [blueCards])

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
        buildMode.active = true
        buildMode.buildingType = building
        buildMode.possibleMoves = possibleMoves
        buildMode.victoryPoints = 0
        buildMode.image = blueRoad
        return buildMode
      })
    }

    // if stack is a settlement
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
        buildMode.active = true
        buildMode.buildingType = building
        buildMode.possibleMoves = possibleMoves
        buildMode.victoryPoints = 1
        buildMode.image = blueSettlement
        return buildMode
      })
    }

    // if stack is a city
    if (building === "city" && blueSettlements.length !== 0) {
      const possibleMoves: number[] = blueSettlements
      possibleMoves.forEach(move => {
        newColors[move] = "green"
      })
      setBuildMode(buildMode => {
        buildMode.active = true
        buildMode.buildingType = building
        buildMode.possibleMoves = possibleMoves
        buildMode.victoryPoints = 2
        buildMode.image = city
        return buildMode
      })
    }

    setColors(newColors)
  }

  function buildCard(index: number) {
    // reset colors back to default
    const newColors = new Array(55).fill("transparent")

    // if the index is included in possible moves change card
    if (buildMode.possibleMoves.includes(index)) {
      setBlueCards(
        blueCards.map((card, currIndex) => {
          // if we find the card update it
          if (index === currIndex) {
            return {
              ...card,
              dispay: "yes",
              buildingType: buildMode.buildingType,
              victoryPoints: buildMode.victoryPoints,
              image: buildMode.image,
            }
          }
          // if not the card return card
          return card
        })
      )

      // if building settlement we must also place 2 region cards
      if (buildMode.buildingType === "settlement") {
        // get 2 regions from top of region card stack
        let regionCard1: RegionCard | undefined
        let regionCard2: RegionCard | undefined
        setRegionCards(regionCards => {
          regionCard1 = regionCards.shift()
          regionCard2 = regionCards.shift()
          return regionCards
        })

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

        // update colors of regions we want to build
        newColors[moves[0]] = "green"
        newColors[moves[1]] = "green"

        setBuildRegion(buildRegion => {
          buildRegion.active = true
          buildRegion.buildSpots = moves
          buildRegion.resourceType1 = regionCard1?.resourceType
          buildRegion.diceNumber1 = regionCard1?.diceNumber
          buildRegion.image1 = regionCard1?.image
          buildRegion.resourceType2 = regionCard2?.resourceType
          buildRegion.diceNumber2 = regionCard2?.diceNumber
          buildRegion.image2 = regionCard2?.image
          return buildRegion
        })
      }
    }

    // turn off build mode and reset variables
    setBuildMode(buildMode => {
      buildMode.active = false
      buildMode.buildingType = ""
      buildMode.possibleMoves = []
      buildMode.victoryPoints = 0
      buildMode.image = ""
      return buildMode
    })

    // set colors
    setColors(newColors)
  }

  // places region cards on the board
  function placeRegion(clickIndex: number) {
    const newColors = new Array(55).fill("transparent")

    // will run the function run 2 times, 1 for each placement
    // so if there are 2 spots this is the first run
    if (buildRegion.buildSpots.length === 2) {
      // determine which index is being built this run
      let index: number | undefined

      const remainingSpot: number[] = []
      if (buildRegion.buildSpots[1] === clickIndex) {
        remainingSpot.push(buildRegion.buildSpots[0])
        newColors[buildRegion.buildSpots[0]] = "green"
        index = buildRegion.buildSpots[1]
      } else {
        remainingSpot.push(buildRegion.buildSpots[1])
        newColors[buildRegion.buildSpots[1]] = "green"
        index = buildRegion.buildSpots[0]
      }

      // update cards for first region
      setBlueCards(
        blueCards.map((card, currIndex) => {
          if (index === currIndex) {
            card.buildingType = "region"
            card.resourceType = buildRegion.resourceType1
            card.diceNumber = buildRegion.diceNumber1
            card.image = buildRegion.image1
          }

          return card
        })
      )

      // clearing information for spot 1
      setBuildRegion(buildRegion => {
        buildRegion.active = true
        buildRegion.buildSpots = remainingSpot
        buildRegion.resourceType1 = ""
        buildRegion.diceNumber1 = 0
        buildRegion.image1 = ""
        return buildRegion
      })
    }

    if (buildRegion.buildSpots.length === 1) {
      const index = buildRegion.buildSpots[0]

      setBuildRegion(buildRegion => {
        buildRegion.active = false
        buildRegion.buildSpots = []
        buildRegion.resourceType2 = ""
        buildRegion.diceNumber2 = 0
        buildRegion.image2 = ""
        return buildRegion
      })

      // update cards for second region
      setBlueCards(
        blueCards.map((card, currIndex) => {
          if (index === currIndex) {
            card.buildingType = "region"
            card.resourceType = buildRegion.resourceType2
            card.diceNumber = buildRegion.diceNumber2
            card.image = buildRegion.image2
          }

          return card
        })
      )
    }

    setColors(newColors)
  }

  function endTurn() {
    setTurn(turn => {
      return turn === "blue" ? "red" : "blue"
    })
  }

  function startGame() {
    console.log(centerCards[0])

    // setBlueHand(blueHand => {
    //   const newHand = []
    //   for (let i = 0; i < 3; i++) {
    //     const card = centerCards
    //   }
    // })
    // setRedHand()
  }

  function diceRoll() {
    const rollNumber = Math.ceil(Math.random() * 6)
    console.log(rollNumber)
  }

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
                    onClick={() => {
                      if (buildRegion.active) placeRegion(index)
                    }}
                    style={{
                      backgroundImage: `url(${card.image})`,
                      transform: `rotate(${card.rotation}deg)`,
                      outline: `5px solid ${colors[index]}`,
                    }}
                  ></div>
                )
              }

              return (
                <div
                  className="card red"
                  key={index}
                  onClick={() => {
                    if (buildMode.active) buildCard(index)
                  }}
                  style={{
                    backgroundImage: `url(${card.image})`,
                    outline: `5px solid ${colors[index]}`,
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
                    console.log("hello")
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
                    onClick={() => {
                      if (buildRegion.active) placeRegion(index)
                    }}
                    style={{
                      backgroundImage: `url(${card.image})`,
                      transform: `rotate(${card.rotation}deg)`,
                      outline: `5px solid ${colors[index]}`,
                    }}
                  ></div>
                )
              }

              return (
                <div
                  className="card"
                  key={index}
                  onClick={() => {
                    if (buildMode.active) buildCard(index)
                  }}
                  style={{
                    backgroundImage: `url(${card.image})`,
                    outline: `5px solid ${colors[index]}`,
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
          <button className="end-turn" onClick={endTurn}>
            End Turn
          </button>
          <button className="end-turn" onClick={diceRoll}>
            Roll Dice
          </button>
          <button className="end-turn">Start Game</button>
        </div>
      </div>
    </>
  )
}

export default App
