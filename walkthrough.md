# Walkthrough: Math Boss Battle Game (Account Password Edition)

We have successfully added **姓名與密碼雙欄位驗證 (Name & Password Authentication)**. 

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

## 🔐 Name & Password Authentication

### 1. Unified Login/Register
- The login panel has two fields: **「勇者姓名」** and **「輸入密碼」**.
- **首次登入 (First Login)**: If the name does not exist, the system **automatically registers** the name in the cloud database with the password entered in the password field.
- **後續登入 (Subsequent Logins)**: If the name already exists, the system compares the typed password with the stored password.
  - **Correct Password**: Logs in instantly and starts the game at their saved level.
  - **Wrong Password**: Shows error: `❌ 密碼錯誤，請重新輸入！` and blocks login.

### 2. Auto-Remember
- The browser remembers the last used Name and automatically pre-fills it on the login screen.
- Players only need to enter their password to quickly log in and resume playing.

---

## 📁 Source Files Updated
- **[index.html](file:///c:/Users/chuch/OneDrive/Desktop/Agent/index.html)** - Updated the input layout to stack Name and Password inputs vertically.
- **[index.css](file:///c:/Users/chuch/OneDrive/Desktop/Agent/index.css)** - Added vertical column layout rules for `.login-input-stack`.
- **[app.js](file:///c:/Users/chuch/OneDrive/Desktop/Agent/app.js)** - Implemented password comparison checks and added automatic fallback updates for legacy users.
