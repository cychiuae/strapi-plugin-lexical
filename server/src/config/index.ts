export default {
  default: {
    features: {
      // === USER-CONFIGURABLE FEATURES ===

      // History & Basic Actions
      undo: true,
      redo: true,

      // Text Formatting
      bold: true,
      italic: true,
      underline: true,
      strikethrough: true,
      subscript: true,
      superscript: true,
      inlineCode: false,
      clearFormatting: false,

      // Text Transformations
      lowercase: false,
      uppercase: false,
      capitalize: false,

      // Block Types
      paragraph: true,
      heading1: true,
      heading2: true,
      heading3: true,
      bulletList: true,
      numberedList: true,
      checkList: false,
      quote: false,
      codeBlock: false,
      codeLanguageSelector: false,

      // Colors & Styling
      fontColor: true,
      backgroundColor: false,
      fontFamily: false,
      fontSize: false,
      increaseFontSize: false,
      decreaseFontSize: false,

      // Alignment
      leftAlign: true,
      centerAlign: true,
      rightAlign: true,
      justifyAlign: false,
      startAlign: false,
      endAlign: false,
      indent: false,
      outdent: false,

      // Insert Elements
      insertLink: true,
      insertStrapiImage: true,
      insertImage: false,
      insertInlineImage: false,
      insertTable: false,
      horizontalRule: false,
      pageBreak: false,

      // Special Content
      poll: false,
      equation: false,
      stickyNote: false,
      collapsibleContainer: false,
      columnsLayout: false,

      // Embeds
      twitterEmbed: false,
      youtubeEmbed: false,
      figmaEmbed: false,

      // Table Features (when enabled, auto-enables tablePlugin)
      tableCellMerge: false,
      tableCellBackgroundColor: false,
      tableHorizontalScroll: false,

      // Social & Interactive Features
      mentions: false,
      hashtags: false,
      keywords: false,
      emojis: false,

      // UI/UX Features
      floatingTextFormatToolbar: true,
      floatingLinkEditor: true,
      draggableBlocks: false,
      componentPicker: false,
      emojiPicker: false,
      clickableLinks: false,
      shortcuts: true,
      autoFocus: false,
      dragDropPaste: false,
      tabFocus: false,
      tabIndentation: false,
      contextMenu: false,
      treeView: false,
      tableOfContents: false,
      autocomplete: false,

      // Editor Limits & Validation (auto-enable plugins when > 0)
      maxLength: false,
      charLimit: false,
      charLimitUtf8: false,

      // Advanced Options
      markdownShortcuts: false,
      preserveNewLinesInMarkdown: false,
      selectionAlwaysOnDisplay: false,
      allowHighlightingWithBrackets: false,

      // Link Options
      linkAttributes: false,
      autoLinkDetection: true,
    },
  },

  validator(config) {
    const { features: userFeatures } = config;

    // Validate user feature types
    for (const [key, value] of Object.entries(userFeatures)) {
      if (['maxLength', 'charLimit'].includes(key)) {
        if (value !== false && (typeof value !== 'number' || value < 0)) {
          throw new Error(
            `Feature '${key}' must be false or a positive number, got ${typeof value}`
          );
        }
      } else if (typeof value !== 'boolean') {
        throw new Error(`Feature '${key}' must be a boolean, got ${typeof value}`);
      }
    }

    // === SIMPLIFIED VALIDATION (plugins are auto-computed) ===

    // Font size dependencies
    if (
      (userFeatures.increaseFontSize || userFeatures.decreaseFontSize) &&
      !userFeatures.fontSize
    ) {
      throw new Error('Font size increase/decrease requires fontSize to be enabled');
    }

    // Code language selector requires code blocks
    if (userFeatures.codeLanguageSelector && !userFeatures.codeBlock) {
      throw new Error('codeLanguageSelector requires codeBlock to be enabled');
    }

    // Formatting dependencies
    const formattingFeatures = [
      userFeatures.bold,
      userFeatures.italic,
      userFeatures.underline,
      userFeatures.strikethrough,
      userFeatures.subscript,
      userFeatures.superscript,
      userFeatures.inlineCode,
      userFeatures.lowercase,
      userFeatures.uppercase,
      userFeatures.capitalize,
    ];

    if (userFeatures.clearFormatting && !formattingFeatures.some(Boolean)) {
      throw new Error(
        'clearFormatting requires at least one text formatting feature to be enabled'
      );
    }

    // Floating toolbar needs formatting features
    const hasAnyFormattingFeature =
      formattingFeatures.some(Boolean) ||
      userFeatures.fontColor ||
      userFeatures.backgroundColor ||
      userFeatures.fontSize;

    if (userFeatures.floatingTextFormatToolbar && !hasAnyFormattingFeature) {
      throw new Error(
        'floatingTextFormatToolbar requires at least one formatting feature to be enabled'
      );
    }

    // Markdown preservation requires markdown shortcuts
    if (userFeatures.preserveNewLinesInMarkdown && !userFeatures.markdownShortcuts) {
      throw new Error('preserveNewLinesInMarkdown requires markdownShortcuts to be enabled');
    }

    // === PERFORMANCE WARNINGS ===
    const heavyFeatures = [
      'draggableBlocks',
      'treeView',
      'tableOfContents',
      'contextMenu',
      'componentPicker',
      'autocomplete',
    ];

    const enabledHeavyFeatures = heavyFeatures.filter((f) => userFeatures[f]);
    if (enabledHeavyFeatures.length > 2) {
      console.warn(
        `Multiple performance-heavy features enabled: ${enabledHeavyFeatures.join(', ')}. Consider enabling only essential features for better performance.`
      );
    }

    // === LOGICAL WARNINGS ===

    // Warn about indentation without list support
    if (
      (userFeatures.indent || userFeatures.outdent) &&
      !(userFeatures.bulletList || userFeatures.numberedList) &&
      !userFeatures.tabIndentation
    ) {
      console.warn(
        'Indent/outdent features work best with list support or tabIndentation enabled.'
      );
    }

    // Check for minimal configuration
    const allFeatures = Object.values(userFeatures);
    const enabledCount = allFeatures.filter(Boolean).length;

    if (enabledCount < 5) {
      console.info(
        `Minimal configuration detected (${enabledCount} features enabled). Ensure core editing features are included.`
      );
    }

    // Check if core features are disabled
    const coreFeatures = ['paragraph', 'undo', 'redo'];
    coreFeatures.forEach((featureName) => {
      if (!userFeatures[featureName]) {
        console.warn(`Core feature '${featureName}' is disabled. This may cause editor issues.`);
      }
    });

    // Check if shortcuts are disabled but formatting is enabled
    if (!userFeatures.shortcuts && formattingFeatures.some(Boolean)) {
      console.info(
        'Keyboard shortcuts are disabled but formatting features are enabled. Users will need to use toolbar buttons only.'
      );
    }
  },
};
