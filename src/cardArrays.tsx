import cityBack from "./Cards/other/city-back.jpg"
// import cityFront from "./Cards/other/city-front.jpg"
import roadBack from "./Cards/other/road-back.jpg"
// import roadFront from "./Cards/other/road-front.jpg"
import settlementBack from "./Cards/other/settlement-back.jpg"
// import settlementFront from "./Cards/other/settlement-front.jpg"

interface Cards {
  [cardName: string]: CardStats
}

interface CardStats {
  numberOfCards: number
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

export const baseCards: Cards = {
  road: {
    numberOfCards: 0,
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
    numberOfCards: 5,
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
    numberOfCards: 7,
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

export const units: Cards = {
  harald: {
    numberOfCards: 1,
    victoryPoints: 0,
    lumber: 0,
    brick: 0,
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
    image: "",
  },
  candamir: {
    numberOfCards: 1,
    victoryPoints: 0,
    lumber: 0,
    brick: 0,
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
    image: "",
  },
  inga: {
    numberOfCards: 1,
    victoryPoints: 0,
    lumber: 0,
    brick: 0,
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
    image: "",
  },
  austin: {
    numberOfCards: 1,
    victoryPoints: 0,
    lumber: 0,
    brick: 0,
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
    image: "",
  },
  siglind: {
    numberOfCards: 1,
    victoryPoints: 0,
    lumber: 0,
    brick: 0,
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
    image: "",
  },
  osmund: {
    numberOfCards: 1,
    victoryPoints: 0,
    lumber: 0,
    brick: 0,
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
    image: "",
  },
}
