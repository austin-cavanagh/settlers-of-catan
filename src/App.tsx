import { useEffect, useState } from "react"

import city from "./Cards/other/city-back.jpg"

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

import {
  centerCards,
  CenterCard,
  RegionCard,
  startRegionCards,
} from "./centerCards.tsx"

interface CardDefinition {
  type: string // might remove, change to card name
  display: string // might remove
  resourceType: string | undefined
  resourceCount: number
  diceNumber: number | undefined
  index: number
  image: string | undefined
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
    buildingType: "region",
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
    buildingType: "region",
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
    buildingType: "region",
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
    buildingType: "settlement",
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
    buildingType: "road",
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
    buildingType: "settlement",
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
    buildingType: "region",
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
    buildingType: "region",
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
    buildingType: "region",
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
  const [blueCards, setBlueCards] =
    useState<CardDefinition[]>(blueStartingCards)
  const [blueResources, setBlueResources] =
    useState<ResourceTracker>(startingResources)
  const [blueOpenExpandTiles, setBlueOpenExpandTiles] =
    useState<OpenExpandTiles>(startingOpenExpandTiles)
  const [colors, setColors] = useState<string[]>(
    new Array(55).fill("transparent")
  )
  // tracking settlements to turn into cities
  const [blueSettlements, setBlueSettlements] = useState<number[]>([27, 29])

  // variable that tells me if I am building
  // store which card I clicked to build - I think the card already checks if i can build it
  // and which tiles I can actually click on that are valid places to go
  const [buildMode, setBuildMode] = useState(startBuildMode)

  // region card stack and building regions
  const [regionCards, setRegionCards] = useState<RegionCard[]>(startRegionCards)
  const [buildRegion, setBuildRegion] = useState(startBuildRegion)

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
  function placeRegion(index: number) {
    const newColors = new Array(55).fill("transparent")

    // will run the function run 2 times, 1 for each placement
    // so if there are 2 spots this is the first run
    if (buildRegion.buildSpots.length === 2) {
      // determine which index is being built this run
      let index: number | undefined

      const remainingSpot: number[] = []
      if (buildRegion.buildSpots[1] === index) {
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

  console.log(buildRegion)

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

        <div className="board rotate">
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
    </>
  )
}

export default App
