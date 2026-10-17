#!/usr/bin/env bash
# Downloads the public-domain translations the wisdom library quotes, for scripts/verify-wisdom.py.
# Usage: scripts/fetch-wisdom-sources.sh DIR   (keep DIR outside the repo; about 12 MB)
set -euo pipefail
dir="${1:?usage: fetch-wisdom-sources.sh DIR}"
mkdir -p "$dir/letters" "$dir/discourses"
ua="memento-mori-wisdom-check/1.0"

# Project Gutenberg plain texts.
for id in 15877 10661 2017 216 14328 3600 59709 10 64576; do
  curl -sfL -A "$ua" -o "$dir/pg$id.txt" "https://www.gutenberg.org/cache/epub/$id/pg$id.txt"
done

# Spanish: Reina-Valera 1909 from eBible.org, one verse per line.
curl -sfL -A "$ua" -o "$dir/rv1909.zip" "https://ebible.org/Scriptures/spaRV1909_vpl.zip"
unzip -oq "$dir/rv1909.zip" spaRV1909_vpl.txt -d "$dir/rv1909"

# Wikisource: Gummere's Seneca letters and Long's Epictetus Discourses, one page each (rendered HTML).
fetch() { # url out
  for _ in 1 2 3 4; do
    curl -sL -A "$ua" -o "$2" "$1&action=render"
    grep -q "Wikimedia Error" "$2" || return 0
    sleep 5
  done
  echo "failed: $1" >&2
}
for n in $(seq 1 124); do
  fetch "https://en.wikisource.org/w/index.php?title=Moral_letters_to_Lucilius/Letter_$n" "$dir/letters/$n.html"
  sleep 0.5
done
book="The_Discourses_of_Epictetus;_with_the_Encheiridion_and_Fragments"
for bc in "1 30" "2 26" "3 26" "4 13"; do
  set -- $bc
  for c in $(seq 1 "$2"); do
    fetch "https://en.wikisource.org/w/index.php?title=$book/Book_$1/Chapter_$c" "$dir/discourses/$1.$c.html"
    sleep 0.5
  done
done
echo "done: $dir"
