import cityBack from "./Cards/other/city-back.jpg"
import roadBack from "./Cards/other/road-back.jpg"
import settlementBack from "./Cards/other/settlement-back.jpg"

import cityFront from "./Cards/other/city-front.jpg"
import roadFront from "./Cards/other/road-front.jpg"
import settlementFront from "./Cards/other/settlement-front.jpg"
import basicFront from "./Cards/basic-set/basic-front.jpg"
import questionFront from "./cards/question/question-front.jpg"
import regionFront from "./cards/region/region-front.jpg"

import brick1 from "./cards/region/brick-1.jpg"
import brick5 from "./cards/region/brick-5.jpg"
import gold2 from "./cards/region/gold-2.jpg"
import gold3 from "./cards/region/gold-3.jpg"
import rock2 from "./cards/region/rock-2.jpg"
import rock4 from "./cards/region/rock-4.jpg"
import sheep5 from "./cards/region/sheep-5.jpg"
import sheep6 from "./cards/region/sheep-6.jpg"
import wheat1 from "./cards/region/wheat-1.jpg"
import wheat3 from "./cards/region/wheat-3.jpg"
import wood4 from "./cards/region/wood-4.jpg"
import wood6 from "./cards/region/wood-6.jpg"

import abby from "./Cards/basic-set/abby.jpg"
import austin from "./Cards/basic-set/austin.jpg"
import brickFactory from "./Cards/basic-set/brick-factory.jpg"
import brickShip from "./Cards/basic-set/brick-ship.jpg"
// import brigitta from "./Cards/basic-set/brigitta.jpg"
import candamir from "./Cards/basic-set/candamir.jpg"
import goldShip from "./Cards/basic-set/gold-ship.jpg"
// import goldSmith from "./Cards/basic-set/goldsmith.jpg"
import grainMill from "./Cards/basic-set/grain-mill.jpg"
import grainShip from "./Cards/basic-set/grain-ship.jpg"
import harald from "./Cards/basic-set/harald.jpg"
import inga from "./Cards/basic-set/inga.jpg"
import ironFoundry from "./Cards/basic-set/iron-foundry.jpg"
// import largeTradeShip from "./Cards/basic-set/large-trade-ship.jpg"
import lumberCamp from "./Cards/basic-set/lumber-camp.jpg"
import lumberShip from "./Cards/basic-set/lumber-ship.jpg"
// import marketplace from "./Cards/basic-set/marketplace.jpg"
// import merchantCaravan from "./Cards/basic-set/merchant-caravan.jpg"
import oreShip from "./Cards/basic-set/ore-ship.jpg"
import osmund from "./Cards/basic-set/osmund.jpg"
// import parishHall from "./Cards/basic-set/parish-hall.jpg"
// import relocation from "./Cards/basic-set/relocation.jpg"
// import scout from "./Cards/basic-set/scout.jpg"
import siglind from "./Cards/basic-set/siglind.jpg"
// import storehouse from "./Cards/basic-set/storehouse.jpg"
// import tollBridge from "./Cards/basic-set/toll-bridge.jpg"
import weaversShop from "./Cards/basic-set/weavers-shop.jpg"
import woolShip from "./Cards/basic-set/wool-ship.jpg"

// import feud from "./cards/question/feud.jpg"
// import fraternalFeuds from "./cards/question/fraternal-feuds.jpg"
import invention from "./cards/question/invention.jpg"
import tradeShipRace from "./cards/question/trade-ships-race.jpg"
import travelingMerchant from "./cards/question/traveling-merchant.jpg"
import yearOfPlenty from "./cards/question/year-of-plenty.jpg"
// import yule from "./cards/question/yule.jpg"

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
  {
    cardName: "yearOfPlenty",
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
    image: yearOfPlenty,
  },
  {
    cardName: "yearOfPlenty",
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
    image: yearOfPlenty,
  },
  {
    cardName: "yearOfPlenty",
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
    image: yearOfPlenty,
  },
  {
    cardName: "invention",
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
    image: invention,
  },
  {
    cardName: "invention",
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
    image: invention,
  },
  {
    cardName: "invention",
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
    image: invention,
  },
  {
    cardName: "travelingMerchant",
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
    image: travelingMerchant,
  },
  {
    cardName: "travelingMerchant",
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
    image: travelingMerchant,
  },
  {
    cardName: "travelingMerchant",
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
    image: travelingMerchant,
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
