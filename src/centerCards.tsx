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

export interface CenterCard {
  cardStack: string
  cardsInStack: CardStats[]
  image: string
}

export interface CardStats {
  victoryPoints: number
  lumber: number
  brick: number
  grain: number
  wool: number
  ore: number
  gold: number
  strengthPoints: number
  skillPoints: number
  commercePoints: number
  progressPoints: number
  resourceBoost: string
  resource: string
  image: string
}

// filling center cards with arrays full of cards
const road: CardStats = {
  victoryPoints: 0,
  lumber: 1,
  brick: 2,
  grain: 0,
  wool: 0,
  ore: 0,
  gold: 0,
  strengthPoints: 0,
  skillPoints: 0,
  commercePoints: 0,
  progressPoints: 0,
  resourceBoost: "",
  resource: "",
  image: roadBack,
}
const roads: CardStats[] = Array.from({ length: 7 }, () => ({ ...road }))
const settlement: CardStats = {
  victoryPoints: 1,
  lumber: 1,
  brick: 1,
  grain: 1,
  wool: 1,
  ore: 0,
  gold: 0,
  strengthPoints: 0,
  skillPoints: 0,
  commercePoints: 0,
  progressPoints: 0,
  resourceBoost: "",
  resource: "",
  image: settlementBack,
}
const settlements: CardStats[] = Array.from({ length: 5 }, () => ({
  ...settlement,
}))
const city: CardStats = {
  victoryPoints: 2,
  lumber: 0,
  brick: 0,
  grain: 2,
  wool: 0,
  ore: 3,
  gold: 0,
  strengthPoints: 0,
  skillPoints: 0,
  commercePoints: 0,
  progressPoints: 0,
  resourceBoost: "",
  resource: "",
  image: cityBack,
}
const cities: CardStats[] = Array.from({ length: 7 }, () => ({ ...city }))

export const centerCards: CenterCard[] = [
  {
    cardStack: "basic-1",
    cardsInStack: [],
    image: basicFront,
  },
  {
    cardStack: "basic-2",
    cardsInStack: [],
    image: basicFront,
  },
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
    cardsInStack: [],
    image: questionFront,
  },
  {
    cardStack: "Basic-3",
    cardsInStack: [],
    image: basicFront,
  },
  {
    cardStack: "Basic-4",
    cardsInStack: [],
    image: basicFront,
  },
]

interface Cards {
  [cardName: string]: CardStats
}

export const baseCards: Cards = {
  road: {
    victoryPoints: 0,
    lumber: 1,
    brick: 2,
    grain: 0,
    wool: 0,
    ore: 0,
    gold: 0,
    strengthPoints: 0,
    skillPoints: 0,
    commercePoints: 0,
    progressPoints: 0,
    resourceBoost: "",
    resource: "",
    image: roadBack,
  },
  settlement: {
    victoryPoints: 1,
    lumber: 1,
    brick: 1,
    grain: 1,
    wool: 1,
    ore: 0,
    gold: 0,
    strengthPoints: 0,
    skillPoints: 0,
    commercePoints: 0,
    progressPoints: 0,
    resourceBoost: "",
    resource: "",
    image: settlementBack,
  },
  city: {
    victoryPoints: 2,
    lumber: 0,
    brick: 0,
    grain: 2,
    wool: 0,
    ore: 3,
    gold: 0,
    strengthPoints: 0,
    skillPoints: 0,
    commercePoints: 0,
    progressPoints: 0,
    resourceBoost: "",
    resource: "",
    image: cityBack,
  },
}

// region cards
export interface RegionCard {
  buildingType: string
  resourceType: string
  diceNumber: number
  image: string
}

export const startRegionCards: RegionCard[] = [
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
    image: wood4,
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
