import cityBack from "./cards-2/other/city-back.png"
import roadBack from "./cards-2/blue-player/road-back.png"
import settlementBack from "./cards-2/blue-player/settlement-back.png"
import cityFront from "./cards-2/other/city-front.png"
import roadFront from "./cards-2/other/road-front.png"
import settlementFront from "./cards-2/other/settlement-front.png"
import basicFront from "./cards-2/basic/basic-front.png"
import questionFront from "./cards-2/question/question-front.png"
import regionFront from "./cards-2/regions/region-front.png"

import brick1 from "./cards-2/regions/brick-1.png"
import brick5 from "./cards-2/regions/brick-5.png"
import gold2 from "./cards-2/regions/gold-2.png"
import gold3 from "./cards-2/regions/gold-3.png"
import wheat1 from "./cards-2/regions/grain-1.png"
import wheat3 from "./cards-2/regions/grain-3.png"
import wood4 from "./cards-2/regions/lumber-4.png"
import wood6 from "./cards-2/regions/lumber-6.png"
import rock2 from "./cards-2/regions/ore-2.png"
import rock4 from "./cards-2/regions/ore-4.png"
import sheep5 from "./cards-2/regions/wool-5.png"
import sheep6 from "./cards-2/regions/wool-6.png"

import austin from "./cards-2/basic/austin.png"
import brickFactory from "./cards-2/basic/brick-factory.png"
import brickShip from "./cards-2/basic/brick-ship.png"
import candamir from "./cards-2/basic/candamir.png"
import goldShip from "./cards-2/basic/gold-ship.png"
import grainMill from "./cards-2/basic/grain-mill.png"
import grainShip from "./cards-2/basic/grain-ship.png"
import harald from "./cards-2/basic/harald.png"
import inga from "./cards-2/basic/inga.png"
import ironFoundry from "./cards-2/basic/iron-foundry.png"
import lumberCamp from "./cards-2/basic/lumber-camp.png"
import lumberShip from "./cards-2/basic/lumber-ship.png"
import oreShip from "./cards-2/basic/ore-ship.png"
import osmund from "./cards-2/basic/osmund.png"
import siglind from "./cards-2/basic/sigland.png"
import weaversShop from "./cards-2/basic/weavers-shop.png"
import woolShip from "./cards-2/basic/wool-ship.png"

import tradeShipRace from "./cards-2/question/trade-ships-race.png"

export interface CenterCard {
  cardStack: string
  cardsInStack: CardStats[]
  image: string
}

export interface CardStats {
  cardName: string
  lumber: number
  brick: number
  grain: number
  wool: number
  ore: number
  gold: number
  victoryPoints: number
  strengthPoints: number
  skillPoints: number
  commercePoints: number
  progressPoints: number
  resourceBoost: boolean
  resource: string
  image: string
}

// filling center cards with arrays full of cards
// roads
const road: CardStats = {
  cardName: "road",
  lumber: 1,
  brick: 2,
  grain: 0,
  wool: 0,
  ore: 0,
  gold: 0,
  victoryPoints: 0,
  strengthPoints: 0,
  skillPoints: 0,
  commercePoints: 0,
  progressPoints: 0,
  resourceBoost: false,
  resource: "",
  image: roadBack,
}
const roads: CardStats[] = Array.from({ length: 7 }, () => ({ ...road }))
// settlements
const settlement: CardStats = {
  cardName: "settlement",
  lumber: 1,
  brick: 1,
  grain: 1,
  wool: 1,
  ore: 0,
  gold: 0,
  victoryPoints: 0,
  strengthPoints: 0,
  skillPoints: 0,
  commercePoints: 0,
  progressPoints: 0,
  resourceBoost: false,
  resource: "",
  image: settlementBack,
}
const settlements: CardStats[] = Array.from({ length: 5 }, () => ({
  ...settlement,
}))
// cities
const city: CardStats = {
  cardName: "city",
  lumber: 0,
  brick: 0,
  grain: 2,
  wool: 0,
  ore: 3,
  gold: 0,
  victoryPoints: 0,
  strengthPoints: 0,
  skillPoints: 0,
  commercePoints: 0,
  progressPoints: 0,
  resourceBoost: false,
  resource: "",
  image: cityBack,
}
const cities: CardStats[] = Array.from({ length: 7 }, () => ({ ...city }))

// basic cards before shuffle
const allBasicCards: CardStats[] = [
  {
    cardName: "goldShip",
    lumber: 1,
    brick: 0,
    grain: 0,
    wool: 1,
    ore: 0,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 0,
    skillPoints: 0,
    commercePoints: 1,
    progressPoints: 0,
    resourceBoost: false,
    resource: "",
    image: goldShip,
  },
  {
    cardName: "grainShip",
    lumber: 1,
    brick: 0,
    grain: 0,
    wool: 1,
    ore: 0,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 0,
    skillPoints: 0,
    commercePoints: 1,
    progressPoints: 0,
    resourceBoost: false,
    resource: "",
    image: grainShip,
  },
  {
    cardName: "lumberShip",
    lumber: 1,
    brick: 0,
    grain: 0,
    wool: 1,
    ore: 0,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 0,
    skillPoints: 0,
    commercePoints: 1,
    progressPoints: 0,
    resourceBoost: false,
    resource: "",
    image: lumberShip,
  },
  {
    cardName: "oreShip",
    lumber: 1,
    brick: 0,
    grain: 0,
    wool: 1,
    ore: 0,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 0,
    skillPoints: 0,
    commercePoints: 1,
    progressPoints: 0,
    resourceBoost: false,
    resource: "",
    image: oreShip,
  },
  {
    cardName: "lumberShip",
    lumber: 1,
    brick: 0,
    grain: 0,
    wool: 1,
    ore: 0,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 0,
    skillPoints: 0,
    commercePoints: 1,
    progressPoints: 0,
    resourceBoost: false,
    resource: "",
    image: lumberShip,
  },
  {
    cardName: "oreShip",
    lumber: 1,
    brick: 0,
    grain: 0,
    wool: 1,
    ore: 0,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 0,
    skillPoints: 0,
    commercePoints: 1,
    progressPoints: 0,
    resourceBoost: false,
    resource: "",
    image: oreShip,
  },
  {
    cardName: "brickShip",
    lumber: 1,
    brick: 0,
    grain: 0,
    wool: 1,
    ore: 0,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 0,
    skillPoints: 0,
    commercePoints: 1,
    progressPoints: 0,
    resourceBoost: false,
    resource: "",
    image: brickShip,
  },
  {
    cardName: "woolShip",
    lumber: 1,
    brick: 0,
    grain: 0,
    wool: 1,
    ore: 0,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 0,
    skillPoints: 0,
    commercePoints: 1,
    progressPoints: 0,
    resourceBoost: false,
    resource: "",
    image: woolShip,
  },
  {
    cardName: "weaversShop",
    lumber: 1,
    brick: 0,
    grain: 0,
    wool: 1,
    ore: 0,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 0,
    skillPoints: 0,
    commercePoints: 0,
    progressPoints: 0,
    resourceBoost: true,
    resource: "wool",
    image: weaversShop,
  },
  {
    cardName: "brickFactory",
    lumber: 0,
    brick: 1,
    grain: 0,
    wool: 0,
    ore: 1,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 0,
    skillPoints: 0,
    commercePoints: 0,
    progressPoints: 0,
    resourceBoost: true,
    resource: "brick",
    image: brickFactory,
  },
  {
    cardName: "lumberCamp",
    lumber: 1,
    brick: 0,
    grain: 0,
    wool: 0,
    ore: 1,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 0,
    skillPoints: 0,
    commercePoints: 0,
    progressPoints: 0,
    resourceBoost: true,
    resource: "lumber",
    image: lumberCamp,
  },
  {
    cardName: "ironFoundry",
    lumber: 0,
    brick: 1,
    grain: 0,
    wool: 0,
    ore: 1,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 0,
    skillPoints: 0,
    commercePoints: 0,
    progressPoints: 0,
    resourceBoost: true,
    resource: "ore",
    image: ironFoundry,
  },
  {
    cardName: "grainMill",
    lumber: 1,
    brick: 0,
    grain: 1,
    wool: 0,
    ore: 0,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 0,
    skillPoints: 0,
    commercePoints: 0,
    progressPoints: 0,
    resourceBoost: true,
    resource: "grain",
    image: grainMill,
  },
  {
    cardName: "harald",
    lumber: 0,
    brick: 0,
    grain: 1,
    wool: 0,
    ore: 1,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 2,
    skillPoints: 1,
    commercePoints: 0,
    progressPoints: 0,
    resourceBoost: false,
    resource: "",
    image: harald,
  },
  {
    cardName: "candamir",
    lumber: 0,
    brick: 0,
    grain: 1,
    wool: 2,
    ore: 1,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 4,
    skillPoints: 1,
    commercePoints: 0,
    progressPoints: 0,
    resourceBoost: false,
    resource: "",
    image: candamir,
  },
  {
    cardName: "candamir",
    lumber: 0,
    brick: 0,
    grain: 1,
    wool: 2,
    ore: 1,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 4,
    skillPoints: 1,
    commercePoints: 0,
    progressPoints: 0,
    resourceBoost: false,
    resource: "",
    image: candamir,
  },
  {
    cardName: "osmund",
    lumber: 0,
    brick: 0,
    grain: 1,
    wool: 1,
    ore: 1,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 2,
    skillPoints: 2,
    commercePoints: 0,
    progressPoints: 0,
    resourceBoost: false,
    resource: "",
    image: osmund,
  },
  {
    cardName: "osmund",
    lumber: 0,
    brick: 0,
    grain: 1,
    wool: 1,
    ore: 1,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 2,
    skillPoints: 2,
    commercePoints: 0,
    progressPoints: 0,
    resourceBoost: false,
    resource: "",
    image: osmund,
  },
  {
    cardName: "siglind",
    lumber: 0,
    brick: 0,
    grain: 1,
    wool: 2,
    ore: 1,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 2,
    skillPoints: 3,
    commercePoints: 0,
    progressPoints: 0,
    resourceBoost: false,
    resource: "",
    image: siglind,
  },
  {
    cardName: "inga",
    lumber: 0,
    brick: 0,
    grain: 1,
    wool: 1,
    ore: 1,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 1,
    skillPoints: 3,
    commercePoints: 0,
    progressPoints: 0,
    resourceBoost: false,
    resource: "",
    image: inga,
  },
  {
    cardName: "austin",
    lumber: 0,
    brick: 0,
    grain: 1,
    wool: 0,
    ore: 1,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 1,
    skillPoints: 2,
    commercePoints: 0,
    progressPoints: 0,
    resourceBoost: false,
    resource: "",
    image: austin,
  },
  {
    cardName: "austin",
    lumber: 0,
    brick: 0,
    grain: 1,
    wool: 0,
    ore: 1,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 1,
    skillPoints: 2,
    commercePoints: 0,
    progressPoints: 0,
    resourceBoost: false,
    resource: "",
    image: austin,
  },
]

// shuffeling basic cards
const shuffledBasicCards = shuffle(allBasicCards)
// seperating basic cards into 4 arrays
const basic = shuffledBasicCards.slice(0, 16)
// assigning starting player cards
export const blueStartHand = shuffledBasicCards.slice(16, 19)
export const redStartHand = shuffledBasicCards.slice(19, 22)

// question cards before shuffle
const unshuffledQuestionCards: CardStats[] = [
  // {
  //   cardName: "yearOfPlenty",
  //   lumber: 0,
  //   brick: 0,
  //   grain: 0,
  //   wool: 0,
  //   ore: 0,
  //   gold: 0,
  //   victoryPoints: 0,
  //   strengthPoints: 0,
  //   skillPoints: 0,
  //   commercePoints: 0,
  //   progressPoints: 0,
  //   resourceBoost: false,
  //   resource: "",
  //   image: yearOfPlenty,
  // },
  // {
  //   cardName: "yearOfPlenty",
  //   lumber: 0,
  //   brick: 0,
  //   grain: 0,
  //   wool: 0,
  //   ore: 0,
  //   gold: 0,
  //   victoryPoints: 0,
  //   strengthPoints: 0,
  //   skillPoints: 0,
  //   commercePoints: 0,
  //   progressPoints: 0,
  //   resourceBoost: false,
  //   resource: "",
  //   image: yearOfPlenty,
  // },
  // {
  //   cardName: "yearOfPlenty",
  //   lumber: 0,
  //   brick: 0,
  //   grain: 0,
  //   wool: 0,
  //   ore: 0,
  //   gold: 0,
  //   victoryPoints: 0,
  //   strengthPoints: 0,
  //   skillPoints: 0,
  //   commercePoints: 0,
  //   progressPoints: 0,
  //   resourceBoost: false,
  //   resource: "",
  //   image: yearOfPlenty,
  // },
  // {
  //   cardName: "invention",
  //   lumber: 0,
  //   brick: 0,
  //   grain: 0,
  //   wool: 0,
  //   ore: 0,
  //   gold: 0,
  //   victoryPoints: 0,
  //   strengthPoints: 0,
  //   skillPoints: 0,
  //   commercePoints: 0,
  //   progressPoints: 0,
  //   resourceBoost: false,
  //   resource: "",
  //   image: invention,
  // },
  // {
  //   cardName: "invention",
  //   lumber: 0,
  //   brick: 0,
  //   grain: 0,
  //   wool: 0,
  //   ore: 0,
  //   gold: 0,
  //   victoryPoints: 0,
  //   strengthPoints: 0,
  //   skillPoints: 0,
  //   commercePoints: 0,
  //   progressPoints: 0,
  //   resourceBoost: false,
  //   resource: "",
  //   image: invention,
  // },
  // {
  //   cardName: "invention",
  //   lumber: 0,
  //   brick: 0,
  //   grain: 0,
  //   wool: 0,
  //   ore: 0,
  //   gold: 0,
  //   victoryPoints: 0,
  //   strengthPoints: 0,
  //   skillPoints: 0,
  //   commercePoints: 0,
  //   progressPoints: 0,
  //   resourceBoost: false,
  //   resource: "",
  //   image: invention,
  // },
  // {
  //   cardName: "travelingMerchant",
  //   lumber: 0,
  //   brick: 0,
  //   grain: 0,
  //   wool: 0,
  //   ore: 0,
  //   gold: 0,
  //   victoryPoints: 0,
  //   strengthPoints: 0,
  //   skillPoints: 0,
  //   commercePoints: 0,
  //   progressPoints: 0,
  //   resourceBoost: false,
  //   resource: "",
  //   image: travelingMerchant,
  // },
  // {
  //   cardName: "travelingMerchant",
  //   lumber: 0,
  //   brick: 0,
  //   grain: 0,
  //   wool: 0,
  //   ore: 0,
  //   gold: 0,
  //   victoryPoints: 0,
  //   strengthPoints: 0,
  //   skillPoints: 0,
  //   commercePoints: 0,
  //   progressPoints: 0,
  //   resourceBoost: false,
  //   resource: "",
  //   image: travelingMerchant,
  // },
  // {
  //   cardName: "travelingMerchant",
  //   lumber: 0,
  //   brick: 0,
  //   grain: 0,
  //   wool: 0,
  //   ore: 0,
  //   gold: 0,
  //   victoryPoints: 0,
  //   strengthPoints: 0,
  //   skillPoints: 0,
  //   commercePoints: 0,
  //   progressPoints: 0,
  //   resourceBoost: false,
  //   resource: "",
  //   image: travelingMerchant,
  // },
  {
    cardName: "tradeShipRace",
    lumber: 0,
    brick: 0,
    grain: 0,
    wool: 0,
    ore: 0,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 0,
    skillPoints: 0,
    commercePoints: 0,
    progressPoints: 0,
    resourceBoost: false,
    resource: "",
    image: tradeShipRace,
  },
  {
    cardName: "tradeShipRace",
    lumber: 0,
    brick: 0,
    grain: 0,
    wool: 0,
    ore: 0,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 0,
    skillPoints: 0,
    commercePoints: 0,
    progressPoints: 0,
    resourceBoost: false,
    resource: "",
    image: tradeShipRace,
  },
  {
    cardName: "tradeShipRace",
    lumber: 0,
    brick: 0,
    grain: 0,
    wool: 0,
    ore: 0,
    gold: 0,
    victoryPoints: 0,
    strengthPoints: 0,
    skillPoints: 0,
    commercePoints: 0,
    progressPoints: 0,
    resourceBoost: false,
    resource: "",
    image: tradeShipRace,
  },
]
// shuffling question cards
const questionCards = shuffle(unshuffledQuestionCards)

// all center cards
export const startCenterCards: CenterCard[] = [
  {
    cardStack: "road",
    cardsInStack: roads,
    image: roadFront,
  },
  {
    cardStack: "settlement",
    cardsInStack: settlements,
    image: settlementFront,
  },
  {
    cardStack: "city",
    cardsInStack: cities,
    image: cityFront,
  },
  {
    cardStack: "region",
    cardsInStack: [],
    image: regionFront,
  },
  {
    cardStack: "question",
    cardsInStack: questionCards,
    image: questionFront,
  },
  {
    cardStack: "basic",
    cardsInStack: basic,
    image: basicFront,
  },
]

// region cards
export interface RegionCard {
  buildingType: string
  resourceType: string
  diceNumber: number
  image: string
}
const unshuffledRegionCards: RegionCard[] = [
  {
    buildingType: "region",
    resourceType: "wool",
    diceNumber: 5,
    image: sheep5,
  },
  {
    buildingType: "region",
    resourceType: "wool",
    diceNumber: 6,
    image: sheep6,
  },
  {
    buildingType: "region",
    resourceType: "grain",
    diceNumber: 1,
    image: wheat1,
  },
  {
    buildingType: "region",
    resourceType: "grain",
    diceNumber: 3,
    image: wheat3,
  },
  {
    buildingType: "region",
    resourceType: "lumber",
    diceNumber: 4,
    image: wood4,
  },
  {
    buildingType: "region",
    resourceType: "lumber",
    diceNumber: 6,
    image: wood6,
  },
  {
    buildingType: "region",
    resourceType: "brick",
    diceNumber: 1,
    image: brick1,
  },
  {
    buildingType: "region",
    resourceType: "brick",
    diceNumber: 5,
    image: brick5,
  },
  {
    buildingType: "region",
    resourceType: "ore",
    diceNumber: 2,
    image: rock2,
  },
  {
    buildingType: "region",
    resourceType: "ore",
    diceNumber: 4,
    image: rock4,
  },
  {
    buildingType: "region",
    resourceType: "gold",
    diceNumber: 2,
    image: gold2,
  },
  {
    buildingType: "region",
    resourceType: "gold",
    diceNumber: 3,
    image: gold3,
  },
]
export const startRegionCards = shuffleRegions(unshuffledRegionCards)

// function to randomly shuffle the decks
function shuffle(array: CardStats[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]] // swap elements
  }
  return array
}

function shuffleRegions(array: RegionCard[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]] // swap elements
  }
  return array
}
