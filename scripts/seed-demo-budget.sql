-- Seed diverse budget categories and 15 demo budget entries for user id = 'demo'.
-- Safe to re-run: categories are upserted and entries are upserted by unique name.

INSERT INTO "BudgetCategory" (id, name, "userId", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, category_name, 'demo', NOW(), NOW()
FROM (
  VALUES
    ('Venue'),
    ('Catering'),
    ('Photography'),
    ('Decorations'),
    ('Dress/Suit'),
    ('Music'),
    ('Florals'),
    ('Transport'),
    ('Stationery'),
    ('Cake')
) AS category_seed(category_name)
WHERE EXISTS (SELECT 1 FROM "User" WHERE id = 'demo')
ON CONFLICT ("userId", name) DO UPDATE
SET "updatedAt" = NOW();

INSERT INTO "BudgetEntry" (
  id,
  name,
  "plannedAmount",
  "actualAmount",
  "dueDate",
  paid,
  "categoryId",
  "userId",
  note,
  "createdAt",
  "updatedAt"
)
SELECT
  gen_random_uuid()::text,
  entry_name,
  planned_amount,
  actual_amount,
  due_date,
  paid_state,
  (
    SELECT id FROM "BudgetCategory"
    WHERE "userId" = 'demo' AND name = category_name
    LIMIT 1
  ) AS category_id,
  'demo',
  entry_note,
  NOW(),
  NOW()
FROM (
  VALUES
    ('Venue Deposit', 12000, 12000, DATE '2026-06-01', TRUE, 'Venue', 'Initial venue booking fee already paid.'),
    ('Final Venue Payment', 18000, NULL, DATE '2026-09-10', FALSE, 'Venue', 'Remaining venue balance due close to the event.'),
    ('Tasting Session', 800, 760, DATE '2026-05-25', TRUE, 'Catering', 'Menu tasting for two plus planner.'),
    ('Main Catering', 22000, NULL, DATE '2026-09-05', FALSE, 'Catering', 'Per-guest package estimate.'),
    ('Photographer Deposit', 3000, 3000, DATE '2026-05-30', TRUE, 'Photography', 'Reserved full-day photography package.'),
    ('Videographer', 4500, NULL, DATE '2026-08-20', FALSE, 'Photography', 'Optional highlight film package.'),
    ('Ceremony Decor', 2500, 2700, DATE '2026-08-28', FALSE, 'Decorations', 'Arch rental and aisle arrangements.'),
    ('Reception Lighting', 1800, NULL, DATE '2026-09-01', FALSE, 'Decorations', 'Ambient and dance floor lighting setup.'),
    ('Bride Dress Alterations', 1600, 1450, DATE '2026-07-12', TRUE, 'Dress/Suit', 'Final fitting and tailoring.'),
    ('Groom Suit Rental', 900, NULL, DATE '2026-09-12', FALSE, 'Dress/Suit', 'Includes shoes and accessories.'),
    ('DJ Service', 3200, NULL, DATE '2026-09-07', FALSE, 'Music', 'DJ plus ceremony sound system.'),
    ('Live String Quartet', 2400, 2400, DATE '2026-06-15', TRUE, 'Music', 'Ceremony and cocktail hour performance.'),
    ('Bridal Bouquet + Boutonniere', 1100, NULL, DATE '2026-09-11', FALSE, 'Florals', 'Seasonal flowers with backup options.'),
    ('Guest Shuttle', 2100, NULL, DATE '2026-09-13', FALSE, 'Transport', 'Round-trip coach from hotel block.'),
    ('Wedding Cake', 1300, NULL, DATE '2026-09-12', FALSE, 'Cake', 'Three-tier cake with tasting included.')
) AS entry_seed(entry_name, planned_amount, actual_amount, due_date, paid_state, category_name, entry_note)
WHERE EXISTS (SELECT 1 FROM "User" WHERE id = 'demo')
ON CONFLICT (name) DO UPDATE
SET
  "plannedAmount" = EXCLUDED."plannedAmount",
  "actualAmount" = EXCLUDED."actualAmount",
  "dueDate" = EXCLUDED."dueDate",
  paid = EXCLUDED.paid,
  "categoryId" = EXCLUDED."categoryId",
  "userId" = EXCLUDED."userId",
  note = EXCLUDED.note,
  "updatedAt" = NOW();
