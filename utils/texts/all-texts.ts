export const LOGO_LETTERS = ['S', 'C', 'R', 'I', 'B', 'B', 'B', 'L', 'Y']

export const HARDCODED_NEWS_ITEMS = [
  { date: 'OCT 12, 1994', text: 'Added 50 new secret words to the vault!' },
  { date: 'SEP 28, 1994', text: 'Stability patch for 14.4k modems.' },
  { date: 'AUG 03, 1994', text: 'New pixel avatars unlocked for all users.' },
]

const brainrotNames = [
  "skibidi_ninja",
  "sigma_toilet",
  "gyatt_killer",
  "rizz_god_69",
  "mewing_master",
  "ohio_finalboss",
  "capuccino_bandit",
  "slay_tractor",
  "fanum_taxer",
  "brrr_skibidi",
  "sigma_sigma_boy",
  "toilet_warrior",
  "gyatt_sniper",
  "rizzler_x",
  "locked_in_larry",
  "no_cap_champion",
  "skibidi_overlord",
  "mewing_sniper",
  "brainrot_king",
  "alpha_toilet",
  "beta_escapee",
  "goofy_rizzler",
  "skibidi_freak",
  "ohio_survivor",
  "npc_main_character",
  "speed_rizz_demon",
  "unc_sigma",
  "fax_machine",
  "delulu_warrior",
  "aura_farmer"
]

export function getRandomBrainrotName(): string {
  const index = Math.floor(Math.random() * brainrotNames.length)
  return brainrotNames[index]
}