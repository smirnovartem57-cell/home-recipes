create table if not exists recipes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  category text not null,
  source_type text not null default 'default',
  source_url text,
  tags text[] not null default '{}',
  prep_time integer not null default 0,
  cook_time integer not null default 0,
  total_time integer not null default 0,
  servings integer not null default 1,
  difficulty text not null default 'легко',
  is_favorite boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists people (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  avatar_emoji text,
  color text,
  created_at timestamptz not null default now()
);

create table if not exists recipe_ratings (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references recipes(id) on delete cascade,
  person_id uuid not null references people(id) on delete cascade,
  rating integer check (rating between 1 and 5),
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (recipe_id, person_id)
);

create table if not exists cooking_history (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references recipes(id) on delete cascade,
  cooked_at date not null,
  photo_url text,
  comment text,
  overall_rating integer check (overall_rating between 1 and 5),
  eaten_by_person_ids uuid[] not null default '{}',
  next_time_note text,
  created_at timestamptz not null default now()
);

create table if not exists home_products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  amount numeric,
  unit text,
  category text,
  is_always_available boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists app_state (
  id text primary key,
  data jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

alter table app_state enable row level security;

drop policy if exists "Public app state read" on app_state;
create policy "Public app state read"
  on app_state for select
  using (id = 'home-recipes-state');

drop policy if exists "Public app state write" on app_state;
create policy "Public app state write"
  on app_state for insert
  with check (id = 'home-recipes-state');

drop policy if exists "Public app state update" on app_state;
create policy "Public app state update"
  on app_state for update
  using (id = 'home-recipes-state')
  with check (id = 'home-recipes-state');

create table if not exists ingredients (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references recipes(id) on delete cascade,
  name text not null,
  amount numeric not null,
  unit text not null,
  category text not null
);

create table if not exists steps (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references recipes(id) on delete cascade,
  step_number integer not null,
  text text not null,
  image_url text,
  timer_minutes integer
);

create table if not exists weekly_menu (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  meal_type text not null,
  recipe_id uuid references recipes(id) on delete set null,
  servings integer not null default 1
);

create table if not exists shopping_lists (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  period_start date,
  period_end date,
  created_at timestamptz not null default now()
);

create table if not exists shopping_items (
  id uuid primary key default gen_random_uuid(),
  shopping_list_id uuid references shopping_lists(id) on delete cascade,
  name text not null,
  amount numeric not null,
  unit text not null,
  category text not null,
  is_checked boolean not null default false,
  source_recipe_ids uuid[] not null default '{}'
);
