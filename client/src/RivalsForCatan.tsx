import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';

import {
  RedPlayerResources,
  BluePlayerResources,
} from './RedPlayerResources.tsx';

import blueShieldIcon from './icons/blue-shield-icon.png';
import redShieldIcon from './icons/red-shield-icon.png';
import victoryIcon from './icons/victory-icon.png';
import strengthIcon from './icons/strength-icon.png';
import commerceIcon from './icons/commerce-icon.png';
import skillIcon from './icons/skill-icon.png';
import progressIcon from './icons/progress-icon.png';
import brickIcon from './icons/brick-icon.png';
import goldIcon from './icons/gold-icon.png';
import grainIcon from './icons/grain-icon.png';
import lumberIcon from './icons/lumber-icon.png';
import oreIcon from './icons/ore-icon.png';
import woolIcon from './icons/wool-icon.png';

import wood6 from './wood-background/WOODGRAIN.jpg';
import { useEffect, useState, useRef } from 'react';
import city from './Cards/other/city-back.jpg';
import blueRoad from './cards/blue-player/blue-road.jpg';
import blueSettlement from './cards/blue-player/blue-settlement.jpg';

import {
  startCenterCards,
  CenterCard,
  RegionCard,
  startRegionCards,
  blueStartHand,
  redStartHand,
  CardStats,
} from './centerCards.tsx';

import {
  CardDefinition,
  blueStartingCards,
  redStartingCards,
} from './startingCards.tsx';

import {
  productionRoll,
  eventRoll,
  EventDie,
  ProductionDie,
} from './diceFunctions.tsx';

import { boostedRegion } from './boostedRegion.ts';
import { EndScreen } from './EndScreen.tsx';
import { StartScreen } from './StartScreen.tsx';
import { Dice } from './Dice.tsx';

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
];

const redIconArray: string[] = [...blueIconArray].reverse();

const blueResourceArray: string[] = [
  'victoryPoints',
  'strengthPoints',
  'commercePoints',
  'skillPoints',
  'progressPoints',
  'lumber',
  'brick',
  'grain',
  'wool',
  'ore',
  'gold',
];

const redResourceArray: string[] = [...blueResourceArray].reverse();

interface ResourceTracker {
  [key: string]: number;
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
};

interface OpenExpandTiles {
  left: OpenSpotsObject;
  right: OpenSpotsObject;
}

interface OpenSpotsObject {
  building: string;
  index: number;
}

const startingOpenExpandTiles: OpenExpandTiles = {
  left: { building: 'road', index: 26 },
  right: { building: 'road', index: 30 },
};

interface BuildMode {
  active: string;
  buildingType: string;
  possibleMoves: number[];
  victoryPoints: number;
  skillPoints: number;
  progressPoints: number;
  commercePoints: number;
  strengthPoints: number;
  image: string;
  cost: Resources;
}

const startBuildMode: BuildMode = {
  active: '',
  buildingType: '',
  possibleMoves: [],
  victoryPoints: 0,
  skillPoints: 0,
  progressPoints: 0,
  commercePoints: 0,
  strengthPoints: 0,
  image: '',
  cost: {
    lumber: 0,
    gold: 0,
    grain: 0,
    brick: 0,
    wool: 0,
    ore: 0,
  },
};

const startColors: string[] = new Array(55).fill('transparent');

const startSettlements: number[] = [27, 29];

const startOpenBuildTiles: number[] = [16, 18, 38, 40];

interface Resources {
  [resource: string]: number;
}

interface StartBuildBasic {
  active: string;
  possibleMoves: number[];
  card: CardStats | undefined;
  cost: Resources;
}

const startBuildBasic: StartBuildBasic = {
  active: '',
  possibleMoves: [],
  card: undefined,
  cost: {
    lumber: 0,
    gold: 0,
    grain: 0,
    brick: 0,
    wool: 0,
    ore: 0,
  },
};

const startCost: Resources = {
  brick: 0,
  gold: 0,
  grain: 0,
  lumber: 0,
  ore: 0,
  wool: 0,
};

interface VictoryPointsTracker {
  red: number;
  blue: number;
}

const startVictoryPoints: VictoryPointsTracker = {
  red: 2,
  blue: 2,
};

interface PayState {
  total: number;
  cost: Resources;
  possibleMoves: number[];
}

const StartPayState: PayState = {
  total: 0,
  cost: startCost,
  possibleMoves: [],
};

function RivalsForCatan() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>('');

  const [playerColor, setPlayerColor] = useState<string>('');

  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  const [payState, setPayState] = useState<PayState>(StartPayState);

  // vitory points
  const [victoryPointsTracker, setVictoryPointsTracker] =
    useState<VictoryPointsTracker>(startVictoryPoints);

  // resources
  const [buildingCost, setBuildingCost] = useState<Resources>(startCost);

  // advantages
  const [tradeAdvantage, setTradeAdvantage] = useState<string>('');
  const [strengthAdvantage, setStrengthAdvantage] = useState<string>('');

  // dice
  const [productionDie, setProductionDie] = useState<ProductionDie>();
  const [eventDie, setEventDie] = useState<EventDie>();

  // cards setup
  const [centerCards, setCenterCards] =
    useState<CenterCard[]>(startCenterCards);

  const [turn, setTurn] = useState<string>('blue');

  // player cards
  const [blueHand, setBlueHand] = useState<CardStats[]>(blueStartHand);
  const [redHand, setRedHand] = useState<CardStats[]>(redStartHand);

  const [regionCards, setRegionCards] =
    useState<RegionCard[]>(startRegionCards);

  // tile color states
  const [blueColors, setBlueColors] = useState<string[]>(startColors);
  const [redColors, setRedColors] = useState<string[]>(startColors);
  const [blueRegionColors, setBlueRegionColors] =
    useState<string[]>(startColors);
  const [redRegionColors, setRedRegionColors] = useState<string[]>(startColors);

  // variables for selecting and placing cards
  const [buildMode, setBuildMode] = useState<BuildMode>(startBuildMode);
  const [buildBasic, setBuildBasic] =
    useState<StartBuildBasic>(startBuildBasic);

  const [blueOpenExpandTiles, setBlueOpenExpandTiles] =
    useState<OpenExpandTiles>(startingOpenExpandTiles);
  const [redOpenExpandTiles, setRedOpenExpandTiles] = useState<OpenExpandTiles>(
    {
      left: { building: 'road', index: 26 },
      right: { building: 'road', index: 30 },
    }
  );

  const [blueOpenBuildTiles, setBlueOpenBuildTiles] =
    useState<number[]>(startOpenBuildTiles);
  const [redOpenBuildTiles, setRedOpenBuildTiles] =
    useState<number[]>(startOpenBuildTiles);

  const [blueSettlements, setBlueSettlements] =
    useState<number[]>(startSettlements);
  const [redSettlements, setRedSettlements] =
    useState<number[]>(startSettlements);

  const [blueResources, setBlueResources] =
    useState<ResourceTracker>(startingResources);
  const [redResources, setRedResources] =
    useState<ResourceTracker>(startingResources);

  const [blueCards, setBlueCards] =
    useState<CardDefinition[]>(blueStartingCards);
  const [redCards, setRedCards] = useState<CardDefinition[]>(redStartingCards);

  useEffect(() => {
    setBlueResources(blueResources => {
      const newResources: ResourceTracker = { ...blueResources };

      Object.keys(blueResources).forEach(resourceKey => {
        // typecast?
        const resource = resourceKey as keyof ResourceTracker;

        // update victory, commerce, strength points
        if (
          resource === 'victoryPoints' ||
          resource === 'commercePoints' ||
          resource === 'strengthPoints' ||
          resource === 'progressPoints' ||
          resource === 'skillPoints'
        ) {
          const newCount: number = blueCards.reduce((acc: number, currCard) => {
            return acc + currCard[resource];
          }, 0);
          newResources[resource] = newCount;
        } else {
          // update resource points
          const newCount: number = blueCards.reduce((acc: number, currCard) => {
            if (resource === currCard.resourceType) {
              acc += currCard.resourceCount;
            }
            return acc;
          }, 0);
          newResources[resource] = newCount;
        }
      });

      return newResources;
    });

    setRedResources(redResources => {
      const newResources: ResourceTracker = { ...redResources };

      Object.keys(redResources).forEach(resourceKey => {
        // typecast?
        const resource = resourceKey as keyof ResourceTracker;

        // update victory, commerce, strength points
        if (
          resource === 'victoryPoints' ||
          resource === 'commercePoints' ||
          resource === 'strengthPoints' ||
          resource === 'progressPoints' ||
          resource === 'skillPoints'
        ) {
          const newCount: number = redCards.reduce((acc: number, currCard) => {
            return acc + currCard[resource];
          }, 0);
          newResources[resource] = newCount;
        } else {
          // update resource points
          const newCount: number = redCards.reduce((acc: number, currCard) => {
            if (resource === currCard.resourceType) {
              acc += currCard.resourceCount;
            }
            return acc;
          }, 0);
          newResources[resource] = newCount;
        }
      });

      return newResources;
    });

    setBlueOpenExpandTiles(blueOpenExpandTiles => {
      const { left: leftTile, right: rightTile } = blueOpenExpandTiles;
      let leftBuilding = leftTile.building;
      let leftIndex = leftTile.index;
      let rightBuilding = rightTile.building;
      let rightIndex = rightTile.index;

      // left side
      if (blueCards[leftIndex].image !== '' && leftIndex > 22) {
        leftIndex--;
        leftBuilding = leftBuilding === 'road' ? 'settlement' : 'road';
      }

      // right side
      if (blueCards[rightIndex].image !== '' && rightIndex < 32) {
        rightIndex++;
        rightBuilding = rightBuilding === 'road' ? 'settlement' : 'road';
      }

      // if index is 22 or 32 set building to none
      if (leftIndex <= 22) leftBuilding = 'none';
      if (rightIndex >= 32) rightBuilding = 'none';

      blueOpenExpandTiles.left.building = leftBuilding;
      blueOpenExpandTiles.left.index = leftIndex;
      blueOpenExpandTiles.right.building = rightBuilding;
      blueOpenExpandTiles.right.index = rightIndex;

      return blueOpenExpandTiles;
    });

    setRedOpenExpandTiles(redOpenExpandTiles => {
      const { left: leftTile, right: rightTile } = redOpenExpandTiles;
      let leftBuilding = leftTile.building;
      let leftIndex = leftTile.index;
      let rightBuilding = rightTile.building;
      let rightIndex = rightTile.index;

      // left side
      if (redCards[leftIndex].image !== '' && leftIndex > 22) {
        leftIndex--;
        leftBuilding = leftBuilding === 'road' ? 'settlement' : 'road';
      }

      // right side
      if (redCards[rightIndex].image !== '' && rightIndex < 32) {
        rightIndex++;
        rightBuilding = rightBuilding === 'road' ? 'settlement' : 'road';
      }

      // if index is 22 or 32 set building to none
      if (leftIndex <= 22) leftBuilding = 'none';
      if (rightIndex >= 32) rightBuilding = 'none';

      redOpenExpandTiles.left.building = leftBuilding;
      redOpenExpandTiles.left.index = leftIndex;
      redOpenExpandTiles.right.building = rightBuilding;
      redOpenExpandTiles.right.index = rightIndex;

      return redOpenExpandTiles;
    });

    setBlueOpenBuildTiles(() => {
      const buildTiles: number[] = [];
      blueCards.forEach((tile, index) => {
        if (tile.buildingType === 'settlement') {
          if (blueCards[index - 11].display === 'no')
            buildTiles.push(index - 11);
          if (blueCards[index + 11].display === 'no')
            buildTiles.push(index + 11);
        }

        if (tile.buildingType === 'city') {
          if (blueCards[index - 11].display === 'no') {
            buildTiles.push(index - 11);
          } else if (blueCards[index - 22].display === 'no') {
            buildTiles.push(index - 22);
          }

          if (blueCards[index + 11].display === 'no') {
            buildTiles.push(index + 11);
          } else if (blueCards[index + 22].display === 'no') {
            buildTiles.push(index + 22);
          }
        }
      });

      return buildTiles;
    });

    setRedOpenBuildTiles(() => {
      const buildTiles: number[] = [];
      redCards.forEach((tile, index) => {
        if (tile.buildingType === 'settlement') {
          if (redCards[index - 11].display === 'no')
            buildTiles.push(index - 11);
          if (redCards[index + 11].display === 'no')
            buildTiles.push(index + 11);
        }

        if (tile.buildingType === 'city') {
          if (redCards[index - 11].display === 'no') {
            buildTiles.push(index - 11);
          } else if (redCards[index - 22].display === 'no') {
            buildTiles.push(index - 22);
          }

          if (redCards[index + 11].display === 'no') {
            buildTiles.push(index + 11);
          } else if (redCards[index + 22].display === 'no') {
            buildTiles.push(index + 22);
          }
        }
      });

      return buildTiles;
    });

    setBlueSettlements(blueSettlements => {
      const newArray: number[] = [];
      blueCards.forEach((card, index) => {
        if (card.buildingType === 'settlement') newArray.push(index);
      });
      return newArray;
    });

    setRedSettlements(redSettlements => {
      const newArray: number[] = [];
      redCards.forEach((card, index) => {
        if (card.buildingType === 'settlement') newArray.push(index);
      });
      return newArray;
    });
  }, [blueCards, redCards]);

  useEffect(() => {
    setTradeAdvantage(tradeAdvantage => {
      if (
        (blueResources.commercePoints >= 3 ||
          redResources.commercePoints >= 3) &&
        blueResources.commercePoints !== redResources.commercePoints
      ) {
        tradeAdvantage =
          blueResources.commercePoints > redResources.commercePoints
            ? 'blue'
            : 'red';
      }
      return tradeAdvantage;
    });

    setStrengthAdvantage(strengthAdvantage => {
      if (
        (blueResources.strengthPoints >= 3 ||
          redResources.strengthPoints >= 3) &&
        blueResources.strengthPoints !== redResources.strengthPoints
      ) {
        strengthAdvantage =
          blueResources.strengthPoints > redResources.strengthPoints
            ? 'blue'
            : 'red';
      }
      return strengthAdvantage;
    });

    checkWin();
  }, [blueResources, redResources]);

  useEffect(() => {
    setVictoryPointsTracker(victoryPointsTracker => {
      victoryPointsTracker.blue = blueResources.victoryPoints;
      victoryPointsTracker.red = redResources.victoryPoints;

      if (tradeAdvantage === 'blue') victoryPointsTracker.blue++;
      if (tradeAdvantage === 'red') victoryPointsTracker.red++;

      if (strengthAdvantage === 'blue') victoryPointsTracker.blue++;
      if (strengthAdvantage === 'red') victoryPointsTracker.red++;

      return victoryPointsTracker;
    });
  }, [strengthAdvantage, tradeAdvantage]);

  // socket.io
  const [socket, setSocket] = useState<Socket>();
  const [isLocalChange, setIsLocalChange] = useState<boolean>(false);
  const { id: documentId } = useParams<string>();

  // creating new socket
  useEffect(() => {
    const newSocket: Socket = io('http://localhost:3000');

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // getting old or new document from server
  useEffect(() => {
    if (socket == null) return;

    socket.once(
      'load-document',
      ({
        messages,
        playerCards: { blueCards, redCards },
        playerHands: { blueHand, redHand },
        turn,
        dice: { productionDie, eventDie },
        centerCards,
        gameStarted,
      }) => {
        if (!blueCards[0]) return;

        setMessages(messages);

        setBlueCards(blueCards);
        setRedCards(redCards);

        setBlueHand(blueHand);
        setRedHand(redHand);

        setTurn(turn);

        setProductionDie(productionDie);
        setEventDie(eventDie);

        setCenterCards(centerCards);

        setGameStarted(gameStarted);
      }
    );

    socket.on('connect', () => {
      socket.emit('get-document', {
        documentId: documentId,
        socketId: socket.id,
      });
    });
  }, [socket, documentId]);

  // periodically updating database
  useEffect(() => {
    if (socket == null) return;

    const interval = setInterval(() => {
      socket.emit('update-database-messages', messages);
      socket.emit('update-database-playerCards', { blueCards, redCards });
      socket.emit('update-database-playerHands', { blueHand, redHand });
      socket.emit('update-database-turn', turn);
      socket.emit('update-database-dice', { productionDie, eventDie });
      socket.emit('update-database-centerCards', centerCards);
      socket.emit('update-database-gameStarted', gameStarted);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [
    socket,
    messages,
    blueCards,
    redCards,
    blueHand,
    redHand,
    turn,
    productionDie,
    eventDie,
    centerCards,
    gameStarted,
  ]);

  // redirect user to new page if page is full
  useEffect(() => {
    if (socket == null) return;

    const roomFull = () => {
      const newUrl = crypto.randomUUID();
      window.location.href = `http://localhost:5173/documents/${newUrl}`;
      alert(`Room is full - you are being redirected to an empty webpage`);
    };

    socket.on('room-full', roomFull);

    return () => {
      socket.off('room-full', roomFull);
    };
  }, [socket]);

  // determining which color the user is
  useEffect(() => {
    if (socket == null) return;

    socket.on('color-from-server', setPlayerColor);
  }, [socket]);

  // client updates - messages
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }

    if (socket == null || isLocalChange === false) return;

    socket.emit('client-changes-messages', messages);

    setIsLocalChange(false);
  }, [messages]);

  // server updates - messages
  useEffect(() => {
    if (socket == null) return;

    const recieveMessages = (messages: string[]) => {
      setMessages(messages);
    };

    socket.on('server-changes-messages', recieveMessages);

    return () => {
      socket.off('server-changes-messages', recieveMessages);
    };
  }, [socket]);

  // client updates - playerCards
  useEffect(() => {
    if (socket == null || isLocalChange === false) return;

    socket.emit('client-changes-playerCards', { blueCards, redCards });

    setIsLocalChange(false);
  }, [blueCards, redCards]);

  // server updates - playerCards
  useEffect(() => {
    if (socket == null) return;

    const recievePlayerCards = ({
      blueCards,
      redCards,
    }: {
      blueCards: CardDefinition[];
      redCards: CardDefinition[];
    }) => {
      setBlueCards(blueCards);
      setRedCards(redCards);
    };

    socket.on('server-changes-playerCards', recievePlayerCards);

    return () => {
      socket.off('server-changes-playerCards', recievePlayerCards);
    };
  }, [socket]);

  // client updates - playerHand
  useEffect(() => {
    if (socket == null || isLocalChange === false) return;

    socket.emit('client-changes-playerHands', { blueHand, redHand });

    setIsLocalChange(false);
  }, [blueHand, redHand]);

  // server updates - playerHand
  useEffect(() => {
    if (socket == null) return;

    const recievePlayerHands = ({
      blueHand,
      redHand,
    }: {
      blueHand: CardStats[];
      redHand: CardStats[];
    }) => {
      setBlueHand(blueHand);
      setRedHand(redHand);
    };

    socket.on('server-changes-playerHands', recievePlayerHands);

    return () => {
      socket.off('server-changes-playerHands', recievePlayerHands);
    };
  }, [socket]);

  // client updates - turn
  useEffect(() => {
    if (socket == null || isLocalChange === false) return;

    socket.emit('client-changes-turn', turn);

    setIsLocalChange(false);
  }, [turn]);

  // server updates - turn
  useEffect(() => {
    if (socket == null) return;

    const recieveTurn = (turn: string) => {
      setTurn(turn);
    };

    socket.on('server-changes-turn', recieveTurn);

    return () => {
      socket.off('server-changes-turn', recieveTurn);
    };
  }, [socket]);

  // client updates - dice
  useEffect(() => {
    if (socket == null || isLocalChange === false) return;

    socket.emit('client-changes-dice', { productionDie, eventDie });

    setIsLocalChange(false);
  }, [productionDie, eventDie]);

  // server updates - dice
  useEffect(() => {
    if (socket == null) return;

    const recieveDice = ({
      productionDie,
      eventDie,
    }: {
      productionDie: ProductionDie;
      eventDie: EventDie;
    }) => {
      setProductionDie(productionDie);
      setEventDie(eventDie);
    };

    socket.on('server-changes-dice', recieveDice);

    return () => {
      socket.off('server-changes-dice', recieveDice);
    };
  }, [socket]);

  // client updates - centerCards
  useEffect(() => {
    if (socket == null || isLocalChange === false) return;

    socket.emit('client-changes-centerCards', centerCards);

    setIsLocalChange(false);
  }, [centerCards]);

  // server updates - centerCards
  useEffect(() => {
    if (socket == null) return;

    const recieveCenterCards = (centerCards: CenterCard[]) => {
      setCenterCards(centerCards);
    };

    socket.on('server-changes-centerCards', recieveCenterCards);

    return () => {
      socket.off('server-changes-centerCards', recieveCenterCards);
    };
  }, [socket]);

  // client updates - gameStarted
  useEffect(() => {
    if (socket == null || isLocalChange === false) return;

    socket.emit('client-changes-gameStarted', gameStarted);

    setIsLocalChange(false);
  }, [gameStarted]);

  // server updates - gameStarted
  useEffect(() => {
    if (socket == null) return;

    const recieveGameStarted = (gameStarted: boolean) => {
      setGameStarted(gameStarted);
    };

    socket.on('server-changes-gameStarted', recieveGameStarted);

    return () => {
      socket.off('server-changes-gameStarted', recieveGameStarted);
    };
  }, [socket]);

  function startGame() {
    setIsLocalChange(true);
    setGameStarted(true);
  }

  function checkWin() {
    let blueVictoryPoints = blueResources.victoryPoints;
    let redVictoryPoints = redResources.victoryPoints;

    if (strengthAdvantage === 'blue') blueVictoryPoints++;
    if (strengthAdvantage === 'red') redVictoryPoints++;

    if (tradeAdvantage === 'blue') blueVictoryPoints++;
    if (tradeAdvantage === 'red') redVictoryPoints++;

    if (blueVictoryPoints >= 10) playerWins('blue');
    if (redVictoryPoints >= 10) playerWins('red');
  }

  function playerWins(winner: string) {
    const winnerCapitalized = winner.charAt(0).toUpperCase() + winner.slice(1);
    setGameWinner(winnerCapitalized);
  }

  function selectPayResource(card: CardDefinition) {
    const playerCards = turn === 'blue' ? blueCards : redCards;
    const setPlayerCards = turn === 'blue' ? setBlueCards : setRedCards;
    const setPlayerRegionColors =
      turn === 'blue' ? setBlueRegionColors : setRedRegionColors;

    setPlayerCards(playerCards => {
      return playerCards.map(currCard => {
        if (card === currCard) {
          if (currCard.rotation === currCard.minRotation) {
            return card;
          }
          currCard.resourceCount--;
          return { ...currCard, rotation: currCard.rotation + 90 };
        }
        return currCard;
      });
    });

    const resourceType = card.resourceType;
    const newColors = new Array(55).fill('transparent');
    const possibleTiles: number[] = [];
    // lower the cost of the paid resource
    const cost = payState.cost;
    cost[resourceType]--;

    Object.entries(cost).forEach(([resource, amount]: [string, number]) => {
      if (amount > 0) {
        playerCards.forEach((card, index) => {
          if (card.resourceType === resource && card.resourceCount > 0) {
            possibleTiles.push(index);
            newColors[index] = 'green';
          }
        });
      }
    });

    setPayState(payState => {
      return {
        ...payState,
        total: payState.total - 1,
        cost: {
          ...cost,
          [resourceType]: cost[resourceType],
        },
        possibleMoves: possibleTiles,
      };
    });

    setPlayerRegionColors(newColors);

    setIsLocalChange(true);
  }

  function setupPayState() {
    const playerCards = turn === 'blue' ? blueCards : redCards;
    const newColors = new Array(55).fill('transparent');
    const cost = buildMode.active === turn ? buildMode.cost : buildBasic.cost;
    const totalCost = Object.values(cost).reduce(
      (acc, currval) => acc + currval,
      0
    );
    const possibleTiles: number[] = [];

    Object.entries(cost).forEach(([resource, amount]: [string, number]) => {
      if (amount > 0) {
        playerCards.forEach((card, index) => {
          if (card.resourceType === resource && card.resourceCount > 0) {
            possibleTiles.push(index);
            newColors[index] = 'green';
          }
        });
      }
    });

    setPayState(payState => {
      return {
        ...payState,
        cost: cost,
        total: totalCost,
        possibleMoves: possibleTiles,
      };
    });

    turn === 'blue'
      ? setBlueRegionColors(newColors)
      : setRedRegionColors(newColors);
  }

  function selectCardFromHand(card: CardStats) {
    const newColors = new Array(55).fill('transparent');
    const possibleMovesByColor =
      turn === 'blue' ? blueOpenBuildTiles : redOpenBuildTiles;
    const playerResources = turn === 'blue' ? blueResources : redResources;

    // calculating cost of the item
    const cost = {
      brick: card.brick,
      gold: card.gold,
      grain: card.grain,
      lumber: card.lumber,
      ore: card.ore,
      wool: card.wool,
    };

    // return if not enough resources
    if (playerResources.brick < cost.brick) return;
    if (playerResources.gold < cost.gold) return;
    if (playerResources.grain < cost.grain) return;
    if (playerResources.lumber < cost.lumber) return;
    if (playerResources.ore < cost.ore) return;
    if (playerResources.wool < cost.wool) return;

    // set building details
    setBuildBasic(buildBasic => {
      buildBasic.active = turn;
      buildBasic.card = card;
      buildBasic.possibleMoves = possibleMovesByColor;
      buildBasic.cost = cost;
      return buildBasic;
    });

    possibleMovesByColor.forEach(index => {
      newColors[index] = 'green';
    });

    turn === 'blue' ? setBlueColors(newColors) : setRedColors(newColors);
  }

  function selectedCenterCard(stack: CenterCard) {
    // resets build states
    resetBuildModes();

    const OpenExpandTiles =
      turn === 'blue' ? blueOpenExpandTiles : redOpenExpandTiles;
    const currSettlements = turn === 'blue' ? blueSettlements : redSettlements;
    const playerResources = turn === 'blue' ? blueResources : redResources;
    const building = stack.cardStack;
    const newColors = new Array(55).fill('transparent');

    // calculating cost of the item
    const cost = {
      brick: stack.cardsInStack[0].brick,
      gold: stack.cardsInStack[0].gold,
      grain: stack.cardsInStack[0].grain,
      lumber: stack.cardsInStack[0].lumber,
      ore: stack.cardsInStack[0].ore,
      wool: stack.cardsInStack[0].wool,
    };

    // return if not enough resources
    if (playerResources.brick < cost.brick) return;
    if (playerResources.gold < cost.gold) return;
    if (playerResources.grain < cost.grain) return;
    if (playerResources.lumber < cost.lumber) return;
    if (playerResources.ore < cost.ore) return;
    if (playerResources.wool < cost.wool) return;

    setBuildingCost(buildingCost => {
      const { brick, gold, grain, lumber, ore } = stack.cardsInStack[0];
      return {
        ...buildingCost,
        brick,
        gold,
        grain,
        lumber,
        ore,
      };
    });

    // if road
    if (
      building === 'road' &&
      (OpenExpandTiles.left.building === 'road' ||
        OpenExpandTiles.right.building === 'road')
    ) {
      // highlighting possible moves and tracking which tiles
      const possibleMoves: number[] = [];
      if (building === OpenExpandTiles.left.building) {
        newColors[OpenExpandTiles.left.index] = 'green';
        possibleMoves.push(OpenExpandTiles.left.index);
      }
      if (building === OpenExpandTiles.right.building) {
        newColors[OpenExpandTiles.right.index] = 'green';
        possibleMoves.push(OpenExpandTiles.right.index);
      }
      setBuildMode(buildMode => ({
        ...buildMode,
        active: turn,
        buildingType: building,
        possibleMoves: possibleMoves,
        victoryPoints: 0,
        image: blueRoad,
        cost: {
          ...buildMode.cost,
          lumber: 1,
          brick: 2,
        },
      }));
    }

    // if settlement
    if (
      building === 'settlement' &&
      (OpenExpandTiles.left.building === 'settlement' ||
        OpenExpandTiles.right.building === 'settlement')
    ) {
      // highlighting possible moves and tracking which tiles
      const possibleMoves: number[] = [];
      if (building === OpenExpandTiles.left.building) {
        newColors[OpenExpandTiles.left.index] = 'green';
        possibleMoves.push(OpenExpandTiles.left.index);
      }
      if (building === OpenExpandTiles.right.building) {
        newColors[OpenExpandTiles.right.index] = 'green';
        possibleMoves.push(OpenExpandTiles.right.index);
      }

      setBuildMode(buildMode => ({
        ...buildMode,
        active: turn,
        buildingType: building,
        possibleMoves: possibleMoves,
        victoryPoints: 1,
        image: blueSettlement,
        cost: {
          ...buildMode.cost,
          lumber: 1,
          brick: 1,
          grain: 1,
          wool: 1,
        },
      }));
    }

    // if city
    if (building === 'city' && currSettlements.length !== 0) {
      const possibleMoves: number[] = currSettlements;
      possibleMoves.forEach(move => {
        newColors[move] = 'green';
      });
      setBuildMode(buildMode => ({
        ...buildMode,
        active: turn,
        buildingType: building,
        possibleMoves: possibleMoves,
        victoryPoints: 2,
        image: city,
        cost: {
          ...buildMode.cost,
          grain: 2,
          ore: 3,
        },
      }));
    }

    turn === 'blue' ? setBlueColors(newColors) : setRedColors(newColors);
  }

  function resetBuildModes() {
    setBuildingCost(buildingCost => ({
      ...buildingCost,
      brick: 0,
      gold: 0,
      grain: 0,
      lumber: 0,
      ore: 0,
      wool: 0,
    }));

    setBuildMode(buildMode => ({
      ...buildMode,
      active: '',
      buildingType: '',
      commercePoints: 0,
      image: '',
      possibleMoves: [],
      progressPoints: 0,
      skillPoints: 0,
      strengthPoints: 0,
      victoryPoints: 0,
      cost: {
        lumber: 0,
        gold: 0,
        grain: 0,
        brick: 0,
        wool: 0,
        ore: 0,
      },
    }));

    setBuildBasic(buildBasic => ({
      ...buildBasic,
      active: '',
      card: undefined,
      possibleMoves: [],
      cost: {
        lumber: 0,
        gold: 0,
        grain: 0,
        brick: 0,
        wool: 0,
        ore: 0,
      },
    }));
  }

  function buildCard(index: number) {
    const playerCards = turn === 'blue' ? blueCards : redCards;
    const setPlayerCards = turn === 'blue' ? setBlueCards : setRedCards;
    const setPlayerHand = turn === 'blue' ? setBlueHand : setRedHand;

    // reset colors back to default
    const newColors = new Array(55).fill('transparent');

    // build basic cards
    if (
      buildBasic.active === turn &&
      buildBasic.possibleMoves.includes(index)
    ) {
      // function will setup the initial payState variable
      setupPayState();

      setPlayerCards(
        playerCards.map((card, currIndex) => {
          if (index === currIndex) {
            const resourceBonus =
              buildBasic.card?.resourceBoost === true
                ? buildBasic.card.resource
                : '';

            return {
              ...card,
              display: 'yes',
              buildingType: buildBasic.card?.cardName,
              image: buildBasic.card?.image,
              skillPoints: buildBasic.card?.skillPoints,
              progressPoints: buildBasic.card?.progressPoints,
              commercePoints: buildBasic.card?.commercePoints,
              strengthPoints: buildBasic.card?.strengthPoints,
              victoryPoints: buildBasic.card?.victoryPoints,
              resourceMultiplyer: resourceBonus,
            };
          }

          return card;
        })
      );

      // remove card from player hand
      setPlayerHand(playerHand => {
        const newPlayerHand: CardStats[] = [];
        playerHand.forEach(card => {
          if (card.cardName !== buildBasic.card?.cardName) {
            newPlayerHand.push(card);
          }
        });
        return newPlayerHand;
      });
    }

    // build expansion cards
    if (buildMode.active === turn && buildMode.possibleMoves.includes(index)) {
      // function will setup the initial payState variable
      setupPayState();

      setPlayerCards(
        playerCards.map((card, currIndex) => {
          // if we find the card update it
          if (index === currIndex) {
            return {
              ...card,
              display: 'yes',
              buildingType: buildMode.buildingType,
              victoryPoints: buildMode.victoryPoints,
              image: buildMode.image,
            };
          }
          // if not the card return card
          return card;
        })
      );

      // if building settlement we must also place 2 region cards
      if (buildMode.buildingType === 'settlement') {
        // get 2 regions from top of region card stack
        const regionCard1: RegionCard | undefined = regionCards.shift();
        const regionCard2: RegionCard | undefined = regionCards.shift();
        setRegionCards(regionCards);

        // check if regions go on left or right
        let direction =
          playerCards[index + 1].buildingType === 'road' ? 'left' : 'right';

        // determine tiles to place regions
        let moves: number[] = [];
        if (direction === 'left') {
          moves.push(index - 12);
          moves.push(index + 10);
        }
        if (direction === 'right') {
          moves.push(index - 10);
          moves.push(index + 12);
        }

        // update player cards with regions
        setPlayerCards(playerCards => {
          playerCards[moves[0]].buildingType = regionCard1?.buildingType;
          playerCards[moves[0]].resourceType = regionCard1?.resourceType;
          playerCards[moves[0]].diceNumber = regionCard1?.diceNumber;
          playerCards[moves[0]].image = regionCard1?.image;
          playerCards[moves[0]].display = 'yes';

          playerCards[moves[1]].buildingType = regionCard2?.buildingType;
          playerCards[moves[1]].resourceType = regionCard2?.resourceType;
          playerCards[moves[1]].diceNumber = regionCard2?.diceNumber;
          playerCards[moves[1]].image = regionCard2?.image;
          playerCards[moves[1]].display = 'yes';
          return playerCards;
        });
      }
    }

    // reset build modes
    resetBuildModes();

    // reset colors
    turn === 'blue' ? setBlueColors(newColors) : setRedColors(newColors);

    setIsLocalChange(true);
  }

  function endTurn() {
    const playerHand = turn === 'blue' ? blueHand : redHand;
    const loops = 3 - playerHand.length;
    const setPlayerHand = turn === 'blue' ? setBlueHand : setRedHand;

    rollDice();

    // replenish hand if less than 3 cards
    let newCenterCards = [...centerCards];
    let newPlayerHand = [...(turn === 'blue' ? blueHand : redHand)];

    for (let i = 0; i < loops; i++) {
      newCenterCards = newCenterCards.map(cardStack => {
        if (cardStack.cardStack === 'basic') {
          const basicCards = [...cardStack.cardsInStack];

          const newPlayerCard: CardStats | undefined = basicCards.shift();

          if (newPlayerCard) newPlayerHand.push(newPlayerCard);

          cardStack.cardsInStack = basicCards;
        }
        return cardStack;
      });
    }

    setCenterCards(newCenterCards);
    setPlayerHand(newPlayerHand);

    // reset build modes
    resetBuildModes();

    // reset tile colors
    const newColors = new Array(55).fill('transparent');
    setBlueColors(newColors);
    setRedColors(newColors);

    // change turn
    setTurn(turn => {
      return turn === 'blue' ? 'red' : 'blue';
    });

    setIsLocalChange(true);
  }

  function rollDice() {
    const productionDie = productionRoll();
    setProductionDie(productionDie);

    const eventDie = eventRoll();
    setEventDie(eventDie);

    // loop over region cards and determine which of them are recieving a bonus
    const blueBoostedRegion = boostedRegion(blueCards);
    const redBoostedRegion = boostedRegion(redCards);

    // update both player cards
    setBlueCards(blueCards => {
      return blueCards.map((card, index) => {
        if (
          blueBoostedRegion.includes(index) &&
          card.diceNumber === productionDie.number
        ) {
          if (card.rotation === card.maxRotation) {
            return card;
          }

          card.resourceCount++;
          card.rotation = card.rotation - 90;
        }

        if (card.diceNumber === productionDie.number) {
          if (card.rotation === card.maxRotation) {
            return card;
          }
          card.resourceCount++;
          card.rotation = card.rotation - 90;
          return card;
        }

        return card;
      });
    });

    setRedCards(redCards => {
      return redCards.map((card, index) => {
        if (
          redBoostedRegion.includes(index) &&
          card.diceNumber === productionDie.number
        ) {
          if (card.rotation === card.maxRotation) {
            return card;
          }

          card.resourceCount++;
          card.rotation = card.rotation - 90;
        }

        if (card.diceNumber === productionDie.number) {
          if (card.rotation === card.maxRotation) {
            return card;
          }
          card.resourceCount++;
          card.rotation = card.rotation - 90;
          return card;
        }

        return card;
      });
    });

    resolveEventDice(eventDie.name);

    setIsLocalChange(true);
  }

  function resolveEventDice(event: string) {
    if (event === 'brigand attack') {
      // brigand attack
    }

    if (event === 'trade') {
      if (tradeAdvantage === '') return;
      // addResource()
    }

    if (event === 'plentiful harvest') {
      // plentiful harvest
      // addResource()
    }

    if (event === 'celebration') {
      // celebration
      // addResource()
    }

    if (event === 'event card') {
      eventCard();
    }
  }

  function eventCard() {
    // perform event
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function submitMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inputValue === '') return;

    setMessages(messages => {
      const newMessages = [...messages];
      newMessages.push(`${playerColor === 'blue' ? 'b' : 'r'}:${inputValue}`);
      return newMessages;
    });

    setIsLocalChange(true);

    setInputValue('');
  }

  return (
    <>
      <div className="window" style={{ backgroundImage: `url(${wood6})` }}>
        {/* top resource bar */}
        <div className="resource-tracker">
          <RedPlayerResources
            redResourceArray={redResourceArray}
            redResources={redResources}
            strengthAdvantage={strengthAdvantage}
            tradeAdvantage={tradeAdvantage}
            turn={turn}
          />

          <BluePlayerResources
            blueResourceArray={blueResourceArray}
            blueResources={blueResources}
            strengthAdvantage={strengthAdvantage}
            tradeAdvantage={tradeAdvantage}
            turn={turn}
          />
        </div>

        <div className="bottom-section">
          <div className="player-hand">
            {(playerColor === 'blue' ? blueHand : redHand).map(
              (card, index) => {
                return (
                  <div
                    className="player-card"
                    key={index}
                    style={{
                      backgroundImage: `url(${card.image})`,
                    }}
                    onClick={() => {
                      if (
                        playerColor === turn &&
                        payState.possibleMoves.length === 0
                      ) {
                        selectCardFromHand(card);
                      }
                    }}
                  ></div>
                );
              }
            )}
          </div>

          <div className="board">
            {/* red board */}
            <div className="player-board rotate">
              {redCards.map((card: CardDefinition, index: number) => {
                if (card.type === 'region') {
                  return (
                    <div
                      className="card"
                      key={index}
                      style={{
                        backgroundImage: `url(${card.image})`,
                        transform: `rotate(${card.rotation}deg)`,
                        outline: `5px solid ${redRegionColors[index]}`,
                        cursor: `${
                          redRegionColors[index] === 'green'
                            ? 'pointer'
                            : 'default'
                        }`,
                      }}
                      onClick={() => {
                        if (
                          payState.possibleMoves.includes(index) &&
                          turn === 'red'
                        ) {
                          selectPayResource(card);
                        }
                      }}
                    ></div>
                  );
                }

                return (
                  <div
                    className="card red-letters"
                    key={index}
                    style={{
                      backgroundImage: `url(${card.image})`,
                      outline: `5px solid ${redColors[index]}`,
                      cursor: `${
                        redColors[index] === 'green' ? 'pointer' : 'default'
                      }`,
                    }}
                    onClick={() => {
                      if (payState.possibleMoves.length === 0) {
                        if (buildMode.active === 'red') buildCard(index);
                        if (buildBasic.active === 'red') buildCard(index);
                      }
                    }}
                  ></div>
                );
              })}
            </div>

            {/* center cards */}
            <div className="center-cards">
              {centerCards.map((stack, index) => {
                return (
                  <div
                    className="card center-card"
                    key={index}
                    style={{ backgroundImage: `url(${stack.image})` }}
                    onClick={() => {
                      if (
                        playerColor === turn &&
                        payState.possibleMoves.length === 0
                      ) {
                        if (
                          stack.cardStack === 'road' ||
                          stack.cardStack === 'settlement' ||
                          stack.cardStack === 'city'
                        ) {
                          selectedCenterCard(stack);
                        }
                      }
                    }}
                  ></div>
                );
              })}
            </div>

            {/* if blue player -> display red */}

            {/* blue board */}
            <div className="player-board rotate">
              {blueCards.map((card: CardDefinition, index: number) => {
                if (card.type === 'region') {
                  return (
                    <div
                      className="card"
                      key={index}
                      style={{
                        backgroundImage: `url(${card.image})`,
                        transform: `rotate(${card.rotation}deg)`,
                        outline: `5px solid ${blueRegionColors[index]}`,
                        cursor: `${
                          blueRegionColors[index] === 'green'
                            ? 'pointer'
                            : 'default'
                        }`,
                      }}
                      onClick={() => {
                        if (
                          payState.possibleMoves.includes(index) &&
                          turn === 'blue'
                        )
                          selectPayResource(card);
                      }}
                    ></div>
                  );
                }

                return (
                  <div
                    className="card"
                    key={index}
                    style={{
                      backgroundImage: `url(${card.image})`,
                      outline: `5px solid ${blueColors[index]}`,
                      cursor: `${
                        blueColors[index] === 'green' ? 'pointer' : 'default'
                      }`,
                    }}
                    onClick={() => {
                      if (payState.possibleMoves.length === 0) {
                        if (buildMode.active === 'blue') buildCard(index);
                        if (buildBasic.active === 'blue') buildCard(index);
                      }
                    }}
                  ></div>
                );
              })}
            </div>
          </div>

          <div className="right-bar">
            <Dice eventDie={eventDie} productionDie={productionDie} />

            {/* <button
              className="button"
              onClick={() => {
                if (payState.possibleMoves.length === 0) {
                  // trade
                }
              }}
            >
              {`Color: ${playerColor === 'blue' ? 'Blue' : 'Red'}`}
            </button> */}

            {/* <button
              className="button"
              onClick={() => {
                if (payState.possibleMoves.length === 0) {
                  // trade
                }
              }}
            >
              {`Turn: ${turn === 'blue' ? 'Blue' : 'Red'}`}
            </button> */}

            <button
              className="button margin-bottom"
              onClick={() => {
                if (
                  playerColor === turn &&
                  payState.possibleMoves.length === 0
                ) {
                  endTurn();
                }
              }}
            >
              End Turn
            </button>

            {/* <div className="message-box">
              <div className="messages" ref={chatBoxRef}>
                {messages.map((message, index) => {
                  return (
                    <div
                      key={index}
                      className={`player-message ${
                        message[0] === 'b' ? 'blue-message' : 'red-message'
                      }`}
                    >
                      <div
                        className="message-icon"
                        style={{
                          backgroundImage: `url(${
                            message.slice(0, 2) === 'b:'
                              ? blueShieldIcon
                              : redShieldIcon
                          })`,
                        }}
                      ></div>
                      <div className="message">{message.slice(2)}</div>
                    </div>
                  );
                })}
              </div>
              <form className="text-box" onSubmit={submitMessage}>
                <input
                  type="text"
                  className="text"
                  value={inputValue}
                  onChange={handleChange}
                  maxLength={30}
                  placeholder="Message..."
                />
                <button className="send-button">Send</button>
              </form>
            </div> */}
          </div>
        </div>
      </div>

      {/* Start Screen */}
      {/* <StartScreen
        gameStarted={gameStarted}
        playerColor={playerColor}
        turn={turn}
        payState={payState}
        startGame={startGame}
      /> */}

      {/* {gameStarted === false ? (
        <div className={`main-menu`}>
          <button
            className="menu-button"
            onClick={() => {
              if (playerColor === turn && payState.possibleMoves.length === 0) {
                startGame()
              }
            }}
          >
            Start Game
          </button>
        </div>
      ) : (
        <div></div>
      )} */}

      <EndScreen
        gameWinner={gameWinner}
        playerColor={playerColor}
        turn={turn}
        payState={payState}
      />
    </>
  );
}

export default RivalsForCatan;
