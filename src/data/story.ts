/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StoryNode } from "../types";

export const STORY_DATA: Record<string, StoryNode> = {
  start: {
    id: "start",
    text: "Elias Thorne. Detective for hire, former cop, full-time ghost. The rain in this city doesn't just fall; it judges. Your desk is a cemetery of unpaid bills and half-empty bottles. Today, however, the silence is broken by three distinct envelopes.",
    type: "story",
    choices: [
      {
        id: "view_dossier",
        text: "Review Subject Profile: Elias Thorne.",
        nextNodeId: "dossier_elias",
      },
      {
        id: "pick_case",
        text: "Examine the three case invitations.",
        nextNodeId: "case_selection",
      }
    ],
    background: "/noir_detective_office.png"
  },
  case_selection: {
    id: "case_selection",
    text: "Three envelopes. Three different ways to die. \n\n1. A telegram mentioning 'Gilded Lily' (The Vane Case).\n2. A blood-stained napkin from 'The Red Ledger' (The Hitman Case).\n3. A professional business card for 'The Silent Partner' (Corporate Sabotage).",
    type: "story",
    choices: [
      {
        id: "case_lily",
        text: "Open the Telegram (The Gilded Lily).",
        nextNodeId: "open_telegram_node",
      },
      {
        id: "case_hitman",
        text: "Examine the Stained Napkin (The Red Ledger).",
        nextNodeId: "red_ledger_start",
      },
      {
        id: "case_corp",
        text: "Analyze the Business Card (The Silent Partner).",
        nextNodeId: "silent_partner_start",
      }
    ],
    background: "/noir_detective_office.png"
  },
  case_archive: {
    id: "case_archive",
    text: "The filing cabinet groans as you pull it open. The folders are yellowed, smelling of tobacco and failed promises. Three specific cases catch your eye, each a piece of the puzzle that is this city.",
    type: "dossier",
    choices: [
      {
        id: "view_shadow_logistics",
        text: "Case #1939-SL: The Rise of Shadow Logistics.",
        nextNodeId: "dossier_shadow_logistics",
      },
      {
        id: "view_sammy_file",
        text: "Case #1945-BS: The 'Blind' Sammy Incident.",
        nextNodeId: "dossier_sammy",
      },
      {
        id: "view_vane_legacy",
        text: "Case #1928-VE: The Vane Dynasty Legacy.",
        nextNodeId: "dossier_vane_legacy",
      },
      {
        id: "close_archive",
        text: "Close the cabinet.",
        nextNodeId: "start",
      }
    ],
    background: "/noir_detective_office.png"
  },
  dossier_shadow_logistics: {
    id: "dossier_shadow_logistics",
    text: "SHADOW LOGISTICS (EST. 1939): Originally a front for wartime supply chains. During the 1939 Winter Strike, they broke the unions using 'enforcers' who moved with surgical precision. Post-war, they transitioned into a ghost-corporation, acquiring defunct shipping lanes. Rumors suggest they aren't moving cargo, but 'biological assets' for the Syndicate's Project Rebirth.",
    type: "dossier",
    choices: [
      {
        id: "back_to_archive",
        text: "Back to Archive.",
        nextNodeId: "case_archive",
      }
    ],
    background: "/noir_detective_office.png"
  },
  dossier_sammy: {
    id: "dossier_sammy",
    text: "SUBJECT: 'BLIND' SAMMY. Once a top-tier safecracker. In 1945, during the botched 'Midnight Raid' on the Precinct vault, a chemical trap caused permanent vision loss. He survived because Chief Miller personally ordered his release. Sammy now operates as a 'human switchboard' for the underworld. He doesn't see facts; he hears the vibrations of the city's lies.",
    type: "dossier",
    character: {
      name: "Blind Sammy",
      description: "The city's most reliable ears."
    },
    choices: [
      {
        id: "back_to_archive",
        text: "Back to Archive.",
        nextNodeId: "case_archive",
      }
    ],
    background: "/interrogation_room.png"
  },
  dossier_vane_legacy: {
    id: "dossier_vane_legacy",
    text: "THE VANE DYNASTY: Roots date back to the 1928 Prohibition Era. The Vane Shipping fortune wasn't built on textiles, but on high-proof 'medical' alcohol smuggled through the Great Lakes. By 1935, they owned half the docks. Lily Vane was meant to be the 'clean' face of the family. Her disappearance in '42 wasn't just a kidnap; it was the removal of the family's last shred of conscience.",
    type: "dossier",
    choices: [
      {
        id: "back_to_archive",
        text: "Back to Archive.",
        nextNodeId: "case_archive",
      }
    ],
    background: "/noir_detective_office.png"
  },
  dossier_elias: {
    id: "dossier_elias",
    text: "ELIAS THORNE: Former Precinct Captain. Discharged after the mysterious disappearance of socialite Lily Vane. PSYCH-PROFILE: Highly observant, prone to obsessive patterns, currently suffering from 'Inquiry Burnout'. Background check identifies a significant debt to the Vane family legacy.",
    type: "dossier",
    character: {
        name: "Elias Thorne",
        description: "Subject #001: The Enquirer."
    },
    choices: [
      {
        id: "view_personality",
        text: "Analyze Personality Sub-Files.",
        nextNodeId: "dossier_elias_personality",
      },
      {
        id: "back_to_office",
        text: "Return to the present.",
        nextNodeId: "start",
      }
    ],
    background: "/noir_detective_office.png"
  },
  dossier_elias_personality: {
    id: "dossier_elias_personality",
    text: "THORNE'S METHOD: Relies on 'The Snap'—a moment of clarity where clues align. However, recent reports indicate his 'Snap' is delayed. He values individual truth over systemic law, a trait that led to his fallout with Chief Miller in '42.",
    type: "dossier",
    choices: [
      {
        id: "back_to_dossier",
        text: "Back to Main File.",
        nextNodeId: "dossier_elias",
      }
    ],
    background: "/noir_detective_office.png"
  },
  open_telegram_node: {
    id: "open_telegram_node",
    text: "The telegram reads: 'LILY GONE. DOCKS AT MIDNIGHT. DO NOT BRING BACKUP.' Signed with a Black Rose. Below the message, a series of coordinates are scratched into the paper.",
    choices: [
      {
        id: "analyze_coordinates",
        text: "[STUDY CASE] Analyze the coordinates first.",
        nextNodeId: "case_lily_vane",
        consequence: { statChanges: { cunning: 5 } }
      },
      {
        id: "go_to_docks",
        text: "Head to the docks immediately.",
        nextNodeId: "docks_arrival",
      }
    ],
    background: "/noir_detective_office.png"
  },
  case_lily_vane: {
    id: "case_lily_vane",
    text: "CASE FILE #1942-LV: The Gilded Lily. Lily Vane, 24. Heiress to the Vane Shipping fortune. Disappeared: October 14, 1942. NO BODY FOUND. The only evidence: a single black rose pinned to her vanity. The coordinates on the telegram point perfectly to the last place you saw her alive.",
    type: "dossier",
    choices: [
      {
         id: "proceed_with_knowledge",
         text: "Proceed to Pier 13 with this knowledge.",
         nextNodeId: "docks_arrival",
         consequence: { statChanges: { cunning: 10 } }
      }
    ],
    background: "/noir_detective_office.png"
  },
  jazz_club: {
    id: "jazz_club",
    text: "The saxophone wails. Sammy leans in. 'Whispers say the Syndicate is moving something tonight. Something with petals and thorns. They call it the Rebirth Protocol.'",
    choices: [
      {
        id: "ask_about_miller",
        text: "[STUDY CASE] Ask about Chief Miller's involvement.",
        nextNodeId: "dossier_miller",
      },
      {
        id: "leave_club",
        text: "Enough talk. To the docks.",
        nextNodeId: "docks_arrival",
      }
    ],
    background: "/interrogation_room.png"
  },
  dossier_miller: {
    id: "dossier_miller",
    text: "CHIEF MILLER: 30 years on the force. A 'Company Man'. Rumors of Syndicate ties have circulated for years, but never stuck. He was the one who signed Thorne's discharge papers. Why is he still obsessed with a five-year-old cold case?",
    type: "dossier",
    character: {
        name: "Chief Miller",
        description: "The gatekeeper of the city's secrets."
    },
    choices: [
      {
        id: "return_to_sammy",
        text: "Press Sammy for more on Miller.",
        nextNodeId: "sammy_intel",
        consequence: { statChanges: { suspicion: 5 } }
      }
    ],
    background: "/interrogation_room.png"
  },
  sammy_intel: {
    id: "sammy_intel",
    text: "Sammy grins, showing a single gold tooth. 'The Chief is meeting a broad at the warehouse. Not just any broad. She looks exactly like the girl you lost, Elias.'",
    choices: [
      {
        id: "to_warehouse",
        text: "Bypass the docks. Go straight to the Warehouse.",
        nextNodeId: "trace_signal",
      }
    ],
    background: "/interrogation_room.png"
  },
  docks_arrival: {
    id: "docks_arrival",
    text: "A mannequin in a wedding gown stands on the pier. A trap? Or a message? The fog is thick enough to hide a thousand sins. You hear a sharp click from beneath the floorboards.",
    choices: [
      {
        id: "inspect_mannequin",
        text: "Dive for the mannequin's base.",
        nextNodeId: "inspect_mannequin_node",
        consequence: {
          clueAdded: "Silk Shred: Tailored by 'Vane & Sons'."
        }
      },
      {
        id: "ambush_wait",
        text: "Freeze. Don't move a muscle.",
        nextNodeId: "ambush",
        consequence: { statChanges: { suspicion: 10 } }
      },
      {
        id: "run_away_pier",
        text: "Run back to the car.",
        nextNodeId: "pier_explosion_death",
      }
    ],
    background: "/rainy_crime_scene.png"
  },
  pier_explosion_death: {
    id: "pier_explosion_death",
    text: "The movement triggers the pressure plate. The pier erupts in a fountain of splintered wood and fire. You're thrown fifty feet into the harbor. The cold water is the last thing you feel.",
    type: "ending",
    choices: [],
    background: "/rainy_crime_scene.png"
  },
  inspect_mannequin_node: {
    id: "inspect_mannequin_node",
    text: "A note: 'The truth is buried where it all began.' You also find a micro-transmitter. It's high-grade tech, likely Syndicate-issue.",
    choices: [
      {
        id: "go_home",
        text: "Go to your childhood home.",
        nextNodeId: "childhood_home",
      },
      {
          id: "hack_transmitter",
          text: "Trace the signal.",
          nextNodeId: "trace_signal",
          consequence: { statChanges: { cunning: 5 } }
      }
    ],
    background: "/rainy_crime_scene.png"
  },
  trace_signal: {
      id: "trace_signal",
      text: "The signal terminates at 'Shadow Logistics'. Through a high-window, you see Chief Miller arguing with a woman in a red coat. She turns... it's Lily. But she hasn't aged a day.",
      choices: [
          {
              id: "confront_now",
              text: "Kick the door down. Confront them.",
              nextNodeId: "warehouse_confrontation",
          },
          {
              id: "eavesdrop",
              text: "Listen from the vents.",
              nextNodeId: "secret_revealed",
              consequence: { statChanges: { cunning: 20 } }
          }
      ],
      background: "/rainy_crime_scene.png"
  },
  warehouse_confrontation: {
      id: "warehouse_confrontation",
      text: "Chief Miller draws his weapon. 'Elias, you shouldn't have seen this.' Lily—or whatever she is—stands cold and silent.",
      choices: [
          {
              id: "shoot_miller",
              text: "Fire first.",
              nextNodeId: "end_bad_betrayal",
          },
          {
              id: "talk_down",
              text: "Try to talk Miller out of it.",
              nextNodeId: "miller_hesitates",
          }
      ],
      background: "/interrogation_room.png"
  },
  miller_hesitates: {
      id: "miller_hesitates",
      text: "Miller's hand shakes. 'They're making them, Elias. Replicas. Lily was the first success.' Before he can say more, Lily moves with unnatural speed.",
      choices: [
          {
              id: "save_miller",
              text: "Protect Miller from the 'Lily'.",
              nextNodeId: "end_tragic_duty",
          },
          {
              id: "run",
              text: "She's not human. Get out of there!",
              nextNodeId: "end_existential_noir",
          }
      ],
      background: "/interrogation_room.png"
  },
  secret_revealed: {
      id: "secret_revealed",
      text: "You hear the truth: The Syndicate isn't just a gang; it's a front for a government project called 'PROJECT REBIRTH'. They are replacing key figures with clones.",
      choices: [
          {
              id: "study_rebirth",
              text: "[STUDY CASE] Deep dive into 'Project Rebirth' files.",
              nextNodeId: "dossier_rebirth",
              consequence: { statChanges: { cunning: 25 } }
          },
          {
              id: "expose_truth",
              text: "Send the evidence to the Press.",
              nextNodeId: "end_whistleblower",
              consequence: { statChanges: { reputation: 100 } }
          }
      ],
      background: "/noir_detective_office.png"
  },
  dossier_rebirth: {
    id: "dossier_rebirth",
    text: "PROTOCOL E-113: PROJECT REBIRTH. Objective: Continuity of Governance through cellular replication. Successful subjects maintain 98% memory retention. Subject #001 (E. Thorne) failed due to 'Excessive Ego Attachment'. Recent success: Subject #014 (L. Vane).",
    type: "dossier",
    choices: [
      {
        id: "confront_reality",
        text: "The truth is a bitter pill. Confront the Chief.",
        nextNodeId: "warehouse_confrontation",
      }
    ],
    background: "/interrogation_room.png"
  },
  childhood_home: {
      id: "childhood_home",
      text: "The cellar door is open. Inside, Lily sits among your old toys. she looks at you with eyes that contain a lifetime of fake memories. 'Were you programmed to find me, too?'",
      choices: [
          {
              id: "accept_fate",
              text: "Join her in the shadows.",
              nextNodeId: "end_vigilante_justice",
          },
          {
              id: "reject_her",
              text: "You're a fake. You're coming with me.",
              nextNodeId: "end_tragic_duty",
          }
      ],
      background: "/noir_detective_office.png"
  },
  end_bad_betrayal: {
      id: "end_bad_betrayal",
      text: "A shot rings out. Miller falls, but Lily is already behind you. The cold barrel of a gun touches your neck. 'Goodbye, Elias. Version 13 will be more compliant.'",
      type: "ending",
      choices: [],
      background: "/interrogation_room.png"
  },
  end_moral_ambiguity: {
      id: "end_moral_ambiguity",
      text: "You're the Chief now. The Syndicate pays for your penthouse. Lily is 'found' and returns to a quiet life. But every time you look in the mirror, you wonder if the man looking back is real.",
      type: "ending",
      choices: [],
      background: "/noir_detective_office.png"
  },
  end_vigilante_justice: {
      id: "end_vigilante_justice",
      text: "Together, you and the Girl Who Isn't Lily dismantle the Syndicate piece by piece. You are ghosts haunting the machine. Justice is served, but you'll never see the sun again.",
      type: "ending",
      choices: [],
      background: "/rainy_crime_scene.png"
  },
  end_tragic_duty: {
      id: "end_tragic_duty",
      text: "You turn her in. The project is shut down. You get a medal, a pension, and a quiet house in the suburbs. But you'll always wonder if the real Lily is still out there, waiting for you to find her.",
      type: "ending",
      choices: [],
      background: "/interrogation_room.png"
  },
  end_existential_noir: {
      id: "end_existential_noir",
      text: "You walk out into the rain. You don't go home. You don't go to the precinct. You just keep walking until the city lights are a distant memory. If you're a machine, you're the first one to truly be free.",
      type: "ending",
      choices: [],
      background: "/rainy_crime_scene.png"
  },
  end_whistleblower: {
      id: "end_whistleblower",
      text: "The papers go wild. The project is exposed. You're a hero, but you're also a dead man walking. You spend your days looking over your shoulder, waiting for the petal to fall.",
      type: "ending",
      choices: [],
      background: "/noir_detective_office.png"
  },
  // --- THE RED LEDGER ---
  red_ledger_start: {
    id: "red_ledger_start",
    text: "The napkin is from 'The Rusty Hook'. It belongs to Vinnie 'The Viper' Rossi. He's been the city's most efficient assassin for a decade. The note says: 'I'm retiring. If you want my ledger, come to the meat locker. Alone.'",
    choices: [
      {
        id: "go_meat_locker",
        text: "Go to the industrial meat locker.",
        nextNodeId: "meat_locker_arrival",
      },
      {
        id: "call_backup_ledger",
        text: "[DANGEROUS] Bring a rookie cop for backup.",
        nextNodeId: "ledger_ambush_fail",
      }
    ],
    background: "/interrogation_room.png"
  },
  meat_locker_arrival: {
    id: "meat_locker_arrival",
    text: "The temperature is below zero. Carcasses of beef hang from hooks, swaying in a ghost wind. Vinnie is waiting, but he's already dying. A knife is buried in his chest. 'The Ledger... it's in the...'",
    choices: [
      {
        id: "search_body",
        text: "Search Vinnie for the ledger.",
        nextNodeId: "meat_locker_trap",
      },
      {
        id: "look_around_locker",
        text: "Scan the ceiling instead.",
        nextNodeId: "see_killer",
        consequence: { statChanges: { cunning: 20 } }
      }
    ],
    background: "/interrogation_room.png"
  },
  meat_locker_trap: {
    id: "meat_locker_trap",
    text: "As you reach for his pocket, the floor gives way. Not a pit, but a mechanical press. You're pulled in. The last thing you hear is the sound of your own ribs snapping under five tons of steel.",
    type: "ending",
    choices: [],
    background: "/interrogation_room.png"
  },
  see_killer: {
    id: "see_killer",
    text: "You see a glint of steel. A figure drops from the hooks. This isn't Vinnie's retirement; it's a housecleaning. You recognize the style: The Black Rose Syndicate.",
    choices: [
      {
        id: "fight_assassin",
        text: "Hand-to-hand combat.",
        nextNodeId: "assassin_fight_result",
      },
      {
        id: "gun_draw",
        text: "Draw your snub-nose.",
        nextNodeId: "assassin_gun_result",
      }
    ],
    background: "/interrogation_room.png"
  },
  assassin_fight_result: {
    id: "assassin_fight_result",
    text: "He's faster. A razor-thin blade slices across your forearm. You manage to throw him off a ledge, but you're bleeding out. You find the ledger—it's a list of every corrupted official in the city.",
    statusEffects: ["Deep Laceration"],
    choices: [
      {
        id: "ledger_ending",
        text: "Take the ledger and crawl to safety.",
        nextNodeId: "end_vigilante_justice",
      }
    ],
    background: "/interrogation_room.png"
  },
  assassin_gun_result: {
    id: "assassin_gun_result",
    text: "You pull the trigger, but he's already in your face. The bullet goes wide. He catches your wrist, twisting it until the bone snaps. You're unarmed, injured, and staring into the eyes of a professional.",
    statusEffects: ["Broken Wrist"],
    choices: [
      {
        id: "plead_mercy",
        text: "Plead for your life.",
        nextNodeId: "assassin_mercy_fail",
      },
      {
        id: "headbutt",
        text: "Headbutt him and run.",
        nextNodeId: "end_vigilante_justice",
        consequence: { statChanges: { reputation: 20 } }
      }
    ],
    background: "/interrogation_room.png"
  },
  assassin_mercy_fail: {
    id: "assassin_mercy_fail",
    text: "He doesn't speak. He doesn't smile. He just finishes the job. The Ledger stays with the Syndicate. You stay in the meat locker.",
    type: "ending",
    choices: [],
    background: "/interrogation_room.png"
  },

  // --- THE SILENT PARTNER ---
  silent_partner_start: {
    id: "silent_partner_start",
    text: "The card belongs to Mr. Sterling, CEO of 'Nova-Tech'. His daughter believes he's being slowly poisoned by his board of directors. She wants you to go undercover as a janitor tonight. High-tech security, lethal countermeasures.",
    choices: [
      {
        id: "undercover",
        text: "Don the janitor's uniform. Enter Nova-Tech.",
        nextNodeId: "nova_tech_lobby",
      }
    ],
    background: "/noir_detective_office.png"
  },
  nova_tech_lobby: {
    id: "nova_tech_lobby",
    text: "The building is a tomb of chrome and glass. You need to reach the 40th floor. The elevator has a fingerprint scanner. Your fake plate might not hold.",
    choices: [
      {
        id: "use_service_elevator",
        text: "Take the service stairs (100 flights).",
        nextNodeId: "stairs_exhaustion",
      },
      {
        id: "hack_fingerprint",
        text: "[RISKY] Try to bypass the scanner with tape.",
        nextNodeId: "scanner_fail",
      }
    ],
    background: "/noir_detective_office.png"
  },
  scanner_fail: {
    id: "scanner_fail",
    text: "ALARM. The doors lock. A pressurized gas vent opens. You smell 'Wintermint'—the Syndicate's signature knockout gas. Only, this batch is lethal. Your lungs stop working before you can hit the emergency out.",
    type: "ending",
    choices: [],
    background: "/noir_detective_office.png"
  },
  stairs_exhaustion: {
    id: "stairs_exhaustion",
    text: "By floor 30, your heart is hammering like a piston. You see a security guard. He's not looking, but he's armed with a prototype pulse-rifle.",
    choices: [
      {
        id: "stealth_takedown",
        text: "Subdue the guard.",
        nextNodeId: "guard_takedown_success",
        consequence: { statChanges: { reputation: 10 } }
      },
      {
        id: "sneak_past",
        text: "Sneak through the vents.",
        nextNodeId: "vent_crawl",
      }
    ],
    background: "/noir_detective_office.png"
  },
  guard_takedown_success: {
    id: "guard_takedown_success",
    text: "You take him down silently. You take his keycard. The path to the CEO's office is clear, but your hands are shaking.",
    choices: [
      {
        id: "to_ceo_office",
        text: "Go to the 40th floor.",
        nextNodeId: "secret_revealed",
      }
    ],
    background: "/noir_detective_office.png"
  },
  vent_crawl: {
    id: "vent_crawl",
    text: "The vents are narrow. Too narrow. You get stuck halfway. A fan starts spinning. You lose three fingers before you manage to kick the grate out and fall into the CEO's office.",
    statusEffects: ["Severed Fingers (Right)"],
    choices: [
      {
        id: "search_office",
        text: "Stifle the scream. Search the desk.",
        nextNodeId: "secret_revealed",
      }
    ],
    background: "/noir_detective_office.png"
  },
  ledger_ambush_fail: {
    id: "ledger_ambush_fail",
    text: "Vinnie saw the badge on the rookie. He didn't hesitate. A sniper from the roof across the street took the shot. You're fine, but the rookie's blood is all over your files. The Ledger is gone, and the Chief has stripped you of your license permanently.",
    type: "ending",
    choices: [],
    background: "/rainy_crime_scene.png"
  },
};
