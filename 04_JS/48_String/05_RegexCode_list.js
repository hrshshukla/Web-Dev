
/*
Wrong : ❌ string.match(/\[0-9]+/g 
Right : ✅ string.match(/[0-9]+/g); 
1. Character Classes:

(+) \d → Matches any digit (0-9).
(+) \D → Matches any non-digit.
(+) \w → Matches any word character (letters, digits, underscore).
(+) \W → Matches any non-word character.
(+) \s → Matches any whitespace (spaces, tabs, newlines).
(+) \S → Matches any non-whitespace character.

2. Quantifiers:
(+) + → Matches one or more of the preceding character.
(+) * → Matches zero or more of the preceding character.
(+) ? → Matches zero or one of the preceding character.
(+) {n} → Matches exactly n times.
(+) {n,} → Matches n or more times.
(+) {n,m} → Matches between n and m times.

3. Anchors:
(+) ^ → Matches the beginning of a string.
(+) $ → Matches the end of a string.
(+) \b → Matches a word boundary.
(+) \B → Matches a non-word boundary.

4. Groups and Ranges:
(+) [abc] → Matches a, b, or c.
(+) [a-z] → Matches any lowercase letter.
(+) [A-Z] → Matches any uppercase letter.
(+) [0-9] → Matches any digit (same as \d).
(+) [^abc] → Matches anything except a, b, or c.

5. Special Characters:
(+) . → Matches any character except a newline.
(+) \ → Escape character to match special characters literally.
(+) | → Acts like an OR (e.g., a|b matches a or b).
(+) () → Groups expressions together.
(+) (?: ... ) → Non-capturing group (groups without storing the match).

6. Examples:
(+) \d+ → Matches one or more digits (e.g., 123, 4567).
(+) \w+ → Matches one or more word characters (e.g., hello, world_123).
(+) \s+ → Matches one or more whitespace characters (e.g., spaces, tabs).
(+) [A-Za-z]+ → Matches only letters (e.g., abc, XYZ).
(+) ^Hello → Matches if the string starts with "Hello".
(+) world$ → Matches if the string ends with "world".
(+) [0-9]{3} → Matches exactly 3 digits (e.g., 123, 456).*/