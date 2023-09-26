import blueShieldIcon from "./icons/blue-shield-icon.png"
import redShieldIcon from "./icons/red-shield-icon.png"
import victoryIcon from "./icons/victory-icon.png"
import strengthIcon from "./icons/strength-icon.png"
import commerceIcon from "./icons/commerce-icon.png"
import skillIcon from "./icons/skill-icon.png"
import progressIcon from "./icons/progress-icon.png"
import brickIcon from "./icons/brick-icon.png"
import goldIcon from "./icons/gold-icon.png"
import grainIcon from "./icons/grain-icon.png"
import lumberIcon from "./icons/lumber-icon.png"
import oreIcon from "./icons/ore-icon.png"
import woolIcon from "./icons/wool-icon.png"

interface ResourceTracker {
  [key: string]: number
}

const blueIconArray: string[] = [
  victoryIcon,
  strengthIcon,
  commerceIcon,
  skillIcon,
  progressIcon,
  lumberIcon,
  brickIcon,
  grainIcon,
  woolIcon,
  oreIcon,
  goldIcon,
]

const redIconArray: string[] = [...blueIconArray].reverse()

export function RedPlayerResources({
  redResourceArray,
  redResources,
  strengthAdvantage,
  tradeAdvantage,
  turn,
}: {
  redResourceArray: string[]
  redResources: ResourceTracker
  strengthAdvantage: string
  tradeAdvantage: string
  turn: string
}) {
  return (
    <>
      <div className="color-bar red-background">
        {redResourceArray.map((resource, index) => {
          return (
            <div className="resource-parent" key={index}>
              <div
                className="circle"
                style={{ backgroundImage: `url(${redIconArray[index]})` }}
              ></div>
              <div className={`resource ${turn}`}>{`${
                redResources[resource] +
                (strengthAdvantage === "red" ? 1 : 0) +
                (tradeAdvantage === "red" ? 1 : 0)
              }`}</div>
            </div>
          )
        })}
        <div
          className="circle big"
          style={{ backgroundImage: `url(${redShieldIcon})` }}
        ></div>
      </div>
    </>
  )
}

export function BluePlayerResources({
  blueResourceArray,
  blueResources,
  strengthAdvantage,
  tradeAdvantage,
  turn,
}: {
  blueResourceArray: string[]
  blueResources: ResourceTracker
  strengthAdvantage: string
  tradeAdvantage: string
  turn: string
}) {
  return (
    <>
      <div className="color-bar blue-background">
        <div
          className="circle big"
          style={{ backgroundImage: `url(${blueShieldIcon})` }}
        ></div>
        {blueResourceArray.map((resource, index) => {
          return (
            <div className="resource-parent" key={index}>
              <div
                className="circle"
                style={{ backgroundImage: `url(${blueIconArray[index]})` }}
              ></div>
              <div className={`resource ${turn}`}>{`${
                blueResources[resource] +
                (strengthAdvantage === "blue" ? 1 : 0) +
                (tradeAdvantage === "blue" ? 1 : 0)
              }`}</div>
            </div>
          )
        })}
      </div>
    </>
  )
}
