/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Shield, Eye, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  reputation: number;
  cunning: number;
  suspicion: number;
  clues: string[];
  statusEffects: string[];
  className?: string;
}

export default function DetectiveHUD({ reputation, cunning, suspicion, clues, statusEffects, className }: Props) {
  return (
    <div className={cn("flex flex-col gap-6 p-5 bg-bento-panel border border-bento-border rounded-lg", className)}>
      <div className="flex flex-col gap-4">
        <h3 className="text-bento-accent text-[10px] font-bold uppercase tracking-[0.2em]">Case Vitals</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center group">
            <div className="flex items-center gap-2 text-[10px] font-mono text-bento-muted uppercase">
              <Shield className="w-3 h-3" />
              <span>Reputation</span>
            </div>
            <span className="text-[10px] font-mono text-bento-accent opacity-0 group-hover:opacity-100 transition-opacity">{reputation}%</span>
          </div>
          <Progress value={reputation} className="h-1 bg-white/5" />
          
          <div className="flex justify-between items-center group">
            <div className="flex items-center gap-2 text-[10px] font-mono text-bento-muted uppercase">
              <Eye className="w-3 h-3" />
              <span>Cunning</span>
            </div>
            <span className="text-[10px] font-mono text-bento-accent opacity-0 group-hover:opacity-100 transition-opacity">{cunning}%</span>
          </div>
          <Progress value={cunning} className="h-1 bg-white/5" />

          <div className="flex justify-between items-center group">
            <div className="flex items-center gap-2 text-[10px] font-mono text-red-500/70 uppercase">
              <AlertTriangle className="w-3 h-3" />
              <span>Suspicion</span>
            </div>
            <span className="text-[10px] font-mono text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">{suspicion}%</span>
          </div>
          <Progress value={suspicion} className="h-1 bg-red-500/10" />
        </div>
      </div>

      <Separator className="bg-bento-border/50" />

      <div className="flex-1 flex flex-col min-h-0">
        <h3 className="text-bento-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Evidence Locker</h3>
        <ScrollArea className="flex-1 pr-2">
          <div className="space-y-3">
            {clues.length === 0 ? (
              <div className="p-4 border border-dashed border-bento-border rounded-md text-center">
                <p className="text-[10px] italic text-bento-muted font-mono">No evidence found yet...</p>
              </div>
            ) : (
              clues.map((clue, idx) => {
                const parts = clue.split(':');
                const title = parts[0];
                const desc = parts.slice(1).join(':');
                return (
                  <div key={idx} className="bg-white/5 p-3 border-l-2 border-bento-accent rounded-r-md flex items-center space-x-3 transition-colors hover:bg-white/10">
                    <div className="min-w-8 h-8 bg-black/40 rounded flex items-center justify-center text-[10px] font-mono text-bento-muted">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold leading-tight">{title.trim()}</p>
                      {desc && <p className="text-bento-muted text-[10px] leading-tight mt-0.5">{desc.trim()}</p>}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="pt-4 border-t border-bento-border">
         <p className="text-bento-muted text-[10px] uppercase font-bold tracking-widest mb-2">Detective Insight</p>
         <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className={cn(
                  "h-1.5 flex-grow rounded-sm transition-all duration-500",
                  i <= (cunning / 20) ? "bg-blue-500" : "bg-bento-border"
                )} 
              />
            ))}
         </div>
      </div>

      {statusEffects.length > 0 && (
         <div className="pt-4 border-t border-red-900/30">
           <h4 className="text-[10px] font-mono text-red-500 uppercase tracking-widest mb-2 flex items-center gap-2">
             <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
             Physical/Mental Trauma
           </h4>
           <div className="flex flex-wrap gap-2">
             {statusEffects.map((effect, i) => (
               <span key={i} className="px-2 py-0.5 bg-red-950/50 border border-red-900 text-red-400 text-[10px] font-mono">
                 {effect}
               </span>
             ))}
           </div>
         </div>
       )}
    </div>
  );
}
