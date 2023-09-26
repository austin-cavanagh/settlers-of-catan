import { EventDie, ProductionDie } from "./diceFunctions"

export function Dice({
  eventDie,
  productionDie,
}: {
  eventDie: EventDie | undefined
  productionDie: ProductionDie | undefined
}) {
  return (
    <>
      <div className="dice-div">
        <div
          className={`dice ${eventDie !== undefined ? "" : "hide"}`}
          style={{ backgroundImage: `url(${eventDie?.image})` }}
        ></div>
        <div
          className={`dice margin-left ${
            productionDie !== undefined ? "" : "hide"
          }`}
          style={{ backgroundImage: `url(${productionDie?.image})` }}
        ></div>
      </div>
    </>
  )
}
