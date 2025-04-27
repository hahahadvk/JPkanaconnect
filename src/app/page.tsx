"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Tile {
  index: number;
  content: string;
  color: string;
  selected: boolean;
  matched: boolean;
  round: number;
}

interface Character {
    jp: string;
    rm: string;
}

const basicHiragana: Character[] = [
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
];

const diacriticHiragana: Character[] = [
    { jp: "が", rm: "ga" }, { jp: "ぎ", rm: "gi" }, { jp: "ぐ", rm: "gu" }, { jp: "げ", rm: "ge" }, { jp: "ご", rm: "go" },
    { jp: "ざ", rm: "za" }, { jp: "じ", rm: "ji" }, { jp: "ず", rm: "zu" }, { jp: "ぜ", rm: "ze" }, { jp: "ぞ", rm: "zo" },
    { jp: "だ", rm: "da" }, { jp: "ぢ", rm: "ji" }, { jp: "づ", rm: "zu" }, { jp: "で", rm: "de" }, { jp: "ど", rm: "do" },
    { jp: "ば", rm: "ba" }, { jp: "び", rm: "bi" }, { jp: "ぶ", rm: "bu" }, { jp: "べ", rm: "be" }, { jp: "ぼ", rm: "bo" },
    { jp: "ぱ", rm: "pa" }, { jp: "ぴ", rm: "pi" }, { jp: "ぷ", rm: "pu" }, { jp: "ぺ", rm: "pe" }, { jp: "ぽ", rm: "po" }
];

const contractedHiragana: Character[] = [
    { jp: "きゃ", rm: "kya" }, { jp: "きゅ", rm: "kyu" }, { jp: "きょ", rm: "kyo" },
    { jp: "しゃ", rm: "sha" }, { jp: "しゅ", rm: "shu" }, { jp: "しょ", rm: "sho" },
    { jp: "ちゃ", rm: "cha" }, { jp: "ちゅ", rm: "chu" }, { jp: "ちょ", rm: "cho" },
    { jp: "にゃ", rm: "nya" }, { jp: "にゅ", rm: "nyu" }, { jp: "にょ", rm: "nyo" },
    { jp: "ひゃ", rm: "hya" }, { jp: "ひゅ", rm: "hyu" }, { jp: "ひょ", rm: "hyo" },
    { jp: "みゃ", rm: "mya" }, { jp: "みゅ", rm: "myu" }, { jp: "みょ", rm: "myo" },
    { jp: "りゃ", rm: "rya" }, { jp: "りゅ", rm: "ryu" }, { jp: "りょ", rm: "ryo" },
    { jp: "ぎゃ", rm: "gya" }, { jp: "ぎゅ", rm: "gyu" }, { jp: "ぎょ", rm: "gyo" },
    { jp: "じゃ", rm: "ja" }, { jp: "じゅ", rm: "ju" }, { jp: "じょ", rm: "jo" },
    { jp: "ぢゃ", rm: "ja" }, { jp: "ぢゅ", rm: "ju" }, { jp: "ぢょ", rm: "jo" },
    { jp: "びゃ", rm: "bya" }, { jp: "びゅ", rm: "byu" }, { jp: "びょ", rm: "byo" },
    { jp: "ぴゃ", rm: "pya" }, { jp: "ぴゅ", rm: "pyu" }, { jp: "ぴょ", rm: "pyo" }
];

const basicKatakana: Character[] = [
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
];

const diacriticKatakana: Character[] = [
    { jp: "ガ", rm: "ga" }, { jp: "ギ", rm: "gi" }, { jp: "グ", rm: "gu" }, { jp: "ゲ", rm: "ge" }, { jp: "ゴ", rm: "go" },
    { jp: "ザ", rm: "za" }, { jp: "ジ", rm: "ji" }, { jp: "ズ", rm: "zu" }, { jp: "ゼ", rm: "ze" }, { jp: "ゾ", rm: "zo" },
    { jp: "ダ", rm: "da" }, { jp: "ヂ", rm: "ji" }, { jp: "ヅ", rm: "zu" }, { jp: "デ", rm: "de" }, { jp: "ド", rm: "do" },
    { jp: "バ", rm: "ba" }, { jp: "ビ", rm: "bi" }, { jp: "ブ", rm: "bu" }, { jp: "ベ", rm: "be" }, { jp: "ボ", rm: "bo" },
    { jp: "パ", rm: "pa" }, { jp: "ピ", rm: "pi" }, { jp: "プ", rm: "pu" }, { jp: "ペ", rm: "pe" }, { jp: "ポ", rm: "po" }
];

const contractedKatakana: Character[] = [
    { jp: "キャ", rm: "kya" }, { jp: "キュ", rm: "kyu" }, { jp: "キョ", rm: "kyo" },
    { jp: "シャ", rm: "sha" }, { jp: "シュ", rm: "shu" }, { jp: "ショ", rm: "sho" },
    { jp: "チャ", rm: "cha" }, { jp: "チュ", rm: "chu" }, { jp: "チョ", rm: "cho" },
    { jp: "ニャ", rm: "nya" }, { jp: "ニュ", rm: "nyu" }, { jp: "ニョ", rm: "nyo" },
    { jp: "ヒャ", rm: "hya" }, { jp: "ヒュ", rm: "hyu" }, { jp: "ヒョ", rm: "hyo" },
    { jp: "ミャ", rm: "mya" }, { jp: "ミュ", rm: "myu" }, { jp: "ミョ", rm: "myo" },
    { jp: "リャ", rm: "rya" }, { jp: "リュ", rm: "ryu" }, { jp: "リョ", rm: "ryo" },
    { jp: "ギャ", rm: "gya" }, { jp: "ギュ", rm: "gyu" }, { jp: "ギョ", rm: "gyo" },
    { jp: "ジャ", rm: "ja" }, { jp: "ジュ", rm: "ju" }, { jp: "ジョ", rm: "jo" },
    { jp: "ヂャ", rm: "ja" }, { jp: "ヂュ", rm: "ju" }, { jp: "ヂョ", rm: "jo" },
    { jp: "ビャ", rm: "bya" }, { jp: "ビュ", rm: "byu" }, { jp: "ビョ", rm: "byo" },
    { jp: "ピャ", rm: "pya" }, { jp: "ピュ", rm: "pyu" }, { jp: "ピョ", rm: "pyo" }
];

export default function Home() {
  const [grid, setGrid] = useState<Tile[]>([]);
  const [selectedTiles, setSelectedTiles] = useState<number[]>([]);
  const [mode, setMode] = useState<"hiragana" | "katakana">("hiragana");
  const [gameSize, setGameSize] = useState<"192 Tiles Total" | "180 Tiles Total">("192 Tiles Total");
  const [currentRound, setCurrentRound] = useState(1);
  const totalRounds = gameSize === "192 Tiles Total" ? 3 : 5;
  const [gameWon, setGameWon] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isHintOpen, setIsHintOpen] = useState(false);
  const [speechSpeed, setSpeechSpeed] = useState(0.3);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const warmPalette = ["hsl(var(--warm-1))", "hsl(var(--warm-2))", "hsl(var(--warm-3))", "hsl(var(--warm-4))", "hsl(var(--warm-5))"];
  const coolPalette = ["hsl(var(--cool-1))", "hsl(var(--cool-2))", "hsl(var(--cool-3))", "hsl(var(--cool-4))", "hsl(var(--cool-5))"];
    const [showTTSControls, setShowTTSControls] = useState(false);

  const handleVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (typeof window !== 'undefined') {
      const selectedVoiceName = event.target.value;
      const voice = window.speechSynthesis.getVoices().find(voice => voice.name === selectedVoiceName) || null;
      setSelectedVoice(voice);
    }
  };

  useEffect(() => {
      const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      setTheme(storedTheme || "light");
      if (storedTheme) {
          document.documentElement.classList.toggle("dark", storedTheme === "dark");
      }
  }, []);

  useEffect(() => {
      if (typeof window !== 'undefined') {
          document.documentElement.classList.toggle("dark", theme === "dark");
          localStorage.setItem("theme", theme);
      }
  }, [theme]);

  useEffect(() => {
    startNewGame();
  }, [mode, gameSize]);

  useEffect(() => {
      if (grid.length > 0 && grid.filter(tile => !tile.matched && tile.round === currentRound).length === 0) {
          if (currentRound < totalRounds) {
              // Auto-advance to next round (optional)
              //setTimeout(() => {setCurrentRound(prev => prev + 1); }, 1000);
          } else {
              setGameWon(true);
          }
      }
  }, [grid, currentRound, totalRounds]);

  const generateCharacterPairs = useCallback((count: number, characterSet: Character[]) => {
    const pairs: { jp: string; rm: string }[] = [];
    while (pairs.length < count) {
      const char = characterSet[pairs.length % characterSet.length];
      pairs.push(char);
    }
    return pairs;
  }, []);

  const initializeGrid = useCallback(() => {
    const numTiles = gameSize === "192 Tiles Total" ? 192 : 180;
    const tilesPerRound = gameSize === "192 Tiles Total" ? 192/3 : 180/5;
    const numRounds = gameSize === "192 Tiles Total" ? 3 : 5;

    const characterSet = mode === "hiragana" ? [...basicHiragana, ...diacriticHiragana, ...contractedHiragana] : [...basicKatakana, ...diacriticKatakana, ...contractedKatakana];
    let tempGrid: Tile[] = [];
    let tileIndex = 0;

    const characterSetPairs = [];

    // Ensure all characters are used
    for (let i = 0; i < characterSet.length; i++) {
        characterSetPairs.push(characterSet[i]);
    }

    // Add filler pairs to reach tilesPerRound / 2
    while (characterSetPairs.length < tilesPerRound / 2) {
      const char = characterSet[characterSetPairs.length % characterSet.length];
      characterSetPairs.push(char);
    }

    for (let round = 1; round <= numRounds; round++) {
        let tiles: Tile[] = [];
        for (let i = 0; i < tilesPerRound / 2; i++) {
            const color = mode === "hiragana" ? warmPalette[i % warmPalette.length] : warmPalette[i % warmPalette.length];
            tiles.push({ index: tileIndex++, content: characterSetPairs[i].jp, color: color, selected: false, matched: false, round: round });
            tiles.push({ index: tileIndex++, content: characterSetPairs[i].rm, color: mode === "hiragana" ? coolPalette[i % coolPalette.length] : coolPalette[i % coolPalette.length], selected: false, matched: false, round: round });
        }
        tempGrid = [...tempGrid, ...shuffleArray(tiles)];
    }
    setGrid(tempGrid);
    setGameWon(false);
  }, [gameSize, mode, generateCharacterPairs, warmPalette, coolPalette]);

  const startNewGame = () => {
    setCurrentRound(1);
    initializeGrid();
    setGameWon(false);
  };

  const handleNewGame = () => {
    startNewGame();
  };

  const shuffleArray = (array: any[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleTileClick = (index: number) => {
    if (selectedTiles.length === 0) {
      setSelectedTiles([index]);
      setGrid(prevGrid => {
        return prevGrid.map(tile => {
          if (tile.index === index) {
            return { ...tile, selected: true };
          }
          return tile;
        });
      });
    } else if (selectedTiles.length === 1 && selectedTiles[0] !== index) {
      const firstTileIndex = selectedTiles[0];
      const secondTileIndex = index;

      const firstTile = grid.find(tile => tile.index === firstTileIndex);
      const secondTile = grid.find(tile => tile.index === secondTileIndex);

      if (!firstTile || !secondTile) return;

      if (
        (mode === "hiragana" &&
          ((basicHiragana.find(char => char.jp === firstTile.content && char.rm === secondTile.content) ||
            diacriticHiragana.find(char => char.jp === firstTile.content && char.rm === secondTile.content) ||
            contractedHiragana.find(char => char.jp === firstTile.content && char.rm === secondTile.content)) ||
           (basicHiragana.find(char => char.jp === secondTile.content && char.rm === firstTile.content) ||
            diacriticHiragana.find(char => char.jp === secondTile.content && char.rm === firstTile.content) ||
            contractedHiragana.find(char => char.jp === secondTile.content && char.rm === firstTile.content)))) ||
        (mode === "katakana" &&
          ((basicKatakana.find(char => char.jp === firstTile.content && char.rm === secondTile.content) ||
            diacriticKatakana.find(char => char.jp === firstTile.content && char.rm === secondTileIndex) ||
            contractedKatakana.find(char => char.jp === firstTile.content && char.rm === secondTile.content)) ||
           (basicKatakana.find(char => char.jp === secondTile.content && char.rm === firstTile.content) ||
            diacriticKatakana.find(char => char.jp === secondTile.content && char.rm === firstTile.content) ||
            contractedKatakana.find(char => char.jp === secondTile.content && char.rm === firstTile.content))))
      ) {
        setGrid(prevGrid => {
          return prevGrid.map(tile => {
            if (tile.index === firstTileIndex || tile.index === secondTileIndex) {
              return { ...tile, matched: true, selected: false };
            }
            return { ...tile, selected: false };
          });
        });
        setSelectedTiles([]);
      } else {
        setGrid(prevGrid => {
          return prevGrid.map(tile => {
            if (tile.index === firstTileIndex || tile.index === secondTileIndex) {
              return { ...tile, selected: false };
            }
            return tile;
          });
        });
        setSelectedTiles([]);
      }
    } else {
      setGrid(prevGrid => {
        return prevGrid.map(tile => {
          if (tile.index === index) {
            return { ...tile, selected: false };
          }
          return tile;
        });
      });
      setSelectedTiles([]);
    }
  };

  const handleModeToggle = () => {
    setMode(prevMode => prevMode === "hiragana" ? "katakana" : "hiragana");
    startNewGame();
  };

  const handleThemeToggle = () => {
      setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

    const HintContent = ({ characters, speak, palette }: { characters: { jp: string; rm: string; }[]; speak: (text: string) => void; palette: string[] }) => (
        <div className="border p-4 rounded-md max-h-[400px] overflow-y-auto">
            <div className="grid gap-4" style={{ gridTemplateColumns: mode === "hiragana" ? "repeat(5, minmax(50px, 1fr))" : "repeat(5, minmax(50px, 1fr))"}}>
                {characters.map((char, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                        <button
                            className="text-2xl font-bold cursor-pointer"
                            style={{ color: palette[index % palette.length] }}
                            onClick={() => speak(char.jp)}
                        >
                            {char.jp}
                        </button>
                        <span style={{ color: mode === "hiragana" ? "hsl(var(--cool-3))" : "hsl(var(--warm-3))" }}>{char.rm}</span>
                    </div>
                ))}
            </div>
        </div>
    );

  const HintTable = () => {
    const [speechSpeed, setSpeechSpeed] = useState(0.4);

    const speak = (text: string) => {
      if (typeof window !== 'undefined') {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        utterance.rate = speechSpeed;

        if (selectedVoice) {
            utterance.voice = selectedVoice;
        } else {
            const voices = window.speechSynthesis.getVoices();
            const japaneseVoice = voices.find(voice => voice.lang === 'ja-JP');
            if (japaneseVoice) {
                utterance.voice = japaneseVoice;
            }
        }
        window.speechSynthesis.speak(utterance);
      }
    };

    const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSpeechSpeed(parseFloat(event.target.value));
    };

    const hiraganaPalette = ["hsl(var(--warm-1))", "hsl(var(--warm-2))", "hsl(var(--warm-3))", "hsl(var(--warm-4))", "hsl(var(--warm-5))"];
    const katakanaPalette = ["hsl(var(--cool-1))", "hsl(var(--cool-2))", "hsl(var(--cool-3))", "hsl(var(--cool-4))", "hsl(var(--cool-5))"];

    return (
      <div>
        {mode === "hiragana" ? (
          <HintContent characters={basicHiragana} speak={speak} palette={hiraganaPalette} />
        ) : (
          <HintContent characters={basicKatakana} speak={speak} palette={hiraganaPalette} />
        )}
      </div>
    );
  };

    const calculateNumCols = () => gameSize === "192 Tiles Total" ? 8 : 6;
    const calculateNumRows = () => gameSize === "192 Tiles Total" ? 8 : 6;

  const handleNextRound = () => {
    if (currentRound < totalRounds) {
      setCurrentRound(prev => prev + 1);
    } else {
      setGameWon(true);
    }
  };

    const toggleTTSControls = () => {
        setShowTTSControls(!showTTSControls);
    };

      useEffect(() => {
          if (typeof window !== 'undefined') {
              const voices = window.speechSynthesis.getVoices();
              const nanamiVoice = voices.find(voice => voice.name === "Microsoft Nanami Online (Natural) - Japanese (Japan)");
              if (nanamiVoice) {
                  setSelectedVoice(nanamiVoice);
              } else {
                  const japaneseVoice = voices.find(voice => voice.lang === 'ja-JP');
                  if (japaneseVoice) {
                      setSelectedVoice(japaneseVoice);
                  }
              }
          }
      }, []);

    const speak = (text: string) => {
      if (typeof window !== 'undefined') {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        utterance.rate = speechSpeed;

        if (selectedVoice) {
            utterance.voice = selectedVoice;
        } else {
            const voices = window.speechSynthesis.getVoices();
            const japaneseVoice = voices.find(voice => voice.lang === 'ja-JP');
            if (japaneseVoice) {
                utterance.voice = japaneseVoice;
            }
        }
        window.speechSynthesis.speak(utterance);
      }
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

          <Select value={gameSize} onValueChange={setGameSize}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select Game Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="192 Tiles Total">192 Tiles Total</SelectItem>
              <SelectItem value="180 Tiles Total">180 Tiles Total</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleNewGame}>New Game</Button>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button onClick={() => setIsHintOpen(true)}>
                            Hint
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Need a little help? This shows all available characters!</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
          <Dialog open={isHintOpen} onOpenChange={setIsHintOpen}>
            <DialogContent className="sm:max-w-[625px]" style={{ backgroundColor: 'hsl(var(--hint-panel-background))', color: 'hsl(var(--hint-panel-foreground))', border: '1px solid hsl(var(--hint-panel-border))' }}>
              <DialogHeader>
                <DialogTitle>Alphabet Hints</DialogTitle>
                <DialogDescription>
                  Click on Japanese characters to hear their pronunciation.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                {/* Button to Toggle TTS Controls */}
                <Button onClick={toggleTTSControls} variant="secondary">
                  TTS Settings
                </Button>

                {/* TTS Settings (Initially Hidden) */}
                {showTTSControls && (
                  <div className="flex flex-col gap-4">
                    {typeof window !== 'undefined' && (
                      <>
                        <label htmlFor="voiceSelect">Voice:</label>
                        <select
                          id="voiceSelect"
                          className="bg-background border border-input rounded-md px-2 py-1"
                          value={selectedVoice ? selectedVoice.name : ""}
                          onChange={handleVoiceChange}
                        >
                          {window.speechSynthesis.getVoices()
                            .filter(voice => voice.lang.startsWith('ja'))
                            .map((voice) => (
                              <option key={voice.name} value={voice.name}>
                                {voice.name}
                              </option>
                            ))}
                        </select>
                           <div className="flex items-center justify-between">
                              <label htmlFor="speedControl">Speed:</label>
                              <input
                                type="range"
                                id="speedControl"
                                min="0.1"
                                max="1.5"
                                step="0.1"
                                value={speechSpeed}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSpeechSpeed(parseFloat(event.target.value))}
                              />
                            </div>
                      </>
                    )}
                  </div>
                )}
                <HintTable />
              </div>
            </DialogContent>
          </Dialog>
            {currentRound < totalRounds && !gameWon && (
                <Button onClick={handleNextRound}>Next Round</Button>
            )}
        </div>

        {gameWon ? <h2 className="text-2xl font-bold mb-4">Congratulations! You won!</h2> : <h2 className="text-2xl font-bold mb-4">Round {currentRound}/{totalRounds}</h2>}

        <div className="grid" style={{
          gridTemplateColumns: `repeat(${calculateNumCols()}, minmax(50px, 1fr))`,
          gridTemplateRows: `repeat(${calculateNumRows()}, minmax(50px, 1fr))`,
          gap: "2px",
          width: "100%",
          maxWidth: `${calculateNumCols() * 60}px`,
        }}>
          {grid.filter(tile => tile.round === currentRound).map((tile, index) => (
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
                borderColor: tile.selected ? 'hsl(var(--selected-border-color))' : '',
                borderWidth: tile.selected ? '3px' : '1px'
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

