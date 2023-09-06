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
  CardStats,
} from "./centerCards.tsx"

import {
  CardDefinition,
  blueStartingCards,
  redStartingCards,
} from "./startingCards.tsx"

import { diceRoll, eventDice } from "./diceFunctions.tsx"

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
  skillPoints: number
  progressPoints: number
  commercePoints: number
  strengthPoints: number
  image: string
}

const startBuildMode: BuildMode = {
  active: "",
  buildingType: "",
  possibleMoves: [],
  victoryPoints: 0,
  skillPoints: 0,
  progressPoints: 0,
  commercePoints: 0,
  strengthPoints: 0,
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

const startOpenBuildTiles: number[] = [16, 18, 38, 40]

interface StartBuildBasic {
  active: string
  possibleMoves: number[]
  card: CardStats | undefined
}

const startBuildBasic: StartBuildBasic = {
  active: "",
  possibleMoves: [],
  card: undefined,
}

function App() {
  // dice
  const [productionDie, setProductionDie] = useState<number>(0)
  const [eventDie, setEventDie] = useState<string>("")

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

  // variables for selecting and placing cards
  const [buildMode, setBuildMode] = useState<BuildMode>(startBuildMode)
  const [buildBasic, setBuildBasic] = useState<StartBuildBasic>(startBuildBasic)

  const [blueOpenExpandTiles, setBlueOpenExpandTiles] =
    useState<OpenExpandTiles>(startingOpenExpandTiles)
  const [redOpenExpandTiles, setRedOpenExpandTiles] = useState<OpenExpandTiles>(
    {
      left: { building: "road", index: 26 },
      right: { building: "road", index: 30 },
    }
  )

  const [blueOpenBuildTiles, setBlueOpenBuildTiles] =
    useState<number[]>(startOpenBuildTiles)
  const [redOpenBuildTiles, setRedOpenBuildTiles] =
    useState<number[]>(startOpenBuildTiles)

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

    setBlueOpenBuildTiles(() => {
      const buildTiles: number[] = []
      blueCards.forEach((tile, index) => {
        if (tile.buildingType === "settlement") {
          if (blueCards[index - 11].display === "no")
            buildTiles.push(index - 11)
          if (blueCards[index + 11].display === "no")
            buildTiles.push(index + 11)
        }

        if (tile.buildingType === "city") {
          if (blueCards[index - 11].display === "no") {
            buildTiles.push(index - 11)
          } else if (blueCards[index - 22].display === "no") {
            buildTiles.push(index - 22)
          }

          if (blueCards[index + 11].display === "no") {
            buildTiles.push(index + 11)
          } else {
            buildTiles.push(index + 22)
          }
        }
      })

      return buildTiles
    })

    setRedOpenBuildTiles(() => {
      const buildTiles: number[] = []
      redCards.forEach((tile, index) => {
        if (tile.buildingType === "settlement") {
          if (redCards[index - 11].display === "no") buildTiles.push(index - 11)
          if (redCards[index + 11].display === "no") buildTiles.push(index + 11)
        }

        if (tile.buildingType === "city") {
          if (redCards[index - 11].display === "no") {
            buildTiles.push(index - 11)
          } else if (redCards[index - 22].display === "no") {
            buildTiles.push(index - 22)
          }

          if (redCards[index + 11].display === "no") {
            buildTiles.push(index + 11)
          } else {
            buildTiles.push(index + 22)
          }
        }
      })

      return buildTiles
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

  function selectCardFromHand(card: CardStats) {
    const newColors = new Array(55).fill("transparent")
    const possibleMovesByColor =
      turn === "blue" ? blueOpenBuildTiles : redOpenBuildTiles

    setBuildBasic(buildBasic => {
      buildBasic.active = turn
      buildBasic.card = card
      buildBasic.possibleMoves = possibleMovesByColor
      return buildBasic
    })

    possibleMovesByColor.forEach(index => {
      newColors[index] = "green"
    })

    turn === "blue" ? setBlueColors(newColors) : setRedColors(newColors)
  }

  function selectedCenterCard(stack: CenterCard) {
    // declare variables that update based on turn
    const OpenExpandTiles =
      turn === "blue" ? blueOpenExpandTiles : redOpenExpandTiles
    const currSettlements = turn === "blue" ? blueSettlements : redSettlements

    // RESET EACH BUILD FUNCTION EACH TIME WE RUN THE FUNCTION
    resetBuildModes()

    // create outside function that can be called to reset all

    const building = stack.cardStack

    // create new color array and set all colors to transparent
    const newColors = new Array(55).fill("transparent")

    // building basic cards
    if (building.slice(0, 5) === "basic") {
      // update the length of each basic stack
    }

    // if stack is a road
    if (
      building === "road" &&
      (OpenExpandTiles.left.building === "road" ||
        OpenExpandTiles.right.building === "road")
    ) {
      // highlighting possible moves and tracking which tiles
      const possibleMoves: number[] = []
      if (building === OpenExpandTiles.left.building) {
        newColors[OpenExpandTiles.left.index] = "green"
        possibleMoves.push(OpenExpandTiles.left.index)
      }
      if (building === OpenExpandTiles.right.building) {
        newColors[OpenExpandTiles.right.index] = "green"
        possibleMoves.push(OpenExpandTiles.right.index)
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

    // if stack is a settlement
    if (
      building === "settlement" &&
      (OpenExpandTiles.left.building === "settlement" ||
        OpenExpandTiles.right.building === "settlement")
    ) {
      // highlighting possible moves and tracking which tiles
      const possibleMoves: number[] = []
      if (building === OpenExpandTiles.left.building) {
        newColors[OpenExpandTiles.left.index] = "green"
        possibleMoves.push(OpenExpandTiles.left.index)
      }
      if (building === OpenExpandTiles.right.building) {
        newColors[OpenExpandTiles.right.index] = "green"
        possibleMoves.push(OpenExpandTiles.right.index)
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

    // if stack is a city
    if (building === "city" && currSettlements.length !== 0) {
      const possibleMoves: number[] = currSettlements
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

    turn === "blue" ? setBlueColors(newColors) : setRedColors(newColors)
  }

  function resetBuildModes() {
    setBuildMode(buildMode => {
      buildMode.active = ""
      buildMode.buildingType = ""
      buildMode.commercePoints = 0
      buildMode.image = ""
      buildMode.possibleMoves = []
      buildMode.progressPoints = 0
      buildMode.skillPoints = 0
      buildMode.strengthPoints = 0
      buildMode.victoryPoints
      return buildMode
    })

    setBuildBasic(buildBasic => {
      buildBasic.active = ""
      buildBasic.card = undefined
      buildBasic.possibleMoves = []
      return buildBasic
    })
  }

  function buildCard(index: number) {
    const currCards = turn === "blue" ? blueCards : redCards
    const setCurrCards = turn === "blue" ? setBlueCards : setRedCards
    const playerHand = turn === "blue" ? blueHand : redHand
    const setPlayerHand = turn === "blue" ? setBlueHand : setRedHand

    // reset colors back to default
    const newColors = new Array(55).fill("transparent")

    // build basic cards
    if (
      buildBasic.active === turn &&
      buildBasic.possibleMoves.includes(index)
    ) {
      setCurrCards(
        currCards.map((card, currIndex) => {
          if (index === currIndex) {
            const resourceBonus =
              buildBasic.card?.resourceBoost === true
                ? buildBasic.card.resource
                : ""

            return {
              ...card,
              display: "yes",
              buildingType: buildBasic.card?.cardName,
              image: buildBasic.card?.image,
              skillPoints: buildBasic.card?.skillPoints,
              progressPoints: buildBasic.card?.progressPoints,
              commercePoints: buildBasic.card?.commercePoints,
              strengthPoints: buildBasic.card?.strengthPoints,
              victoryPoints: buildBasic.card?.victoryPoints,
              resourceMultiplyer: resourceBonus,
            }
          }

          return card
        })
      )

      // remove card from player hand
      setPlayerHand(playerHand => {
        const newPlayerHand: CardStats[] = []
        playerHand.forEach(card => {
          if (card.cardName !== buildBasic.card?.cardName) {
            newPlayerHand.push(card)
          }
        })
        return newPlayerHand
      })
    }

    // build expansion cards
    if (buildMode.active === turn && buildMode.possibleMoves.includes(index)) {
      setCurrCards(
        currCards.map((card, currIndex) => {
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

      // if building settlement we must also place 2 region cards
      if (buildMode.buildingType === "settlement") {
        // get 2 regions from top of region card stack
        const regionCard1: RegionCard | undefined = regionCards.shift()
        const regionCard2: RegionCard | undefined = regionCards.shift()
        setRegionCards(regionCards)

        // check if regions go on left or right
        let direction = currCards[index - 2].display === "no" ? "left" : "right"

        // determine tiles to place regions
        let moves: number[] = []
        if (direction === "left") {
          moves.push(index - 12)
          moves.push(index + 10)
        }
        if (direction === "right") {
          moves.push(index - 10)
          moves.push(index + 12)
        }

        // update player cards with regions
        setCurrCards(currCards => {
          currCards[moves[0]].buildingType = regionCard1?.buildingType
          currCards[moves[0]].resourceType = regionCard1?.resourceType
          currCards[moves[0]].diceNumber = regionCard1?.diceNumber
          currCards[moves[0]].image = regionCard1?.image

          currCards[moves[1]].buildingType = regionCard2?.buildingType
          currCards[moves[1]].resourceType = regionCard2?.resourceType
          currCards[moves[1]].diceNumber = regionCard2?.diceNumber
          currCards[moves[1]].image = regionCard2?.image
          return currCards
        })
      }
    }

    // reset build modes
    resetBuildModes()

    // reset colors
    turn === "blue" ? setBlueColors(newColors) : setRedColors(newColors)
  }

  function endTurn() {
    const playerHand = turn === "blue" ? blueHand : redHand
    const loops = 3 - playerHand.length
    const setPlayerHand = turn === "blue" ? setBlueHand : setRedHand

    // replenish hand if less than 3 cards
    for (let i = 0; i < loops; i++) {
      setCenterCards(centerCards => {
        return centerCards.map(cardStack => {
          if (cardStack.cardStack === "basic") {
            const basicCards = cardStack.cardsInStack
            const newPlayerCard: CardStats = basicCards[0]

            setPlayerHand(playerHand => {
              playerHand.push(newPlayerCard)
              return playerHand
            })

            cardStack.cardsInStack = basicCards.slice(1, basicCards.length)
          }

          return cardStack
        })
      })
    }

    // reset build modes
    resetBuildModes()

    // reset tile colors
    const newColors = new Array(55).fill("transparent")
    setBlueColors(newColors)
    setRedColors(newColors)

    // change turn
    setTurn(turn => {
      return turn === "blue" ? "red" : "blue"
    })
  }

  function startGame() {
    // game started
  }

  function rollDice() {
    const productionDie = diceRoll()
    const eventDie = eventDice[diceRoll() - 1]

    setProductionDie(productionDie)
    setEventDie(eventDie)

    setBlueCards(blueCards => {
      return blueCards.map(card => {
        if (card.diceNumber === productionDie) {
          if (card.rotation === card.maxRotation) {
            return card
          }
          card.resourceCount++
          return { ...card, rotation: card.rotation - 90 }
        }

        return card
      })
    })

    setRedCards(redCards => {
      return redCards.map(card => {
        if (card.diceNumber === productionDie) {
          if (card.rotation === card.maxRotation) {
            return card
          }
          card.resourceCount++
          return { ...card, rotation: card.rotation - 90 }
        }

        return card
      })
    })
  }

  console.log(blueCards)
  console.log(centerCards)

  return (
    <>
      <div className="window">
        <div className="player-hand">
          {(turn === "blue" ? blueHand : redHand).map((card, index) => {
            return (
              <div
                className={`card`}
                key={index}
                style={{
                  backgroundImage: `url(${card.image})`,
                }}
                onClick={() => {
                  selectCardFromHand(card)
                }}
              ></div>
            )
          })}
        </div>

        <div className="board">
          {/* red board */}
          <div className="player-board rotate">
            {redCards.map((card: CardDefinition, index: number) => {
              if (card.type === "region") {
                return (
                  <div
                    className="card"
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
                  className="card red-letters"
                  key={index}
                  onClick={() => {
                    if (buildMode.active === "red") buildCard(index)
                    if (buildBasic.active === "red") buildCard(index)
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
                    if (
                      stack.cardStack === "road" ||
                      stack.cardStack === "settlement" ||
                      stack.cardStack === "city"
                    )
                      selectedCenterCard(stack)
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
                    if (buildBasic.active === "blue") buildCard(index)
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
            <div className={`resource ${turn}`}>{`Turn: ${turn}`}</div>
            <div className={`resource ${turn}`}>{`Brick: ${
              (turn === "blue" ? blueResources : redResources).brick
            }`}</div>
            <div className={`resource ${turn}`}>{`Gold: ${
              (turn === "blue" ? blueResources : redResources).gold
            }`}</div>
            <div className={`resource ${turn}`}>{`Grain: ${
              (turn === "blue" ? blueResources : redResources).grain
            }`}</div>
            <div className={`resource ${turn}`}>{`Lumber: ${
              (turn === "blue" ? blueResources : redResources).lumber
            }`}</div>
            <div className={`resource ${turn}`}>{`Ore: ${
              (turn === "blue" ? blueResources : redResources).ore
            }`}</div>
            <div className={`resource ${turn}`}>{`Wool: ${
              (turn === "blue" ? blueResources : redResources).wool
            }`}</div>
            <div className={`resource ${turn}`}>{`Victory Points: ${
              (turn === "blue" ? blueResources : redResources).victoryPoints
            }`}</div>
            <div className={`resource ${turn}`}>{`Commerce Points: ${
              (turn === "blue" ? blueResources : redResources).commercePoints
            }`}</div>
            <div className={`resource ${turn}`}>{`Strength Points: ${
              (turn === "blue" ? blueResources : redResources).strengthPoints
            }`}</div>
            <div className={`resource ${turn}`}>{`Progress Points: ${
              (turn === "blue" ? blueResources : redResources).progressPoints
            }`}</div>
            <div className={`resource ${turn}`}>{`Skill Points: ${
              (turn === "blue" ? blueResources : redResources).skillPoints
            }`}</div>
          </div>
          <button className="end-turn" onClick={startGame}>
            Start Game
          </button>
          <button className="end-turn" onClick={endTurn}>
            End Turn
          </button>
          <button className="end-turn" onClick={rollDice}>
            Roll Dice
          </button>
          <button className="end-turn" onClick={rollDice}>
            Trade
          </button>
        </div>
      </div>
    </>
  )
}

export default App
