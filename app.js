(function () {
  "use strict";

  const PRODUCT_CATEGORIES = [
    "овощи и зелень",
    "фрукты",
    "мясо и птица",
    "рыба",
    "молочные продукты",
    "крупы и макароны",
    "хлеб",
    "специи",
    "консервы",
    "заморозка",
    "прочее"
  ];

  const MEALS = [
    ["breakfast", "Завтрак"],
    ["lunch", "Обед"],
    ["dinner", "Ужин"],
    ["snack", "Перекус"]
  ];

  const PEOPLE = [
    { id: "artem", name: "Артем", avatar_emoji: "👨", color: "#f97316", created_at: "2026-07-08T00:00:00.000Z" },
    { id: "tyoma", name: "Тёма", avatar_emoji: "🧒", color: "#22c55e", created_at: "2026-07-08T00:00:00.000Z" },
    { id: "ilya", name: "Илья", avatar_emoji: "🧒", color: "#3b82f6", created_at: "2026-07-08T00:00:00.000Z" },
    { id: "oksana", name: "Оксана", avatar_emoji: "👩", color: "#ec4899", created_at: "2026-07-08T00:00:00.000Z" }
  ];

  const SOURCE_TYPES = {
    default: "Обычный рецепт",
    mom: "От мамы",
    grandma: "От бабушки",
    family: "Семейный",
    internet: "Из интернета",
    own: "Мой рецепт"
  };

  const DEFAULT_RATINGS = [
    ["r1", "artem", 5], ["r1", "tyoma", 5], ["r1", "ilya", 4], ["r1", "oksana", 4],
    ["r2", "artem", 4], ["r2", "tyoma", 4], ["r2", "ilya", 5], ["r2", "oksana", 5],
    ["r3", "artem", 4], ["r3", "tyoma", 5], ["r3", "ilya", 5], ["r3", "oksana", 4],
    ["r4", "artem", 5], ["r4", "tyoma", 3], ["r4", "ilya", 4], ["r4", "oksana", 5]
  ].map(([recipe_id, person_id, rating]) => ({
    id: `rr_${recipe_id}_${person_id}`,
    recipe_id,
    person_id,
    rating,
    note: "",
    created_at: "2026-07-08T00:00:00.000Z",
    updated_at: "2026-07-08T00:00:00.000Z"
  }));

  const DEFAULT_HISTORY = [
    {
      id: "ch_r1_1",
      recipe_id: "r1",
      cooked_at: "2026-06-30",
      photo_url: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
      comment: "Получилось очень по-домашнему, в следующий раз добавим больше зелени.",
      overall_rating: 5,
      eaten_by_person_ids: ["artem", "oksana", "ilya"],
      next_time_note: "Меньше лапши, больше укропа.",
      created_at: "2026-06-30T18:30:00.000Z"
    },
    {
      id: "ch_r2_1",
      recipe_id: "r2",
      cooked_at: "2026-07-05",
      photo_url: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80",
      comment: "Быстрый ужин спас вечер, соус вышел насыщенным.",
      overall_rating: 5,
      eaten_by_person_ids: ["artem", "tyoma", "ilya", "oksana"],
      next_time_note: "Добавить чуть меньше чеснока для детей.",
      created_at: "2026-07-05T19:20:00.000Z"
    }
  ];

  const DEFAULT_HOME_PRODUCTS = [
    { id: "hp_salt", name: "соль", amount: 1, unit: "пачка", category: "специи", is_always_available: true, updated_at: "2026-07-08T00:00:00.000Z" },
    { id: "hp_sugar", name: "сахар", amount: 1, unit: "кг", category: "прочее", is_always_available: true, updated_at: "2026-07-08T00:00:00.000Z" },
    { id: "hp_oil", name: "масло", amount: 1, unit: "бут", category: "прочее", is_always_available: true, updated_at: "2026-07-08T00:00:00.000Z" },
    { id: "hp_flour", name: "мука", amount: 1, unit: "кг", category: "прочее", is_always_available: true, updated_at: "2026-07-08T00:00:00.000Z" },
    { id: "hp_spices", name: "специи", amount: 1, unit: "набор", category: "специи", is_always_available: true, updated_at: "2026-07-08T00:00:00.000Z" },
    { id: "hp_rice", name: "рис", amount: 500, unit: "г", category: "крупы и макароны", is_always_available: true, updated_at: "2026-07-08T00:00:00.000Z" },
    { id: "hp_pasta", name: "макароны", amount: 500, unit: "г", category: "крупы и макароны", is_always_available: true, updated_at: "2026-07-08T00:00:00.000Z" }
  ];

  const DEFAULT_RECIPES = [
    {
      id: "r1",
      title: "Куриный суп с лапшой",
      description: "Теплый домашний суп на каждый день: прозрачный бульон, овощи и мягкая лапша.",
      image_url: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1100&q=80",
      category: "супы",
      source_type: "mom",
      source_url: "",
      tags: ["обед", "детям", "легко"],
      prep_time: 15,
      cook_time: 45,
      total_time: 60,
      servings: 4,
      difficulty: "легко",
      is_favorite: true,
      created_at: "2026-06-18T10:00:00.000Z",
      updated_at: "2026-06-18T10:00:00.000Z",
      ingredients: [
        { id: "i1", name: "куриное бедро", amount: 600, unit: "г", category: "мясо и птица" },
        { id: "i2", name: "лапша", amount: 120, unit: "г", category: "крупы и макароны" },
        { id: "i3", name: "морковь", amount: 1, unit: "шт", category: "овощи и зелень" },
        { id: "i4", name: "лук", amount: 1, unit: "шт", category: "овощи и зелень" },
        { id: "i5", name: "укроп", amount: 20, unit: "г", category: "овощи и зелень" },
        { id: "i6", name: "лавровый лист", amount: 2, unit: "шт", category: "специи" }
      ],
      steps: [
        { id: "s1", step_number: 1, text: "Залейте курицу водой, доведите до кипения и снимите пену.", image_url: "", timer_minutes: 10 },
        { id: "s2", step_number: 2, text: "Добавьте лук, морковь и лавровый лист, варите бульон до мягкости курицы.", image_url: "", timer_minutes: 30 },
        { id: "s3", step_number: 3, text: "Достаньте курицу, разберите мясо, верните в кастрюлю и добавьте лапшу.", image_url: "", timer_minutes: 8 },
        { id: "s4", step_number: 4, text: "Посолите, добавьте укроп и дайте супу постоять пару минут.", image_url: "", timer_minutes: 2 }
      ],
      notes: "Лапшу можно сварить отдельно, если суп хранится на несколько дней."
    },
    {
      id: "r2",
      title: "Паста с томатами и базиликом",
      description: "Быстрый ужин с ярким томатным соусом, сыром и свежей зеленью.",
      image_url: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1100&q=80",
      category: "паста",
      source_type: "internet",
      source_url: "https://example.com/pasta",
      tags: ["ужин", "быстро", "без мяса"],
      prep_time: 10,
      cook_time: 20,
      total_time: 30,
      servings: 2,
      difficulty: "легко",
      is_favorite: true,
      created_at: "2026-06-24T10:00:00.000Z",
      updated_at: "2026-06-24T10:00:00.000Z",
      ingredients: [
        { id: "i7", name: "спагетти", amount: 220, unit: "г", category: "крупы и макароны" },
        { id: "i8", name: "томаты в собственном соку", amount: 300, unit: "г", category: "консервы" },
        { id: "i9", name: "чеснок", amount: 2, unit: "зуб", category: "овощи и зелень" },
        { id: "i10", name: "пармезан", amount: 40, unit: "г", category: "молочные продукты" },
        { id: "i11", name: "базилик", amount: 15, unit: "г", category: "овощи и зелень" }
      ],
      steps: [
        { id: "s5", step_number: 1, text: "Отварите пасту до состояния аль денте.", image_url: "", timer_minutes: 9 },
        { id: "s6", step_number: 2, text: "Обжарьте чеснок, добавьте томаты и прогрейте соус.", image_url: "", timer_minutes: 10 },
        { id: "s7", step_number: 3, text: "Смешайте пасту с соусом, добавьте сыр и базилик.", image_url: "", timer_minutes: 2 }
      ],
      notes: "Оставьте немного воды от пасты, чтобы сделать соус шелковистым."
    },
    {
      id: "r3",
      title: "Овсянка с яблоком и корицей",
      description: "Мягкая утренняя каша с яблоком, медом и теплой корицей.",
      image_url: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=1100&q=80",
      category: "завтраки",
      source_type: "family",
      source_url: "",
      tags: ["завтрак", "быстро", "сладкое"],
      prep_time: 5,
      cook_time: 10,
      total_time: 15,
      servings: 1,
      difficulty: "легко",
      is_favorite: false,
      created_at: "2026-07-01T10:00:00.000Z",
      updated_at: "2026-07-01T10:00:00.000Z",
      ingredients: [
        { id: "i12", name: "овсяные хлопья", amount: 60, unit: "г", category: "крупы и макароны" },
        { id: "i13", name: "молоко", amount: 250, unit: "мл", category: "молочные продукты" },
        { id: "i14", name: "яблоко", amount: 1, unit: "шт", category: "фрукты" },
        { id: "i15", name: "мед", amount: 1, unit: "ст. л.", category: "прочее" },
        { id: "i16", name: "корица", amount: 0.5, unit: "ч. л.", category: "специи" }
      ],
      steps: [
        { id: "s8", step_number: 1, text: "Смешайте хлопья и молоко в сотейнике.", image_url: "", timer_minutes: 1 },
        { id: "s9", step_number: 2, text: "Варите на слабом огне, помешивая, до кремовой текстуры.", image_url: "", timer_minutes: 8 },
        { id: "s10", step_number: 3, text: "Добавьте яблоко, мед и корицу.", image_url: "", timer_minutes: 1 }
      ],
      notes: "Для более плотной каши уменьшите молоко на 40 мл."
    },
    {
      id: "r4",
      title: "Запеченная рыба с овощами",
      description: "Легкий ужин в одной форме: рыба, брокколи, картофель и лимон.",
      image_url: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1100&q=80",
      category: "рыба",
      source_type: "own",
      source_url: "",
      tags: ["ужин", "духовка", "полезно"],
      prep_time: 15,
      cook_time: 25,
      total_time: 40,
      servings: 2,
      difficulty: "средне",
      is_favorite: false,
      created_at: "2026-07-04T10:00:00.000Z",
      updated_at: "2026-07-04T10:00:00.000Z",
      ingredients: [
        { id: "i17", name: "филе белой рыбы", amount: 400, unit: "г", category: "рыба" },
        { id: "i18", name: "картофель", amount: 500, unit: "г", category: "овощи и зелень" },
        { id: "i19", name: "брокколи", amount: 250, unit: "г", category: "заморозка" },
        { id: "i20", name: "лимон", amount: 0.5, unit: "шт", category: "фрукты" },
        { id: "i21", name: "оливковое масло", amount: 2, unit: "ст. л.", category: "прочее" }
      ],
      steps: [
        { id: "s11", step_number: 1, text: "Нарежьте картофель тонкими дольками и смешайте с маслом.", image_url: "", timer_minutes: 5 },
        { id: "s12", step_number: 2, text: "Запекайте картофель до полуготовности.", image_url: "", timer_minutes: 15 },
        { id: "s13", step_number: 3, text: "Добавьте рыбу, брокколи и лимон, запекайте до готовности.", image_url: "", timer_minutes: 20 }
      ],
      notes: "Рыбу удобно проверять вилкой: она должна легко разделяться на хлопья."
    }
  ];

  const today = new Date();
  const todayIso = toIsoDate(today);
  const initialWeek = startOfWeek(today);

  const state = loadState();
  let activeView = "home";
  let activeRecipeId = null;
  let cookingStep = 0;
  let addMenuRecipeId = null;
  let addRecipeMode = null;
  let recipeDraft = null;
  let historyRecipeId = null;
  let currentWeekStart = initialWeek;

  const app = document.getElementById("app");

  function loadState() {
    const saved = localStorage.getItem("homeRecipesState");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return normalizeState(parsed);
      } catch (error) {
        console.warn("State parse failed", error);
      }
    }

    return normalizeState({
      recipes: DEFAULT_RECIPES,
      weekly_menu: seedMenu(initialWeek),
      shopping_items: [],
      shopping_lists: []
    });
  }

  function normalizeState(raw) {
    const recipes = (raw.recipes || DEFAULT_RECIPES).map((recipe) => ({
      ...recipe,
      source_type: recipe.source_type || "default",
      source_url: recipe.source_url || ""
    }));

    return {
      recipes,
      people: raw.people || PEOPLE,
      recipe_ratings: raw.recipe_ratings || DEFAULT_RATINGS,
      cooking_history: raw.cooking_history || DEFAULT_HISTORY,
      home_products: raw.home_products || DEFAULT_HOME_PRODUCTS,
      weekly_menu: raw.weekly_menu || [],
      shopping_items: raw.shopping_items || [],
      shopping_lists: raw.shopping_lists || []
    };
  }

  function seedMenu(weekStart) {
    const days = getWeekDays(weekStart);
    return [
      menuEntry(days[0], "breakfast", "r3", 1),
      menuEntry(days[0], "dinner", "r2", 2),
      menuEntry(days[1], "lunch", "r1", 4),
      menuEntry(days[2], "dinner", "r4", 2)
    ];
  }

  function menuEntry(date, meal_type, recipe_id, servings) {
    return { id: uid("m"), date: toIsoDate(date), meal_type, recipe_id, servings };
  }

  function saveState() {
    localStorage.setItem("homeRecipesState", JSON.stringify(state));
  }

  function render() {
    app.innerHTML = `
      <div class="app">
        <header class="topbar">
          <div class="brand">
            <div class="brand-mark">⌂</div>
            <div>
              <h1 class="brand-title">Домашние рецепты</h1>
              <p class="brand-subtitle">меню, покупки и готовка без суеты</p>
            </div>
          </div>
        </header>
        <main class="page">
          ${renderHome()}
          ${renderRecipes()}
          ${renderMenu()}
          ${renderShopping()}
          ${renderPantry()}
        </main>
        ${renderNav()}
        ${renderRecipeDialog()}
        ${renderAddMenuDialog()}
        ${renderAddRecipeDialog()}
        ${renderAddHistoryDialog()}
        <div id="toast-root"></div>
      </div>
    `;
    bindEvents();
  }

  function renderHome() {
    const todayRecipe = getTodayRecipe();
    const favoriteRecipes = state.recipes.filter((recipe) => recipe.is_favorite).slice(0, 3);
    const latestRecipes = [...state.recipes].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 3);
    const recentHistory = [...state.cooking_history].sort((a, b) => new Date(b.cooked_at) - new Date(a.cooked_at)).slice(0, 3);
    const longAgo = getLongAgoRecipes().slice(0, 3);

    return `
      <section class="view ${activeView === "home" ? "active" : ""}" data-view="home">
        <div class="hero-grid">
          <article class="today-panel">
            <div class="today-photo" style="background-image:url('${escapeAttr(todayRecipe.image_url)}')"></div>
            <div class="today-content">
              <p class="eyebrow">Блюдо на сегодня</p>
              <h1>${escapeHtml(todayRecipe.title)}</h1>
              <p>${escapeHtml(todayRecipe.description)}</p>
              <div class="button-row">
                <button class="primary" data-open-recipe="${todayRecipe.id}">Открыть рецепт</button>
                <button class="secondary" data-view-target="menu">Меню недели</button>
              </div>
            </div>
          </article>
          <aside class="quick-panel">
            <button class="quick-button" data-view-target="recipes">
              <span><strong>Рецепты</strong><span>Фильтры, избранное, ингредиенты</span></span>
              <span>→</span>
            </button>
            <button class="quick-button" data-view-target="shopping">
              <span><strong>Список покупок</strong><span>${state.shopping_items.length || "Соберите"} товаров</span></span>
              <span>→</span>
            </button>
            <button class="quick-button" data-generate-week-shopping>
              <span><strong>Покупки на неделю</strong><span>Суммировать меню целиком</span></span>
              <span>＋</span>
            </button>
            <button class="quick-button" data-view-target="pantry">
              <span><strong>Что есть дома</strong><span>Подобрать рецепты по продуктам</span></span>
              <span>→</span>
            </button>
          </aside>
        </div>

        <div class="section-head">
          <div>
            <h2>Текущая неделя</h2>
            <p>${formatWeekRange(currentWeekStart)}</p>
          </div>
          <button class="ghost" data-view-target="menu">Открыть таблицу</button>
        </div>
        <div class="week-strip">${renderWeekStrip()}</div>

        <div class="section-head">
          <div>
            <h2>Избранное</h2>
            <p>То, к чему приятно возвращаться</p>
          </div>
        </div>
        <div class="recipe-grid">${favoriteRecipes.map(renderRecipeCard).join("") || emptyState("Избранных рецептов пока нет.")}</div>

        <div class="section-head">
          <div>
            <h2>Недавно готовили</h2>
            <p>Фото и заметки после готовки</p>
          </div>
        </div>
        <div class="home-history-grid">${recentHistory.map(renderHistoryPreview).join("") || emptyState("Истории приготовлений пока нет.")}</div>

        <div class="section-head">
          <div>
            <h2>Давно не готовили</h2>
            <p>Хорошие блюда, которые пора вернуть в меню</p>
          </div>
        </div>
        <div class="recipe-grid">${longAgo.map(renderRecipeCard).join("") || emptyState("Пока нет рецептов для этой подборки.")}</div>

        <div class="section-head">
          <div>
            <h2>Последние добавленные</h2>
            <p>Свежие идеи для ближайших дней</p>
          </div>
        </div>
        <div class="recipe-grid">${latestRecipes.map(renderRecipeCard).join("")}</div>
      </section>
    `;
  }

  function renderRecipes() {
    const categories = unique(state.recipes.map((recipe) => recipe.category));
    const tags = unique(state.recipes.flatMap((recipe) => recipe.tags));

    return `
      <section class="view ${activeView === "recipes" ? "active" : ""}" data-view="recipes">
        <div class="section-head">
          <div class="view-title">
            <h1>Рецепты</h1>
            <p>Карточки блюд с семейными оценками, источниками и быстрым добавлением.</p>
          </div>
          <button class="primary" data-open-add-recipe>＋ Добавить рецепт</button>
        </div>
        <form class="filters-panel" id="filters">
          <div class="field">
            <label for="filter-category">Категория</label>
            <select id="filter-category">
              <option value="">Все</option>
              ${categories.map((category) => `<option value="${escapeAttr(category)}">${escapeHtml(category)}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="filter-tag">Тег</label>
            <select id="filter-tag">
              <option value="">Любой</option>
              ${tags.map((tag) => `<option value="${escapeAttr(tag)}">${escapeHtml(tag)}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="filter-time">До, минут</label>
            <input id="filter-time" type="number" min="0" inputmode="numeric" placeholder="например 30" />
          </div>
          <div class="field">
            <label for="filter-ingredient">Ингредиент</label>
            <input id="filter-ingredient" type="search" placeholder="курица, томаты..." />
          </div>
          <div class="field">
            <label for="filter-family">Семья</label>
            <select id="filter-family">
              <option value="">Все</option>
              <option value="likes:artem">Любит Артем</option>
              <option value="likes:tyoma">Любит Тёма</option>
              <option value="likes:ilya">Любит Илья</option>
              <option value="likes:oksana">Любит Оксана</option>
              <option value="hits">Самые любимые</option>
              <option value="unrated">Не оцененные</option>
              <option value="quick">До 30 минут</option>
              <option value="children">Детям нравится</option>
              <option value="family-hits">Семейные хиты</option>
              <option value="not-recent">Не готовили давно</option>
            </select>
          </div>
          <label class="toggle-field">
            <input id="filter-favorite" type="checkbox" />
            Только избранное
          </label>
        </form>
        <div class="recipe-grid" id="recipe-list">${state.recipes.map(renderRecipeCard).join("")}</div>
      </section>
    `;
  }

  function renderRecipeCard(recipe) {
    const rating = getRecipeRatingSummary(recipe.id);
    return `
      <article class="recipe-card" data-recipe-card="${recipe.id}">
        <div class="recipe-image" style="background-image:url('${escapeAttr(recipe.image_url)}')">
          <button class="favorite" aria-label="Избранное" data-toggle-favorite="${recipe.id}">${recipe.is_favorite ? "★" : "☆"}</button>
        </div>
        <div class="recipe-body">
          <div class="chips">
            ${renderSourceBadge(recipe.source_type)}
            <span class="chip hot">${escapeHtml(recipe.category)}</span>
            ${recipe.tags.slice(0, 2).map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`).join("")}
          </div>
          <h3>${escapeHtml(recipe.title)}</h3>
          <p class="recipe-card-description">${escapeHtml(recipe.description)}</p>
          <div class="meta">
            <span>${recipe.total_time} мин</span>
            <span>${recipe.servings} порц.</span>
            <span>${escapeHtml(recipe.difficulty)}</span>
            <span>⭐ ${rating.average ? rating.average.toFixed(1) : "—"}</span>
          </div>
          <div class="loved-by">Любят: ${rating.topNames.length ? escapeHtml(rating.topNames.join(", ")) : "пока не оценили"}</div>
          ${renderPersonRatingChips(recipe.id)}
          <div class="button-row recipe-actions">
            <button class="primary green" data-open-recipe="${recipe.id}">Готовить</button>
            <button class="primary" data-open-recipe="${recipe.id}">Подробнее</button>
            <button class="icon-button action-mini action-mini--menu" data-open-add-menu="${recipe.id}" aria-label="Добавить в меню" title="В меню">＋</button>
            <button class="icon-button action-mini action-mini--shopping" data-add-shopping="${recipe.id}" aria-label="Добавить ингредиенты в покупки" title="В покупки">✓</button>
          </div>
        </div>
      </article>
    `;
  }

  function renderWeekStrip() {
    return getWeekDays(currentWeekStart)
      .map((date) => {
        const iso = toIsoDate(date);
        const entries = state.weekly_menu.filter((entry) => entry.date === iso);
        return `
          <div class="day-mini">
            <strong>${formatDayShort(date)}</strong>
            ${entries.length ? entries.map((entry) => `<span>${escapeHtml(mealLabel(entry.meal_type))}: ${escapeHtml(recipeTitle(entry.recipe_id))}</span>`).join("") : "<span>пока пусто</span>"}
          </div>
        `;
      })
      .join("");
  }

  function renderMenu() {
    const days = getWeekDays(currentWeekStart);
    return `
      <section class="view ${activeView === "menu" ? "active" : ""}" data-view="menu">
        <div class="view-title">
          <h1>Меню на неделю</h1>
          <p>${formatWeekRange(currentWeekStart)}</p>
        </div>
        <div class="menu-actions">
          <button class="ghost" data-week-prev>← Прошлая</button>
          <button class="ghost" data-week-today>Сегодня</button>
          <button class="ghost" data-week-next>Следующая →</button>
          <button class="secondary" data-copy-prev-week>Скопировать прошлую неделю</button>
          <button class="danger" data-clear-week>Очистить неделю</button>
          <button class="primary green" data-generate-day-shopping>Покупки на сегодня</button>
          <button class="primary" data-generate-week-shopping>Покупки на неделю</button>
        </div>
        <div class="menu-panel">
          <div class="menu-grid">
            <div class="menu-head">Прием</div>
            ${days.map((day) => `<div class="menu-head">${formatDayShort(day)}<br>${toHumanDate(day)}</div>`).join("")}
            ${MEALS.map(([mealType, label]) => `
              <div class="menu-cell meal-label">${label}</div>
              ${days.map((day) => renderMenuCell(day, mealType)).join("")}
            `).join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderMenuCell(day, mealType) {
    const date = toIsoDate(day);
    const entry = state.weekly_menu.find((item) => item.date === date && item.meal_type === mealType);
    if (!entry) {
      return `<div class="menu-cell"><button class="ghost" data-add-slot="${date}|${mealType}">＋ Добавить</button></div>`;
    }

    const recipe = getRecipe(entry.recipe_id);
    return `
      <div class="menu-cell">
        <div class="menu-item">
          <div class="menu-title">${escapeHtml(recipe ? recipe.title : "Рецепт удален")}</div>
          <div class="menu-sub">${entry.servings} порц.${entry.is_leftover ? " · осталось со вчера" : ""}</div>
          <div class="small-controls">
            <button data-open-recipe="${entry.recipe_id}" title="Открыть">Открыть</button>
            <button data-add-slot="${date}|${mealType}" title="Заменить">↻</button>
            <button data-suggest-replace="${entry.id}" title="Не хочу сегодня">?</button>
            <button data-leftover="${entry.id}" title="Осталось на завтра">↷</button>
            <button data-remove-menu="${entry.id}" title="Удалить">×</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderShopping() {
    return `
      <section class="view ${activeView === "shopping" ? "active" : ""}" data-view="shopping">
        <div class="view-title">
          <h1>Список покупок</h1>
          <p>Товары объединяются по названию и единице измерения.</p>
        </div>
        <div class="shopping-actions">
          <button class="primary green" data-generate-day-shopping>Собрать на сегодня</button>
          <button class="primary" data-generate-week-shopping>Собрать на неделю</button>
          <button class="ghost" data-manual-item>Добавить вручную</button>
          <button class="secondary" data-copy-shopping>Скопировать текстом</button>
          <button class="danger" data-clear-shopping>Очистить</button>
        </div>
        <div class="shopping-panel" id="shopping-list">${renderShoppingItems()}</div>
      </section>
    `;
  }

  function renderShoppingItems() {
    if (!state.shopping_items.length) {
      return emptyState("Список пуст. Соберите покупки из рецепта, дня или всей недели.");
    }

    return PRODUCT_CATEGORIES.map((category) => {
      const items = state.shopping_items.filter((item) => item.category === category);
      if (!items.length) return "";
      return `
        <section class="shopping-category">
          <h3>${escapeHtml(category)}</h3>
          ${items.map(renderShoppingRow).join("")}
        </section>
      `;
    }).join("");
  }

  function renderShoppingRow(item) {
    return `
      <div class="shopping-row ${item.is_checked ? "checked" : ""}" data-shopping-row="${item.id}">
        <input type="checkbox" ${item.is_checked ? "checked" : ""} data-check-item="${item.id}" aria-label="Куплено" />
        <input value="${escapeAttr(item.name)}" data-edit-item="${item.id}|name" aria-label="Название" />
        <input value="${escapeAttr(formatAmount(item.amount))}" data-edit-item="${item.id}|amount" inputmode="decimal" aria-label="Количество" />
        <input value="${escapeAttr(item.unit)}" data-edit-item="${item.id}|unit" aria-label="Единица" />
        <button class="icon-button" data-delete-item="${item.id}" aria-label="Удалить">×</button>
      </div>
    `;
  }

  function renderPantry() {
    const matches = getPantryMatches();
    return `
      <section class="view ${activeView === "pantry" ? "active" : ""}" data-view="pantry">
        <div class="view-title">
          <h1>Что есть дома</h1>
          <p>Первая версия без ИИ: отмечаем продукты вручную и подбираем рецепты из базы.</p>
        </div>
        <div class="available-products-card">
          <div class="section-head" style="margin-top:0">
            <div>
              <h2>Продукты дома</h2>
              <p>Базовые продукты можно исключать из списка покупок.</p>
            </div>
            <button class="primary green" data-add-home-product>＋ Добавить продукт</button>
          </div>
          <div class="home-products-list">
            ${state.home_products.map(renderHomeProductRow).join("")}
          </div>
        </div>
        <div class="section-head">
          <div>
            <h2>Что можно приготовить</h2>
            <p>Чем больше совпадений, тем выше рецепт в списке.</p>
          </div>
        </div>
        <div class="recipe-match-list">
          ${matches.map(renderRecipeMatchCard).join("") || emptyState("Добавьте продукты дома, чтобы увидеть рекомендации.")}
        </div>
      </section>
    `;
  }

  function renderHomeProductRow(item) {
    return `
      <div class="home-product-row">
        <input value="${escapeAttr(item.name)}" data-edit-home-product="${item.id}|name" aria-label="Название продукта" />
        <input value="${escapeAttr(formatAmount(item.amount))}" data-edit-home-product="${item.id}|amount" inputmode="decimal" aria-label="Количество" />
        <input value="${escapeAttr(item.unit)}" data-edit-home-product="${item.id}|unit" aria-label="Единица" />
        <label class="home-product-check"><input type="checkbox" ${item.is_always_available ? "checked" : ""} data-home-always="${item.id}" /> всегда есть</label>
        <button class="icon-button" data-delete-home-product="${item.id}" aria-label="Удалить">×</button>
      </div>
    `;
  }

  function renderRecipeMatchCard(match) {
    return `
      <article class="recipe-match-card">
        <div class="recipe-match-card__image"><img src="${escapeAttr(match.recipe.image_url)}" alt="" /></div>
        <div>
          <h3 class="recipe-match-card__title">${escapeHtml(match.recipe.title)}</h3>
          <p class="recipe-match-card__meta">Есть: ${match.available} из ${match.total} ингредиентов</p>
          <div class="recipe-match-card__missing">Не хватает: ${match.missing.length ? escapeHtml(match.missing.join(", ")) : "ничего"}</div>
          <div class="button-row" style="margin-top:8px">
            <button class="ghost" data-open-recipe="${match.recipe.id}">Открыть</button>
            ${match.missing.length ? `<button class="secondary" data-add-missing="${match.recipe.id}">Добавить недостающее</button>` : ""}
          </div>
        </div>
      </article>
    `;
  }

  function renderNav() {
    const items = [
      ["home", "⌂", "Дом"],
      ["recipes", "▤", "Рецепты"],
      ["menu", "▦", "Меню"],
      ["shopping", "✓", "Покупки"],
      ["pantry", "◎", "Дома"]
    ];
    return `
      <nav class="bottom-nav" aria-label="Главная навигация">
        ${items.map(([view, icon, label]) => `
          <button class="nav-button ${activeView === view ? "active" : ""}" data-view-target="${view}">
            <span class="nav-icon">${icon}</span>
            <span>${label}</span>
          </button>
        `).join("")}
      </nav>
    `;
  }

  function renderRecipeDialog() {
    if (!activeRecipeId) return `<div class="dialog-backdrop" id="recipe-dialog"></div>`;
    const recipe = getRecipe(activeRecipeId);
    if (!recipe) return `<div class="dialog-backdrop" id="recipe-dialog"></div>`;

    if (cookingStep > -1) {
      const step = recipe.steps[cookingStep] || recipe.steps[0];
      return `
        <div class="dialog-backdrop active" id="recipe-dialog">
          <article class="dialog large">
            <div class="cook-mode">
              <div class="dialog-title-row">
                <div>
                  <p class="eyebrow">Готовлю сейчас</p>
                  <h2>${escapeHtml(recipe.title)}</h2>
                </div>
                <button class="icon-button" data-close-dialog>×</button>
              </div>
              <div class="cook-step">
                <h3>Шаг ${step.step_number} из ${recipe.steps.length}</h3>
                <p>${escapeHtml(step.text)}</p>
                ${step.timer_minutes ? `<span class="timer">Таймер: ${step.timer_minutes} мин</span>` : ""}
              </div>
              <div class="button-row">
                <button class="ghost" data-cook-prev ${cookingStep === 0 ? "disabled" : ""}>← Назад</button>
                <button class="secondary" data-exit-cook>К рецепту</button>
                <button class="primary" data-cook-next ${cookingStep === recipe.steps.length - 1 ? "disabled" : ""}>Дальше →</button>
              </div>
            </div>
          </article>
        </div>
      `;
    }

    return `
      <div class="dialog-backdrop active" id="recipe-dialog">
        <article class="dialog large">
          <div class="dialog-hero" style="background-image:url('${escapeAttr(recipe.image_url)}')">
            <button class="icon-button dialog-close-float" data-close-dialog aria-label="Закрыть рецепт">×</button>
          </div>
          <div class="dialog-body">
            <div class="dialog-title-row">
              <div>
                <p class="eyebrow">${escapeHtml(recipe.category)}</p>
                <h2>${escapeHtml(recipe.title)}</h2>
              </div>
            </div>
            <p>${escapeHtml(recipe.description)}</p>
            <div class="chips">${renderSourceBadge(recipe.source_type)}${recipe.source_url ? `<a class="source-link" href="${escapeAttr(recipe.source_url)}" target="_blank" rel="noreferrer">Источник</a>` : ""}</div>
            <div class="meta">
              <span>Подготовка: ${recipe.prep_time} мин</span>
              <span>Готовка: ${recipe.cook_time} мин</span>
              <span>Всего: ${recipe.total_time} мин</span>
              <span>${recipe.servings} порц.</span>
              <span>${escapeHtml(recipe.category)}</span>
              <span>${escapeHtml(recipe.difficulty)}</span>
            </div>
            <div class="chips">${recipe.tags.map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`).join("")}</div>
            <section class="detail-section">
              <h3>Кому нравится</h3>
              ${renderFamilyRatings(recipe.id)}
            </section>
            <div class="button-row" style="margin-top:14px">
              <button class="primary green" data-start-cook>Готовлю сейчас</button>
              <button class="secondary" data-open-history="${recipe.id}">Добавить фото результата</button>
              <button class="secondary" data-open-add-menu="${recipe.id}">Добавить в меню</button>
              <button class="ghost" data-add-shopping="${recipe.id}">В список покупок</button>
            </div>
            <div class="detail-grid">
              <section>
                <h3>Ингредиенты</h3>
                <ul class="ingredient-list">
                  ${recipe.ingredients.map((item) => `<li><strong>${escapeHtml(item.name)}</strong><br>${formatAmount(item.amount)} ${escapeHtml(item.unit)} · ${escapeHtml(item.category)}</li>`).join("")}
                </ul>
              </section>
              <section>
                <h3>Приготовление</h3>
                <ol class="step-list">
                  ${recipe.steps.map((step) => `<li class="step-card"><strong>Шаг ${step.step_number}${step.timer_minutes ? ` · ${step.timer_minutes} мин` : ""}</strong>${escapeHtml(step.text)}</li>`).join("")}
                </ol>
                <h3>История приготовлений</h3>
                ${renderCookingHistory(recipe.id)}
                <h3>Заметки</h3>
                <p>${escapeHtml(recipe.notes || "Заметок пока нет.")}</p>
              </section>
            </div>
          </div>
        </article>
      </div>
    `;
  }

  function renderAddMenuDialog() {
    if (!addMenuRecipeId) return `<div class="dialog-backdrop" id="add-menu-dialog"></div>`;
    const recipe = getRecipe(addMenuRecipeId.recipeId);
    const days = getWeekDays(currentWeekStart);
    return `
      <div class="dialog-backdrop active" id="add-menu-dialog">
        <form class="dialog" id="add-menu-form">
          <div class="dialog-body">
            <div class="dialog-title-row">
              <div>
                <p class="eyebrow">Добавить в меню</p>
                <h2>${escapeHtml(recipe.title)}</h2>
              </div>
              <button class="icon-button" type="button" data-close-add-menu>×</button>
            </div>
            <div class="detail-grid">
              <div class="field">
                <label for="menu-recipe">Рецепт</label>
                <select id="menu-recipe" required>
                  ${state.recipes.map((item) => `<option value="${item.id}" ${item.id === addMenuRecipeId.recipeId ? "selected" : ""}>${escapeHtml(item.title)}</option>`).join("")}
                </select>
              </div>
              <div class="field">
                <label for="menu-date">День</label>
                <select id="menu-date" required>
                  ${days.map((day) => `<option value="${toIsoDate(day)}" ${addMenuRecipeId.date === toIsoDate(day) ? "selected" : ""}>${formatDayShort(day)} · ${toHumanDate(day)}</option>`).join("")}
                </select>
              </div>
              <div class="field">
                <label for="menu-meal">Прием пищи</label>
                <select id="menu-meal" required>
                  ${MEALS.map(([value, label]) => `<option value="${value}" ${addMenuRecipeId.mealType === value ? "selected" : ""}>${label}</option>`).join("")}
                </select>
              </div>
              <div class="field">
                <label for="menu-servings">Порции</label>
                <input id="menu-servings" type="number" min="1" step="1" value="${recipe.servings}" required />
              </div>
            </div>
            <div class="button-row" style="margin-top:16px">
              <button class="primary" type="submit">Сохранить</button>
              <button class="ghost" type="button" data-close-add-menu>Отмена</button>
            </div>
          </div>
        </form>
      </div>
    `;
  }

  function renderAddRecipeDialog() {
    if (!addRecipeMode) return `<div class="dialog-backdrop" id="add-recipe-dialog"></div>`;
    const draft = recipeDraft || makeEmptyRecipeDraft();
    return `
      <div class="dialog-backdrop active" id="add-recipe-dialog">
        <form class="dialog large" id="add-recipe-form">
          <div class="dialog-body">
            <div class="dialog-title-row">
              <div>
                <p class="eyebrow">Добавить рецепт</p>
                <h2>${addRecipeMode === "confirm" ? "Проверьте рецепт перед сохранением" : "Новый семейный рецепт"}</h2>
              </div>
              <button class="icon-button" type="button" data-close-add-recipe>×</button>
            </div>
            <div class="import-recipe-card">
              <h3 class="import-recipe-card__title">Способ добавления</h3>
              <p class="import-recipe-card__text">Можно заполнить вручную, вставить ссылку или текст рецепта. Сохранение происходит только после проверки.</p>
              <div class="import-options">
                <button class="import-option-button" type="button" data-recipe-mode="manual">✍ Вручную</button>
                <button class="import-option-button" type="button" data-recipe-mode="link">🔗 По ссылке</button>
                <button class="import-option-button" type="button" data-recipe-mode="text">▤ Из текста</button>
                <button class="import-option-button" type="button" disabled>📷 По фото/скриншоту · позже</button>
              </div>
              ${addRecipeMode === "link" ? `
                <div class="field" style="margin-top:14px">
                  <label for="recipe-import-link">Ссылка на рецепт</label>
                  <input class="import-recipe-input" id="recipe-import-link" type="url" placeholder="https://..." value="${escapeAttr(draft.source_url || "")}" />
                </div>
                <button class="primary" type="button" data-parse-link style="margin-top:10px">Попробовать разобрать</button>
              ` : ""}
              ${addRecipeMode === "text" ? `
                <div class="field" style="margin-top:14px">
                  <label for="recipe-import-text">Текст рецепта</label>
                  <textarea id="recipe-import-text" placeholder="Название, описание, ингредиенты, шаги..."></textarea>
                </div>
                <button class="primary" type="button" data-parse-text style="margin-top:10px">Подготовить черновик</button>
              ` : ""}
              <div class="import-message">${addRecipeMode === "link" ? "Если сайт не получится разобрать автоматически, заполните поля ниже вручную." : ""}</div>
            </div>
            ${renderRecipeDraftFields(draft)}
            <div class="button-row" style="margin-top:16px">
              <button class="primary" type="submit">Сохранить рецепт</button>
              <button class="ghost" type="button" data-close-add-recipe>Отмена</button>
            </div>
          </div>
        </form>
      </div>
    `;
  }

  function renderRecipeDraftFields(draft) {
    return `
      <div class="detail-grid" style="margin-top:16px">
        <div class="field"><label for="draft-title">Название</label><input id="draft-title" value="${escapeAttr(draft.title)}" required /></div>
        <div class="field"><label for="draft-category">Категория</label><input id="draft-category" value="${escapeAttr(draft.category)}" required /></div>
        <div class="field"><label for="draft-image">Фото URL</label><input id="draft-image" value="${escapeAttr(draft.image_url)}" /></div>
        <div class="field">
          <label for="draft-source">Источник рецепта</label>
          <select id="draft-source">${Object.entries(SOURCE_TYPES).map(([value, label]) => `<option value="${value}" ${draft.source_type === value ? "selected" : ""}>${label}</option>`).join("")}</select>
        </div>
        <div class="field"><label for="draft-time">Всего минут</label><input id="draft-time" type="number" min="1" value="${draft.total_time}" /></div>
        <div class="field"><label for="draft-servings">Порции</label><input id="draft-servings" type="number" min="1" value="${draft.servings}" /></div>
        <div class="field"><label for="draft-tags">Теги через запятую</label><input id="draft-tags" value="${escapeAttr(draft.tags.join(", "))}" /></div>
        <div class="field"><label for="draft-source-url">Ссылка</label><input id="draft-source-url" value="${escapeAttr(draft.source_url)}" /></div>
      </div>
      <div class="field" style="margin-top:10px"><label for="draft-description">Описание</label><textarea id="draft-description">${escapeHtml(draft.description)}</textarea></div>
      <div class="detail-grid" style="margin-top:10px">
        <div class="field"><label for="draft-ingredients">Ингредиенты, по одному в строке</label><textarea id="draft-ingredients">${escapeHtml(draft.ingredients_text)}</textarea></div>
        <div class="field"><label for="draft-steps">Шаги, по одному в строке</label><textarea id="draft-steps">${escapeHtml(draft.steps_text)}</textarea></div>
      </div>
    `;
  }

  function renderAddHistoryDialog() {
    if (!historyRecipeId) return `<div class="dialog-backdrop" id="add-history-dialog"></div>`;
    const recipe = getRecipe(historyRecipeId);
    return `
      <div class="dialog-backdrop active" id="add-history-dialog">
        <form class="dialog" id="add-history-form">
          <div class="dialog-body">
            <div class="dialog-title-row">
              <div>
                <p class="eyebrow">История приготовления</p>
                <h2>${escapeHtml(recipe.title)}</h2>
              </div>
              <button class="icon-button" type="button" data-close-history>×</button>
            </div>
            <div class="field"><label for="history-photo">Фото результата</label><input id="history-photo" type="file" accept="image/*" /></div>
            <div class="detail-grid">
              <div class="field"><label for="history-date">Дата приготовления</label><input id="history-date" type="date" value="${todayIso}" required /></div>
              <div class="field"><label for="history-rating">Общая оценка</label><select id="history-rating">${[5, 4, 3, 2, 1].map((value) => `<option value="${value}">${"★".repeat(value)} ${value}</option>`).join("")}</select></div>
            </div>
            <div class="field"><label>Кто ел</label><div class="person-rating-row">${state.people.map((person) => `<label class="person-chip"><input type="checkbox" value="${person.id}" checked /> <span class="person-chip__avatar">${person.avatar_emoji}</span>${person.name}</label>`).join("")}</div></div>
            <div class="field"><label for="history-comment">Комментарий</label><textarea id="history-comment" placeholder="Как получилось?"></textarea></div>
            <div class="field"><label for="history-next">Что изменить в следующий раз</label><textarea id="history-next" placeholder="Например: меньше чеснока, больше зелени..."></textarea></div>
            <div class="button-row" style="margin-top:16px">
              <button class="primary green" type="submit">Сохранить историю</button>
              <button class="ghost" type="button" data-close-history>Отмена</button>
            </div>
          </div>
        </form>
      </div>
    `;
  }

  function bindEvents() {
    document.querySelectorAll("[data-view-target]").forEach((button) => {
      button.addEventListener("click", () => {
        activeView = button.dataset.viewTarget;
        render();
      });
    });

    document.querySelectorAll("[data-open-recipe]").forEach((button) => {
      button.addEventListener("click", () => {
        activeRecipeId = button.dataset.openRecipe;
        cookingStep = -1;
        render();
      });
    });

    document.querySelectorAll("[data-close-dialog]").forEach((button) => {
      button.addEventListener("click", () => {
        activeRecipeId = null;
        cookingStep = 0;
        render();
      });
    });
    document.querySelectorAll(".dialog-backdrop.active").forEach((backdrop) => {
      backdrop.addEventListener("pointerdown", (event) => {
        if (event.target === backdrop) closeDialogById(backdrop.id);
      });
    });

    document.querySelectorAll("[data-toggle-favorite]").forEach((button) => {
      button.addEventListener("click", () => {
        const recipe = getRecipe(button.dataset.toggleFavorite);
        recipe.is_favorite = !recipe.is_favorite;
        recipe.updated_at = new Date().toISOString();
        saveState();
        render();
      });
    });

    document.querySelectorAll("[data-add-shopping]").forEach((button) => {
      button.addEventListener("click", () => {
        addRecipeToShopping(button.dataset.addShopping);
      });
    });

    document.querySelectorAll("[data-open-add-menu]").forEach((button) => {
      button.addEventListener("click", () => {
        addMenuRecipeId = { recipeId: button.dataset.openAddMenu, date: todayIso, mealType: "dinner" };
        render();
      });
    });

    document.querySelectorAll("[data-add-slot]").forEach((button) => {
      button.addEventListener("click", () => {
        const [date, mealType] = button.dataset.addSlot.split("|");
        addMenuRecipeId = { recipeId: state.recipes[0].id, date, mealType };
        render();
      });
    });

    document.querySelectorAll("[data-close-add-menu]").forEach((button) => {
      button.addEventListener("click", () => {
        addMenuRecipeId = null;
        render();
      });
    });

    const addMenuForm = document.getElementById("add-menu-form");
    if (addMenuForm) {
      addMenuForm.addEventListener("submit", (event) => {
        event.preventDefault();
        saveMenuEntry();
      });
      addMenuForm.querySelector("#menu-date").addEventListener("change", (event) => {
        addMenuRecipeId.date = event.target.value;
      });
      addMenuForm.querySelector("#menu-meal").addEventListener("change", (event) => {
        addMenuRecipeId.mealType = event.target.value;
      });
      addMenuForm.querySelector("#menu-recipe").addEventListener("change", (event) => {
        addMenuRecipeId.recipeId = event.target.value;
        const recipe = getRecipe(event.target.value);
        addMenuForm.querySelector("#menu-servings").value = recipe.servings;
      });
    }

    document.querySelectorAll("[data-remove-menu]").forEach((button) => {
      button.addEventListener("click", () => {
        state.weekly_menu = state.weekly_menu.filter((entry) => entry.id !== button.dataset.removeMenu);
        saveState();
        render();
      });
    });
    document.querySelectorAll("[data-suggest-replace]").forEach((button) => {
      button.addEventListener("click", () => suggestReplacement(button.dataset.suggestReplace));
    });
    document.querySelectorAll("[data-leftover]").forEach((button) => {
      button.addEventListener("click", () => markLeftover(button.dataset.leftover));
    });

    document.querySelector("[data-week-prev]")?.addEventListener("click", () => {
      currentWeekStart = addDays(currentWeekStart, -7);
      render();
    });
    document.querySelector("[data-week-next]")?.addEventListener("click", () => {
      currentWeekStart = addDays(currentWeekStart, 7);
      render();
    });
    document.querySelector("[data-week-today]")?.addEventListener("click", () => {
      currentWeekStart = startOfWeek(new Date());
      render();
    });
    document.querySelector("[data-copy-prev-week]")?.addEventListener("click", copyPreviousWeek);
    document.querySelector("[data-clear-week]")?.addEventListener("click", clearWeek);

    document.querySelectorAll("[data-generate-week-shopping]").forEach((button) => {
      button.addEventListener("click", () => generateShopping("week"));
    });
    document.querySelectorAll("[data-generate-day-shopping]").forEach((button) => {
      button.addEventListener("click", () => generateShopping("day"));
    });

    document.querySelector("[data-manual-item]")?.addEventListener("click", addManualItem);
    document.querySelector("[data-clear-shopping]")?.addEventListener("click", () => {
      state.shopping_items = [];
      saveState();
      render();
    });
    document.querySelector("[data-copy-shopping]")?.addEventListener("click", copyShoppingText);

    document.querySelectorAll("[data-family-rating]").forEach((select) => {
      select.addEventListener("change", () => {
        const [recipeId, personId] = select.dataset.familyRating.split("|");
        setRecipeRating(recipeId, personId, Number(select.value));
      });
    });

    document.querySelector("[data-open-add-recipe]")?.addEventListener("click", () => {
      addRecipeMode = "manual";
      recipeDraft = makeEmptyRecipeDraft();
      render();
    });
    document.querySelectorAll("[data-close-add-recipe]").forEach((button) => {
      button.addEventListener("click", () => {
        addRecipeMode = null;
        recipeDraft = null;
        render();
      });
    });
    document.querySelectorAll("[data-recipe-mode]").forEach((button) => {
      button.addEventListener("click", () => {
        addRecipeMode = button.dataset.recipeMode;
        recipeDraft = recipeDraft || makeEmptyRecipeDraft();
        render();
      });
    });
    document.querySelector("[data-parse-link]")?.addEventListener("click", parseRecipeLink);
    document.querySelector("[data-parse-text]")?.addEventListener("click", parseRecipeText);
    document.getElementById("add-recipe-form")?.addEventListener("submit", saveRecipeDraft);

    document.querySelectorAll("[data-open-history]").forEach((button) => {
      button.addEventListener("click", () => {
        historyRecipeId = button.dataset.openHistory;
        render();
      });
    });
    document.querySelectorAll("[data-close-history]").forEach((button) => {
      button.addEventListener("click", () => {
        historyRecipeId = null;
        render();
      });
    });
    document.getElementById("add-history-form")?.addEventListener("submit", saveCookingHistory);

    document.querySelector("[data-add-home-product]")?.addEventListener("click", addHomeProduct);
    document.querySelectorAll("[data-edit-home-product]").forEach((input) => {
      input.addEventListener("change", () => {
        const [id, field] = input.dataset.editHomeProduct.split("|");
        const item = state.home_products.find((product) => product.id === id);
        item[field] = field === "amount" ? Number(String(input.value).replace(",", ".")) || 0 : input.value;
        item.updated_at = new Date().toISOString();
        saveState();
        render();
      });
    });
    document.querySelectorAll("[data-home-always]").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const item = state.home_products.find((product) => product.id === checkbox.dataset.homeAlways);
        item.is_always_available = checkbox.checked;
        item.updated_at = new Date().toISOString();
        saveState();
        render();
      });
    });
    document.querySelectorAll("[data-delete-home-product]").forEach((button) => {
      button.addEventListener("click", () => {
        state.home_products = state.home_products.filter((item) => item.id !== button.dataset.deleteHomeProduct);
        saveState();
        render();
      });
    });
    document.querySelectorAll("[data-add-missing]").forEach((button) => {
      button.addEventListener("click", () => addMissingIngredients(button.dataset.addMissing));
    });

    document.querySelectorAll("[data-check-item]").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const item = getShoppingItem(checkbox.dataset.checkItem);
        item.is_checked = checkbox.checked;
        saveState();
        render();
      });
    });

    document.querySelectorAll("[data-edit-item]").forEach((input) => {
      input.addEventListener("change", () => {
        const [id, field] = input.dataset.editItem.split("|");
        const item = getShoppingItem(id);
        item[field] = field === "amount" ? Number(String(input.value).replace(",", ".")) || 0 : input.value;
        saveState();
        render();
      });
    });

    document.querySelectorAll("[data-delete-item]").forEach((button) => {
      button.addEventListener("click", () => {
        state.shopping_items = state.shopping_items.filter((item) => item.id !== button.dataset.deleteItem);
        saveState();
        render();
      });
    });

    document.querySelector("[data-start-cook]")?.addEventListener("click", () => {
      cookingStep = 0;
      render();
    });
    document.querySelector("[data-exit-cook]")?.addEventListener("click", () => {
      cookingStep = -1;
      render();
    });
    document.querySelector("[data-cook-prev]")?.addEventListener("click", () => {
      cookingStep = Math.max(0, cookingStep - 1);
      render();
    });
    document.querySelector("[data-cook-next]")?.addEventListener("click", () => {
      const recipe = getRecipe(activeRecipeId);
      cookingStep = Math.min(recipe.steps.length - 1, cookingStep + 1);
      render();
    });

    const filters = document.getElementById("filters");
    if (filters) {
      filters.addEventListener("input", applyFilters);
      filters.addEventListener("change", applyFilters);
    }
  }

  function applyFilters() {
    const category = document.getElementById("filter-category").value;
    const tag = document.getElementById("filter-tag").value;
    const maxTime = Number(document.getElementById("filter-time").value);
    const ingredient = document.getElementById("filter-ingredient").value.trim().toLowerCase();
    const family = document.getElementById("filter-family").value;
    const favorite = document.getElementById("filter-favorite").checked;

    const filtered = state.recipes.filter((recipe) => {
      if (category && recipe.category !== category) return false;
      if (tag && !recipe.tags.includes(tag)) return false;
      if (maxTime && recipe.total_time > maxTime) return false;
      if (favorite && !recipe.is_favorite) return false;
      if (ingredient && !recipe.ingredients.some((item) => item.name.toLowerCase().includes(ingredient))) return false;
      if (family && !matchesFamilyFilter(recipe, family)) return false;
      return true;
    });

    document.getElementById("recipe-list").innerHTML = filtered.map(renderRecipeCard).join("") || emptyState("По таким фильтрам ничего не найдено.");
    bindEvents();
  }

  function saveMenuEntry() {
    const form = document.getElementById("add-menu-form");
    const date = form.querySelector("#menu-date").value;
    const mealType = form.querySelector("#menu-meal").value;
    const recipeId = form.querySelector("#menu-recipe").value;
    const servings = Number(form.querySelector("#menu-servings").value) || getRecipe(recipeId).servings;
    state.weekly_menu = state.weekly_menu.filter((entry) => !(entry.date === date && entry.meal_type === mealType));
    state.weekly_menu.push({ id: uid("m"), date, meal_type: mealType, recipe_id: recipeId, servings });
    addMenuRecipeId = null;
    saveState();
    render();
    toast("Рецепт добавлен в меню.");
  }

  function addRecipeToShopping(recipeId, servingsOverride) {
    const recipe = getRecipe(recipeId);
    const multiplier = (servingsOverride || recipe.servings) / recipe.servings;
    const additions = recipe.ingredients.map((ingredient) => ({
      id: uid("si"),
      name: ingredient.name,
      amount: roundAmount(ingredient.amount * multiplier),
      unit: ingredient.unit,
      category: ingredient.category,
      is_checked: false,
      source_recipe_ids: [recipeId]
    }));
    state.shopping_items = mergeItems([...state.shopping_items, ...additions]);
    saveState();
    activeView = "shopping";
    render();
    toast("Ингредиенты добавлены в список покупок.");
  }

  function generateShopping(scope) {
    const days = scope === "day" ? [todayIso] : getWeekDays(currentWeekStart).map(toIsoDate);
    const entries = state.weekly_menu.filter((entry) => days.includes(entry.date));
    const excludeHome = window.confirm("Исключить продукты, которые есть дома?");
    const homeNames = state.home_products
      .filter((item) => item.is_always_available)
      .map((item) => item.name.trim().toLowerCase());
    const items = [];
    entries.forEach((entry) => {
      const recipe = getRecipe(entry.recipe_id);
      if (!recipe) return;
      const multiplier = entry.servings / recipe.servings;
      recipe.ingredients.forEach((ingredient) => {
        if (excludeHome && homeNames.some((name) => ingredient.name.toLowerCase().includes(name) || name.includes(ingredient.name.toLowerCase()))) return;
        items.push({
          id: uid("si"),
          name: ingredient.name,
          amount: roundAmount(ingredient.amount * multiplier),
          unit: ingredient.unit,
          category: ingredient.category,
          is_checked: false,
          source_recipe_ids: [recipe.id]
        });
      });
    });

    state.shopping_items = mergeItems(items);
    state.shopping_lists.unshift({
      id: uid("sl"),
      title: scope === "day" ? "Покупки на день" : "Покупки на неделю",
      period_start: days[0],
      period_end: days[days.length - 1],
      created_at: new Date().toISOString()
    });
    saveState();
    activeView = "shopping";
    render();
    toast(items.length ? "Список покупок сформирован." : "В выбранном периоде нет рецептов.");
  }

  function mergeItems(items) {
    const map = new Map();
    items.forEach((item) => {
      const key = `${item.name.trim().toLowerCase()}|${item.unit.trim().toLowerCase()}|${item.category}`;
      const existing = map.get(key);
      if (existing) {
        existing.amount = roundAmount(existing.amount + item.amount);
        existing.source_recipe_ids = unique([...(existing.source_recipe_ids || []), ...(item.source_recipe_ids || [])]);
      } else {
        map.set(key, { ...item, id: item.id || uid("si") });
      }
    });
    return PRODUCT_CATEGORIES.flatMap((category) =>
      [...map.values()].filter((item) => item.category === category)
    );
  }

  function addManualItem() {
    state.shopping_items.push({
      id: uid("si"),
      name: "Новый товар",
      amount: 1,
      unit: "шт",
      category: "прочее",
      is_checked: false,
      source_recipe_ids: []
    });
    saveState();
    render();
  }

  function copyShoppingText() {
    const text = PRODUCT_CATEGORIES.map((category) => {
      const items = state.shopping_items.filter((item) => item.category === category);
      if (!items.length) return "";
      return `${category}\n${items.map((item) => `- ${item.name}: ${formatAmount(item.amount)} ${item.unit}${item.is_checked ? " (куплено)" : ""}`).join("\n")}`;
    }).filter(Boolean).join("\n\n");

    navigator.clipboard?.writeText(text).then(
      () => toast("Список скопирован."),
      () => toast(text || "Список пуст.")
    );
  }

  function copyPreviousWeek() {
    const previousStart = addDays(currentWeekStart, -7);
    const currentDays = getWeekDays(currentWeekStart).map(toIsoDate);
    const previousDays = getWeekDays(previousStart).map(toIsoDate);
    state.weekly_menu = state.weekly_menu.filter((entry) => !currentDays.includes(entry.date));
    previousDays.forEach((date, index) => {
      state.weekly_menu
        .filter((entry) => entry.date === date)
        .forEach((entry) => {
          state.weekly_menu.push({ ...entry, id: uid("m"), date: currentDays[index] });
        });
    });
    saveState();
    render();
    toast("Меню прошлой недели скопировано.");
  }

  function clearWeek() {
    const days = getWeekDays(currentWeekStart).map(toIsoDate);
    state.weekly_menu = state.weekly_menu.filter((entry) => !days.includes(entry.date));
    saveState();
    render();
    toast("Неделя очищена.");
  }

  function closeDialogById(dialogId) {
    if (dialogId === "recipe-dialog") {
      activeRecipeId = null;
      cookingStep = 0;
    }
    if (dialogId === "add-menu-dialog") addMenuRecipeId = null;
    if (dialogId === "add-recipe-dialog") {
      addRecipeMode = null;
      recipeDraft = null;
    }
    if (dialogId === "add-history-dialog") historyRecipeId = null;
    render();
  }

  function renderSourceBadge(sourceType) {
    const value = sourceType || "default";
    if (value === "default") return `<span class="recipe-source-badge">${SOURCE_TYPES.default}</span>`;
    return `<span class="recipe-source-badge recipe-source-badge--${value}">${escapeHtml(SOURCE_TYPES[value] || SOURCE_TYPES.default)}</span>`;
  }

  function getRecipeRatingSummary(recipeId) {
    const ratings = state.recipe_ratings.filter((item) => item.recipe_id === recipeId && Number(item.rating) > 0);
    const average = ratings.length ? ratings.reduce((sum, item) => sum + Number(item.rating), 0) / ratings.length : 0;
    const max = ratings.length ? Math.max(...ratings.map((item) => Number(item.rating))) : 0;
    const topNames = ratings
      .filter((item) => Number(item.rating) === max && max >= 4)
      .map((item) => getPerson(item.person_id)?.name)
      .filter(Boolean);
    return { average, topNames, ratings };
  }

  function renderPersonRatingChips(recipeId) {
    return `
      <div class="person-rating-row">
        ${state.people.map((person) => {
          const rating = getRating(recipeId, person.id);
          return `<span class="person-chip" style="border-color:${escapeAttr(person.color)}33"><span class="person-chip__avatar" style="background:${escapeAttr(person.color)}22">${person.avatar_emoji}</span>${escapeHtml(person.name)} <span class="person-chip__rating">${rating ? rating : "—"}</span></span>`;
        }).join("")}
      </div>
    `;
  }

  function renderFamilyRatings(recipeId) {
    return `
      <div class="family-ratings">
        ${state.people.map((person) => {
          const rating = getRating(recipeId, person.id);
          return `
            <article class="family-rating-card">
              <div class="family-rating-card__top">
                <div class="family-rating-card__avatar" style="background:${escapeAttr(person.color)}22">${person.avatar_emoji}</div>
                <div class="family-rating-card__name">${escapeHtml(person.name)}</div>
              </div>
              <div class="family-rating-card__stars">${renderStars(rating)}</div>
              <select class="rating-select" data-family-rating="${recipeId}|${person.id}" aria-label="Оценка ${escapeAttr(person.name)}">
                ${[0, 1, 2, 3, 4, 5].map((value) => `<option value="${value}" ${Number(rating) === value ? "selected" : ""}>${value ? `${value} из 5` : "Без оценки"}</option>`).join("")}
              </select>
            </article>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderStars(rating) {
    return Array.from({ length: 5 }, (_, index) => index < Number(rating) ? "★" : "☆").join("");
  }

  function renderCookingHistory(recipeId) {
    const items = state.cooking_history
      .filter((item) => item.recipe_id === recipeId)
      .sort((a, b) => new Date(b.cooked_at) - new Date(a.cooked_at));
    if (!items.length) return emptyState("Это блюдо еще не добавляли в историю.");
    return `<div class="cooking-history">${items.map(renderCookingHistoryCard).join("")}</div>`;
  }

  function renderCookingHistoryCard(item) {
    const eatenBy = item.eaten_by_person_ids.map((id) => getPerson(id)?.name).filter(Boolean).join(", ");
    return `
      <article class="cooking-history-card">
        <div class="cooking-history-card__image">${item.photo_url ? `<img src="${escapeAttr(item.photo_url)}" alt="" />` : ""}</div>
        <div class="cooking-history-card__body">
          <p class="cooking-history-card__date">${formatHistoryDate(item.cooked_at)}</p>
          <p class="cooking-history-card__comment">${escapeHtml(item.comment || "Без комментария.")}</p>
          <div class="cooking-history-card__meta">Ели: ${escapeHtml(eatenBy || "не указано")} · Оценка: ${item.overall_rating || "—"}</div>
          ${item.next_time_note ? `<div class="cooking-history-card__meta">В следующий раз: ${escapeHtml(item.next_time_note)}</div>` : ""}
        </div>
      </article>
    `;
  }

  function renderHistoryPreview(item) {
    const recipe = getRecipe(item.recipe_id);
    return `
      <article class="cooking-history-card">
        <div class="cooking-history-card__image"><img src="${escapeAttr(item.photo_url || recipe?.image_url || "")}" alt="" /></div>
        <div class="cooking-history-card__body">
          <p class="cooking-history-card__date">${formatHistoryDate(item.cooked_at)}</p>
          <p class="cooking-history-card__comment"><strong>${escapeHtml(recipe?.title || "Рецепт")}</strong><br>${escapeHtml(item.comment || "")}</p>
        </div>
      </article>
    `;
  }

  function matchesFamilyFilter(recipe, filter) {
    if (filter.startsWith("likes:")) return getRating(recipe.id, filter.split(":")[1]) >= 4;
    if (filter === "hits" || filter === "family-hits") return getRecipeRatingSummary(recipe.id).average >= 4.5;
    if (filter === "unrated") return state.people.some((person) => !getRating(recipe.id, person.id));
    if (filter === "quick") return recipe.total_time <= 30;
    if (filter === "children") return getRating(recipe.id, "tyoma") >= 4 || getRating(recipe.id, "ilya") >= 4;
    if (filter === "not-recent") return getLongAgoRecipes().some((item) => item.id === recipe.id);
    return true;
  }

  function setRecipeRating(recipeId, personId, rating) {
    const now = new Date().toISOString();
    let existing = state.recipe_ratings.find((item) => item.recipe_id === recipeId && item.person_id === personId);
    if (!existing) {
      existing = { id: uid("rr"), recipe_id: recipeId, person_id: personId, rating: 0, note: "", created_at: now, updated_at: now };
      state.recipe_ratings.push(existing);
    }
    existing.rating = rating;
    existing.updated_at = now;
    saveState();
    render();
  }

  function getRating(recipeId, personId) {
    return Number(state.recipe_ratings.find((item) => item.recipe_id === recipeId && item.person_id === personId)?.rating || 0);
  }

  function getPerson(id) {
    return state.people.find((person) => person.id === id);
  }

  function getLongAgoRecipes() {
    return [...state.recipes]
      .filter((recipe) => getRecipeRatingSummary(recipe.id).average >= 4)
      .sort((a, b) => new Date(getLastCookedAt(a.id) || "2000-01-01") - new Date(getLastCookedAt(b.id) || "2000-01-01"));
  }

  function getLastCookedAt(recipeId) {
    return state.cooking_history
      .filter((item) => item.recipe_id === recipeId)
      .sort((a, b) => new Date(b.cooked_at) - new Date(a.cooked_at))[0]?.cooked_at;
  }

  function suggestReplacement(entryId) {
    const entry = state.weekly_menu.find((item) => item.id === entryId);
    const current = getRecipe(entry?.recipe_id);
    if (!entry || !current) return;
    const candidates = state.recipes
      .filter((recipe) => recipe.id !== current.id)
      .map((recipe) => ({
        recipe,
        score:
          (recipe.category === current.category ? 3 : 0) +
          (Math.abs(recipe.total_time - current.total_time) <= 15 ? 2 : 0) +
          getRecipeRatingSummary(recipe.id).average
      }))
      .sort((a, b) => b.score - a.score);
    if (!candidates.length) return toast("Пока нет подходящей замены.");
    entry.recipe_id = candidates[0].recipe.id;
    entry.servings = candidates[0].recipe.servings;
    saveState();
    render();
    toast(`Заменил на: ${candidates[0].recipe.title}`);
  }

  function markLeftover(entryId) {
    const entry = state.weekly_menu.find((item) => item.id === entryId);
    if (!entry) return;
    const nextDate = toIsoDate(addDays(new Date(entry.date), 1));
    state.weekly_menu = state.weekly_menu.filter((item) => !(item.date === nextDate && item.meal_type === entry.meal_type));
    state.weekly_menu.push({ ...entry, id: uid("m"), date: nextDate, is_leftover: true });
    saveState();
    render();
    toast("Добавил подсказку на завтра: можно доесть остатки.");
  }

  function makeEmptyRecipeDraft() {
    return {
      title: "",
      description: "",
      image_url: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1100&q=80",
      category: "ужин",
      source_type: "own",
      source_url: "",
      total_time: 30,
      servings: 2,
      tags: ["домашнее"],
      ingredients_text: "продукт 1 — 1 шт — прочее",
      steps_text: "Опишите первый шаг приготовления."
    };
  }

  function parseRecipeLink() {
    const link = document.getElementById("recipe-import-link").value.trim();
    if (!link) return toast("Вставьте ссылку на рецепт.");
    let host = "интернета";
    try { host = new URL(link).hostname.replace("www.", ""); } catch (error) {}
    recipeDraft = {
      ...makeEmptyRecipeDraft(),
      title: `Рецепт с ${host}`,
      description: "Черновик из ссылки. Проверьте название, ингредиенты и шаги перед сохранением.",
      source_type: "internet",
      source_url: link,
      tags: ["из интернета"],
      ingredients_text: "ингредиент — 1 шт — прочее",
      steps_text: "Не удалось разобрать рецепт автоматически. Вставьте текст рецепта вручную или заполните поля сами."
    };
    addRecipeMode = "confirm";
    render();
  }

  function parseRecipeText() {
    const text = document.getElementById("recipe-import-text").value.trim();
    if (!text) return toast("Вставьте текст рецепта.");
    const lines = text.split(/\n+/).map((line) => line.trim()).filter(Boolean);
    recipeDraft = {
      ...makeEmptyRecipeDraft(),
      title: lines[0] || "Новый рецепт",
      description: lines[1] || "Рецепт из текста, проверьте поля перед сохранением.",
      source_type: "own",
      tags: ["из текста"],
      ingredients_text: lines.slice(2, 7).join("\n") || "ингредиент — 1 шт — прочее",
      steps_text: lines.slice(7).join("\n") || "Подготовьте ингредиенты.\nПриготовьте до готовности."
    };
    addRecipeMode = "confirm";
    render();
  }

  function saveRecipeDraft(event) {
    event.preventDefault();
    const recipe = {
      id: uid("r"),
      title: document.getElementById("draft-title").value.trim() || "Новый рецепт",
      description: document.getElementById("draft-description").value.trim(),
      image_url: document.getElementById("draft-image").value.trim(),
      category: document.getElementById("draft-category").value.trim() || "прочее",
      source_type: document.getElementById("draft-source").value,
      source_url: document.getElementById("draft-source-url").value.trim(),
      tags: document.getElementById("draft-tags").value.split(",").map((tag) => tag.trim()).filter(Boolean),
      prep_time: 10,
      cook_time: Math.max(1, Number(document.getElementById("draft-time").value) - 10),
      total_time: Number(document.getElementById("draft-time").value) || 30,
      servings: Number(document.getElementById("draft-servings").value) || 2,
      difficulty: "легко",
      is_favorite: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ingredients: parseIngredientsText(document.getElementById("draft-ingredients").value),
      steps: parseStepsText(document.getElementById("draft-steps").value),
      notes: ""
    };
    state.recipes.unshift(recipe);
    state.people.forEach((person) => {
      state.recipe_ratings.push({ id: uid("rr"), recipe_id: recipe.id, person_id: person.id, rating: 0, note: "", created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
    });
    addRecipeMode = null;
    recipeDraft = null;
    saveState();
    activeView = "recipes";
    render();
    toast("Рецепт сохранен. Можно поставить семейные оценки в попапе.");
  }

  function parseIngredientsText(text) {
    return text.split(/\n+/).map((line, index) => {
      const parts = line.split("—").map((part) => part.trim());
      return {
        id: uid("i"),
        name: parts[0] || `ингредиент ${index + 1}`,
        amount: Number((parts[1] || "1").replace(",", ".")) || 1,
        unit: parts[1]?.replace(/[0-9.,\s]/g, "") || "шт",
        category: parts[2] || "прочее"
      };
    }).filter((item) => item.name);
  }

  function parseStepsText(text) {
    return text.split(/\n+/).map((line, index) => ({
      id: uid("s"),
      step_number: index + 1,
      text: line.trim(),
      image_url: "",
      timer_minutes: 0
    })).filter((step) => step.text);
  }

  function saveCookingHistory(event) {
    event.preventDefault();
    const form = document.getElementById("add-history-form");
    const file = form.querySelector("#history-photo").files[0];
    const done = (photoUrl) => {
      state.cooking_history.unshift({
        id: uid("ch"),
        recipe_id: historyRecipeId,
        cooked_at: form.querySelector("#history-date").value,
        photo_url: photoUrl || getRecipe(historyRecipeId)?.image_url || "",
        comment: form.querySelector("#history-comment").value.trim(),
        overall_rating: Number(form.querySelector("#history-rating").value),
        eaten_by_person_ids: [...form.querySelectorAll('input[type="checkbox"]:checked')].map((input) => input.value),
        next_time_note: form.querySelector("#history-next").value.trim(),
        created_at: new Date().toISOString()
      });
      historyRecipeId = null;
      saveState();
      render();
      toast("Фото и заметка добавлены в историю.");
    };
    if (!file) return done("");
    const reader = new FileReader();
    reader.onload = () => done(reader.result);
    reader.readAsDataURL(file);
  }

  function addHomeProduct() {
    state.home_products.push({ id: uid("hp"), name: "новый продукт", amount: 1, unit: "шт", category: "прочее", is_always_available: false, updated_at: new Date().toISOString() });
    saveState();
    render();
  }

  function getPantryMatches() {
    const homeNames = state.home_products.map((item) => item.name.trim().toLowerCase()).filter(Boolean);
    return state.recipes.map((recipe) => {
      const ingredientNames = recipe.ingredients.map((item) => item.name.toLowerCase());
      const availableItems = ingredientNames.filter((name) => homeNames.some((home) => name.includes(home) || home.includes(name)));
      const missing = recipe.ingredients
        .filter((item) => !availableItems.includes(item.name.toLowerCase()))
        .map((item) => item.name);
      return { recipe, available: availableItems.length, total: recipe.ingredients.length, missing };
    }).filter((match) => match.available > 0).sort((a, b) => b.available / b.total - a.available / a.total);
  }

  function addMissingIngredients(recipeId) {
    const match = getPantryMatches().find((item) => item.recipe.id === recipeId);
    if (!match) return;
    const recipe = match.recipe;
    const missingItems = recipe.ingredients.filter((ingredient) => match.missing.includes(ingredient.name)).map((ingredient) => ({
      id: uid("si"),
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
      category: ingredient.category,
      is_checked: false,
      source_recipe_ids: [recipe.id]
    }));
    state.shopping_items = mergeItems([...state.shopping_items, ...missingItems]);
    saveState();
    activeView = "shopping";
    render();
    toast("Недостающие ингредиенты добавлены в покупки.");
  }

  function getTodayRecipe() {
    const dinner = state.weekly_menu.find((entry) => entry.date === todayIso && entry.meal_type === "dinner");
    const firstToday = state.weekly_menu.find((entry) => entry.date === todayIso);
    return getRecipe((dinner || firstToday || {}).recipe_id) || state.recipes[0];
  }

  function getRecipe(id) {
    return state.recipes.find((recipe) => recipe.id === id);
  }

  function recipeTitle(id) {
    return getRecipe(id)?.title || "Рецепт удален";
  }

  function getShoppingItem(id) {
    return state.shopping_items.find((item) => item.id === id);
  }

  function mealLabel(mealType) {
    return MEALS.find(([value]) => value === mealType)?.[1] || mealType;
  }

  function emptyState(text) {
    return `<div class="empty-state">${escapeHtml(text)}</div>`;
  }

  function toast(text) {
    const root = document.getElementById("toast-root");
    if (!root) return;
    root.innerHTML = `<div class="toast">${escapeHtml(text)}</div>`;
    setTimeout(() => {
      const toastNode = root.querySelector(".toast");
      if (toastNode) toastNode.remove();
    }, 2600);
  }

  function uid(prefix) {
    return `${prefix}_${Math.random().toString(36).slice(2, 9)}_${Date.now().toString(36)}`;
  }

  function startOfWeek(date) {
    const copy = new Date(date);
    const day = (copy.getDay() + 6) % 7;
    copy.setHours(0, 0, 0, 0);
    copy.setDate(copy.getDate() - day);
    return copy;
  }

  function addDays(date, days) {
    const copy = new Date(date);
    copy.setDate(copy.getDate() + days);
    return copy;
  }

  function getWeekDays(start) {
    return Array.from({ length: 7 }, (_, index) => addDays(start, index));
  }

  function toIsoDate(date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  }

  function formatDayShort(date) {
    return new Intl.DateTimeFormat("ru-RU", { weekday: "short" }).format(date);
  }

  function toHumanDate(date) {
    return new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "2-digit" }).format(date);
  }

  function formatHistoryDate(value) {
    return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value));
  }

  function formatWeekRange(start) {
    const end = addDays(start, 6);
    return `${toHumanDate(start)} - ${toHumanDate(end)}`;
  }

  function unique(values) {
    return [...new Set(values.filter(Boolean))];
  }

  function roundAmount(value) {
    return Math.round(value * 100) / 100;
  }

  function formatAmount(value) {
    return Number.isInteger(value) ? String(value) : String(value).replace(".", ",");
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replaceAll("`", "&#096;");
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(console.warn));
  }

  render();
})();
