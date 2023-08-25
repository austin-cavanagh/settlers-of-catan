import blueBrick from "./cards/blue-player/blue-brick.jpg"
import blueGold from "./cards/blue-player/blue-gold.jpg"
import blueRoad from "./cards/blue-player/blue-road.jpg"
import blueRock from "./cards/blue-player/blue-rock.jpg"
import blueSettlement from "./cards/blue-player/blue-settlement.jpg"
import blueSheep from "./cards/blue-player/blue-sheep.jpg"
// import blueShield from "./cards/blue-player/blue-shield.jpg"
import blueWheat from "./cards/blue-player/blue-wheat.jpg"
import blueWood from "./cards/blue-player/blue-wood.jpg"

// import redBrick from "./cards/red-player/red-brick.jpg" // right side
// import redGold from "./cards/red-player/red-gold.jpg" // right side
// import redRoad from "./cards/red-player/red-road.jpg"
// import redRock from "./cards/red-player/red-rock.jpg"
// import redSettlement from "./cards/red-player/red-settlement.jpg"
// import redSheep from "./cards/red-player/red-sheep.jpg"
// import redShield from "./cards/red-player/red-shield.jpg"
// import redWheat from "./cards/red-player/red-wheat.jpg"
// import redWood from "./cards/red-player/red-wood.jpg" // grainy

// import feud from "./cards/question/feud.jpg"
// import fraternalFeuds from "./cards/question/fraternal-feuds.jpg"
// import invention from "./cards/question/invention.jpg"
// import questionFront from "./cards/question/question-front.jpg"
// import tradeShipRace from "./cards/question/trade-ships-race.jpg"
// import travelingMerchant from "./cards/question/traveling-merchant.jpg"
// import yearOfPlenty from "./cards/question/year-of-plenty.jpg"
// import yule from "./cards/question/yule.jpg"

// import brick1 from "./cards/region/brick-1.jpg"
// import brick5 from "./cards/region/brick-5.jpg"
// import gold2 from "./cards/region/gold-2.jpg"
// import gold3 from "./cards/region/gold-3.jpg"
// import regionFront from "./cards/region/region-front.jpg"
// import rock2 from "./cards/region/rock-2.jpg"
// import rock4 from "./cards/region/rock-4.jpg"
// import sheep5 from "./cards/region/sheep-5.jpg"
// import sheep6 from "./cards/region/sheep-6.jpg"
// import wheat1 from "./cards/region/wheat-1.jpg"
// import wheat3 from "./cards/region/wheat-3.jpg"
// import wood4 from "./cards/region/wood-4.jpg"
// import wood6 from "./cards/region/wood-6.jpg"

// import abby from "./Cards/basic-set/abby.jpg"
// import austin from "./Cards/basic-set/austin.jpg"
// import basicFront from "./Cards/basic-set/basic-front.jpg"
// import brickFactory from "./Cards/basic-set/brick-factory.jpg"
// import brickShip from "./Cards/basic-set/brick-ship.jpg"
// import brigitta from "./Cards/basic-set/brigitta.jpg"
// import candamir from "./Cards/basic-set/candamir.jpg"
// import goldShip from "./Cards/basic-set/gold-ship.jpg"
// import goldSmith from "./Cards/basic-set/goldsmith.jpg"
// import grainMill from "./Cards/basic-set/grain-mill.jpg"
// import grainShip from "./Cards/basic-set/grain-ship.jpg"
// import harald from "./Cards/basic-set/harald.jpg"
// import inga from "./Cards/basic-set/inga.jpg"
// import ironFoundry from "./Cards/basic-set/iron-foundry.jpg"
// import largeTradeShip from "./Cards/basic-set/large-trade-ship.jpg"
// import lumberCamp from "./Cards/basic-set/lumber-camp.jpg"
// import lumberShip from "./Cards/basic-set/lumber-ship.jpg"
// import marketplace from "./Cards/basic-set/marketplace.jpg"
// import merchantCaravan from "./Cards/basic-set/merchant-caravan.jpg"
// import oreShip from "./Cards/basic-set/ore-ship.jpg"
// import osmund from "./Cards/basic-set/osmund.jpg"
// import parishHall from "./Cards/basic-set/parish-hall.jpg"
// import relocation from "./Cards/basic-set/relocation.jpg"
// import scout from "./Cards/basic-set/scout.jpg"
// import siglind from "./Cards/basic-set/siglind.jpg"
// import storehouse from "./Cards/basic-set/storehouse.jpg"
// import tollBridge from "./Cards/basic-set/toll-bridge.jpg"
// import weaversShop from "./Cards/basic-set/weavers-shop.jpg"
// import woolShip from "./Cards/basic-set/wool-ship.jpg"

// import cityBack from "./Cards/other/city-back.jpg"
// import cityFront from "./Cards/other/city-front.jpg"
// import roadBack from "./Cards/other/road-back.jpg"
// import roadFront from "./Cards/other/road-front.jpg"
// import settlementBack from "./Cards/other/settlement-back.jpg"
// import settlementFront from "./Cards/other/settlement-front.jpg"

// toDo
// array for costs for each building
// maybe seperate by types like red cards and building cards
// array for region cards
// region type and dice
// simulated dice role
// all event cards need logic built into them
// seperate array for action cards?
// victory point tracking
// tracker to see who has the most commerce and strength points
// auto shuffling for red and question cards

// add
// victory points
// commerce points
// strength points
// progress points

interface CardDefinition {
  type: string // might remove, change to card name
  display: string // might remove
  resourceType: string
  resourceCount: number
  diceNumber: number
  index: number
  image: string
  buildingType: string
  rotation: number
  minRotation: number
  maxRotation: number
  commercePoints: number
  strengthPoints: number
  progressPoints: number
  skillPoints: number
  victoryPoints: number
}

const blueStartingCards: CardDefinition[] = [
  {
    type: "none",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 0,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "build",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 1,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "none",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 2,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "build",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 3,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "none",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 4,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "build",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 5,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "none",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 6,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "build",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 7,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "none",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 8,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "build",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 9,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "none",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 10,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "region",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 11,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "build",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 12,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "region",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 13,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "build",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 14,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "region",
    display: "yes",
    resourceType: "lumber",
    resourceCount: 1,
    diceNumber: 3,
    index: 15,
    image: blueWood,
    buildingType: "",
    rotation: 0,
    minRotation: 90,
    maxRotation: -180,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "build",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 16,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "region",
    display: "yes",
    resourceType: "gold",
    resourceCount: 0,
    diceNumber: 4,
    index: 17,
    image: blueGold,
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "build",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 18,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "region",
    display: "yes",
    resourceType: "grain",
    resourceCount: 1,
    diceNumber: 5,
    index: 19,
    image: blueWheat,
    buildingType: "",
    rotation: 0,
    minRotation: 90,
    maxRotation: -180,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "build",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 20,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "region",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 21,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "none",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 22,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "settlement",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 23,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "road",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 24,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "settlement",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 25,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "road",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 26,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "settlement",
    display: "yes",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 27,
    image: blueSettlement,
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 1,
  },
  {
    type: "road",
    display: "yes",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 28,
    image: blueRoad,
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "settlement",
    display: "yes",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 29,
    image: blueSettlement,
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 1,
  },
  {
    type: "road",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 30,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "settlement",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 31,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "none",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 32,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "region",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 33,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "build",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 34,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "region",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 35,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "build",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 36,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "region",
    display: "yes",
    resourceType: "brick",
    resourceCount: 1,
    diceNumber: 2,
    index: 37,
    image: blueBrick,
    buildingType: "",
    rotation: 0,
    minRotation: 90,
    maxRotation: -180,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "build",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 38,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "region",
    display: "yes",
    resourceType: "wool",
    resourceCount: 1,
    diceNumber: 1,
    index: 39,
    image: blueSheep,
    buildingType: "",
    rotation: 0,
    minRotation: 90,
    maxRotation: -180,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "build",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 40,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "region",
    display: "yes",
    resourceType: "ore",
    resourceCount: 1,
    diceNumber: 6,
    index: 41,
    image: blueRock,
    buildingType: "",
    rotation: 0,
    minRotation: 90,
    maxRotation: -180,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "build",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 42,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "region",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 43,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "none",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 44,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "build",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 45,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "none",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 46,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "build",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 47,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "none",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 48,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "build",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 49,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "none",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 50,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "build",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 51,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "none",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 52,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "build",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 53,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
  {
    type: "none",
    display: "no",
    resourceType: "",
    resourceCount: 0,
    diceNumber: 0,
    index: 54,
    image: "",
    buildingType: "",
    rotation: 0,
    minRotation: 0,
    maxRotation: -270,
    commercePoints: 0,
    strengthPoints: 0,
    progressPoints: 0,
    skillPoints: 0,
    victoryPoints: 0,
  },
]

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

import { useEffect, useState } from "react"
// add resource points to the cards
function App() {
  const [blueCards, setCards] = useState<CardDefinition[]>(blueStartingCards)
  const [blueResources, setBlueResources] =
    useState<ResourceTracker>(startingResources)

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
  }, [blueCards])

  function addResource(card: CardDefinition) {
    setCards(cards => {
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
    setCards(cards => {
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

  return (
    <>
      <div className="window">
        <div className="statsBar">
          <div className="resourceTracker">
            <div className="resource">{`Brick: ${blueResources.brick}`}</div>
            <div className="resource">{`Gold: ${blueResources.gold}`}</div>
            <div className="resource">{`Grain: ${blueResources.grain}`}</div>
            <div className="resource">{`Lumber: ${blueResources.lumber}`}</div>
            <div className="resource">{`Ore: ${blueResources.ore}`}</div>
            <div className="resource">{`Wool: ${blueResources.wool}`}</div>
          </div>
          <div className="resourceTracker">
            <div className="resource">{`Victory Points: ${blueResources.victoryPoints}`}</div>
            <div className="resource">{`Commerce Points: ${blueResources.commercePoints}`}</div>
            <div className="resource">{`Strength Points: ${blueResources.strengthPoints}`}</div>
          </div>
          <div className="resourceTracker">
            <div className="resource">{`Progress Points: ${blueResources.progressPoints}`}</div>
            <div className="resource">{`Skill Points: ${blueResources.skillPoints}`}</div>
          </div>
        </div>

        <div className="board rotate">
          {blueCards.map((card: CardDefinition, index: number) => {
            if (card.type === "region") {
              return (
                <div
                  className="card"
                  key={index}
                  onClick={() => addResource(card)}
                  style={{
                    backgroundImage: `url(${card.image})`,
                    transform: `rotate(${card.rotation}deg)`,
                  }}
                ></div>
              )
            }

            return (
              <div
                className="card"
                key={index}
                style={{
                  backgroundImage: `url(${card.image})`,
                }}
              >
                {` ${card.index} ${card.type}`}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
