#!/usr/bin/env bash
# lint-plugin-hygiene.sh
# Detects common plugin bypass patterns in the plugdash.dev codebase.
# Run in CI alongside astro check / astro build.
# Exit code 1 if any violations found.

set -euo pipefail

VIOLATIONS=0

echo "=== Plugin Hygiene Lint ==="
echo ""

# 1. Detect manual share URL construction outside demoPost.ts
#    Share URLs should only be built in one place (demoPost.ts) or read
#    from plugin metadata. Any other file constructing twitter/linkedin/
#    whatsapp/bluesky/email URLs is a bypass.
echo "[check] Manual share URL construction outside demoPost.ts..."
SHARE_HITS=$(grep -rn --include='*.astro' --include='*.ts' --include='*.tsx' \
  -E 'twitter\.com/intent/tweet|linkedin\.com/sharing|wa\.me/|bsky\.app/intent|whatsapp\.com/send' \
  src/ \
  | grep -v 'demoPost\.ts' \
  | grep -v 'node_modules' \
  | grep -v '// ' \
  | grep -v '{`' \
  || true)

if [ -n "$SHARE_HITS" ]; then
  echo "  VIOLATION: Share URLs constructed outside demoPost.ts:"
  echo "$SHARE_HITS" | sed 's/^/    /'
  VIOLATIONS=$((VIOLATIONS + 1))
else
  echo "  OK"
fi

# 2. Detect manual metadata field assignment outside buildDemoPost
#    Pattern: .metadata.readingTimeMinutes = or .metadata.shortlink =
echo "[check] Manual metadata mutation (post-construction overrides)..."
METADATA_HITS=$(grep -rn --include='*.astro' --include='*.ts' --include='*.tsx' \
  -E '\.metadata\.(readingTimeMinutes|wordCount|shareUrls|shortlink|heartpost|tocgen)\s*=' \
  src/ \
  | grep -v 'demoPost\.ts' \
  | grep -v 'node_modules' \
  || true)

if [ -n "$METADATA_HITS" ]; then
  echo "  VIOLATION: Manual metadata mutation found:"
  echo "$METADATA_HITS" | sed 's/^/    /'
  VIOLATIONS=$((VIOLATIONS + 1))
else
  echo "  OK"
fi

# 3. Detect heading extraction reimplementation
#    If anyone writes a function that filters blocks by style h2/h3,
#    they're reimplementing tocgen.
echo "[check] Heading extraction reimplementation..."
HEADING_HITS=$(grep -rn --include='*.astro' --include='*.ts' --include='*.tsx' \
  -E 'style\s*===?\s*["\x27]h[23]["\x27]' \
  src/ \
  | grep -v 'node_modules' \
  | grep -v 'PortableText' \
  || true)

if [ -n "$HEADING_HITS" ]; then
  echo "  WARNING: Possible tocgen reimplementation:"
  echo "$HEADING_HITS" | sed 's/^/    /'
  echo "  Consider using @plugdash/tocgen extract if available."
  # Don't fail on this one yet - blog fallback needs it until tocgen exports
fi

# 4. Detect hardcoded /l/ or /s/ shortlink patterns
#    Short URLs should come from the shortlink plugin metadata, not be
#    constructed manually.
echo "[check] Hardcoded shortlink URL patterns..."
SHORTLINK_HITS=$(grep -rn --include='*.astro' --include='*.ts' --include='*.tsx' \
  -E '/l/\$\{|/s/\$\{' \
  src/ \
  | grep -v 'node_modules' \
  | grep -v '// ' \
  || true)

if [ -n "$SHORTLINK_HITS" ]; then
  echo "  VIOLATION: Hardcoded shortlink URL construction:"
  echo "$SHORTLINK_HITS" | sed 's/^/    /'
  VIOLATIONS=$((VIOLATIONS + 1))
else
  echo "  OK"
fi

# 5. Detect encodeURIComponent usage outside demoPost.ts
#    This is a strong signal of manual URL construction that should use
#    either the plugin or the shared buildShareUrls helper.
echo "[check] encodeURIComponent outside demoPost.ts..."
ENCODE_HITS=$(grep -rn --include='*.astro' --include='*.ts' --include='*.tsx' \
  'encodeURIComponent' \
  src/ \
  | grep -v 'demoPost\.ts' \
  | grep -v 'node_modules' \
  | grep -v 'InstallCommand' \
  || true)

if [ -n "$ENCODE_HITS" ]; then
  echo "  WARNING: encodeURIComponent outside demoPost.ts (possible share URL bypass):"
  echo "$ENCODE_HITS" | sed 's/^/    /'
fi

echo ""
if [ "$VIOLATIONS" -gt 0 ]; then
  echo "FAILED: $VIOLATIONS violation(s) found."
  echo "Plugins should be the source of truth for metadata. See ARCHITECTURE.md."
  exit 1
else
  echo "PASSED: No plugin bypass violations detected."
fi
