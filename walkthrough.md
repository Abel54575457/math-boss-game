# Walkthrough: Math Boss Battle Game (Cartoon Avatars Edition)

We have successfully **cartoonized the original photos** of the 5 bosses (朱孟玲, 朱佩玲, 雁玲, 溫化有, 朱振興) and set them as the official game关主 (Stage Bosses).

---

## 🎨 Cartoonized Boss Avatars
Use the carousel below to view the cartoonized premium illustration card avatars for all five math bosses:

````carousel
![朱孟玲 - STAGE 1](C:\Users\chuch\.gemini\antigravity\brain\52dd5638-588f-427a-9947-879d74521025\boss_mengling.jpg)
<!-- slide -->
![朱佩玲 - STAGE 2](C:\Users\chuch\.gemini\antigravity\brain\52dd5638-588f-427a-9947-879d74521025\boss_peiling.jpg)
<!-- slide -->
![朱雁玲 - STAGE 3](C:\Users\chuch\.gemini\antigravity\brain\52dd5638-588f-427a-9947-879d74521025\boss_yanling.jpg)
<!-- slide -->
![溫化有 - STAGE 4](C:\Users\chuch\.gemini\antigravity\brain\52dd5638-588f-427a-9947-879d74521025\boss_wenhuayou.jpg)
<!-- slide -->
![朱振興 - STAGE 5](C:\Users\chuch\.gemini\antigravity\brain\52dd5638-588f-427a-9947-879d74521025\boss_zhenxing.jpg)
````

---

## 👤 Hero Profile Selection & Resume Features

1. **Child Identity & Birth Order**:
   - The home screen lists existing characters and has a **「登記新勇者」(Register New Hero)** button.
   - Children register by entering their **姓名 (Name)** and selecting their **出生順序 (Birth Order)** (老大, 老二, 老三, 老四, 老五, 老六, 阿公, 阿婆).
   - Customized emojis are automatically assigned to profiles based on birth order:
     - **老大 (Oldest)**: 👑 (Crown)
     - **老二 (Second)**: 🥈 (Silver Medal)
     - **老三 (Third)**: 🥉 (Bronze Medal)
     - **阿公 (Grandfather)**: 👴
     - **阿婆 (Grandmother)**: 👵
     - **Others**: 👦

2. **Progression Memory & Auto-Resume**:
   - Profiles are saved in `localStorage` under `math_boss_profiles`.
   - Each time a child selects their profile, the main **「開始戰鬥」(Start Battle)** button is activated and displays their progress: *「開始戰鬥 (進度: 第 X 關)」*.
   - When clicked, it automatically launches the correct stage, allowing them to pick up right where they left off.

3. **Battle Stage Integration**:
   - When a stage is successfully cleared (answering at least 8 out of 10 questions correctly), the game automatically saves the clearance index, unlocking the next stage index for the active child profile.
   - Cleared stages are recorded in their profile's history log, keeping track of dates and performance statistics.

---

## ⚙️ Gameplay Mechanics

1. **Random 10-out-of-20 Selector**:
   - In [app.js](file:///c:/Users/chuch/OneDrive/Desktop/Agent/app.js), when a battle starts, `shuffleArray()` shuffles the stage's 20-question pool.
   - The first 10 questions are sliced and set as the active questions for the current session.

2. **Dynamic Option Shuffling**:
   - Every time a question is loaded, the 4 answer choices are dynamically shuffled.
   - The index of the correct answer is recalculated dynamically in memory.
   - This ensures options are completely randomized and the correct answer is evenly distributed across A, B, C, D (25% probability each), preventing any pattern concentration.

3. **Auto LocalStorage Upgrade**:
   - The game loader in `init()` detects if a player has an older saved configuration (e.g., only containing Stage 1 or 2) and automatically overrides their database to include the new 5 stages.

---

## 📁 Source Files Updated
- **[index.html](file:///c:/Users/chuch/OneDrive/Desktop/Agent/index.html)** - Core DOM structure with profile selectors (removed JSON editor hooks).
- **[index.css](file:///c:/Users/chuch/OneDrive/Desktop/Agent/index.css)** - Aesthetic styling system, glassmorphic layout, and custom action menus.
- **[app.js](file:///c:/Users/chuch/OneDrive/Desktop/Agent/app.js)** - Game loop controller, dynamic random question pool, dynamic option shuffling, and progression management (removed JSON editor methods).
- **`assets/boss_*.png`** - Modified cartoonized avatars matching the 5 boss levels.
