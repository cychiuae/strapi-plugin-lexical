import type { Core } from '@strapi/strapi';

/**
 * Auto-compute plugin flags from user features
 */
function computePlugins(userFeatures: any) {
  return {
    // Core plugins automatically enabled based on features
    historyPlugin: userFeatures.undo || userFeatures.redo,
    richTextPlugin:
      userFeatures.bold ||
      userFeatures.italic ||
      userFeatures.underline ||
      userFeatures.strikethrough ||
      userFeatures.fontColor ||
      userFeatures.backgroundColor ||
      userFeatures.heading1 ||
      userFeatures.heading2 ||
      userFeatures.heading3 ||
      userFeatures.bulletList ||
      userFeatures.numberedList ||
      userFeatures.insertLink,
    listPlugin: userFeatures.bulletList || userFeatures.numberedList || userFeatures.checkList,
    linkPlugin: userFeatures.insertLink || userFeatures.autoLinkDetection,

    // Content plugins
    tablePlugin:
      userFeatures.insertTable ||
      userFeatures.tableCellMerge ||
      userFeatures.tableCellBackgroundColor ||
      userFeatures.tableHorizontalScroll,
    codeHighlightPlugin: userFeatures.codeBlock,
    imagesPlugin: userFeatures.insertImage,
    inlineImagePlugin: userFeatures.insertInlineImage,
    twitterPlugin: userFeatures.twitterEmbed,
    youtubePlugin: userFeatures.youtubeEmbed,
    figmaPlugin: userFeatures.figmaEmbed,
    equationsPlugin: userFeatures.equation,
    pollPlugin: userFeatures.poll,
    layoutPlugin: userFeatures.columnsLayout,
    collapsiblePlugin: userFeatures.collapsibleContainer,
    pageBreakPlugin: userFeatures.pageBreak,
    horizontalRulePlugin: userFeatures.horizontalRule,

    // Social plugins
    mentionsPlugin: userFeatures.mentions,
    hashtagPlugin: userFeatures.hashtags,
    keywordsPlugin: userFeatures.keywords,
    emojisPlugin: userFeatures.emojis || userFeatures.emojiPicker,
    checkListPlugin: userFeatures.checkList,

    // Advanced plugins
    markdownShortcutPlugin: userFeatures.markdownShortcuts,
    maxLengthPlugin: userFeatures.maxLength && userFeatures.maxLength > 0,
    characterLimitPlugin: userFeatures.charLimit && userFeatures.charLimit > 0,
    autoLinkPlugin: userFeatures.autoLinkDetection,
    clickableLinkPlugin: userFeatures.clickableLinks,

    // UI plugins
    floatingTextFormatToolbarPlugin: userFeatures.floatingTextFormatToolbar,
    floatingLinkEditorPlugin: userFeatures.floatingLinkEditor,
    draggableBlockPlugin: userFeatures.draggableBlocks,
    componentPickerPlugin: userFeatures.componentPicker,
    emojiPickerPlugin: userFeatures.emojiPicker,
    contextMenuPlugin: userFeatures.contextMenu,
    treeViewPlugin: userFeatures.treeView,
    tableOfContentsPlugin: userFeatures.tableOfContents,
    autocompletePlugin: userFeatures.autocomplete,
    shortcutsPlugin: userFeatures.shortcuts,
    autoFocusPlugin: userFeatures.autoFocus,
    dragDropPastePlugin: userFeatures.dragDropPaste,
    tabFocusPlugin: userFeatures.tabFocus,
    tabIndentationPlugin: userFeatures.tabIndentation,

    // Additional computed plugins
    autoEmbedPlugin:
      userFeatures.twitterEmbed || userFeatures.youtubeEmbed || userFeatures.figmaEmbed,
    tableCellResizer:
      userFeatures.tableCellMerge ||
      userFeatures.tableCellBackgroundColor ||
      userFeatures.tableHorizontalScroll,
    codeActionMenuPlugin: userFeatures.codeBlock,
    tableCellActionMenuPlugin:
      userFeatures.insertTable ||
      userFeatures.tableCellMerge ||
      userFeatures.tableCellBackgroundColor ||
      userFeatures.tableHorizontalScroll,
    tableHoverActionsPlugin:
      userFeatures.insertTable ||
      userFeatures.tableCellMerge ||
      userFeatures.tableCellBackgroundColor ||
      userFeatures.tableHorizontalScroll,

    // Legacy flags for compatibility (computed from features)
    richText: false, // Keep false to avoid conflicts with richTextPlugin
    collab: false,
    specialTextPlugin: false,
    actionsPlugin: false,
    clearEditorPlugin: false,
  };
}

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  /**
   * Get features configuration for the admin panel
   * Returns both user-configured features and auto-computed plugin flags
   */
  getFeatures(ctx) {
    try {
      // Get user-configured features from plugin config
      const userFeatures = strapi.plugin('lexical').config('features');

      // Compute which plugins should be enabled based on user features
      const computedPlugins = computePlugins(userFeatures);

      // Ensure we have proper objects for spreading
      const safeUserFeatures = userFeatures && typeof userFeatures === 'object' ? userFeatures : {};
      const safeComputedPlugins =
        computedPlugins && typeof computedPlugins === 'object' ? computedPlugins : {};

      // Return both user features and computed plugin states
      ctx.body = {
        features: safeUserFeatures,
        plugins: safeComputedPlugins,
        computed: {
          ...safeUserFeatures,
          ...safeComputedPlugins,
        },
      };
    } catch (error) {
      strapi.log.error('Failed to get lexical features:', error);
      ctx.throw(500, 'Failed to retrieve features configuration');
    }
  },
});
