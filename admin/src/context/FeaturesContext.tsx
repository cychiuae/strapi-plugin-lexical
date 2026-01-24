import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';

// === USER-CONFIGURABLE FEATURES INTERFACE ===
// These are the features users can configure in config/plugins.js
export interface FeaturesConfig {
  // History & Basic Actions
  undo: boolean;
  redo: boolean;

  // Text Formatting
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
  subscript: boolean;
  superscript: boolean;
  inlineCode: boolean;
  clearFormatting: boolean;

  // Text Transformations
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

  // Colors & Styling
  fontColor: boolean;
  backgroundColor: boolean;
  fontFamily: boolean;
  fontSize: boolean;
  increaseFontSize: boolean;
  decreaseFontSize: boolean;

  // Alignment
  leftAlign: boolean;
  centerAlign: boolean;
  rightAlign: boolean;
  justifyAlign: boolean;
  startAlign: boolean;
  endAlign: boolean;
  indent: boolean;
  outdent: boolean;

  // Insert Elements
  insertLink: boolean;
  insertStrapiImage: boolean;
  insertImage: boolean;
  insertInlineImage: boolean;
  insertTable: boolean;
  horizontalRule: boolean;
  pageBreak: boolean;

  // Special Content
  poll: boolean;
  equation: boolean;
  stickyNote: boolean;
  collapsibleContainer: boolean;
  columnsLayout: boolean;

  // Embeds
  twitterEmbed: boolean;
  youtubeEmbed: boolean;
  figmaEmbed: boolean;

  // Table Features (auto-enables tablePlugin when any are enabled)
  tableCellMerge: boolean;
  tableCellBackgroundColor: boolean;
  tableHorizontalScroll: boolean;

  // Social & Interactive Features
  mentions: boolean;
  hashtags: boolean;
  keywords: boolean;
  emojis: boolean;

  // UI/UX Features
  floatingTextFormatToolbar: boolean;
  floatingLinkEditor: boolean;
  draggableBlocks: boolean;
  componentPicker: boolean;
  emojiPicker: boolean;
  clickableLinks: boolean;
  shortcuts: boolean;
  autoFocus: boolean;
  dragDropPaste: boolean;
  tabFocus: boolean;
  tabIndentation: boolean;
  contextMenu: boolean;
  treeView: boolean;
  tableOfContents: boolean;
  autocomplete: boolean;

  // Editor Limits & Validation (number or false)
  maxLength: number | false;
  charLimit: number | false;
  charLimitUtf8: boolean;

  // Advanced Options
  markdownShortcuts: boolean;
  preserveNewLinesInMarkdown: boolean;
  selectionAlwaysOnDisplay: boolean;
  allowHighlightingWithBrackets: boolean;

  // Link Options
  linkAttributes: boolean;
  autoLinkDetection: boolean;
}

// === COMPUTED FEATURES INTERFACE ===
// This extends user features with auto-computed plugin flags
export interface ComputedFeaturesConfig extends FeaturesConfig {
  // Auto-computed core plugins
  historyPlugin: boolean; // Auto: undo || redo
  richTextPlugin: boolean; // Auto: any formatting feature
  listPlugin: boolean; // Auto: bulletList || numberedList || checkList
  linkPlugin: boolean; // Auto: insertLink || autoLinkDetection

  // Auto-computed content plugins
  tablePlugin: boolean; // Auto: insertTable || any table feature
  codeHighlightPlugin: boolean; // Auto: codeBlock
  imagesPlugin: boolean; // Auto: insertImage
  inlineImagePlugin: boolean; // Auto: insertInlineImage
  twitterPlugin: boolean; // Auto: twitterEmbed
  youtubePlugin: boolean; // Auto: youtubeEmbed
  figmaPlugin: boolean; // Auto: figmaEmbed
  equationsPlugin: boolean; // Auto: equation
  pollPlugin: boolean; // Auto: poll
  layoutPlugin: boolean; // Auto: columnsLayout
  collapsiblePlugin: boolean; // Auto: collapsibleContainer
  pageBreakPlugin: boolean; // Auto: pageBreak
  horizontalRulePlugin: boolean; // Auto: horizontalRule

  // Auto-computed social plugins
  mentionsPlugin: boolean; // Auto: mentions
  hashtagPlugin: boolean; // Auto: hashtags
  keywordsPlugin: boolean; // Auto: keywords
  emojisPlugin: boolean; // Auto: emojis || emojiPicker
  checkListPlugin: boolean; // Auto: checkList

  // Auto-computed advanced plugins
  markdownShortcutPlugin: boolean; // Auto: markdownShortcuts
  maxLengthPlugin: boolean; // Auto: maxLength > 0
  characterLimitPlugin: boolean; // Auto: charLimit > 0
  autoLinkPlugin: boolean; // Auto: autoLinkDetection
  clickableLinkPlugin: boolean; // Auto: clickableLinks

  // Auto-computed UI plugins
  floatingTextFormatToolbarPlugin: boolean; // Auto: floatingTextFormatToolbar
  floatingLinkEditorPlugin: boolean; // Auto: floatingLinkEditor
  draggableBlockPlugin: boolean; // Auto: draggableBlocks
  componentPickerPlugin: boolean; // Auto: componentPicker
  emojiPickerPlugin: boolean; // Auto: emojiPicker
  contextMenuPlugin: boolean; // Auto: contextMenu
  treeViewPlugin: boolean; // Auto: treeView
  tableOfContentsPlugin: boolean; // Auto: tableOfContents
  autocompletePlugin: boolean; // Auto: autocomplete
  shortcutsPlugin: boolean; // Auto: shortcuts
  autoFocusPlugin: boolean; // Auto: autoFocus
  dragDropPastePlugin: boolean; // Auto: dragDropPaste
  tabFocusPlugin: boolean; // Auto: tabFocus
  tabIndentationPlugin: boolean; // Auto: tabIndentation

  // Additional computed plugins
  autoEmbedPlugin: boolean; // Auto: any embed feature
  tableCellResizer: boolean; // Auto: same as tableCellResizer user feature
  codeActionMenuPlugin: boolean; // Auto: codeBlock
  tableCellActionMenuPlugin: boolean; // Auto: any table feature
  tableHoverActionsPlugin: boolean; // Auto: any table feature

  // Legacy compatibility flags (kept for compatibility)
  richText: boolean;
  collab: boolean;
  specialTextPlugin: boolean;
  actionsPlugin: boolean;
  clearEditorPlugin: boolean;
}

// === CONTEXT INTERFACES ===

export interface FeaturesContextValue {
  features: ComputedFeaturesConfig | null;
  loading: boolean;
  error: string | null;
}

export interface FeaturesProviderProps {
  children: ReactNode;
}

// === CONTEXT CREATION ===

const FeaturesContext = createContext<FeaturesContextValue | null>(null);

// === CONTEXT HOOKS ===

export const useFeatures = (): FeaturesContextValue => {
  const context = useContext(FeaturesContext);
  if (!context) {
    throw new Error('useFeatures must be used within a FeaturesProvider');
  }
  return context;
};

// Convenience hook to get just the features object with loading check
export const useFeaturesConfig = (): ComputedFeaturesConfig => {
  const { features, loading, error } = useFeatures();

  if (loading) {
    throw new Error('Features are still loading');
  }

  if (error || !features) {
    throw new Error(`Features unavailable: ${error || 'Unknown error'}`);
  }

  return features;
};

// === PROVIDER COMPONENT ===

export const FeaturesProvider: React.FC<FeaturesProviderProps> = ({ children }) => {
  const [features, setFeatures] = useState<ComputedFeaturesConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { get } = useFetchClient();

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch features configuration from admin API
        const { data } = await get('/lexical/features');

        // Use the computed configuration that includes auto-enabled plugins
        setFeatures(data.computed);
      } catch (err) {
        console.error('Failed to fetch features configuration:', err);
        setError('Failed to load editor configuration');

        // Fallback to current defaults if API fails (matches current features.ts)
        const fallbackFeatures: FeaturesConfig = {
          // Currently enabled features
          undo: true,
          redo: true,
          bold: true,
          italic: true,
          underline: true,
          strikethrough: true,
          subscript: true,
          superscript: true,
          paragraph: true,
          heading1: true,
          heading2: true,
          heading3: true,
          bulletList: true,
          numberedList: true,
          leftAlign: true,
          centerAlign: true,
          rightAlign: true,
          fontColor: true,
          insertLink: true,
          insertStrapiImage: true,
          floatingTextFormatToolbar: true,
          floatingLinkEditor: true,
          shortcuts: true,
          autoLinkDetection: true,

          // Currently disabled features - defaults to false
          inlineCode: false,
          clearFormatting: false,
          lowercase: false,
          uppercase: false,
          capitalize: false,
          checkList: false,
          quote: false,
          codeBlock: false,
          codeLanguageSelector: false,
          backgroundColor: false,
          fontFamily: false,
          fontSize: false,
          increaseFontSize: false,
          decreaseFontSize: false,
          justifyAlign: false,
          startAlign: false,
          endAlign: false,
          indent: false,
          outdent: false,
          insertImage: false,
          insertInlineImage: false,
          insertTable: false,
          horizontalRule: false,
          pageBreak: false,
          poll: false,
          equation: false,
          stickyNote: false,
          collapsibleContainer: false,
          columnsLayout: false,
          twitterEmbed: false,
          youtubeEmbed: false,
          figmaEmbed: false,
          tableCellMerge: false,
          tableCellBackgroundColor: false,
          tableHorizontalScroll: false,
          mentions: false,
          hashtags: false,
          keywords: false,
          emojis: false,
          draggableBlocks: false,
          componentPicker: false,
          emojiPicker: false,
          clickableLinks: false,
          autoFocus: false,
          dragDropPaste: false,
          tabFocus: false,
          tabIndentation: false,
          contextMenu: false,
          treeView: false,
          tableOfContents: false,
          autocomplete: false,
          maxLength: false,
          charLimit: false,
          charLimitUtf8: false,
          markdownShortcuts: false,
          preserveNewLinesInMarkdown: false,
          selectionAlwaysOnDisplay: false,
          allowHighlightingWithBrackets: false,
          linkAttributes: false,
        };

        // Compute plugins from fallback features (same logic as server)
        const computedPlugins = {
          historyPlugin: fallbackFeatures.undo || fallbackFeatures.redo,
          richTextPlugin: true, // Always needed for basic editing
          listPlugin:
            fallbackFeatures.bulletList ||
            fallbackFeatures.numberedList ||
            fallbackFeatures.checkList,
          linkPlugin: fallbackFeatures.insertLink || fallbackFeatures.autoLinkDetection,
          autoLinkPlugin: fallbackFeatures.autoLinkDetection,
          floatingTextFormatToolbarPlugin: fallbackFeatures.floatingTextFormatToolbar,
          floatingLinkEditorPlugin: fallbackFeatures.floatingLinkEditor,
          shortcutsPlugin: fallbackFeatures.shortcuts,

          // All other plugins default to false based on disabled features
          tablePlugin: false,
          codeHighlightPlugin: false,
          imagesPlugin: false,
          inlineImagePlugin: false,
          twitterPlugin: false,
          youtubePlugin: false,
          figmaPlugin: false,
          equationsPlugin: false,
          pollPlugin: false,
          layoutPlugin: false,
          collapsiblePlugin: false,
          pageBreakPlugin: false,
          horizontalRulePlugin: false,
          mentionsPlugin: false,
          hashtagPlugin: false,
          keywordsPlugin: false,
          emojisPlugin: false,
          checkListPlugin: false,
          markdownShortcutPlugin: false,
          maxLengthPlugin: false,
          characterLimitPlugin: false,
          clickableLinkPlugin: false,
          draggableBlockPlugin: false,
          componentPickerPlugin: false,
          emojiPickerPlugin: false,
          contextMenuPlugin: false,
          treeViewPlugin: false,
          tableOfContentsPlugin: false,
          autocompletePlugin: false,
          autoFocusPlugin: false,
          dragDropPastePlugin: false,
          tabFocusPlugin: false,
          tabIndentationPlugin: false,

          // Additional computed plugins
          autoEmbedPlugin: false,
          tableCellResizer: false,
          codeActionMenuPlugin: false,
          tableCellActionMenuPlugin: false,
          tableHoverActionsPlugin: false,

          // Legacy flags for compatibility
          richText: false,
          collab: false,
          specialTextPlugin: false,
          actionsPlugin: false,
          clearEditorPlugin: false,
        };

        setFeatures({ ...fallbackFeatures, ...computedPlugins });
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, [get]);

  const value: FeaturesContextValue = {
    features,
    loading,
    error,
  };

  return <FeaturesContext.Provider value={value}>{children}</FeaturesContext.Provider>;
};

export default FeaturesContext;
