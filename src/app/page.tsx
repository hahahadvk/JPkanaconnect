"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ModeToggle } from "@/components/mode-toggle";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "@/hooks/use-theme";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const initialGridSize = "15x10";
const initialGridStructure = "15x10 Double Layer";

type Tile = {
  content: string;
  color: string;
  matched: boolean;
  layer: number;
  index: number;
  selected: boolean;
};

export default function Home() {
  // Game State
  const [gridSize, setGridSize] = useState(initialGridSize);
  const [gridStructure, setGridStructure] = useState(initialGridStructure);
  const [mode, setMode] = useState<"hiragana" | "katakana">("hiragana");
  const [grid, setGrid] = useState<Tile[]>([]);
  const [selectedTileIndex, setSelectedTileIndex] = useState<number | null>(null);
  const [characterSet, setCharacterSet] = useState<CharacterSet>([]);
  const [gameWon, setGameWon] = useState(false);
  const { theme, setTheme: setAppTheme } = useTheme();
  const [isHintOpen, setIsHintOpen] = useState(false);

  // Settings State
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [speechSpeed, setSpeechSpeed] = useState(0.5);

  const numRows = parseInt(gridSize.split("x")[0]);
  const numCols = parseInt(gridSize.split("x")[1]);
  const isDoubleLayer = gridStructure.includes("Double Layer");
  const totalTiles = numRows * numCols * (isDoubleLayer ? 2 : 1);

  // --- Load settings from local storage on initial render ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedVoice = localStorage.getItem("selectedVoice");
      const storedSpeed = localStorage.getItem("speechSpeed");
      const storedTheme = localStorage.getItem("theme") as ThemeType | null;

      if (storedVoice) {
        const voice = window.speechSynthesis.getVoices().find(v => v.name === storedVoice) || null;
        setSelectedVoice(voice);
      }

      if (storedSpeed) {
        setSpeechSpeed(parseFloat(storedSpeed));
      }

      if (storedTheme) {
        setAppTheme(storedTheme);
      }
    }
  }, [setAppTheme]);

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
  }, [gridSize, gridStructure, mode, characterSet, theme]);

  useEffect(() => {
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

    for (let i = 0; i < selectedPairs.length; i++) {
      const pair = selectedPairs[i];
      const warmColor = warmPalette[i % warmPalette.length];
      const coolColor = coolPalette[i % coolPalette.length];

      if (i < selectedPairs.length / 2) {
        layer1Tiles.push({ content: pair.jp, color: warmColor });
        layer1Tiles.push({ content: pair.rm, color: coolColor });
      } else {
        layer2Tiles.push({ content: pair.jp, color: warmColor });
        layer2Tiles.push({ content: pair.rm, color: coolColor });
      }
    }

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

    const shuffledLayer1Tiles = layer1Tiles.sort(() => Math.random() - 0.5);
    const shuffledLayer2Tiles = layer2Tiles.sort(() => Math.random() - 0.5);

    const initialGrid = [
      ...shuffledLayer1Tiles.slice(0, totalTiles / 2).map((tile, index) => ({
        ...tile,
        matched: false,
        layer: 1,
        index: index,
        selected: false
      })),
      ...shuffledLayer2Tiles.slice(0, totalTiles / 2).map((tile, index) => ({
        ...tile,
        matched: false,
        layer: 2,
        index: index + totalTiles / 2,
        selected: false
      }))
    ];

    setGrid(initialGrid);
    setSelectedTileIndex(null);
  };

  const handleTileClick = (index: number) => {
    const tile = grid[index];

    if (!tile || tile.matched) {
      return;
    }

    if (selectedTileIndex === null) {
      // First tile selection
      setSelectedTileIndex(index);
      setGrid(prevGrid => {
        return prevGrid.map((t, i) => i === index ? { ...t, selected: true } : t);
      });
    } else if (selectedTileIndex === index) {
      // Deselection
      setGrid(prevGrid => {
        return prevGrid.map((t, i) => i === index ? { ...t, selected: false } : t);
      });
      setSelectedTileIndex(null);
    } else {
      // Second tile selection
      const selectedTile = grid[selectedTileIndex];

      if (selectedTile.layer !== tile.layer) {
        resetSelection(index, selectedTileIndex, true); // Incorrect due to layer mismatch
        return;
      }

      if (characterSet.find(char => char.jp === selectedTile.content && char.rm === tile.content) ||
        characterSet.find(char => char.rm === tile.content && char.jp === tile.content)) {
        // Correct match
        const updatedGrid = grid.map((t, i) => {
          if (i === selectedTileIndex || i === index) {
            return { ...t, matched: true, selected: false };
          }
          return t;
        });
        setGrid(updatedGrid);

        // Reveal the tile below if it was in layer 1
        if (selectedTile.layer === 1) {
          setGrid(prevGrid => {
            return prevGrid.map((t, i) => {
              if (i === selectedTileIndex) {
                const tileBelowIndex = i + (grid.length / 2);
                const tileBelow = prevGrid[tileBelowIndex];
                if (tileBelow) {
                  return { ...t, matched: true, selected: false };
                } else {
                  return t;
                }
              }
              return t;
            });
          });
        }
        resetSelection(index, selectedTileIndex, false); // Correct match, clear selection
        setSelectedTileIndex(null);
      } else {
        // Incorrect match
        resetSelection(index, selectedTileIndex, true);
      }
    }
  };

  const resetSelection = (index1: number, index2: number | null, incorrectMatch: boolean) => {
    const tile1Element = document.getElementById(`tile-${index1}`);
    const tile2Element = index2 !== null ? document.getElementById(`tile-${index2}`) : null;

    const reset = () => {
      setSelectedTileIndex(null);
      setGrid(prevGrid => {
        return prevGrid.map((t, i) => ({ ...t, selected: false }));
      });
      if (tile1Element) {
        tile1Element.classList.remove('shake');
        tile1Element.style.border = '';
      }
      if (tile2Element) {
        tile2Element.classList.remove('shake');
        tile2Element.style.border = '';
      }
    };

    if (incorrectMatch) {
      // setGrid(prevGrid => {
      //   return prevGrid.map((tile, i) => {
      //     if (i === index1 || i === index2) {
      //       return { ...tile, selected: false };
      //     }
      //     return tile;
      //   });
      // });
      if (tile1Element) {
        tile1Element.classList.add('shake');
        tile1Element.style.border = '2px solid hsl(var(--incorrect-border-color))';
      }
      if (tile2Element) {
        tile2Element.classList.add('shake');
        tile2Element.style.border = '2px solid hsl(var(--incorrect-border-color))';
      }
      setTimeout(reset, 700);
    } else {
      setGrid(prevGrid => {
        return prevGrid.map((tile, i) => {
          if (i === index1 || i === index2) {
            return { ...tile, selected: false };
          }
          return tile;
        });
      });
    }
  };

  const handleModeToggle = () => {
    setMode(prevMode => (prevMode === "hiragana" ? "katakana" : "hiragana"));
    generateGrid();
  };

  const handleNewGame = () => {
    generateGrid();
  };

  // --- Settings Handlers ---
  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVoiceName = e.target.value;
    const voice = window.speechSynthesis.getVoices().find(v => v.name === selectedVoiceName) || null;
    setSelectedVoice(voice);
    localStorage.setItem("selectedVoice", selectedVoiceName); //Persist
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseFloat(e.target.value);
    setSpeechSpeed(newSpeed);
    localStorage.setItem("speechSpeed", newSpeed.toString()); //Persist
  };

  type ThemeType = "light" | "dark" | "system";
  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setAppTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const speak = useCallback((text: string) => {
    if (typeof window !== 'undefined') {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      } else {
        const voices = window.speechSynthesis.getVoices();
        const japaneseVoice = voices.find(voice => voice.lang === 'ja-JP' && !voice.name.includes('Microsoft'));
        if (japaneseVoice) {
          utterance.voice = japaneseVoice;
        } else {
          console.warn("No suitable Japanese voice found. Using default voice.");
        }
      }

      utterance.rate = speechSpeed;
      window.speechSynthesis.speak(utterance);
    }
  }, [selectedVoice, speechSpeed]);

  const HintTable = () => {
    const characters = mode === "hiragana" ? hiraganaCharacters : katakanaCharacters;

    return (
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic (基本)</TabsTrigger>
          <TabsTrigger value="diacritic">Diacritics (濁音/半濁音)</TabsTrigger>
          <TabsTrigger value="contracted">Contracted (拗音)</TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <HintContent characters={sortCharacters(characters.basic)} speak={speak} palette={warmPalette} />
        </TabsContent>
        <TabsContent value="diacritic">
          <HintContent characters={sortCharacters(characters.diacritic)} speak={speak} palette={warmPalette} />
        </TabsContent>
        <TabsContent value="contracted">
          <HintContent characters={sortCharacters(characters.contracted)} speak={speak} palette={warmPalette} />
        </TabsContent>
      </Tabs>
    );
  };

  // Function to sort characters in a i u e o order
  const sortCharacters = (characters: { jp: string; rm: string; }[]) => {
    const order = ['a', 'i', 'u', 'e', 'o'];
    return [...characters].sort((a, b) => {
      const indexA = order.indexOf(a.rm.charAt(0));
      const indexB = order.indexOf(b.rm.charAt(0));
      return indexA - indexB;
    });
  };

  const HintContent = ({ characters, speak, palette }: { characters: { jp: string; rm: string; }[]; speak: (text: string) => void; palette: string[] }) => (
    <div className="border p-4 rounded-md max-h-[400px] overflow-y-auto">
      <div className="grid grid-cols-5 gap-4">
        {characters.map((char, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <button
              className="text-2xl font-bold cursor-pointer"
              style={{ color: palette[index % palette.length] }}
              onClick={() => speak(char.jp)}
            >
              {char.jp}
            </button>
            <span style={{ color: "hsl(var(--cool-3))" }}>{char.rm}</span>
          </div>
        ))}
      </div>
    </div>
  );

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
                <Dialog open={isHintOpen} onOpenChange={setIsHintOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      Hint <HelpCircle className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]" style={{ backgroundColor: 'hsl(var(--hint-panel-background))', color: 'hsl(var(--hint-panel-foreground))', border: '1px solid hsl(var(--hint-panel-border))' }}>
                    <DialogHeader>
                      <DialogTitle>Alphabet Hints</DialogTitle>
                      <DialogDescription>
                        Click on Japanese characters to hear their pronunciation.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        {/* Voice Selection Dropdown */}
                        <label htmlFor="voiceSelect">Voice:</label>
                        <select
                          id="voiceSelect"
                          className="bg-background border border-input rounded-md px-2 py-1"
                          value={selectedVoice ? selectedVoice.name : ""}
                          onChange={handleVoiceChange}
                        >
                          {typeof window !== 'undefined' && window.speechSynthesis.getVoices()
                            .filter(voice => voice.lang.startsWith('ja'))
                            .map((voice) => (
                              <option key={voice.name} value={voice.name}>
                                {voice.name}
                              </option>
                            ))}
                        </select>

                        {/* Speed Control Slider */}
                        <label htmlFor="speedControl">Speed:</label>
                        <input
                          type="range"
                          id="speedControl"
                          min="0.1"
                          max="1.5"
                          step="0.1"
                          value={speechSpeed}
                          onChange={handleSpeedChange}
                        />
                      </div>
                      <HintTable />
                    </div>
                  </DialogContent>
                </Dialog>
              </TooltipTrigger>
              <TooltipContent>
                <p>Need a little help? This shows all available characters!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

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
              className={cn(
                "relative w-full h-16 rounded-md flex items-center justify-center text-2xl font-bold",
                "bg-tile-background text-tile-text transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary",
                "cursor-pointer",
                { "cursor-default": tile.selected },
                { "opacity-0 pointer-events-none": tile.matched },
                "border border-tile-border",
                tile.selected ? 'border-2' : '',
                tile.selected ? 'border-green-500' : '',
                tile.matched ? 'opacity-0 pointer-events-none' : ''
              )}
              style={{
                color: tile.color,
                visibility: tile.matched && tile.layer === 1 ? 'hidden' : 'visible',
                borderColor: tile.selected ? 'hsl(var(--selected-border-color))' : ''
              }}
              onClick={() => handleTileClick(tile.index)}
              disabled={tile.matched}
            >
              {tile.content}
            </button>
          ))}

          {grid.filter(tile => tile.layer === 2).map((tile, index) => (
            <button
              key={index + totalTiles / 2}
              id={`tile-${tile.index}`}
              className={cn(
                "relative w-full h-16 rounded-md flex items-center justify-center text-2xl font-bold",
                "bg-tile-background text-tile-text transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary",
                "cursor-pointer",
                { "cursor-default": tile.selected },
                { "opacity-0 pointer-events-none": tile.matched },
                "border border-tile-border",
                tile.selected ? 'border-2' : '',
                tile.selected ? 'border-green-500' : ''
              )}
              style={{
                color: tile.color,
                visibility: tile.matched ? 'hidden' : 'hidden',
                borderColor: tile.selected ? 'hsl(var(--selected-border-color))' : ''
              }}
              onClick={() => handleTileClick(tile.index)}
              disabled={tile.matched}
            >
              {tile.content}
            </button>
          ))}
        </div>

        <Button variant="accent" onClick={handleModeToggle} className="mt-4">
          Switch to {mode === "hiragana" ? "Katakana" : "Hiragana"} Mode
        </Button>

        <Button onClick={handleThemeToggle} className="mt-4">
          Switch to {theme === "light" ? "Dark" : "Light"} Theme
        </Button>
      </main>

      <footer className="w-full border-t border-border p-4 text-center text-sm">
        &copy; 2024 KanaMatch. All rights reserved.
      </footer>
    </div>
  );
}



