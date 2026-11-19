-- Run once in Supabase: SQL Editor → New query → paste → Run
-- The same data as the Pun API in part 2, but in a table instead of a MongoDB collection

create table if not exists puns (
  id       uuid        primary key default gen_random_uuid(), -- the database creates a random id: "9f1c2e4a-..."
  content  text        not null,
  category text        not null check (category in ('animals', 'education', 'everyday', 'food', 'history', 'music', 'science', 'sports', 'technology')),
  date     timestamptz not null default now()
);

-- Start data. Run the whole file again to start over: "truncate" empties the table
truncate puns;

insert into puns (content, category) values
  ('I''m reading a book about anti-gravity. It''s impossible to put down.', 'science'),
  ('Why are basketball players such messy eaters? They are always dribbling.', 'sports'),
  ('I''m on a seafood diet. I see food and I eat it.', 'food'),
  ('I was going to tell you a pizza joke, but it was too cheesy.', 'food'),
  ('What do you call a fish with no eyes? A fsh.', 'animals'),
  ('I used to play piano by ear, but now I use my hands.', 'music'),
  ('There are 10 types of people: those who understand binary and those who don''t.', 'technology'),
  ('Why was the math book sad? It had too many problems.', 'education'),
  ('I used to be a teacher, but I lost my class.', 'education'),
  ('The student ate his homework, because the teacher said it was a piece of cake.', 'education'),
  ('I don''t trust stairs. They''re always up to something.', 'everyday'),
  ('Why did the knight go to the Dark Ages? Because there were so many knights.', 'history');
