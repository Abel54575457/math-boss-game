# Walkthrough: Math Boss Battle Game (Firebase Firestore Cloud Sync Edition)

We have successfully integrated a **Firebase Firestore Cloud database** into the game, complete with a frictionless "Family/Group Code" sync mechanism and automatic LocalStorage offline fallback.

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

## ☁️ Firebase Firestore Cloud Sync

### 1. Frictionless Group Code UI
- Added a **「雲端同步代碼」** (Cloud Sync Code) input panel directly on the profile screen in [index.html](file:///c:/Users/chuch/OneDrive/Desktop/Agent/index.html).
- Families or classroom groups can enter a custom code (e.g. `朱家班` or `1234`) and click **「同步資料」** to instantly download and load all profiles stored under that code in the cloud database.

### 2. Hybrid Data Persistence & Fallback
- **Cloud Mode**: If a `firebaseConfig` is active at the top of [app.js](file:///c:/Users/chuch/OneDrive/Desktop/Agent/app.js) and a Group Code is entered, creating characters, updating level unlocks, and adding combat history will write to Firestore globally.
- **Offline / Local Mode**: If no Firebase credentials are configured in the code, the game displays a warning and automatically falls back to single-device LocalStorage so the game never breaks. It also caches cloud-fetched data locally to allow offline playing.

---

## 👤 Hero Profile Selection & Resume Features

1. **Child Identity & Birth Order**:
   - The home screen lists existing characters and has a **「登記新勇者」(Register New Hero)** button.
   - Children register by entering their **姓名 (Name)** and selecting their **出生順序 (Birth Order)** (老大, 老二, 老三, 老四, 老五, 老六, 阿公, 阿婆).
   - Emojis are assigned dynamically: 老大 $\rightarrow$ 👑, 老二 $\rightarrow$ 🥈, 老三 $\rightarrow$ 🥉, 阿公 $\rightarrow$ 👴, 阿婆 $\rightarrow$ 👵, others $\rightarrow$ 👦.

2. **Progression Memory**:
   - Selecting a profile locks their stage level progress, modifying the start button: *「開始戰鬥 (進度: 第 X 關)」*.
   - Battle results, scores, and completion history are stored per profile.

---

## ⚙️ Gameplay Mechanics

1. **Random 10-out-of-20 Selector**:
   - When a battle starts, `shuffleArray()` shuffles the stage's 20-question pool.
   - The first 10 questions are sliced and set as the active questions.

2. **Dynamic Option Shuffling**:
   - Every time a question is loaded, the 4 answer choices are dynamically shuffled.
   - The index of the correct answer is recalculated dynamically in memory.
   - This ensures options are completely randomized and the correct answer is evenly distributed across A, B, C, D (25% probability each), preventing any pattern concentration.

---

## 📁 Source Files Updated
- **[index.html](file:///c:/Users/chuch/OneDrive/Desktop/Agent/index.html)** - Imported Firebase Compat SDKs, added Group Code sync inputs.
- **[index.css](file:///c:/Users/chuch/OneDrive/Desktop/Agent/index.css)** - Added style rules for `.sync-group-panel` and associated elements.
- **[app.js](file:///c:/Users/chuch/OneDrive/Desktop/Agent/app.js)** - Initialized Firebase, rewrote load/save algorithms to bridge LocalStorage and Firestore under a Group Code document tree.
