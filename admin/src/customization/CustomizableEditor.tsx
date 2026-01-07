import type { JSX } from 'react';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { SelectionAlwaysOnDisplay } from '@lexical/react/LexicalSelectionAlwaysOnDisplay';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { useLexicalEditable } from '@lexical/react/useLexicalEditable';
import { useEffect, useState } from 'react';
import { CAN_USE_DOM } from '../lexical/utils/environment';

import { EditorState, SerializedEditorState, SerializedLexicalNode } from 'lexical';
import { useSharedHistoryContext } from '../lexical/context/SharedHistoryContext';
import ActionsPlugin from '../lexical/plugins/ActionsPlugin';
import AutocompletePlugin from '../lexical/plugins/AutocompletePlugin';
import AutoEmbedPlugin from '../lexical/plugins/AutoEmbedPlugin';
import AutoLinkPlugin from '../lexical/plugins/AutoLinkPlugin';
import CodeActionMenuPlugin from '../lexical/plugins/CodeActionMenuPlugin';
import CodeHighlightPlugin from '../lexical/plugins/CodeHighlightPlugin';
import CollapsiblePlugin from '../lexical/plugins/CollapsiblePlugin';
import ComponentPickerPlugin from '../lexical/plugins/ComponentPickerPlugin';
import ContextMenuPlugin from '../lexical/plugins/ContextMenuPlugin';
import DragDropPaste from '../lexical/plugins/DragDropPastePlugin';
import DraggableBlockPlugin from '../lexical/plugins/DraggableBlockPlugin';
import EmojiPickerPlugin from '../lexical/plugins/EmojiPickerPlugin';
import EmojisPlugin from '../lexical/plugins/EmojisPlugin';
import EquationsPlugin from '../lexical/plugins/EquationsPlugin';
import FigmaPlugin from '../lexical/plugins/FigmaPlugin';
import FloatingLinkEditorPlugin from '../lexical/plugins/FloatingLinkEditorPlugin';
import FloatingTextFormatToolbarPlugin from '../lexical/plugins/FloatingTextFormatToolbarPlugin';
import ImagesPlugin from '../lexical/plugins/ImagesPlugin';
import InlineImagePlugin from '../lexical/plugins/InlineImagePlugin';
import KeywordsPlugin from '../lexical/plugins/KeywordsPlugin';
import { LayoutPlugin } from '../lexical/plugins/LayoutPlugin/LayoutPlugin';
import LinkPlugin from '../lexical/plugins/LinkPlugin';
import MarkdownShortcutPlugin from '../lexical/plugins/MarkdownShortcutPlugin';
import { MaxLengthPlugin } from '../lexical/plugins/MaxLengthPlugin';
import MentionsPlugin from '../lexical/plugins/MentionsPlugin';
import PageBreakPlugin from '../lexical/plugins/PageBreakPlugin';
import PollPlugin from '../lexical/plugins/PollPlugin';
import SpecialTextPlugin from '../lexical/plugins/SpecialTextPlugin';
import StrapiOnChangePlugin from '../lexical/plugins/StrapiOnChangePlugin';
import TabFocusPlugin from '../lexical/plugins/TabFocusPlugin';
import TableCellActionMenuPlugin from '../lexical/plugins/TableActionMenuPlugin';
import TableCellResizer from '../lexical/plugins/TableCellResizer';
import TableHoverActionsPlugin from '../lexical/plugins/TableHoverActionsPlugin';
import TableOfContentsPlugin from '../lexical/plugins/TableOfContentsPlugin';
import TreeViewPlugin from '../lexical/plugins/TreeViewPlugin';
import TwitterPlugin from '../lexical/plugins/TwitterPlugin';
import YouTubePlugin from '../lexical/plugins/YouTubePlugin';
import ContentEditable from '../lexical/ui/ContentEditable';

import { useIntl } from 'react-intl';
import StrapiImagePlugin from '../lexical/plugins/StrapiImagePlugin';
import CustomizableToolbar from './CustomizableToolbar';
import CustomizableShortcutsPlugin from './CustomizableShortcutsPlugin';
import {
  ENABLE_ACTIONS_PLUGIN,
  ENABLE_ALLOW_HIGHLIGHTING_WITH_BRACKETS,
  ENABLE_AUTO_FOCUS_PLUGIN,
  ENABLE_AUTO_LINK_PLUGIN,
  ENABLE_AUTO_EMBED_PLUGIN,
  ENABLE_AUTOCOMPLETE,
  ENABLE_AUTOCOMPLETE_PLUGIN,
  ENABLE_BACKGROUND_COLOR,
  ENABLE_BOLD,
  ENABLE_BULLET_LIST,
  ENABLE_CAPITALIZE,
  ENABLE_CENTER_ALIGN,
  ENABLE_CHAR_LIMIT,
  ENABLE_CHAR_LIMIT_UTF8,
  ENABLE_CHARACTER_LIMIT_PLUGIN,
  ENABLE_CHECK_LIST,
  ENABLE_CHECK_LIST_PLUGIN,
  ENABLE_CLEAR_EDITOR_PLUGIN,
  ENABLE_CLEAR_FORMATTING,
  ENABLE_CLICKABLE_LINK_PLUGIN,
  ENABLE_CODE_ACTION_MENU_PLUGIN,
  ENABLE_CODE_BLOCK,
  ENABLE_CODE_HIGHLIGHT_PLUGIN,
  ENABLE_COLLAPSIBLE_CONTAINER,
  ENABLE_COLLAPSIBLE_PLUGIN,
  ENABLE_COLUMNS_LAYOUT,
  ENABLE_COMPONENT_PICKER_PLUGIN,
  ENABLE_CONTEXT_MENU_PLUGIN,
  ENABLE_DECREASE_FONT_SIZE,
  ENABLE_DRAG_DROP_PASTE_PLUGIN,
  ENABLE_DRAGGABLE_BLOCK_PLUGIN,
  ENABLE_EMOJI_PICKER_PLUGIN,
  ENABLE_EMOJIS_PLUGIN,
  ENABLE_END_ALIGN,
  ENABLE_EQUATION,
  ENABLE_EQUATIONS_PLUGIN,
  ENABLE_FIGMA_EMBED,
  ENABLE_FIGMA_PLUGIN,
  ENABLE_FLOATING_LINK_EDITOR_PLUGIN,
  ENABLE_FLOATING_TEXT_FORMAT_TOOLBAR_PLUGIN,
  ENABLE_FONT_COLOR,
  ENABLE_FONT_FAMILY,
  ENABLE_FONT_SIZE,
  ENABLE_HASHTAG_PLUGIN,
  ENABLE_HEADING_1,
  ENABLE_HEADING_2,
  ENABLE_HEADING_3,
  ENABLE_HISTORY_PLUGIN,
  ENABLE_HORIZONTAL_RULE,
  ENABLE_HORIZONTAL_RULE_PLUGIN,
  ENABLE_IMAGES_PLUGIN,
  ENABLE_INCREASE_FONT_SIZE,
  ENABLE_INDENT,
  ENABLE_INLINE_CODE,
  ENABLE_INLINE_IMAGE_PLUGIN,
  ENABLE_INSERT_IMAGE,
  ENABLE_INSERT_INLINE_IMAGE,
  ENABLE_INSERT_LINK,
  ENABLE_INSERT_STRAPI_IMAGE,
  ENABLE_INSERT_TABLE,
  ENABLE_ITALIC,
  ENABLE_JUSTIFY_ALIGN,
  ENABLE_KEYWORDS_PLUGIN,
  ENABLE_LAYOUT_PLUGIN,
  ENABLE_LEFT_ALIGN,
  ENABLE_LEXICAL_CONTEXT_MENU,
  ENABLE_LINK_ATTRIBUTES,
  ENABLE_LINK_PLUGIN,
  ENABLE_LIST_PLUGIN,
  ENABLE_LOWERCASE,
  ENABLE_MARKDOWN_SHORTCUT_PLUGIN,
  ENABLE_MAX_LENGTH,
  ENABLE_MAX_LENGTH_PLUGIN,
  ENABLE_MENTIONS_PLUGIN,
  ENABLE_NUMBERED_LIST,
  ENABLE_OUTDENT,
  ENABLE_PAGE_BREAK,
  ENABLE_PAGE_BREAK_PLUGIN,
  ENABLE_PARAGRAPH,
  ENABLE_POLL,
  ENABLE_POLL_PLUGIN,
  ENABLE_PRESERVE_NEW_LINES_IN_MARKDOWN,
  ENABLE_QUOTE,
  ENABLE_REDO,
  ENABLE_RICH_TEXT,
  ENABLE_RICH_TEXT_PLUGIN,
  ENABLE_RIGHT_ALIGN,
  ENABLE_SELECTION_ALWAYS_ON_DISPLAY,
  ENABLE_SHORTCUTS_PLUGIN,
  ENABLE_SPECIAL_TEXT_PLUGIN,
  ENABLE_START_ALIGN,
  ENABLE_STICKY_NOTE,
  ENABLE_STRIKETHROUGH,
  ENABLE_SUBSCRIPT,
  ENABLE_SUPERSCRIPT,
  ENABLE_TAB_FOCUS_PLUGIN,
  ENABLE_TAB_INDENTATION_PLUGIN,
  ENABLE_TABLE_CELL_ACTION_MENU_PLUGIN,
  ENABLE_TABLE_CELL_BACKGROUND_COLOR,
  ENABLE_TABLE_CELL_MERGE,
  ENABLE_TABLE_CELL_RESIZER,
  ENABLE_TABLE_HOVER_ACTIONS_PLUGIN,
  ENABLE_TABLE_HORIZONTAL_SCROLL,
  ENABLE_TABLE_OF_CONTENTS,
  ENABLE_TABLE_OF_CONTENTS_PLUGIN,
  ENABLE_TABLE_PLUGIN,
  ENABLE_TREE_VIEW,
  ENABLE_TREE_VIEW_PLUGIN,
  ENABLE_TWITTER_EMBED,
  ENABLE_TWITTER_PLUGIN,
  ENABLE_UNDERLINE,
  ENABLE_UNDO,
  ENABLE_UPPERCASE,
  ENABLE_YOUTUBE_EMBED,
  ENABLE_YOUTUBE_PLUGIN,
} from './features';
import '../lexical/styles.css';
import './styles.css';

interface LexicalEditorProps {
  onChange: (newValue: SerializedEditorState<SerializedLexicalNode>) => void;
  ref: React.ForwardedRef<HTMLDivElement>;
  fieldName: string;
  expectedEditorState?: SerializedEditorState<SerializedLexicalNode>;
}

export default function CustomizableEditor(props: LexicalEditorProps): JSX.Element {
  const { formatMessage } = useIntl();
  const { historyState } = useSharedHistoryContext();

  const isRichText = ENABLE_RICH_TEXT_PLUGIN;
  const showTreeView = ENABLE_TREE_VIEW_PLUGIN || ENABLE_TREE_VIEW;
  const showTableOfContents = ENABLE_TABLE_OF_CONTENTS_PLUGIN || ENABLE_TABLE_OF_CONTENTS;
  const shouldUseLexicalContextMenu = ENABLE_CONTEXT_MENU_PLUGIN || ENABLE_LEXICAL_CONTEXT_MENU;
  const shouldPreserveNewLinesInMarkdown = ENABLE_PRESERVE_NEW_LINES_IN_MARKDOWN;
  const tableCellMerge = ENABLE_TABLE_CELL_MERGE;
  const tableCellBackgroundColor = ENABLE_TABLE_CELL_BACKGROUND_COLOR;
  const tableHorizontalScroll = ENABLE_TABLE_HORIZONTAL_SCROLL;
  const shouldAllowHighlightingWithBrackets =
    ENABLE_SPECIAL_TEXT_PLUGIN || ENABLE_ALLOW_HIGHLIGHTING_WITH_BRACKETS;
  const selectionAlwaysOnDisplay = ENABLE_SELECTION_ALWAYS_ON_DISPLAY;
  const isAutocomplete = ENABLE_AUTOCOMPLETE_PLUGIN || ENABLE_AUTOCOMPLETE;
  const isMaxLength = ENABLE_MAX_LENGTH_PLUGIN || ENABLE_MAX_LENGTH;
  const isCharLimit = ENABLE_CHARACTER_LIMIT_PLUGIN || ENABLE_CHAR_LIMIT;
  const isCharLimitUtf8 = ENABLE_CHARACTER_LIMIT_PLUGIN || ENABLE_CHAR_LIMIT_UTF8;
  const hasLinkAttributes = ENABLE_LINK_ATTRIBUTES;

  const isEditable = useLexicalEditable();
  const placeholder = formatMessage(
    {
      id: 'lexical.editor.placeholder',
      defaultMessage:
        'Enter some {state, select, collab {collaborative rich} rich {rich} other {plain}} text...',
    },
    { state: isRichText ? 'rich' : 'plain' }
  );

  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] = useState<boolean>(false);
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener('resize', updateViewPortWidth);

    return () => {
      window.removeEventListener('resize', updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

  function onChange(editorState: EditorState) {
    const editorStateJSON = editorState.toJSON();
    props.onChange(editorStateJSON);
  }

  const hasAnyToolbarFeature =
    ENABLE_UNDO ||
    ENABLE_REDO ||
    ENABLE_PARAGRAPH ||
    ENABLE_HEADING_1 ||
    ENABLE_HEADING_2 ||
    ENABLE_HEADING_3 ||
    ENABLE_BULLET_LIST ||
    ENABLE_NUMBERED_LIST ||
    ENABLE_CHECK_LIST ||
    ENABLE_QUOTE ||
    ENABLE_CODE_BLOCK ||
    ENABLE_BOLD ||
    ENABLE_ITALIC ||
    ENABLE_UNDERLINE ||
    ENABLE_INLINE_CODE ||
    ENABLE_LOWERCASE ||
    ENABLE_UPPERCASE ||
    ENABLE_CAPITALIZE ||
    ENABLE_STRIKETHROUGH ||
    ENABLE_SUBSCRIPT ||
    ENABLE_SUPERSCRIPT ||
    ENABLE_CLEAR_FORMATTING ||
    ENABLE_FONT_COLOR ||
    ENABLE_BACKGROUND_COLOR ||
    ENABLE_FONT_FAMILY ||
    ENABLE_FONT_SIZE ||
    ENABLE_INCREASE_FONT_SIZE ||
    ENABLE_DECREASE_FONT_SIZE ||
    ENABLE_INSERT_LINK ||
    ENABLE_INSERT_STRAPI_IMAGE ||
    ENABLE_LEFT_ALIGN ||
    ENABLE_CENTER_ALIGN ||
    ENABLE_RIGHT_ALIGN ||
    ENABLE_JUSTIFY_ALIGN ||
    ENABLE_START_ALIGN ||
    ENABLE_END_ALIGN ||
    ENABLE_INDENT ||
    ENABLE_OUTDENT ||
    ENABLE_HORIZONTAL_RULE ||
    ENABLE_PAGE_BREAK ||
    ENABLE_INSERT_IMAGE ||
    ENABLE_INSERT_INLINE_IMAGE ||
    ENABLE_INSERT_TABLE ||
    ENABLE_POLL ||
    ENABLE_COLUMNS_LAYOUT ||
    ENABLE_EQUATION ||
    ENABLE_STICKY_NOTE ||
    ENABLE_COLLAPSIBLE_CONTAINER ||
    ENABLE_TWITTER_EMBED ||
    ENABLE_YOUTUBE_EMBED ||
    ENABLE_FIGMA_EMBED;

  return (
    <>
      {isRichText && hasAnyToolbarFeature && (
        <CustomizableToolbar
          editor={editor}
          activeEditor={activeEditor}
          setActiveEditor={setActiveEditor}
          setIsLinkEditMode={setIsLinkEditMode}
        />
      )}
      {isRichText && ENABLE_SHORTCUTS_PLUGIN && (
        <CustomizableShortcutsPlugin editor={activeEditor} setIsLinkEditMode={setIsLinkEditMode} />
      )}
      <div
        className={`customizable-editor-container editor-container ${showTreeView ? 'tree-view' : ''} ${
          !isRichText ? 'plain-text' : ''
        }`}
      >
        {isMaxLength && <MaxLengthPlugin maxLength={30} />}
        {ENABLE_DRAG_DROP_PASTE_PLUGIN && <DragDropPaste />}
        {ENABLE_AUTO_FOCUS_PLUGIN && <AutoFocusPlugin />}
        {selectionAlwaysOnDisplay && <SelectionAlwaysOnDisplay />}
        {ENABLE_CLEAR_EDITOR_PLUGIN && <ClearEditorPlugin />}
        {ENABLE_COMPONENT_PICKER_PLUGIN && <ComponentPickerPlugin />}
        {ENABLE_EMOJI_PICKER_PLUGIN && <EmojiPickerPlugin />}
        {ENABLE_AUTO_EMBED_PLUGIN && <AutoEmbedPlugin />}
        {ENABLE_MENTIONS_PLUGIN && <MentionsPlugin />}
        {ENABLE_EMOJIS_PLUGIN && <EmojisPlugin />}
        {ENABLE_HASHTAG_PLUGIN && <HashtagPlugin />}
        {ENABLE_KEYWORDS_PLUGIN && <KeywordsPlugin />}
        {ENABLE_AUTO_LINK_PLUGIN && <AutoLinkPlugin />}
        {isRichText ? (
          <>
            {ENABLE_HISTORY_PLUGIN && <HistoryPlugin externalHistoryState={historyState} />}
            <RichTextPlugin
              contentEditable={
                <div className="editor-scroller">
                  <div className="editor" ref={onRef}>
                    <ContentEditable placeholder={placeholder} ref={props.ref} />
                  </div>
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            {ENABLE_MARKDOWN_SHORTCUT_PLUGIN && <MarkdownShortcutPlugin />}
            {ENABLE_CODE_HIGHLIGHT_PLUGIN && <CodeHighlightPlugin />}
            {ENABLE_LIST_PLUGIN && <ListPlugin />}
            {ENABLE_CHECK_LIST_PLUGIN && <CheckListPlugin />}
            {ENABLE_TABLE_PLUGIN && (
              <TablePlugin
                hasCellMerge={tableCellMerge}
                hasCellBackgroundColor={tableCellBackgroundColor}
                hasHorizontalScroll={tableHorizontalScroll}
              />
            )}
            {ENABLE_TABLE_CELL_RESIZER && <TableCellResizer />}
            {ENABLE_IMAGES_PLUGIN && <ImagesPlugin />}
            {ENABLE_INLINE_IMAGE_PLUGIN && <InlineImagePlugin />}
            {ENABLE_LINK_PLUGIN && <LinkPlugin hasLinkAttributes={hasLinkAttributes} />}
            {ENABLE_POLL_PLUGIN && <PollPlugin />}
            {ENABLE_TWITTER_PLUGIN && <TwitterPlugin />}
            {ENABLE_YOUTUBE_PLUGIN && <YouTubePlugin />}
            {ENABLE_FIGMA_PLUGIN && <FigmaPlugin />}
            {ENABLE_CLICKABLE_LINK_PLUGIN && <ClickableLinkPlugin disabled={isEditable} />}
            {ENABLE_HORIZONTAL_RULE_PLUGIN && <HorizontalRulePlugin />}
            {ENABLE_EQUATIONS_PLUGIN && <EquationsPlugin />}
            {ENABLE_TAB_FOCUS_PLUGIN && <TabFocusPlugin />}
            {ENABLE_TAB_INDENTATION_PLUGIN && <TabIndentationPlugin maxIndent={7} />}
            {ENABLE_COLLAPSIBLE_PLUGIN && <CollapsiblePlugin />}
            {ENABLE_PAGE_BREAK_PLUGIN && <PageBreakPlugin />}
            {ENABLE_LAYOUT_PLUGIN && <LayoutPlugin />}
            {floatingAnchorElem && !isSmallWidthViewport && (
              <>
                {ENABLE_DRAGGABLE_BLOCK_PLUGIN && (
                  <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
                )}
                {ENABLE_CODE_ACTION_MENU_PLUGIN && (
                  <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
                )}
                {ENABLE_FLOATING_LINK_EDITOR_PLUGIN && (
                  <FloatingLinkEditorPlugin
                    anchorElem={floatingAnchorElem}
                    isLinkEditMode={isLinkEditMode}
                    setIsLinkEditMode={setIsLinkEditMode}
                    fieldName={props.fieldName}
                  />
                )}
                {ENABLE_TABLE_CELL_ACTION_MENU_PLUGIN && (
                  <TableCellActionMenuPlugin anchorElem={floatingAnchorElem} cellMerge={true} />
                )}
                {ENABLE_TABLE_HOVER_ACTIONS_PLUGIN && (
                  <TableHoverActionsPlugin anchorElem={floatingAnchorElem} />
                )}
                {ENABLE_FLOATING_TEXT_FORMAT_TOOLBAR_PLUGIN && (
                  <FloatingTextFormatToolbarPlugin
                    anchorElem={floatingAnchorElem}
                    setIsLinkEditMode={setIsLinkEditMode}
                  />
                )}
              </>
            )}
          </>
        ) : (
          <>
            <PlainTextPlugin
              contentEditable={<ContentEditable placeholder={placeholder} ref={props.ref} />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            {ENABLE_HISTORY_PLUGIN && <HistoryPlugin externalHistoryState={historyState} />}
          </>
        )}
        {(isCharLimit || isCharLimitUtf8) && (
          <CharacterLimitPlugin charset={isCharLimit ? 'UTF-16' : 'UTF-8'} maxLength={5} />
        )}
        {isAutocomplete && <AutocompletePlugin />}
        <div>{showTableOfContents && <TableOfContentsPlugin />}</div>
        {shouldUseLexicalContextMenu && <ContextMenuPlugin />}
        {shouldAllowHighlightingWithBrackets && <SpecialTextPlugin />}
        {ENABLE_ACTIONS_PLUGIN && (
          <ActionsPlugin
            isRichText={isRichText}
            shouldPreserveNewLinesInMarkdown={shouldPreserveNewLinesInMarkdown}
          />
        )}
      </div>
      {showTreeView && <TreeViewPlugin />}
      <StrapiOnChangePlugin onChange={onChange} expectedEditorState={props.expectedEditorState} />
      <StrapiImagePlugin />
    </>
  );
}
