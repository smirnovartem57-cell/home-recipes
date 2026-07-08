create table if not exists app_state (
  id text primary key,
  data jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

alter table app_state enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'app_state'
      and policyname = 'Public app state read'
  ) then
    create policy "Public app state read"
      on app_state for select
      using (id = 'home-recipes-state');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'app_state'
      and policyname = 'Public app state write'
  ) then
    create policy "Public app state write"
      on app_state for insert
      with check (id = 'home-recipes-state');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'app_state'
      and policyname = 'Public app state update'
  ) then
    create policy "Public app state update"
      on app_state for update
      using (id = 'home-recipes-state')
      with check (id = 'home-recipes-state');
  end if;
end $$;
