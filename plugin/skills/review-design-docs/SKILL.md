---
name: review-design-docs
description: "Review a Foundry's design records (content/meta/*.md) against the shared record map — scope, voice, staleness, and whether a change landed in the record that owns it. Use when reviewing or editing design records, or when a change needs to land in the right one."
---

# review-design-docs

This is NOT a correctness review of the system being described. You are checking that the
records describe it in the **right places** and in the **right register**, and that nothing
they claim has quietly stopped being true.

The taxonomy this review runs against is not defined here. It lives in the Foundry Pattern's
**Design Records** page, which owns what each record covers, what it must not, and which
change obliges an edit. Fetch it; do not reconstruct it from memory.

## Step 0 — get the record map

In order of preference:

1. `content/pattern/design-records.md` on disk, if you are working inside the pattern repo.
2. <https://raw.githubusercontent.com/galaxyproject/foundry-pattern/main/content/pattern/design-records.md>.
3. The rendered page on whatever host the pattern site is published to.

If none is reachable, say so in the report and run the rules below anyway — most of them do
not need the map. Do not invent a record's boundaries; an unavailable map is a stated
limitation, not something to fill in.

Then recover the **instance's** actual record set, which is what you are reviewing: list
`content/meta/`, read the `meta` kind definition, and read the instance's architecture map.
Never assume the shared map's record set is present. A **core** record that is missing is a
finding. A record the map does not name is **not** — the map's contract is open, and every
instance is expected to have records of its own. Review those against the rules like any
other, and check they are not describing machinery that does not exist.

## Step 1 — pick targets

From the invocation argument:

- **a record name or path** → that record.
- **empty** → design records whose source changed vs `origin/main`
  (`git diff --name-only origin/main... -- content/meta/`).
- **empty, but the diff touches code and not records** → invert the review. Run the map's
  change→record index over the diff and report the records that *should* have been edited and
  were not. This is the most valuable form of the review and the easiest to skip.
- **`all`** → every record, sweeping for stale cross-references and voice/shelf mismatch.

## Step 2 — place each target, then read it

Name the record's slot, shelf, and boundaries from the map before reading its prose. Then
read the whole record against the rules below.

Verify what is cheap to verify. A record claiming a command, path, package, export, or check
exists is checkable in seconds, and a stale claim is the most expensive kind to leave behind.

### Rules

Independent of each other; check whichever the record gives you reason to.

- **No record is an inventory.** Where the corpus already enumerates something — the Molds
  that exist, the kinds defined, the tags registered, the casts committed — the record
  describes the shape and lets the generated surface hold the list. A restated list goes stale
  the moment the list changes, and a reader cannot tell which copy is current. This is the
  highest-yield check in the review: transcribed inventories are the single largest source of
  stale design-record prose.

- **A disclaimer is a bug report.** A record that opens by warning you about its own contents
  — *this is the old planning list*, *this section is superseded*, *treat the below as
  historical* — has already diagnosed itself, and writing the warning was cheaper than doing
  the fix. Report it as a finding; the author wrote it for you. The trap is that the hedge
  reads as honesty and buys the record a pass, so review slides past the one place someone
  already flagged. Tell it from a scope statement by what the sentence is about: *the
  machinery is not built yet* describes the subject and belongs there; *this text is out of
  date* describes the record, and is work.

- **The shelf is a voice contract.** `foundation` records may argue and narrate;
  `infrastructure` records are present-tense and contract-shaped. Argument in an
  infrastructure record, or a dispatch table filling most of a foundation record, means the
  record is doing two jobs. Split the concern; do not repair it by growing the map.

- **Existence before behavior; one tense per claim.** Present indicative means it exists now.
  Deferred machinery is named as deferred, in one inventory, not sprinkled through the prose.
  Two sentences in one record must never give opposite answers about whether something is
  built.

- **A prohibition names the failure it prevents.** One clause is enough. An unexplained
  prohibition reads as taste and gets relitigated by the next author.

- **Number only what is ordered.** A numbered list promises sequence. A set of independent
  checks gets bullets and a lead-in saying they are independent.

- **A table cell is a value, not a paragraph.** A cell needing a *because* or a second example
  is prose — and usually prose another record owns, so the fix is often a link.

- **Define a token at first use, or link its owner.** The tokens a reader cannot guess are
  exactly the ones introduced casually and defined a hundred lines later.

### Per-record checks

- **the map** — over its length budget? Does any fact appear here *and* in a focused record?
  Is every focused record linked?
- **the Mold record** — does it list the Molds that exist? It should own the bucketing axes,
  the Mold-versus-reference boundary, and the direction — which Molds are intended and why.
  Aspirational Molds are fine here, because nothing else tracks them; built ones are not.
- **code architecture** — is every component named by a path a reader can open? Are the
  deliberate absences stated? A stack diagram implies its layers are the whole stack.
- **content model** — a verb like *runs*, *generates*, or *copies* belongs to
  build-and-validation. If it transcribes a kind table, every row must still resolve to a real
  kind directory — and note it against the no-inventory rule, since a generated kind manifest
  usually already carries that list.
- **build and validation** — is any generated artifact introduced without naming both its
  producer and its check in the same breath? An artifact with no check must say so.
- **repository layout** — does every line inside a tree fence carry a lifecycle annotation?
  An unannotated entry opts out of the one surface people scan.

## Step 3 — report

Group by record. Cite `file:line`, quote the sentence, name the rule. Where the fix is a
rewrite, propose the replacement sentence rather than describing it.

Tag each finding:

- **blocker** — a reader would be actively misled: a contradiction, a claim the code no
  longer supports, a cross-reference to a record that no longer owns the thing.
- **should-fix** — scope or voice violation; content sitting in the wrong record.
- **nit** — local wording, list shape, table shape.

Close with the state of the map itself: core records missing, and any boundary the instance is
quietly disagreeing with. A boundary two instances keep disagreeing about is feedback on the
shared map, not a defect in either instance — report it as such. Records the map does not name
are expected, not reportable. Do not fix anything unless asked.
