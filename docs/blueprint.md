# **App Name**: KanaMatch

## Core Features:

- Dual Mode Gameplay: Implements separate Hiragana and Katakana modes with distinct grids and character sets, allowing users to switch between them seamlessly.
- Grid Generation and Matching: Generates a tile grid populated with Japanese characters (Hiragana or Katakana, depending on the active mode) and their corresponding Romaji transcriptions. Implements matching logic and win condition.
- Alphabet Hint Feature: Provides a hint feature (「ヒント」 button) that displays a reference chart of the currently active mode's alphabet and Romaji equivalents.

## Style Guidelines:

- Warm palette (e.g., #FF6B6B, #FFA07A, #FFD700...) for Hiragana/Katakana character text.
- Cool palette (e.g., #ADD8E6, #90EE90, #BA55D3...) for Romaji text.
- Accent: Teal (#008080) for interactive elements and mode switch button.
- Contiguous tile layout using CSS Grid or Flexbox, ensuring no gaps between tiles.
- Subtle tile flip or fade-out animation upon a successful match.
- Use clear and simple icons for game controls (e.g., refresh icon for 'New Game').

## Original User Request:
**Objective:** Generate a complete web application functioning as an educational matching game (like Pikachu) for learning Japanese Hiragana and Katakana, **featuring two distinct and separate gameplay modes: Hiragana Mode and Katakana Mode.**

**Core Gameplay Mechanics:**
1.  **Grid Display:** Present a rectangular grid of tiles (15x10 or 20x10 options).
2.  **Game Modes:** The game operates in **one active mode at a time**, either Hiragana or Katakana. All game logic, content, and scoring are specific to the currently active mode.
3.  **Tile Content:**
    *   Each tile MUST visibly display text content: either a single Japanese character (appropriate for the *active* mode) or its corresponding Romaji transcription.
    *   Text MUST be clearly rendered, centered, and easily legible.
4.  **User Interaction:** User clicks two tiles within the current mode's grid.
5.  **Matching Logic:**
    *   If tiles form a correct pair (based on the *active* mode's character set, e.g., 「あ」 and "a" in Hiragana Mode), both tiles disappear.
    *   If incorrect, tiles remain.
6.  **Win Condition:** All tiles cleared within the grid for the *active* mode.

**Content Requirements - Character Sets (Mode-Specific):**

*   **When in Hiragana Mode:**
    *   Use Basic Hiragana, Hiragana with Diacritics (Dakuten/Handakuten), Hiragana Contracted Sounds (Yōon), and their corresponding Romaji.
    *   Ensure exactly one matching Romaji tile for each unique Hiragana character tile required for this mode.
*   **When in Katakana Mode:**
    *   Use Basic Katakana, Katakana with Diacritics (Dakuten/Handakuten), Katakana Contracted Sounds (Yōon), and their corresponding Romaji.
    *   Ensure exactly one matching Romaji tile for each unique Katakana character tile required for this mode.

**Grid Configuration and Generation:**
1.  **Grid Size Options:** User selects 15x10 or 20x10 before starting a game *in either mode*. This selection persists across mode switches unless changed again.
2.  **Grid Population (Mode-Dependent):**
    *   When generating a grid, **use ONLY the character set defined for the currently active mode (Hiragana or Katakana).**
    *   Populate first with all required unique pairs for that mode.
    *   Fill remaining grid slots with random matching pairs (placeholders or duplicates *from the active mode's set*). Ensure filler tiles also display visible content.
    *   Shuffle all tile positions randomly.

**Visual Design and User Interface (UI):**

1.  **Tile Appearance:**
    *   Subtle 3D effect (CSS `box-shadow`, `border`, etc.).
    *   Contiguous layout (no gaps, CSS Grid/Flexbox).
    *   Varying tile background colors (subtle tonal variations) for visual distinction, ensuring good contrast with text.
2.  **Text Color (Mode-Dependent Palettes):**
    *   `warmPalette` (e.g., #FF6B6B, #FFA07A, #FFD700...) for Hiragana/Katakana *character text*.
    *   `coolPalette` (e.g., #ADD8E6, #90EE90, #BA55D3...) for Romaji *text*.
    *   **Assignment:** Apply text colors sequentially from the appropriate palette based on whether the tile shows a Japanese character (warm) or Romaji (cool), cycling through the palette (`index % palette.length`). Ensure good text-background contrast.
3.  **Hint Feature:**
    *   "Hint" (「ヒント」) button displays a reference chart specific to the **currently active mode's alphabet** (full Hiragana set or full Katakana set with variations) and Romaji.
4.  **Distinct Mode Switching Control:**
    *   **Implement a dedicated, clearly labeled button or toggle switch** for changing modes.
    *   **Labeling:** The control should clearly indicate the action (e.g., display "Switch to Katakana Mode" when Hiragana is active, and "Switch to Hiragana Mode" when Katakana is active. Alternatively use Japanese labels: 「カタカナモードへ」 / 「ひらがなモードへ」).
    *   **Action on Click:** Clicking this control MUST:
        1.  Change the internal game state to the *other* mode (e.g., update `currentMode` variable).
        2.  **Immediately clear the current grid.**
        3.  **Generate and display a completely new game grid** using the character set, pairing rules, grid population logic, and text coloring defined specifically for the **newly selected mode**.
        4.  Use the currently selected grid size preference (15x10 or 20x10).
5.  **Game Controls:**
    *   Grid size selection (applies to whichever mode is active when a new game starts).
    *   Optional "New Game" button (resets the grid *for the current mode*).

**Technology Stack:**
*   HTML (structure), CSS (styling), JavaScript (game logic, **managing active game mode state**, handling mode switching logic, rendering content based on mode, UI interactions).

**Final Goal:** Create a dual-mode educational game where users can explicitly switch between a self-contained Hiragana matching game and a self-contained Katakana matching game, each with its own specific character set, grid, and rules, using the described visual and functional requirements.
  