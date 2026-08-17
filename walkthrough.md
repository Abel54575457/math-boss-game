# Walkthrough: Math Boss Battle Game (Global Leaderboard Edition)

We have successfully integrated a **Global Leaderboard Panel (勇者全球排行榜)** and migrated our Firebase Firestore database to a **Flat Collection Schema (`/global_profiles`)** to support index-free global rankings.

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

## 🏆 Global Leaderboard & Flat Firestore Schema

### 1. Global Leaderboard Panel (🏆 勇者全球排行榜)
- Restructured the profile section in [index.html](file:///c:/Users/chuch/OneDrive/Desktop/Agent/index.html) and [index.css](file:///c:/Users/chuch/OneDrive/Desktop/Agent/index.css) to support a side-by-side split grid.
- The leaderboard pulls the top 10 profiles from the flat `/global_profiles` Firestore collection and dynamically orders them based on their highest unlocked stage index.
- Displays the player's Rank (🥇, 🥈, 🥉 for the top 3, and numbers for others), Avatar Emoji, Name, Group Code label, and Unlocked Stage Level.

### 2. Flat Database Schema (Index-Free Setup)
- To avoid requiring the parent/teacher to manually set up complex indexes in their Firebase Console, we migrated the database structure to a flat collection: `/global_profiles/{profileId}`.
- Every profile document has a `groupCode` field.
- Loading group profiles now queries `/global_profiles` with `.where('groupCode', '==', groupCode)`.
- Querying the global leaderboard queries `/global_profiles` with `.orderBy('unlockedStageIndex', 'desc')`. Both queries are indexed automatically by Firestore out-of-the-box.

### 3. Frictionless Group Code Sync
- Players can enter a custom Group Code (e.g. `朱家班` or `1234`) and click **「同步資料」** to sync their profiles and scores under that specific group.
- **Offline / Local Mode**: If no Firebase credentials are configured in the code, the game displays a warning and automatically falls back to single-device LocalStorage, keeping the game fully playable.

---

## 📁 Source Files Updated
- **[index.html](file:///c:/Users/chuch/OneDrive/Desktop/Agent/index.html)** - Restructured profile management into a split grid layout with a leaderboard container.
- **[index.css](file:///c:/Users/chuch/OneDrive/Desktop/Agent/index.css)** - Added layout and aesthetic styles for the leaderboard panel, rank items, and gold/silver/bronze badges.
- **[app.js](file:///c:/Users/chuch/OneDrive/Desktop/Agent/app.js)** - Integrated `/global_profiles` database transactions, added `loadLeaderboard()`, and updated state transition hooks to redraw rankings.
