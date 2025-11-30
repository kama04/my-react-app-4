# 📚 React 19 use() Hook + Suspense + Error Boundary Demo

Привіт! 👋 Це навчальний проект, який показує, як використовувати нові можливості **React 19**:
- **use() Hook** - для отримання даних з Promise
- **Suspense** - для управління станами завантаження
- **Error Boundary** - для обробки помилок


---

## 📂 Структура проекту

```
src/
├── App.jsx                          # Головний компонент (входова точка)
├── App.css                          # Стилі для всього додатку
├── main.jsx                         # React ROOT
├── components/
│   ├── MessageComponent.jsx         # Компонент з use() hook
│   ├── MessageComponent.css         # Стилі для MessageComponent
│   └── ErrorBoundary.jsx            # Обробник помилок
└── utils/
    └── getMessage.js                # Функція для отримання Promise
```

---

## 🚀 Як запустити проект

### 1️⃣ Встановлення залежностей
```bash
npm install
```

### 2️⃣ Запуск у режимі розробки
```bash
npm run dev
```

Потім відкрийте у браузері:
```
http://localhost:5173
```

### 3️⃣ Побудова для production
```bash
npm run build
```

---

## 📖 Як це працює (для новачків)

### Схема роботи додатку

```
1. Користувач заходить на сайт
   ↓
2. App.jsx створює Promise (симуляція запиту на сервер)
   ↓
3. Promise передається в MessageComponent
   ↓
4. Suspense показує "⏳ Loading..." (fallback)
   ↓
5. use() hook чекає на Promise (2 секунди)
   ↓
6. Promise розв'язується з даними
   ↓
7. MessageComponent показує дані користувачу
```

### Що коли щось пойде не так?

```
1. Користувач натискає кнопку "❌ Test Error"
   ↓
2. App.jsx створює Promise, який буде помилкою
   ↓
3. Suspense показує "⏳ Loading..."
   ↓
4. Promise помилка! ❌
   ↓
5. Error Boundary ловить помилку
   ↓
6. Користувач бачить "Oops! Something went wrong"
   ↓
7. Користувач натискає "🔄 Try Again"
```

---

## 🔧 Файли проекту (детальне пояснення)

### 1. `App.jsx` - Головний компонент

**Що це робить:**
- Створює 2 кнопки: "Load Data" та "Test Error"
- Управляє станом (успіх чи помилка)
- Обертає все у ErrorBoundary та Suspense

**Ключові частини:**
```jsx
import { Suspense, useState } from "react";

export default function App() {
  // Стан для керування помилками
  const [errorMode, setErrorMode] = useState(false);

  // Створюємо Promise (дані або помилку)
  const promise = errorMode 
    ? getMessageWithError()        // Помилка
    : getMessageWithDelay();       // Успіх

  return (
    <div className="app-container">
      {/* Кнопки для тестування */}
      <button onClick={handleReset}>✅ Load Data</button>
      <button onClick={handleTestError}>❌ Test Error</button>

      {/* ErrorBoundary ловить помилки */}
      <ErrorBoundary>
        {/* Suspense показує "Loading..." */}
        <Suspense fallback={<div className="spinner"></div>}>
          {/* MessageComponent отримує Promise */}
          <MessageComponent messagePromise={promise} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
```

**Для новачків:**
- `useState` - це хук для управління даними (state)
- `errorMode` - логічна змінна (true/false)
- Коли натискається кнопка, `errorMode` змінюється
- Нова `Promise` створюється

---

### 2. `MessageComponent.jsx` - Компонент з use()

**Що це робить:**
- Отримує Promise як пропс
- Використовує `use()` для отримання даних
- Показує дані користувачу

**Код:**
```jsx
import { use } from "react";

export default function MessageComponent({ messagePromise }) {
  // use() отримує дані з Promise
  // Якщо Promise ще не готовий → Suspense показує fallback
  // Якщо Promise помилка → Error Boundary ловить помилку
  const message = use(messagePromise);

  return (
    <div className="message-container">
      <div className="message-card">
        <h2>📨 Received Message:</h2>
        <p className="message-text">{message}</p>
        <small className="message-timestamp">
          Loaded at {new Date().toLocaleTimeString()}
        </small>
      </div>
    </div>
  );
}
```

**Для новачків:**
- `messagePromise` - це пропс (параметр компонента)
- `use()` - новий хук в React 19
- `use()` повертає дані коли Promise готовий
- Якщо Promise ще не готовий, компонент "зависає" (Suspense показує fallback)

⚠️ **ВАЖЛИВО:** Не використовуйте `try-catch` з `use()`! Замість цього використовуйте Error Boundary.

---

### 3. `ErrorBoundary.jsx` - Обробник помилок

**Що це робить:**
- Ловить помилки з дітей компонентів
- Показує красивий UI з помилкою
- Надає кнопку "Try Again" для перезавантаження

**Код (спрощено):**
```jsx
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Цей метод викликається коли виникає помилка
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Цей метод логує помилку (для отладки)
  componentDidCatch(error, errorInfo) {
    console.error("Error:", error);
  }

  // Ловит помилку і показує UI
  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-card">
          <h2>❌ Oops! Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={this.handleReset}>🔄 Try Again</button>
        </div>
      );
    }

    return this.props.children;  // Показуємо дітей якщо помилки немає
  }
}
```

**Для новачків:**
- `class` компонент - це інший тип компонента (не функційний)
- `getDerivedStateFromError` - спеціальний метод для ловління помилок
- `this.state` - дані компонента
- `setState` - функція для зміни даних

⚠️ **ВАЖЛИВО:** Error Boundary ПОВИНЕН бути `class` компонентом!

---

### 4. `getMessage.js` - Функція для отримання Promise

**Що це робить:**
- Повертає Promise
- Через 2 секунди Promise розв'язується (успіх або помилка)
- Симулює запит на сервер

**Код:**
```jsx
export function getMessageWithDelay(shouldFail = false) {
  return new Promise((resolve, reject) => {
    // 2 секунди затримка (мережевий запит)
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Error loading data! Please try again."));
      } else {
        resolve("✓ Message loaded successfully!");
      }
    }, 2000);
  });
}

export function getMessageWithError() {
  return getMessageWithDelay(true);  // Завжди помилка
}
```

- `Promise` - об'єкт для асинхронних операцій
- `resolve()` - успіх
- `reject()` - помилка
- `setTimeout()` - функція для затримки

---


## 🧪 Як тестувати

### Тест 1️⃣: Успішне завантаження

1. Запустити `npm run dev`
2. Натиснути кнопку "✅ Load Data"
3. Побачити "⏳ Loading..."
4. Через 2 секунди побачити повідомлення

✅ Все спрацювало!

---

### Тест 2️⃣: Обробка помилок

1. Натиснути кнопку "❌ Test Error"
2. Побачити "⏳ Loading..."
3. Через 2 секунди побачити помилку (червона коробка)
4. Натиснути кнопку "🔄 Try Again"
5. Помилка зникла, можна спробувати знову

✅ Error Boundary спрацював!

---

## 🐛 Якщо щось не працює

### Помилка: "use is not defined"
**Рішення:** Переконайтеся, що імпортовано `use` з `react`:
```jsx
import { use } from "react";
```

### Помилка: "Suspense didn't load data"
**Рішення:** Перевірте, що компонент обернутий у Suspense:
```jsx
<Suspense fallback={<div>Loading...</div>}>
  <YourComponent />
</Suspense>
```

### Error Boundary не ловить помилку
**Рішення:** Error Boundary ПОВИНЕН бути `class` компонент, не функційний!

---

## 📚 Корисні посилання

- [React 19 документація](https://react.dev)
- [Suspense документація](https://react.dev/reference/react/Suspense)
- [Error Boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

---



## 📝 Резюме

Цей проект показує:
- ✅ Як користувати `use()` hook в React 19
- ✅ Як показувати екран завантаження (Suspense)
- ✅ Як обробляти помилки (Error Boundary)


---

