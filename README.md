# 📚 React 19 use() Hook + Suspense + Error Boundary Demo

- **use() Hook** - for retrieving data from a Promise
- **Suspense** - for managing loading states
- **Error Boundary** - for handling errors

---

## 📂 Project Structure

```
src/
├── App.jsx                          # Main component (entry point)
├── App.css                          # App-wide styles
├── main.jsx                         # React ROOT
├── components/
│   ├── MessageComponent.jsx         # Component using the use() hook
│   ├── MessageComponent.css         # Styles for MessageComponent
│   └── ErrorBoundary.jsx            # Error boundary component
└── utils/
    └── getMessage.js                # Function that returns a Promise
```

---

## 🚀 How to Run the Project

### 1️⃣ Install dependencies
```bash
npm install
```

### 2️⃣ Run in development mode
```bash
npm run dev
```

Then open in your browser:
```
http://localhost:5173
```

### 3️⃣ Build for production
```bash
npm run build
```

---

### App Flow Diagram

```
1. User opens the site
   ↓
2. App.jsx creates a Promise (simulating a server request)
   ↓
3. The Promise is passed to MessageComponent
   ↓
4. Suspense shows "⏳ Loading..." (fallback)
   ↓
5. use() hook awaits the Promise (2 seconds)
   ↓
6. Promise resolves with data
   ↓
7. MessageComponent displays the data to the user
```

### What if something goes wrong?

```
1. User clicks "❌ Test Error"
   ↓
2. App.jsx creates a Promise that will reject
   ↓
3. Suspense shows "⏳ Loading..."
   ↓
4. Promise fails! ❌
   ↓
5. Error Boundary catches the error
   ↓
6. User sees "Oops! Something went wrong"
   ↓
7. User clicks "🔄 Try Again"
```

---

## 🔧 Project Files (Detailed Explanation)

### 1. `App.jsx` - Main component

What it does:
- Creates 2 buttons: "Load Data" and "Test Error"
- Manages state (success or error)
- Wraps everything with `ErrorBoundary` and `Suspense`

---

### 2. `MessageComponent.jsx` - Component using `use()`

What it does:
- Receives a Promise as a prop
- Uses `use()` to obtain the data
- Renders the data to the user

⚠️ IMPORTANT: Do NOT use `try-catch` with `use()`! Use an Error Boundary instead.

---

### 3. `ErrorBoundary.jsx` - Error boundary

What it does:
- Catches errors from child components
- Shows a user-friendly error UI
- Provides a "Try Again" button to reset/reload

⚠️ IMPORTANT: Error Boundaries MUST be class components!

---

### 4. `getMessage.js` - Function that returns a Promise

What it does:
- Returns a Promise
- After 2 seconds the Promise resolves (success or failure)
- Simulates a server request

Notes:
- `Promise` — object for async operations  
- `resolve()` — success  
- `reject()` — error  
- `setTimeout()` — delay function

---

## 🧪 How to Test

### Test 1️⃣: Successful load

1. Run `npm run dev`  
2. Click the "✅ Load Data" button  
3. See "⏳ Loading..."  
4. After 2 seconds see the message

✅ It worked!

---

### Test 2️⃣: Error handling

1. Click the "❌ Test Error" button  
2. See "⏳ Loading..."  
3. After 2 seconds see the error (red box)  
4. Click the "🔄 Try Again" button  
5. The error clears and you can try again

✅ Error Boundary worked!

---

## 🐛 Troubleshooting

### Error: "use is not defined"
Solution: Make sure `use` is imported from React:
```jsx
import { use } from "react";
```

### Error: "Suspense didn't load data"
Solution: Verify the component is wrapped in `Suspense`:
```jsx
<Suspense fallback={<div>Loading...</div>}>
  <YourComponent />
</Suspense>
```

### Error Boundary doesn't catch the error
Solution: Error Boundary MUST be a class component, not a functional component!

---

## 📚 Useful Links

- [React 19 documentation](https://react.dev)  
- [Suspense documentation](https://react.dev/reference/react/Suspense)  
- [Error Boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

---

## 📝 Summary

This project demonstrates:
- ✅ How to use the `use()` hook in React 19  
- ✅ How to display a loading screen with `Suspense`  
- ✅ How to handle errors with an Error Boundary

---
