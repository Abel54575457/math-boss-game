# Walkthrough: Math Boss Battle Game (Name-Based Cloud Save Edition)

We have successfully simplified the cloud synchronization by **removing the Sync Code requirement completely**. The player's **姓名 (Name)** is now used directly as their unique cloud key in Firestore.

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

## ☁️ Name-Based Cloud Save & Sync (No Codes Needed)

### 1. Frictionless Login & Resume
- **Enter Name to Start**: Players type their name (e.g., `朱小華`) and click **「進入遊戲」**.
- **Existing Player**: The app checks Firestore (`/global_profiles/朱小華`). If found, it immediately loads their stage unlocks and history.
- **New Player**: If the name is new, it shows the registration panel to select their birth order (老大, 老二, 阿公, 阿婆, etc.) and establishes a new cloud record.
- **Auto-Remember**: The browser remembers the logged-in name. Opening the website next time automatically loads their character and checks the cloud database in the background.
- **Switch Hero**: Players can click **「切換角色」** to sign out and log in under a different name.

### 2. Global Leaderboard (🏆 勇者全球排行榜)
- The right panel displays the Top 10 players globally.
- Ranks are dynamically calculated from the flat `/global_profiles` Firestore collection based on the highest unlocked stage.
- Shows their Rank (🥇, 🥈, 🥉 medals for top 3), Avatar Emoji, Name, and Unlocked Stage level.

---

## 📁 Source Files Updated
- **[index.html](file:///c:/Users/chuch/OneDrive/Desktop/Agent/index.html)** - Swapped sync code input for Name login panels and active hero containers.
- **[index.css](file:///c:/Users/chuch/OneDrive/Desktop/Agent/index.css)** - Added layout rules for name login inputs, active hero card wrapper, and metadata status chips.
- **[app.js](file:///c:/Users/chuch/OneDrive/Desktop/Agent/app.js)** - Rewrote the cloud loading algorithms to use the profile name as the unique Firestore document ID, and bound login/switch events.
