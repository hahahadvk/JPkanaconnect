"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "@/hooks/use-theme";

const hiraganaCharacters = {
  basic: [
    { jp: "あ", rm: "a" }, { jp: "い", rm: "i" }, { jp: "う", rm: "u" }, { jp: "え", rm: "e" }, { jp: "お", rm: "o" },
    { jp: "か", rm: "ka" }, { jp: "き", rm: "ki" }, { jp: "く", rm: "ku" }, { jp: "け", rm: "ke" }, { jp: "こ", rm: "ko" },
    { jp: "さ", rm: "sa" }, { jp: "し", rm: "shi" }, { jp: "す", rm: "su" }, { jp: "せ", rm: "se" }, { jp: "そ", rm: "so" },
    { jp: "た", rm: "ta" }, { jp: "ち", rm: "chi" }, { jp: "つ", rm: "tsu" }, { jp: "て", rm: "te" }, { jp: "と", rm: "to" },
    { jp: "な", rm: "na" }, { jp: "に", rm: "ni" }, { jp: "ぬ", rm: "nu" }, { jp: "ね", rm: "ne" }, { jp: "の", rm: "no" },
    { jp: "は", rm: "ha" }, { jp: "ひ", rm: "hi" }, { jp: "ふ", rm: "fu" }, { jp: "へ", rm: "he" }, { jp: "ほ", rm: "ho" },
    { jp: "ま", rm: "ma" }, { jp: "み", rm: "mi" }, { jp: "む", rm: "mu" }, { jp: "め", rm: "me" }, { jp: "も", rm: "mo" },
    { jp: "や", rm: "ya" }, { jp: "ゆ", rm: "yu" }, { jp: "よ", rm: "yo" },
    { jp: "ら", rm: "ra" }, { jp: "り", rm: "ri" }, { jp: "る", rm: "ru" }, { jp: "れ", rm: "re" }, { jp: "ろ", rm: "ro" },
    { jp: "わ", rm: "wa" }, { jp: "を", rm: "wo" }, { jp: "ん", rm: "n" }
  ],
  diacritic: [
    { jp: "が", rm: "ga" }, { jp: "ぎ", rm: "gi" }, { jp: "ぐ", rm: "gu" }, { jp: "げ", rm: "ge" }, { jp: "ご", rm: "go" },
    { jp: "ざ", rm: "za" }, { jp: "じ", rm: "ji" }, { jp: "ず", rm: "zu" }, { jp: "ぜ", rm: "ze" }, { jp: "ぞ", rm: "zo" },
    { jp: "だ", rm: "da" }, { jp: "ぢ", rm: "di" }, { jp: "づ", rm: "du" }, { jp: "で", rm: "de" }, { jp: "ど", rm: "do" },
    { jp: "ば", rm: "ba" }, { jp: "び", rm: "bi" }, { jp: "ぶ", rm: "bu" }, { jp: "べ", rm: "be" }, { jp: "ぼ", rm: "bo" },
    { jp: "ぱ", rm: "pa" }, { jp: "ぴ", rm: "pi" }, { jp: "ぷ", rm: "pu" }, { jp: "ぺ", rm: "pe" }, { jp: "ぽ", rm: "po" }
  ],
  contracted: [
    { jp: "きゃ", rm: "kya" }, { jp: "きゅ", rm: "kyu" }, { jp: "きょ", rm: "kyo" },
    { jp: "しゃ", rm: "sha" }, { jp: "しゅ", rm: "shu" }, { jp: "しょ", rm: "sho" },
    { jp: "ちゃ", rm: "cha" }, { jp: "ちゅ", rm: "chu" }, { jp: "ちょ", rm: "cho" },
    { jp: "にゃ", rm: "nya" }, { jp: "にゅ", rm: "nyu" }, { jp: "にょ", rm: "nyo" },
    { jp: "ひゃ", rm: "hya" }, { jp: "ひゅ", rm: "hyu" }, { jp: "ひょ", rm: "hyo" },
    { jp: "みゃ", rm: "mya" }, { jp: "みゅ", rm: "myu" }, { jp: "みょ", rm: "myo" },
    { jp: "りゃ", rm: "rya" }, { jp: "りゅ", rm: "ryu" }, { jp: "りょ", rm: "ryo" },
    { jp: "ぎゃ", rm: "gya" }, { jp: "ぎゅ", rm: "gyu" }, { jp: "ぎょ", rm: "gyo" },
    { jp: "じゃ", rm: "ja" }, { jp: "じゅ", rm: "ju" }, { jp: "じょ", rm: "jo" },
    { jp: "ぢゃ", rm: "dya" }, { jp: "ぢゅ", rm: "dyu" }, { jp: "ぢょ", rm: "dyo" },
    { jp: "びゃ", rm: "bya" }, { jp: "びゅ", rm: "byu" }, { jp: "びょ", rm: "byo" },
    { jp: "ぴゃ", rm: "pya" }, { jp: "ぴゅ", rm: "pyu" }, { jp: "ぴょ", rm: "pyo" }
  ]
};

const katakanaCharacters = {
  basic: [
    { jp: "ア", rm: "a" }, { jp: "イ", rm: "i" }, { jp: "ウ", rm: "u" }, { jp: "エ", rm: "e" }, { jp: "オ", rm: "o" },
    { jp: "カ", rm: "ka" }, { jp: "キ", rm: "ki" }, { jp: "ク", rm: "ku" }, { jp: "ケ", rm: "ke" }, { jp: "コ", rm: "ko" },
    { jp: "サ", rm: "sa" }, { jp: "シ", rm: "shi" }, { jp: "ス", rm: "su" }, { jp: "セ", rm: "se" }, { jp: "ソ", rm: "so" },
    { jp: "タ", rm: "ta" }, { jp: "チ", rm: "chi" }, { jp: "ツ", rm: "tsu" }, { jp: "テ", rm: "te" }, { jp: "ト", rm: "to" },
    { jp: "ナ", rm: "na" }, { jp: "ニ", rm: "ni" }, { jp: "ヌ", rm: "nu" }, { jp: "ネ", rm: "ne" }, { jp: "ノ", rm: "no" },
    { jp: "ハ", rm: "ha" }, { jp: "ヒ", rm: "hi" }, { jp: "フ", rm: "fu" }, { jp: "ヘ", rm: "he" }, { jp: "ホ", rm: "ho" },
    { jp: "マ", rm: "ma" }, { jp: "ミ", rm: "mi" }, { jp: "ム", rm: "mu" }, { jp: "メ", rm: "me" }, { jp: "モ", rm: "mo" },
    { jp: "ヤ", rm: "ya" }, { jp: "ユ", rm: "yu" }, { jp: "ヨ", rm: "yo" },
    { jp: "ラ", rm: "ra" }, { jp: "リ", rm: "ri" }, { jp: "ル", rm: "ru" }, { jp: "レ", rm: "re" }, { jp: "ロ", rm: "ro" },
    { jp: "ワ", rm: "wa" }, { jp: "ヲ", rm: "wo" }, { jp: "ン", rm: "n" }
  ],
  diacritic: [
    { jp: "ガ", rm: "ga" }, { jp: "ギ", rm: "gi" }, { jp: "グ", rm: "gu" }, { jp: "ゲ", rm: "ge" }, { jp: "ゴ", rm: "go" },
    { jp: "ザ", rm: "za" }, { jp: "ジ", rm: "ji" }, { jp: "ズ", rm: "zu" }, { jp: "ゼ", rm: "ze" }, { jp: "ゾ", rm: "zo" },
    { jp: "ダ", rm: "da" }, { jp: "ヂ", rm: "di" }, { jp: "ヅ", rm: "du" }, { jp: "デ", rm: "de" }, { jp: "ド", rm: "do" },
    { jp: "バ", rm: "ba" }, { jp: "ビ", rm: "bi" }, { jp: "ブ", rm: "bu" }, { jp: "ベ", rm: "be" }, { jp: "ボ", rm: "bo" },
    { jp: "パ", rm: "pa" }, { jp: "ピ", rm: "pi" }, { jp: "プ", rm: "pu" }, { jp: "ペ", rm: "pe" }, { jp: "ポ", rm: "po" }
  ],
  contracted: [
    { jp: "キャ", rm: "kya" }, { jp: "キュ", rm: "kyu" }, { jp: "キョ", rm: "kyo" },
    { jp: "シャ", rm: "sha" }, { jp: "シュ", rm: "shu" }, { jp: "ショ", rm: "sho" },
    { jp: "チャ", rm: "cha" }, { jp: "チュ", rm: "chu" }, { jp: "チョ", rm: "cho" },
    { jp: "ニャ", rm: "nya" }, { jp: "ニュ", rm: "nyu" }, { jp: "ニョ", rm: "nyo" },
    { jp: "ヒャ", rm: "hya" }, { jp: "ヒュ", rm: "hyu" }, { jp: "ヒョ", rm: "hyo" },
    { jp: "ミャ", rm: "mya" }, { jp: "ミュ", rm: "myu" }, { jp: "ミョ", rm: "myo" },
    { jp: "リャ", rm: "rya" }, { jp: "リュ", rm: "ryu" }, { jp: "リョ", rm: "ryo" },
    { jp: "ギャ", rm: "gya" }, { jp: "ギュ", rm: "gyu" }, { jp: "ギョ", rm: "gyo" },
    { jp: "ジャ", rm: "ja" }, { jp: "ジュ", rm: "ju" }, { jp: "ジョ", rm: "jo" },
    { jp: "ヂャ", rm: "dya" }, { jp: "ヂュ", rm: "dyu" }, { jp: "ヂョ", rm: "dyo" },
    { jp: "ビャ", rm: "bya" }, { jp: "ビュ", rm: "byu" }, { jp: "ビョ", rm: "byo" },
    { jp: "ピャ", rm: "pya" }, { jp: "ピュ", rm: "pyu" }, { jp: "ピョ", rm: "pyo" }
  ]
};

type CharacterSet = { jp: string; rm: string; }[];

const warmPalette = ["hsl(var(--warm-1))", "hsl(var(--warm-2))", "hsl(var(--warm-3))", "hsl(var(--warm-4))", "hsl(var(--warm-5))"];
const coolPalette = ["hsl(var(--cool-1))", "hsl(var(--cool-2))", "hsl(var(--cool-3))", "hsl(var(--cool-4))", "hsl(var(--cool-5))"];

const initialGridSize = "15x10"; // Default grid size
const initialGridStructure = "15x10 Double Layer"; // Default grid structure

type Tile = {
  content: string;
  color: string;
  matched: boolean;
  layer: number; // 1 or 2
  index: number;
};

export default function Home() {
  const [gridSize, setGridSize] = useState(initialGridSize);
  const [gridStructure, setGridStructure] = useState(initialGridStructure);
  const [mode, setMode] = useState<"hiragana" | "katakana">("hiragana");
  const [grid, setGrid] = useState<Tile[]>([]);
  const [selectedTiles, setSelectedTiles] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [characterSet, setCharacterSet] = useState<CharacterSet>([]);
  const [gameWon, setGameWon] = useState(false);
  const { theme } = useTheme(); // Access the current theme

  const numRows = parseInt(gridSize.split("x")[0]);
  const numCols = parseInt(gridSize.split("x")[1]);
  const isDoubleLayer = gridStructure.includes("Double Layer");
  const totalTiles = numRows * numCols * (isDoubleLayer ? 2 : 1);

  useEffect(() => {
    setCharacterSet(mode === "hiragana" ? [
      ...hiraganaCharacters.basic,
      ...hiraganaCharacters.diacritic,
      ...hiraganaCharacters.contracted
    ] : [
      ...katakanaCharacters.basic,
      ...katakanaCharacters.diacritic,
      ...katakanaCharacters.contracted
    ]);
  }, [mode]);

  useEffect(() => {
    generateGrid();
  }, [gridSize, gridStructure, mode, characterSet, theme]); // Regenerate grid when theme changes

  useEffect(() => {
    // Check win condition whenever the grid changes
    if (grid.length > 0 && grid.every(tile => tile.matched)) {
      setGameWon(true);
    } else {
      setGameWon(false);
    }
  }, [grid]);

  const generateGrid = () => {
    if (!characterSet.length) return;

    const numUniquePairs = Math.min(Math.floor(totalTiles / 2), characterSet.length);
    const selectedPairs = characterSet.slice(0, numUniquePairs);

    let layer1Tiles: { content: string; color: string; }[] = [];
    let layer2Tiles: { content: string; color: string; }[] = [];

    // Distribute pairs between layers
    for (let i = 0; i < selectedPairs.length; i++) {
      const pair = selectedPairs[i];
      const warmColor = warmPalette[i % warmPalette.length];
      const coolColor = coolPalette[i % coolPalette.length];

      if (i < selectedPairs.length / 2) {
        // Add to layer 1
        layer1Tiles.push({ content: pair.jp, color: warmColor });
        layer1Tiles.push({ content: pair.rm, color: coolColor });
      } else {
        // Add to layer 2
        layer2Tiles.push({ content: pair.jp, color: warmColor });
        layer2Tiles.push({ content: pair.rm, color: coolColor });
      }
    }

    // Fill the rest of the layers with random pairs if needed
    while (layer1Tiles.length < totalTiles / 2) {
      const randomIndex = Math.floor(Math.random() * selectedPairs.length);
      const randomPair = selectedPairs[randomIndex];
      layer1Tiles.push({ content: randomPair.jp, color: warmPalette[layer1Tiles.length % warmPalette.length] });
      layer1Tiles.push({ content: randomPair.rm, color: coolPalette[layer1Tiles.length % coolPalette.length] });
    }

    while (layer2Tiles.length < totalTiles / 2) {
      const randomIndex = Math.floor(Math.random() * selectedPairs.length);
      const randomPair = selectedPairs[randomIndex];
      layer2Tiles.push({ content: randomPair.jp, color: warmPalette[layer2Tiles.length % warmPalette.length] });
      layer2Tiles.push({ content: randomPair.rm, color: coolPalette[layer2Tiles.length % coolPalette.length] });
    }

    // Shuffle the tiles within each layer
    const shuffledLayer1Tiles = layer1Tiles.sort(() => Math.random() - 0.5);
    const shuffledLayer2Tiles = layer2Tiles.sort(() => Math.random() - 0.5);

    // Create grid with index, layer, and matched status
    const initialGrid = [
      ...shuffledLayer1Tiles.slice(0, totalTiles / 2).map((tile, index) => ({
        ...tile,
        matched: false,
        layer: 1,
        index: index
      })),
      ...shuffledLayer2Tiles.slice(0, totalTiles / 2).map((tile, index) => ({
        ...tile,
        matched: false,
        layer: 2,
        index: index + totalTiles / 2 // Adjust index for the second layer
      }))
    ];

    setGrid(initialGrid);
    setSelectedTiles([]);
  };

  const handleTileClick = (index: number) => {
    if (selectedTiles.length === 2 || grid[index].matched) {
      return;
    }

    let newSelectedTiles = [...selectedTiles, index];
    setSelectedTiles(newSelectedTiles);

    if (newSelectedTiles.length === 2) {
      const [index1, index2] = newSelectedTiles;
      const tile1 = grid[index1];
      const tile2 = grid[index2];

      if (tile1.layer !== tile2.layer) {
        // Tiles must be on the same layer.  Provide visual feedback
        setTimeout(() => {
          setSelectedTiles([]);
        }, 700);
        return;
      }

      if (characterSet.find(char => char.jp === tile1.content && char.rm === tile2.content) ||
        characterSet.find(char => char.rm === tile1.content && char.jp === tile2.content)) {
        // Correct match
        const updatedGrid = grid.map((tile, i) => {
          if (i === index1 || i === index2) {
            // Reveal the tile on layer 2 if matched on layer 1
            const tileBelowIndex = (tile.layer === 1) ? i + (grid.length / 2) : i;
            return { ...tile, matched: true };
          } else {
            return tile;
          }
        });
        setGrid(updatedGrid);
        setSelectedTiles([]);
      } else {
        // Incorrect match - reset selected tiles after a delay and add shake animation
        const tile1Element = document.getElementById(`tile-${index1}`);
        const tile2Element = document.getElementById(`tile-${index2}`);

        if (tile1Element && tile2Element) {
          tile1Element.classList.add('shake');
          tile2Element.classList.add('shake');
          tile1Element.style.border = '2px solid red';  // Add red border
          tile2Element.style.border = '2px solid red';  // Add red border

          setTimeout(() => {
            setSelectedTiles([]);
            tile1Element.classList.remove('shake');
            tile2Element.classList.remove('shake');
            tile1Element.style.border = '';  // Remove red border
            tile2Element.style.border = '';  // Remove red border
          }, 700);
        } else {
          setTimeout(() => {
            setSelectedTiles([]);
          }, 700);
        }
      }
    }
  };

  const handleModeToggle = () => {
    setMode(prevMode => (prevMode === "hiragana" ? "katakana" : "hiragana"));
    generateGrid();
  };

  const handleNewGame = () => {
    generateGrid();
  };

  const HintTable = () => {
    const characters = mode === "hiragana" ? hiraganaCharacters : katakanaCharacters;
    return (
      <div className="flex flex-col">
        {Object.keys(characters).map((key) => (
          <div key={key}>
            <h3 className="font-bold capitalize">{key}</h3>
            <div className="grid grid-cols-5 gap-2">
              {characters[key as keyof typeof characters].map((char, index) => (
                <div key={index} className="flex flex-col items-center justify-center">
                  <span style={{ color: warmPalette[index % warmPalette.length] }}>{char.jp}</span>
                  <span style={{ color: coolPalette[index % coolPalette.length] }}>{char.rm}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen py-2 ${theme === 'dark' ? 'dark' : ''}`}>
      <header className="w-full flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">KanaMatch</h1>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </header>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <div className="flex flex-col md:flex-row gap-4 mb-4">

          <Select value={gridStructure} onValueChange={setGridStructure}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select grid structure" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15x10 Double Layer">15x10 Double Layer</SelectItem>
              <SelectItem value="10x10 Double Layer">10x10 Double Layer</SelectItem>
            </SelectContent>
          </Select>

          <Select value={gridSize} onValueChange={setGridSize}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select grid size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15x10">15x10</SelectItem>
              <SelectItem value="10x10">10x10</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleNewGame}>New Game</Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={() => setShowHint(!showHint)}>
                  Hint <HelpCircle className="ml-2 h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Need a little help? This shows all available characters!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {showHint && (
          <Card className="mb-4">
            <CardContent>
              <HintTable />
            </CardContent>
          </Card>
        )}

        {gameWon && <h2 className="text-2xl font-bold mb-4">Congratulations! You won!</h2>}

        <div className="grid" style={{
          gridTemplateColumns: `repeat(${numCols}, minmax(50px, 1fr))`,
          gap: "2px",
          width: "100%",
          maxWidth: `${numCols * 60}px`,
        }}>
          {grid.filter(tile => tile.layer === 1).map((tile, index) => (
            <button
              key={index}
              id={`tile-${tile.index}`}
              className={`relative w-full h-16 rounded-md flex items-center justify-center text-2xl font-bold
                            bg-tile-background text-tile-text
                            transition-all duration-300
                            shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary
                            cursor-pointer
                            ${selectedTiles.includes(tile.index) ? 'cursor-default' : 'cursor-pointer'}
                            ${tile.matched ? 'opacity-0 pointer-events-none' : ''} // Make matched tiles disappear
                             ${selectedTiles.includes(tile.index) ? 'bg-muted' : ''}
                             `}
              style={{
                color: tile.color,
                border: `1px solid var(--tile-border)`,
                visibility: tile.matched && tile.layer === 1 ? 'hidden' : 'visible'
              }}
              onClick={() => handleTileClick(tile.index)}
              disabled={selectedTiles.includes(tile.index) || tile.matched}
            >
              {tile.content}
            </button>
          ))}

          {/* Layer 2 tiles (initially hidden) */}
          {grid.filter(tile => tile.layer === 2).map((tile, index) => (
            <button
              key={index + totalTiles / 2}  // Ensure unique keys
              id={`tile-${tile.index}`}
              className={`relative w-full h-16 rounded-md flex items-center justify-center text-2xl font-bold
                            bg-tile-background text-tile-text
                            transition-all duration-300
                            shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary
                            cursor-pointer
                            ${selectedTiles.includes(tile.index) ? 'cursor-default' : 'cursor-pointer'}
                            ${tile.matched ? 'opacity-0 pointer-events-none' : ''} // Make matched tiles disappear
                             ${selectedTiles.includes(tile.index) ? 'bg-muted' : ''}
                            `}
              style={{
                color: tile.color,
                border: `1px solid var(--tile-border)`,
                visibility: tile.matched ? 'hidden' : 'hidden' // Initially hidden
              }}
            onClick={() => handleTileClick(tile.index)}
            disabled={selectedTiles.includes(tile.index) || tile.matched}
            >
              {tile.content}
            </button>
          ))}
        </div>

        <Button variant="accent" onClick={handleModeToggle} className="mt-4">
          Switch to {mode === "hiragana" ? "Katakana" : "Hiragana"} Mode
        </Button>

      </main>

      <footer className="w-full border-t border-border p-4 text-center text-sm">
        &copy; 2024 KanaMatch. All rights reserved.
      </footer>
      <style jsx>{`
        .shake {
          animation: shake 0.5s;
          animation-iteration-count: 1;
        }

        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
      `}</style>
    </div>
  );
}
