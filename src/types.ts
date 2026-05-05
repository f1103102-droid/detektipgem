/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Choice {
  id: string;
  text: string;
  nextNodeId: string;
  consequence?: {
    statChanges?: {
      reputation?: number; // How people see the detective
      cunning?: number;    // Ability to see through lies
      suspicion?: number;  // How much the culprit knows you're onto them
    };
    clueAdded?: string;
    statusEffectAdded?: string;
  };
}

export interface StoryNode {
  id: string;
  text: string;
  type?: "story" | "dossier" | "ending";
  character?: {
    name: string;
    description: string;
    avatar?: string;
  };
  background?: string;
  choices: Choice[];
  music?: string;
  statusEffects?: string[];
}

export interface GameState {
  currentNodeId: string;
  reputation: number;
  cunning: number;
  suspicion: number;
  clues: string[];
  history: string[];
  statusEffects: string[];
  isGameOver: boolean;
  endingId?: string;
}
