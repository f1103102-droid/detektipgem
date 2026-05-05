/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { STORY_DATA } from "./data/story";
import { GameState, Choice } from "./types";
import DetectiveHUD from "@/src/components/DetectiveHUD";
import TypewriterEffect from "@/src/components/TypewriterEffect";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { askDetectiveHint } from "@/src/services/geminiService";
import { Brain, RotateCcw, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const INITIAL_STATE: GameState = {
  currentNodeId: "start",
  reputation: 50,
  cunning: 10,
  suspicion: 0,
  clues: [],
  history: [],
  statusEffects: [],
  isGameOver: false,
};

export default function App() {
  const [game, setGame] = useState<GameState>(INITIAL_STATE);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isGeneratingHint, setIsGeneratingHint] = useState(false);

  const currentNode = STORY_DATA[game.currentNodeId];

  const handleChoice = useCallback((choice: Choice) => {
    setIsTypingComplete(false);
    setGame((prev) => {
      const nextNode = STORY_DATA[choice.nextNodeId];
      const newState = { ...prev };
      
      if (choice.consequence) {
        if (choice.consequence.statChanges) {
          const { reputation, cunning, suspicion } = choice.consequence.statChanges;
          if (reputation) newState.reputation = Math.min(100, Math.max(0, newState.reputation + reputation));
          if (cunning) newState.cunning = Math.min(100, Math.max(0, newState.cunning + cunning));
          if (suspicion) newState.suspicion = Math.min(100, Math.max(0, newState.suspicion + suspicion));
        }
        if (choice.consequence.clueAdded) {
          if (!newState.clues.includes(choice.consequence.clueAdded)) {
            newState.clues = [...newState.clues, choice.consequence.clueAdded];
            toast.success("Evidence Collected", {
              description: choice.consequence.clueAdded,
            });
          }
        }
      }

      // Handle potential game over nodes that might trigger injuries
      if (nextNode?.statusEffects) {
        newState.statusEffects = Array.from(new Set([...newState.statusEffects, ...nextNode.statusEffects]));
        nextNode.statusEffects.forEach(effect => {
           toast.error("Permanent Status Change", {
             description: `You have gained: ${effect}`,
           });
        });
      }

      if (choice.consequence?.statusEffectAdded) {
        if (!newState.statusEffects.includes(choice.consequence.statusEffectAdded)) {
          newState.statusEffects = [...newState.statusEffects, choice.consequence.statusEffectAdded];
          toast.error("Condition Inflicted", {
            description: choice.consequence.statusEffectAdded,
          });
        }
      }

      newState.currentNodeId = choice.nextNodeId;
      newState.history = [...prev.history, prev.currentNodeId];
      newState.isGameOver = nextNode?.choices.length === 0;

      return newState;
    });
  }, []);

  const handleReset = () => {
    setGame(INITIAL_STATE);
    setIsTypingComplete(false);
  };

  const handleGetHint = async () => {
    setIsGeneratingHint(true);
    const hint = await askDetectiveHint(currentNode.text, game.clues);
    toast("Intuition Flash", {
      description: hint,
      icon: <Brain className="w-4 h-4 text-bento-accent" />,
    });
    setIsGeneratingHint(false);
  };

  return (
    <div className="w-full h-screen bg-bento-bg p-6 font-sans overflow-hidden flex items-center justify-center relative">
      {/* Cinematic Overlays */}
      <div className="noise-overlay" />
      <div className="scanlines" />
      <div className="radial-vignette" />
      
      <Toaster position="top-center" theme="dark" richColors />
      
      <div className="w-full h-full max-w-7xl grid grid-cols-12 grid-rows-6 gap-4 relative z-10">
        
        {/* Header - Span 12, Row 1 */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="col-span-12 row-span-1 bg-bento-panel border border-bento-border rounded-lg p-4 flex justify-between items-center shadow-lg"
        >
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-bento-accent rounded flex items-center justify-center relative overflow-hidden group">
              <Search className="w-6 h-6 text-bento-bg relative z-10" />
              <motion.div 
                animate={{ x: ["-100%", "100%"] }} 
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-white/30 skew-x-12" 
              />
            </div>
            <div>
              <h1 className="text-bento-accent font-bold text-lg leading-none uppercase tracking-tight">Active Case File: {game.currentNodeId.toUpperCase()}</h1>
              <p className="text-bento-muted text-[10px] uppercase tracking-[0.2em] mt-1">Elias Thorne Investigations • Sector 7</p>
            </div>
          </div>
          <div className="flex space-x-8">
             <div className="text-right hidden md:block">
                <p className="text-bento-muted text-[10px] uppercase font-bold tracking-wider">Narrative Depth</p>
                <div className="w-32 h-1.5 bg-white/5 rounded-full mt-1 overflow-hidden">
                  <div 
                    className="h-full bg-bento-accent transition-all duration-1000" 
                    style={{ width: `${(game.history.length / 10) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleGetHint}
                  disabled={isGeneratingHint || game.isGameOver}
                  className="font-mono text-[10px] border-bento-border bg-white/5 hover:bg-white/10 text-bento-accent h-8"
                >
                  <Brain className={cn("w-3 h-3 mr-2", isGeneratingHint && "animate-pulse")} />
                  HINT
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleReset}
                  className="font-mono text-[10px] text-bento-muted hover:text-white h-8"
                >
                  <RotateCcw className="w-3 h-3" />
                </Button>
              </div>
          </div>
        </motion.header>

        {/* Story Content - Span 8, Row 2-4 */}
        <motion.div
           initial={{ scale: 0.98, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="col-span-12 md:col-span-8 row-span-3 h-full"
        >
          <Card className="h-full bg-bento-card border-bento-border rounded-lg p-8 relative overflow-hidden flex flex-col group shadow-inner">
            <AnimatePresence mode="wait">
              <motion.div
                key={game.currentNodeId}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.15, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[10s] group-hover:scale-110 pointer-events-none"
                style={{ backgroundImage: `url(${currentNode.background})` }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-black/40 pointer-events-none" />
            
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <span className={cn(
                  "px-2 py-1 border text-[10px] rounded uppercase font-mono tracking-wider",
                  currentNode.type === "dossier" ? "bg-bento-accent/20 text-bento-accent border-bento-accent/50" : "bg-blue-900/30 text-blue-400 border border-blue-800"
                )}>
                  {currentNode.type === "dossier" ? "RECORDS: CLASSIFIED" : "System Log: Location Synchronized"}
                </span>
                
                {/* Character Portrait / Context Box */}
                <AnimatePresence>
                  {currentNode.character && (
                    <motion.div 
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 20, opacity: 0 }}
                      className="flex items-center gap-4 bg-black/40 p-2 rounded-md border border-bento-border/50"
                    >
                      <div className="text-right">
                        <p className="text-[10px] font-mono text-bento-accent uppercase">{currentNode.character.name}</p>
                        <p className="text-[8px] font-mono text-bento-muted uppercase max-w-[120px] leading-tight">
                          {currentNode.character.description}
                        </p>
                      </div>
                      <div className="w-12 h-12 border border-bento-accent/20 rounded-sm bg-black/60 flex items-center justify-center">
                         <div className="w-8 h-8 rounded-full bg-gradient-to-t from-bento-accent/20 to-transparent animate-pulse" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className={cn(
                "mt-2 text-xl md:text-2xl font-serif leading-relaxed max-w-2xl",
                currentNode.type === "dossier" ? "text-bento-accent italic" : "text-white italic"
              )}>
                <TypewriterEffect 
                  text={currentNode.text} 
                  onComplete={() => setIsTypingComplete(true)} 
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Evidence Locker / Stats - Span 4, Row 2-4 */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="col-span-12 md:col-span-4 row-span-3"
        >
          <DetectiveHUD 
            reputation={game.reputation}
            cunning={game.cunning}
            suspicion={game.suspicion}
            clues={game.clues}
            statusEffects={game.statusEffects}
            className="h-full"
          />
        </motion.div>

        {/* Choices - Span 8, Row 5-6 */}
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.8, delay: 0.6 }}
           className="col-span-12 md:col-span-8 row-span-2"
        >
          <Card className="h-full bg-bento-panel border-bento-border rounded-lg p-6 flex flex-col justify-between shadow-xl">
            <h3 className="text-bento-muted text-[10px] font-bold uppercase tracking-widest mb-4">Choose Your Words Carefully</h3>
            
            <div className="flex-1 overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-full">
                <AnimatePresence>
                  {isTypingComplete && !game.isGameOver && currentNode.choices.map((choice, i) => (
                    <motion.button
                      key={choice.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => handleChoice(choice)}
                      className="text-left p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-md transition-all group flex flex-col justify-center min-h-[80px] relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-bento-accent/50 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />
                      <span className="block text-bento-accent text-[10px] font-bold mb-1 opacity-60 group-hover:opacity-100 tracking-widest uppercase">
                        [EXECUTE ACTION]
                      </span>
                      <p className="text-white text-sm font-mono opacity-80 group-hover:opacity-100">{choice.text}</p>
                    </motion.button>
                  )) || isTypingComplete && game.isGameOver && (
                    <div className="col-span-2 flex flex-col items-center justify-center text-center">
                      <h3 className="text-2xl font-serif italic mb-4 text-bento-accent">Case Closed</h3>
                      <Button 
                        onClick={handleReset} 
                        className="bg-bento-accent text-bento-bg hover:bg-bento-accent/90 font-mono text-xs uppercase tracking-widest px-8"
                      >
                        Start New Case
                      </Button>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Consequence Web / Insight - Span 4, Row 5-6 */}
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.8, delay: 0.8 }}
           className="col-span-12 md:col-span-4 row-span-2"
        >
          <Card className="h-full bg-bento-panel border-bento-border rounded-lg p-5 flex flex-col shadow-xl">
            <h3 className="text-bento-muted text-[10px] font-bold uppercase tracking-widest mb-4">Consequence Web</h3>
            <div className="flex-grow flex items-center justify-center overflow-hidden relative">
              <svg className="w-full h-full opacity-20" viewBox="0 0 200 120">
                <path d="M20,60 L60,30 M20,60 L60,90 M60,30 L100,20 M60,30 L100,45 M60,90 L100,80 M100,20 L140,10" stroke="#e0c097" fill="none" strokeWidth="1.5"/>
                <motion.circle cx="20" cy="60" r="4" fill="#e0c097" animate={{ r: [4, 5, 4] }} transition={{ duration: 2, repeat: Infinity }} />
                <circle cx="60" cy="30" r="4" fill="#e0c097"/>
                <circle cx="60" cy="90" r="4" fill="#555"/>
                <circle cx="100" cy="20" r="4" fill="#e0c097"/>
                <circle cx="100" cy="45" r="4" fill="#555"/>
              </svg>
              <div className="absolute bottom-0 left-0 w-full bg-black/40 p-3 rounded border border-white/10 text-[10px] font-mono leading-relaxed backdrop-blur-sm">
                <span className="text-bento-accent font-bold uppercase block mb-1 tracking-wider">LATEST BRANCH:</span> 
                <div className="h-8 overflow-hidden">
                   <AnimatePresence mode="wait">
                      <motion.p
                        key={game.currentNodeId}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        className="text-bento-muted"
                      >
                        {game.history.length > 0 
                          ? `${game.history.slice(-2).join(' > ')} > ${game.currentNodeId}`
                          : "Awaiting initial decision vector."}
                      </motion.p>
                   </AnimatePresence>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}

