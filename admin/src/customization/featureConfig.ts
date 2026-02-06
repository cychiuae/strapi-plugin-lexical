/**
 * Feature Configuration Types and Defaults
 *
 * This file defines the configurable features for the Lexical editor.
 * Features can be enabled/disabled through Strapi content builder advanced settings.
 */

/**
 * User-configurable feature options
 * These are the options that can be set in the Strapi content type builder
 */
export interface FeatureOptions {
  // Text Formatting
  enableBold?: boolean;
  enableItalic?: boolean;
  enableUnderline?: boolean;
  enableStrikethrough?: boolean;
  enableSubscript?: boolean;
  enableSuperscript?: boolean;
  enableInlineCode?: boolean;
  enableClearFormatting?: boolean;

  // Text Transform
  enableLowercase?: boolean;
  enableUppercase?: boolean;
  enableCapitalize?: boolean;

  // Block Types
  enableParagraph?: boolean;
  enableHeading1?: boolean;
  enableHeading2?: boolean;
  enableHeading3?: boolean;
  enableBulletList?: boolean;
  enableNumberedList?: boolean;
  enableCheckList?: boolean;
  enableQuote?: boolean;
  enableCodeBlock?: boolean;

  // Alignment
  enableLeftAlign?: boolean;
  enableCenterAlign?: boolean;
  enableRightAlign?: boolean;
  enableJustifyAlign?: boolean;
  enableStartAlign?: boolean;
  enableEndAlign?: boolean;
  enableIndent?: boolean;
  enableOutdent?: boolean;

  // Links
  enableInsertLink?: boolean;
  enableExternalLinks?: boolean;
  enableInternalLinks?: boolean;
  enableLinkAttributes?: boolean;

  // Media
  enableStrapiImage?: boolean;
  enableExternalImage?: boolean;
  enableInlineImage?: boolean;

  // Tables
  enableInsertTable?: boolean;
  enableTableCellMerge?: boolean;
  enableTableCellBackgroundColor?: boolean;
  enableTableHorizontalScroll?: boolean;

  // Embeds
  enableYoutubeEmbed?: boolean;
  enableTwitterEmbed?: boolean;
  enableFigmaEmbed?: boolean;
  enableAutoEmbed?: boolean;

  // Advanced Inserts
  enableHorizontalRule?: boolean;
  enablePageBreak?: boolean;
  enableColumnsLayout?: boolean;
  enableCollapsible?: boolean;
  enableEquation?: boolean;
  enablePoll?: boolean;
  enableStickyNote?: boolean;

  // Colors & Fonts
  enableFontColor?: boolean;
  enableBackgroundColor?: boolean;
  enableFontFamily?: boolean;
  enableFontSize?: boolean;
  enableIncreaseFontSize?: boolean;
  enableDecreaseFontSize?: boolean;

  // Plugins
  enableMarkdownShortcuts?: boolean;
  enableCodeHighlight?: boolean;
  enableFloatingToolbar?: boolean;
  enableFloatingLinkEditor?: boolean;
  enableDraggableBlock?: boolean;
  enableEmojiPicker?: boolean;
  enableAutoLink?: boolean;
  enableMentions?: boolean;
  enableHashtag?: boolean;
  enableKeywords?: boolean;
  enableEmojis?: boolean;
  enableShortcuts?: boolean;
  enableAutoFocus?: boolean;

  // History
  enableUndo?: boolean;
  enableRedo?: boolean;
}

/**
 * Resolved feature flags - the actual flags used by the editor
 */
export interface ResolvedFeatureFlags {
  // Text Formatting
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  subscript: boolean;
  superscript: boolean;
  inlineCode: boolean;
  clearFormatting: boolean;

  // Text Transform
  lowercase: boolean;
  uppercase: boolean;
  capitalize: boolean;

  // Block Types
  paragraph: boolean;
  heading1: boolean;
  heading2: boolean;
  heading3: boolean;
  bulletList: boolean;
  numberedList: boolean;
  checkList: boolean;
  quote: boolean;
  codeBlock: boolean;
  codeLanguageSelector: boolean;

  // Alignment
  leftAlign: boolean;
  centerAlign: boolean;
  rightAlign: boolean;
  justifyAlign: boolean;
  startAlign: boolean;
  endAlign: boolean;
  indent: boolean;
  outdent: boolean;

  // Links
  insertLink: boolean;
  externalLinks: boolean;
  internalLinks: boolean;
  linkAttributes: boolean;
  linksEnabled: boolean; // Derived

  // Media
  insertStrapiImage: boolean;
  insertImage: boolean;
  insertInlineImage: boolean;

  // Tables
  insertTable: boolean;
  tableCellMerge: boolean;
  tableCellBackgroundColor: boolean;
  tableHorizontalScroll: boolean;

  // Embeds
  youtubeEmbed: boolean;
  twitterEmbed: boolean;
  figmaEmbed: boolean;

  // Advanced Inserts
  horizontalRule: boolean;
  pageBreak: boolean;
  columnsLayout: boolean;
  collapsibleContainer: boolean;
  equation: boolean;
  poll: boolean;
  stickyNote: boolean;

  // Colors & Fonts
  fontColor: boolean;
  backgroundColor: boolean;
  fontFamily: boolean;
  fontSize: boolean;
  increaseFontSize: boolean;
  decreaseFontSize: boolean;

  // Plugins (most are auto-enabled based on features)
  historyPlugin: boolean;
  richTextPlugin: boolean;
  markdownShortcutPlugin: boolean;
  codeHighlightPlugin: boolean;
  listPlugin: boolean;
  checkListPlugin: boolean;
  tablePlugin: boolean;
  imagesPlugin: boolean;
  inlineImagePlugin: boolean;
  twitterPlugin: boolean;
  youtubePlugin: boolean;
  figmaPlugin: boolean;
  autoEmbedPlugin: boolean;
  equationsPlugin: boolean;
  pollPlugin: boolean;
  layoutPlugin: boolean;
  collapsiblePlugin: boolean;
  pageBreakPlugin: boolean;
  floatingTextFormatToolbarPlugin: boolean;
  draggableBlockPlugin: boolean;
  componentPickerPlugin: boolean;
  emojiPickerPlugin: boolean;
  codeActionMenuPlugin: boolean;
  floatingLinkEditorPlugin: boolean;
  tableCellActionMenuPlugin: boolean;
  tableHoverActionsPlugin: boolean;
  tableCellResizer: boolean;
  autoLinkPlugin: boolean;
  mentionsPlugin: boolean;
  hashtagPlugin: boolean;
  keywordsPlugin: boolean;
  emojisPlugin: boolean;
  linkPlugin: boolean;
  clickableLinkPlugin: boolean;
  shortcutsPlugin: boolean;
  autoFocusPlugin: boolean;
  clearEditorPlugin: boolean;
  dragDropPastePlugin: boolean;
  horizontalRulePlugin: boolean;
  tabFocusPlugin: boolean;
  tabIndentationPlugin: boolean;
  actionsPlugin: boolean;
  contextMenuPlugin: boolean;
  specialTextPlugin: boolean;
  tableOfContentsPlugin: boolean;
  treeViewPlugin: boolean;
  autocompletePlugin: boolean;
  maxLengthPlugin: boolean;
  characterLimitPlugin: boolean;

  // Other flags
  richText: boolean;
  collab: boolean;
  autocomplete: boolean;
  maxLength: boolean;
  charLimit: boolean;
  charLimitUtf8: boolean;
  treeView: boolean;
  tableOfContents: boolean;
  lexicalContextMenu: boolean;
  preserveNewLinesInMarkdown: boolean;
  selectionAlwaysOnDisplay: boolean;
  allowHighlightingWithBrackets: boolean;

  // History
  undo: boolean;
  redo: boolean;
}

/**
 * Default feature options matching the original features.ts defaults
 * These ensure backward compatibility
 */
export const DEFAULT_FEATURE_OPTIONS: Required<FeatureOptions> = {
  // Text Formatting - enabled by default
  enableBold: true,
  enableItalic: true,
  enableUnderline: true,
  enableStrikethrough: true,
  enableSubscript: true,
  enableSuperscript: true,
  enableInlineCode: false,
  enableClearFormatting: false,

  // Text Transform - disabled by default
  enableLowercase: false,
  enableUppercase: false,
  enableCapitalize: false,

  // Block Types
  enableParagraph: true,
  enableHeading1: true,
  enableHeading2: true,
  enableHeading3: true,
  enableBulletList: true,
  enableNumberedList: true,
  enableCheckList: false,
  enableQuote: false,
  enableCodeBlock: false,

  // Alignment
  enableLeftAlign: true,
  enableCenterAlign: true,
  enableRightAlign: true,
  enableJustifyAlign: false,
  enableStartAlign: false,
  enableEndAlign: false,
  enableIndent: false,
  enableOutdent: false,

  // Links
  enableInsertLink: true,
  enableExternalLinks: true,
  enableInternalLinks: false,
  enableLinkAttributes: false,

  // Media
  enableStrapiImage: true,
  enableExternalImage: false,
  enableInlineImage: false,

  // Tables
  enableInsertTable: false,
  enableTableCellMerge: false,
  enableTableCellBackgroundColor: false,
  enableTableHorizontalScroll: false,

  // Embeds
  enableYoutubeEmbed: false,
  enableTwitterEmbed: false,
  enableFigmaEmbed: false,
  enableAutoEmbed: false,

  // Advanced Inserts
  enableHorizontalRule: false,
  enablePageBreak: false,
  enableColumnsLayout: false,
  enableCollapsible: false,
  enableEquation: false,
  enablePoll: false,
  enableStickyNote: false,

  // Colors & Fonts
  enableFontColor: true,
  enableBackgroundColor: false,
  enableFontFamily: false,
  enableFontSize: false,
  enableIncreaseFontSize: false,
  enableDecreaseFontSize: false,

  // Plugins
  enableMarkdownShortcuts: false,
  enableCodeHighlight: false,
  enableFloatingToolbar: true,
  enableFloatingLinkEditor: true,
  enableDraggableBlock: false,
  enableEmojiPicker: false,
  enableAutoLink: true,
  enableMentions: false,
  enableHashtag: false,
  enableKeywords: false,
  enableEmojis: false,
  enableShortcuts: true,
  enableAutoFocus: false,

  // History
  enableUndo: true,
  enableRedo: true,
};

/**
 * Resolves user-configurable options into the full feature flags object
 * Handles dependencies between features and auto-enables required plugins
 */
export function resolveFeatures(options: FeatureOptions = {}): ResolvedFeatureFlags {
  // Merge with defaults
  const opts: Required<FeatureOptions> = { ...DEFAULT_FEATURE_OPTIONS, ...options };

  // Base feature flags from options
  const flags: ResolvedFeatureFlags = {
    // Text Formatting
    bold: opts.enableBold,
    italic: opts.enableItalic,
    underline: opts.enableUnderline,
    strikethrough: opts.enableStrikethrough,
    subscript: opts.enableSubscript,
    superscript: opts.enableSuperscript,
    inlineCode: opts.enableInlineCode,
    clearFormatting: opts.enableClearFormatting,

    // Text Transform
    lowercase: opts.enableLowercase,
    uppercase: opts.enableUppercase,
    capitalize: opts.enableCapitalize,

    // Block Types
    paragraph: opts.enableParagraph,
    heading1: opts.enableHeading1,
    heading2: opts.enableHeading2,
    heading3: opts.enableHeading3,
    bulletList: opts.enableBulletList,
    numberedList: opts.enableNumberedList,
    checkList: opts.enableCheckList,
    quote: opts.enableQuote,
    codeBlock: opts.enableCodeBlock,
    codeLanguageSelector: opts.enableCodeBlock, // Auto-enable with code block

    // Alignment
    leftAlign: opts.enableLeftAlign,
    centerAlign: opts.enableCenterAlign,
    rightAlign: opts.enableRightAlign,
    justifyAlign: opts.enableJustifyAlign,
    startAlign: opts.enableStartAlign,
    endAlign: opts.enableEndAlign,
    indent: opts.enableIndent,
    outdent: opts.enableOutdent,

    // Links
    insertLink: opts.enableInsertLink,
    externalLinks: opts.enableExternalLinks,
    internalLinks: opts.enableInternalLinks,
    linkAttributes: opts.enableLinkAttributes,
    linksEnabled: opts.enableExternalLinks || opts.enableInternalLinks, // Derived

    // Media
    insertStrapiImage: opts.enableStrapiImage,
    insertImage: opts.enableExternalImage,
    insertInlineImage: opts.enableInlineImage,

    // Tables
    insertTable: opts.enableInsertTable,
    tableCellMerge: opts.enableInsertTable && opts.enableTableCellMerge,
    tableCellBackgroundColor: opts.enableInsertTable && opts.enableTableCellBackgroundColor,
    tableHorizontalScroll: opts.enableInsertTable && opts.enableTableHorizontalScroll,

    // Embeds
    youtubeEmbed: opts.enableYoutubeEmbed,
    twitterEmbed: opts.enableTwitterEmbed,
    figmaEmbed: opts.enableFigmaEmbed,

    // Advanced Inserts
    horizontalRule: opts.enableHorizontalRule,
    pageBreak: opts.enablePageBreak,
    columnsLayout: opts.enableColumnsLayout,
    collapsibleContainer: opts.enableCollapsible,
    equation: opts.enableEquation,
    poll: opts.enablePoll,
    stickyNote: opts.enableStickyNote,

    // Colors & Fonts
    fontColor: opts.enableFontColor,
    backgroundColor: opts.enableBackgroundColor,
    fontFamily: opts.enableFontFamily,
    fontSize: opts.enableFontSize,
    increaseFontSize: opts.enableIncreaseFontSize,
    decreaseFontSize: opts.enableDecreaseFontSize,

    // Plugins - auto-enabled based on features
    historyPlugin: true, // Always enabled
    richTextPlugin: true, // Always enabled
    markdownShortcutPlugin: opts.enableMarkdownShortcuts,
    codeHighlightPlugin: opts.enableCodeBlock || opts.enableCodeHighlight,
    listPlugin: opts.enableBulletList || opts.enableNumberedList,
    checkListPlugin: opts.enableCheckList,
    tablePlugin: opts.enableInsertTable,
    imagesPlugin: opts.enableExternalImage,
    inlineImagePlugin: opts.enableInlineImage,
    twitterPlugin: opts.enableTwitterEmbed,
    youtubePlugin: opts.enableYoutubeEmbed,
    figmaPlugin: opts.enableFigmaEmbed,
    autoEmbedPlugin: opts.enableAutoEmbed,
    equationsPlugin: opts.enableEquation,
    pollPlugin: opts.enablePoll,
    layoutPlugin: opts.enableColumnsLayout,
    collapsiblePlugin: opts.enableCollapsible,
    pageBreakPlugin: opts.enablePageBreak,
    floatingTextFormatToolbarPlugin: opts.enableFloatingToolbar,
    draggableBlockPlugin: opts.enableDraggableBlock,
    componentPickerPlugin: false, // Not exposed as configurable
    emojiPickerPlugin: opts.enableEmojiPicker,
    codeActionMenuPlugin: opts.enableCodeBlock,
    floatingLinkEditorPlugin: opts.enableFloatingLinkEditor && opts.enableInsertLink,
    tableCellActionMenuPlugin: opts.enableInsertTable,
    tableHoverActionsPlugin: opts.enableInsertTable,
    tableCellResizer: opts.enableInsertTable,
    autoLinkPlugin: opts.enableAutoLink,
    mentionsPlugin: opts.enableMentions,
    hashtagPlugin: opts.enableHashtag,
    keywordsPlugin: opts.enableKeywords,
    emojisPlugin: opts.enableEmojis,
    linkPlugin: opts.enableInsertLink,
    clickableLinkPlugin: false, // Not exposed as configurable
    shortcutsPlugin: opts.enableShortcuts,
    autoFocusPlugin: opts.enableAutoFocus,
    clearEditorPlugin: false, // Not exposed as configurable
    dragDropPastePlugin: false, // Not exposed as configurable
    horizontalRulePlugin: opts.enableHorizontalRule,
    tabFocusPlugin: false, // Not exposed as configurable
    tabIndentationPlugin: false, // Not exposed as configurable
    actionsPlugin: false, // Not exposed as configurable
    contextMenuPlugin: false, // Not exposed as configurable
    specialTextPlugin: false, // Not exposed as configurable
    tableOfContentsPlugin: false, // Not exposed as configurable
    treeViewPlugin: false, // Not exposed as configurable
    autocompletePlugin: false, // Not exposed as configurable
    maxLengthPlugin: false, // Not exposed as configurable
    characterLimitPlugin: false, // Not exposed as configurable

    // Other flags - not configurable
    richText: false,
    collab: false,
    autocomplete: false,
    maxLength: false,
    charLimit: false,
    charLimitUtf8: false,
    treeView: false,
    tableOfContents: false,
    lexicalContextMenu: false,
    preserveNewLinesInMarkdown: false,
    selectionAlwaysOnDisplay: false,
    allowHighlightingWithBrackets: false,

    // History
    undo: opts.enableUndo,
    redo: opts.enableRedo,
  };

  return flags;
}

/**
 * Helper to extract FeatureOptions from Strapi attribute options
 */
export function extractFeatureOptions(
  attributeOptions: Record<string, unknown> = {}
): FeatureOptions {
  const options: FeatureOptions = {};

  // Map attribute option keys to FeatureOptions keys
  const optionKeys: (keyof FeatureOptions)[] = [
    'enableBold',
    'enableItalic',
    'enableUnderline',
    'enableStrikethrough',
    'enableSubscript',
    'enableSuperscript',
    'enableInlineCode',
    'enableClearFormatting',
    'enableLowercase',
    'enableUppercase',
    'enableCapitalize',
    'enableParagraph',
    'enableHeading1',
    'enableHeading2',
    'enableHeading3',
    'enableBulletList',
    'enableNumberedList',
    'enableCheckList',
    'enableQuote',
    'enableCodeBlock',
    'enableLeftAlign',
    'enableCenterAlign',
    'enableRightAlign',
    'enableJustifyAlign',
    'enableStartAlign',
    'enableEndAlign',
    'enableIndent',
    'enableOutdent',
    'enableInsertLink',
    'enableExternalLinks',
    'enableInternalLinks',
    'enableLinkAttributes',
    'enableStrapiImage',
    'enableExternalImage',
    'enableInlineImage',
    'enableInsertTable',
    'enableTableCellMerge',
    'enableTableCellBackgroundColor',
    'enableTableHorizontalScroll',
    'enableYoutubeEmbed',
    'enableTwitterEmbed',
    'enableFigmaEmbed',
    'enableAutoEmbed',
    'enableHorizontalRule',
    'enablePageBreak',
    'enableColumnsLayout',
    'enableCollapsible',
    'enableEquation',
    'enablePoll',
    'enableStickyNote',
    'enableFontColor',
    'enableBackgroundColor',
    'enableFontFamily',
    'enableFontSize',
    'enableIncreaseFontSize',
    'enableDecreaseFontSize',
    'enableMarkdownShortcuts',
    'enableCodeHighlight',
    'enableFloatingToolbar',
    'enableFloatingLinkEditor',
    'enableDraggableBlock',
    'enableEmojiPicker',
    'enableAutoLink',
    'enableMentions',
    'enableHashtag',
    'enableKeywords',
    'enableEmojis',
    'enableShortcuts',
    'enableAutoFocus',
    'enableUndo',
    'enableRedo',
  ];

  for (const key of optionKeys) {
    if (key in attributeOptions && typeof attributeOptions[key] === 'boolean') {
      options[key] = attributeOptions[key] as boolean;
    }
  }

  return options;
}
