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

import { EditorState, LexicalEditor, SerializedEditorState, SerializedLexicalNode } from 'lexical';
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
import { useFeatureFlags } from './FeatureContext';
import '../lexical/styles.css';
import './styles.css';

interface LexicalEditorProps {
  onChange: (editor: LexicalEditor, newValue: SerializedEditorState<SerializedLexicalNode>) => void;
  ref: React.ForwardedRef<HTMLDivElement>;
  fieldName: string;
  expectedEditorState?: SerializedEditorState<SerializedLexicalNode>;
}

export default function CustomizableEditor(props: LexicalEditorProps): JSX.Element {
  const { formatMessage } = useIntl();
  const { historyState } = useSharedHistoryContext();
  const featureFlags = useFeatureFlags();

  // Destructure feature flags for easier use
  const {
    undo,
    redo,
    paragraph,
    heading1,
    heading2,
    heading3,
    bulletList,
    numberedList,
    checkList,
    quote,
    codeBlock,
    bold,
    italic,
    underline,
    inlineCode,
    lowercase,
    uppercase,
    capitalize,
    strikethrough,
    subscript,
    superscript,
    clearFormatting,
    fontColor,
    backgroundColor,
    fontFamily,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    insertLink,
    insertStrapiImage,
    leftAlign,
    centerAlign,
    rightAlign,
    justifyAlign,
    startAlign,
    endAlign,
    indent,
    outdent,
    horizontalRule,
    pageBreak,
    insertImage,
    insertInlineImage,
    insertTable,
    poll,
    columnsLayout,
    equation,
    stickyNote,
    collapsibleContainer,
    twitterEmbed,
    youtubeEmbed,
    figmaEmbed,
    richTextPlugin,
    treeViewPlugin,
    treeView,
    tableOfContentsPlugin,
    tableOfContents,
    contextMenuPlugin,
    lexicalContextMenu,
    preserveNewLinesInMarkdown,
    tableCellMerge,
    tableCellBackgroundColor,
    tableHorizontalScroll,
    specialTextPlugin,
    allowHighlightingWithBrackets,
    selectionAlwaysOnDisplay,
    autocompletePlugin,
    autocomplete,
    maxLengthPlugin,
    maxLength,
    characterLimitPlugin,
    charLimit,
    charLimitUtf8,
    linkAttributes,
    historyPlugin,
    dragDropPastePlugin,
    autoFocusPlugin,
    clearEditorPlugin,
    componentPickerPlugin,
    emojiPickerPlugin,
    autoEmbedPlugin,
    mentionsPlugin,
    emojisPlugin,
    hashtagPlugin,
    keywordsPlugin,
    autoLinkPlugin,
    markdownShortcutPlugin,
    codeHighlightPlugin,
    listPlugin,
    checkListPlugin,
    tablePlugin,
    tableCellResizer,
    imagesPlugin,
    inlineImagePlugin,
    linkPlugin,
    pollPlugin,
    twitterPlugin,
    youtubePlugin,
    figmaPlugin,
    clickableLinkPlugin,
    horizontalRulePlugin,
    equationsPlugin,
    tabFocusPlugin,
    tabIndentationPlugin,
    collapsiblePlugin,
    pageBreakPlugin,
    layoutPlugin,
    draggableBlockPlugin,
    codeActionMenuPlugin,
    floatingLinkEditorPlugin,
    linksEnabled,
    tableCellActionMenuPlugin,
    tableHoverActionsPlugin,
    floatingTextFormatToolbarPlugin,
    actionsPlugin,
    shortcutsPlugin,
  } = featureFlags;

  const isRichText = richTextPlugin;
  const showTreeView = treeViewPlugin || treeView;
  const showTableOfContents = tableOfContentsPlugin || tableOfContents;
  const shouldUseLexicalContextMenu = contextMenuPlugin || lexicalContextMenu;
  const shouldPreserveNewLinesInMarkdown = preserveNewLinesInMarkdown;
  const shouldAllowHighlightingWithBrackets = specialTextPlugin || allowHighlightingWithBrackets;
  const isSelectionAlwaysOnDisplay = selectionAlwaysOnDisplay;
  const isAutocomplete = autocompletePlugin || autocomplete;
  const isMaxLength = maxLengthPlugin || maxLength;
  const isCharLimit = characterLimitPlugin || charLimit;
  const isCharLimitUtf8 = characterLimitPlugin || charLimitUtf8;
  const hasLinkAttributes = linkAttributes;

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
    props.onChange(editor, editorStateJSON);
  }

  const hasAnyToolbarFeature =
    undo ||
    redo ||
    paragraph ||
    heading1 ||
    heading2 ||
    heading3 ||
    bulletList ||
    numberedList ||
    checkList ||
    quote ||
    codeBlock ||
    bold ||
    italic ||
    underline ||
    inlineCode ||
    lowercase ||
    uppercase ||
    capitalize ||
    strikethrough ||
    subscript ||
    superscript ||
    clearFormatting ||
    fontColor ||
    backgroundColor ||
    fontFamily ||
    fontSize ||
    increaseFontSize ||
    decreaseFontSize ||
    insertLink ||
    insertStrapiImage ||
    leftAlign ||
    centerAlign ||
    rightAlign ||
    justifyAlign ||
    startAlign ||
    endAlign ||
    indent ||
    outdent ||
    horizontalRule ||
    pageBreak ||
    insertImage ||
    insertInlineImage ||
    insertTable ||
    poll ||
    columnsLayout ||
    equation ||
    stickyNote ||
    collapsibleContainer ||
    twitterEmbed ||
    youtubeEmbed ||
    figmaEmbed;

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
      {isRichText && shortcutsPlugin && (
        <CustomizableShortcutsPlugin editor={activeEditor} setIsLinkEditMode={setIsLinkEditMode} />
      )}
      <div
        className={`customizable-editor-container editor-container ${showTreeView ? 'tree-view' : ''} ${
          !isRichText ? 'plain-text' : ''
        }`}
      >
        {isMaxLength && <MaxLengthPlugin maxLength={30} />}
        {dragDropPastePlugin && <DragDropPaste />}
        {autoFocusPlugin && <AutoFocusPlugin />}
        {isSelectionAlwaysOnDisplay && <SelectionAlwaysOnDisplay />}
        {clearEditorPlugin && <ClearEditorPlugin />}
        {componentPickerPlugin && <ComponentPickerPlugin />}
        {emojiPickerPlugin && <EmojiPickerPlugin />}
        {autoEmbedPlugin && <AutoEmbedPlugin />}
        {mentionsPlugin && <MentionsPlugin />}
        {emojisPlugin && <EmojisPlugin />}
        {hashtagPlugin && <HashtagPlugin />}
        {keywordsPlugin && <KeywordsPlugin />}
        {autoLinkPlugin && <AutoLinkPlugin />}
        {isRichText ? (
          <>
            {historyPlugin && <HistoryPlugin externalHistoryState={historyState} />}
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
            {markdownShortcutPlugin && <MarkdownShortcutPlugin />}
            {codeHighlightPlugin && <CodeHighlightPlugin />}
            {listPlugin && <ListPlugin />}
            {checkListPlugin && <CheckListPlugin />}
            {tablePlugin && (
              <TablePlugin
                hasCellMerge={tableCellMerge}
                hasCellBackgroundColor={tableCellBackgroundColor}
                hasHorizontalScroll={tableHorizontalScroll}
              />
            )}
            {tableCellResizer && <TableCellResizer />}
            {imagesPlugin && <ImagesPlugin />}
            {inlineImagePlugin && <InlineImagePlugin />}
            {linkPlugin && <LinkPlugin hasLinkAttributes={hasLinkAttributes} />}
            {pollPlugin && <PollPlugin />}
            {twitterPlugin && <TwitterPlugin />}
            {youtubePlugin && <YouTubePlugin />}
            {figmaPlugin && <FigmaPlugin />}
            {clickableLinkPlugin && <ClickableLinkPlugin disabled={isEditable} />}
            {horizontalRulePlugin && <HorizontalRulePlugin />}
            {equationsPlugin && <EquationsPlugin />}
            {tabFocusPlugin && <TabFocusPlugin />}
            {tabIndentationPlugin && <TabIndentationPlugin maxIndent={7} />}
            {collapsiblePlugin && <CollapsiblePlugin />}
            {pageBreakPlugin && <PageBreakPlugin />}
            {layoutPlugin && <LayoutPlugin />}
            {floatingAnchorElem && !isSmallWidthViewport && (
              <>
                {draggableBlockPlugin && <DraggableBlockPlugin anchorElem={floatingAnchorElem} />}
                {codeActionMenuPlugin && <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />}
                {floatingLinkEditorPlugin && linksEnabled && (
                  <FloatingLinkEditorPlugin
                    anchorElem={floatingAnchorElem}
                    isLinkEditMode={isLinkEditMode}
                    setIsLinkEditMode={setIsLinkEditMode}
                    fieldName={props.fieldName}
                  />
                )}
                {tableCellActionMenuPlugin && (
                  <TableCellActionMenuPlugin anchorElem={floatingAnchorElem} cellMerge={true} />
                )}
                {tableHoverActionsPlugin && (
                  <TableHoverActionsPlugin anchorElem={floatingAnchorElem} />
                )}
                {floatingTextFormatToolbarPlugin && (
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
            {historyPlugin && <HistoryPlugin externalHistoryState={historyState} />}
          </>
        )}
        {(isCharLimit || isCharLimitUtf8) && (
          <CharacterLimitPlugin charset={isCharLimit ? 'UTF-16' : 'UTF-8'} maxLength={5} />
        )}
        {isAutocomplete && <AutocompletePlugin />}
        <div>{showTableOfContents && <TableOfContentsPlugin />}</div>
        {shouldUseLexicalContextMenu && <ContextMenuPlugin />}
        {shouldAllowHighlightingWithBrackets && <SpecialTextPlugin />}
        {actionsPlugin && (
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
