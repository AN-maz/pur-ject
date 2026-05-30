# Documentation Project

## project architecture

```
src/
│
├── app/
│   ├── routes/
│   │   ├── Home.jsx
│   │   └── About.jsx
│   │
│   └── router.jsx
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Container.jsx
│   │
│   ├── sections/
│   │   ├── hero/
│   │   │   ├── HeroSection.jsx
│   │   │   └── HeroCard.jsx
│   │   │
│   │   ├── news/
│   │   │   ├── NewsSection.jsx
│   │   │   ├── NewsCard.jsx
│   │   │   └── NewsDetail.jsx
│   │   │
│   │   └── about/
│   │       ├── VisionSection.jsx
│   │       └── TeamSection.jsx
│   │
│   └── common/
│       ├── Button.jsx
│       ├── Title.jsx
│       └── Badge.jsx
│
├── data/
│   ├── news.json
│   ├── team.json
│   └── hero.json
│
├── hooks/
│   └── useScrollSection.js
│
├── utils/
│   ├── slugify.js
│   └── formatDate.js
│
├── styles/
│   └── globals.css
│
├── assets/
│   ├── images/
│   └── icons/
│
├── services/
│   └── contentService.js
│
├── context/
│   └── ThemeContext.jsx
│
├── App.jsx
└── main.jsx

```

