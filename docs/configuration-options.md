# Configuration Options

All options are configured per-field in the **Content Type Builder > Advanced Settings** tab when adding a Lexical Editor field.

Every option is a boolean checkbox. The **Default** column indicates whether the option is enabled (`true`) or disabled (`false`) when a new field is created.

---

## Text Formatting

| Option | Default | Description |
| --- | --- | --- |
| `enableBold` | `true` | Enable bold text formatting |
| `enableItalic` | `true` | Enable italic text formatting |
| `enableUnderline` | `true` | Enable underline text formatting |
| `enableStrikethrough` | `true` | Enable strikethrough text formatting |
| `enableSubscript` | `true` | Enable subscript text formatting |
| `enableSuperscript` | `true` | Enable superscript text formatting |
| `enableInlineCode` | `false` | Enable inline code formatting |
| `enableClearFormatting` | `false` | Enable clear formatting button |

## Text Transform

| Option | Default | Description |
| --- | --- | --- |
| `enableLowercase` | `false` | Enable lowercase text transform |
| `enableUppercase` | `false` | Enable uppercase text transform |
| `enableCapitalize` | `false` | Enable capitalize text transform |

## Block Types

| Option | Default | Description |
| --- | --- | --- |
| `enableParagraph` | `true` | Enable paragraph block type |
| `enableHeading1` | `true` | Enable heading 1 block type |
| `enableHeading2` | `true` | Enable heading 2 block type |
| `enableHeading3` | `true` | Enable heading 3 block type |
| `enableBulletList` | `true` | Enable bullet list block type |
| `enableNumberedList` | `true` | Enable numbered list block type |
| `enableCheckList` | `false` | Enable check list block type |
| `enableQuote` | `false` | Enable quote block type |
| `enableCodeBlock` | `false` | Enable code block with syntax highlighting. Auto-enables code highlight plugin, language selector, and code action menu. |

## Alignment

| Option | Default | Description |
| --- | --- | --- |
| `enableLeftAlign` | `true` | Enable left alignment |
| `enableCenterAlign` | `true` | Enable center alignment |
| `enableRightAlign` | `true` | Enable right alignment |
| `enableJustifyAlign` | `false` | Enable justify alignment |
| `enableStartAlign` | `false` | Enable start alignment (RTL aware) |
| `enableEndAlign` | `false` | Enable end alignment (RTL aware) |
| `enableIndent` | `false` | Enable indent functionality |
| `enableOutdent` | `false` | Enable outdent functionality |

## Links

| Option | Default | Description |
| --- | --- | --- |
| `enableInsertLink` | `true` | Enable link insertion |
| `enableExternalLinks` | `true` | Enable external URL links |
| `enableInternalLinks` | `false` | Enable links to Strapi content |
| `enableLinkAttributes` | `false` | Enable `target="_blank"` and `rel` attributes |

**Dependencies:**

- `enableFloatingLinkEditor` (in Plugins) only works when `enableInsertLink` is `true`

## Media

| Option | Default | Description |
| --- | --- | --- |
| `enableStrapiImage` | `true` | Enable images from Strapi media library |
| `enableExternalImage` | `false` | Enable images from external URLs |
| `enableInlineImage` | `false` | Enable inline images with text wrap |

## Tables

| Option | Default | Description |
| --- | --- | --- |
| `enableInsertTable` | `false` | Enable table insertion |
| `enableTableCellMerge` | `false` | Enable merging table cells |
| `enableTableCellBackgroundColor` | `false` | Enable table cell background color |
| `enableTableHorizontalScroll` | `false` | Enable horizontal scrolling for wide tables |

**Dependencies:**

- `enableTableCellMerge`, `enableTableCellBackgroundColor`, and `enableTableHorizontalScroll` require `enableInsertTable` to be `true`. They are ignored otherwise.

## Embeds

| Option | Default | Description |
| --- | --- | --- |
| `enableYoutubeEmbed` | `false` | Enable YouTube video embeds |
| `enableTwitterEmbed` | `false` | Enable Twitter/X post embeds |
| `enableFigmaEmbed` | `false` | Enable Figma design embeds |
| `enableAutoEmbed` | `false` | Automatically detect and embed URLs |

## Advanced Inserts

| Option | Default | Description |
| --- | --- | --- |
| `enableHorizontalRule` | `false` | Enable horizontal rule insertion |
| `enablePageBreak` | `false` | Enable page break insertion |
| `enableColumnsLayout` | `false` | Enable multi-column layouts |
| `enableCollapsible` | `false` | Enable collapsible content blocks |
| `enableEquation` | `false` | Enable LaTeX math equations |
| `enablePoll` | `false` | Enable interactive polls |
| `enableStickyNote` | `false` | Enable sticky note blocks |

## Colors & Fonts

| Option | Default | Description |
| --- | --- | --- |
| `enableFontColor` | `true` | Enable text color picker |
| `enableBackgroundColor` | `false` | Enable text background color picker |
| `enableFontFamily` | `false` | Enable font family selection |
| `enableFontSize` | `false` | Enable font size selection |
| `enableIncreaseFontSize` | `false` | Enable increase font size button |
| `enableDecreaseFontSize` | `false` | Enable decrease font size button |

## Plugins

| Option | Default | Description |
| --- | --- | --- |
| `enableMarkdownShortcuts` | `false` | Enable markdown input shortcuts (e.g. `#` for heading, `>` for quote) |
| `enableFloatingToolbar` | `true` | Show floating toolbar on text selection |
| `enableDraggableBlock` | `false` | Enable drag and drop for blocks |
| `enableEmojiPicker` | `false` | Enable emoji picker with `:` trigger |
| `enableAutoLink` | `true` | Automatically convert URLs to links |
| `enableMentions` | `false` | Enable `@` mentions |
| `enableHashtag` | `false` | Enable `#` hashtags |
| `enableShortcuts` | `true` | Enable keyboard shortcuts |
| `enableAutoFocus` | `false` | Auto focus editor on load |

**Note:** The following plugin options exist in the `FeatureOptions` type but are **not exposed** in the Content Type Builder UI. They are resolved automatically based on other options:

| Option | Default | Auto-enabled when |
| --- | --- | --- |
| `enableCodeHighlight` | `false` | `enableCodeBlock` is `true` |
| `enableFloatingLinkEditor` | `true` | Only active when both this and `enableInsertLink` are `true` |
| `enableKeywords` | `false` | - |
| `enableEmojis` | `false` | - |

## History

| Option | Default | Description |
| --- | --- | --- |
| `enableUndo` | `true` | Enable undo button |
| `enableRedo` | `true` | Enable redo button |

---

## Feature Dependencies Summary

Some features have dependencies that are automatically resolved:

| Feature | Depends on | Behavior |
| --- | --- | --- |
| Table cell merge | `enableInsertTable` | Ignored if tables are disabled |
| Table cell background color | `enableInsertTable` | Ignored if tables are disabled |
| Table horizontal scroll | `enableInsertTable` | Ignored if tables are disabled |
| Floating link editor | `enableInsertLink` | Ignored if links are disabled |
| Code highlight plugin | `enableCodeBlock` | Auto-enabled with code blocks |
| Code language selector | `enableCodeBlock` | Auto-enabled with code blocks |
| Code action menu | `enableCodeBlock` | Auto-enabled with code blocks |
| List plugin | `enableBulletList` or `enableNumberedList` | Auto-enabled when any list type is on |

## Always-Enabled Plugins

The following plugins are always active regardless of configuration:

- **History Plugin** - undo/redo state tracking
- **Rich Text Plugin** - core rich text editing
