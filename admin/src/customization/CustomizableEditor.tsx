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
import { useFeaturesConfig } from '../context/FeaturesContext';
import '../lexical/styles.css';
import './styles.css';

interface LexicalEditorProps {
  onChange: (editor: LexicalEditor, newValue: SerializedEditorState<SerializedLexicalNode>) => void;
  ref: React.ForwardedRef<HTMLDivElement>;
  fieldName: string;
  expectedEditorState?: SerializedEditorState<SerializedLexicalNode>;
}

export default function CustomizableEditor(props: LexicalEditorProps): JSX.Element {
  const features = useFeaturesConfig();
  const { formatMessage } = useIntl();
  const { historyState } = useSharedHistoryContext();

  const isRichText = features.richTextPlugin;
  const showTreeView = features.treeViewPlugin;
  const showTableOfContents = features.tableOfContentsPlugin;
  const shouldUseLexicalContextMenu = features.contextMenuPlugin;
  const shouldPreserveNewLinesInMarkdown = features.preserveNewLinesInMarkdown;
  const tableCellMerge = features.tableCellMerge;
  const tableCellBackgroundColor = features.tableCellBackgroundColor;
  const tableHorizontalScroll = features.tableHorizontalScroll;
  const shouldAllowHighlightingWithBrackets = features.allowHighlightingWithBrackets;
  const selectionAlwaysOnDisplay = features.selectionAlwaysOnDisplay;
  const isAutocomplete = features.autocompletePlugin;
  const isMaxLength = features.maxLengthPlugin;
  const isCharLimit = features.characterLimitPlugin;
  const isCharLimitUtf8 = features.characterLimitPlugin && features.charLimitUtf8;
  const hasLinkAttributes = features.linkAttributes;

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
    features.undo ||
    features.redo ||
    features.paragraph ||
    features.heading1 ||
    features.heading2 ||
    features.heading3 ||
    features.bulletList ||
    features.numberedList ||
    features.checkList ||
    features.quote ||
    features.codeBlock ||
    features.bold ||
    features.italic ||
    features.underline ||
    features.inlineCode ||
    features.lowercase ||
    features.uppercase ||
    features.capitalize ||
    features.strikethrough ||
    features.subscript ||
    features.superscript ||
    features.clearFormatting ||
    features.fontColor ||
    features.backgroundColor ||
    features.fontFamily ||
    features.fontSize ||
    features.increaseFontSize ||
    features.decreaseFontSize ||
    features.insertLink ||
    features.insertStrapiImage ||
    features.leftAlign ||
    features.centerAlign ||
    features.rightAlign ||
    features.justifyAlign ||
    features.startAlign ||
    features.endAlign ||
    features.indent ||
    features.outdent ||
    features.horizontalRule ||
    features.pageBreak ||
    features.insertImage ||
    features.insertInlineImage ||
    features.insertTable ||
    features.poll ||
    features.columnsLayout ||
    features.equation ||
    features.stickyNote ||
    features.collapsibleContainer ||
    features.twitterEmbed ||
    features.youtubeEmbed ||
    features.figmaEmbed;

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
      {isRichText && features.shortcutsPlugin && (
        <CustomizableShortcutsPlugin editor={activeEditor} setIsLinkEditMode={setIsLinkEditMode} />
      )}
      <div
        className={`customizable-editor-container editor-container ${showTreeView ? 'tree-view' : ''} ${
          !isRichText ? 'plain-text' : ''
        }`}
      >
        {isMaxLength && <MaxLengthPlugin maxLength={features.maxLength || 30} />}
        {features.dragDropPastePlugin && <DragDropPaste />}
        {features.autoFocusPlugin && <AutoFocusPlugin />}
        {selectionAlwaysOnDisplay && <SelectionAlwaysOnDisplay />}
        {features.clearEditorPlugin && <ClearEditorPlugin />}
        {features.componentPickerPlugin && <ComponentPickerPlugin />}
        {features.emojiPickerPlugin && <EmojiPickerPlugin />}
        {features.autoEmbedPlugin && <AutoEmbedPlugin />}
        {features.mentionsPlugin && <MentionsPlugin />}
        {features.emojisPlugin && <EmojisPlugin />}
        {features.hashtagPlugin && <HashtagPlugin />}
        {features.keywordsPlugin && <KeywordsPlugin />}
        {features.autoLinkPlugin && <AutoLinkPlugin />}
        {isRichText ? (
          <>
            {features.historyPlugin && <HistoryPlugin externalHistoryState={historyState} />}
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
            {features.markdownShortcutPlugin && <MarkdownShortcutPlugin />}
            {features.codeHighlightPlugin && <CodeHighlightPlugin />}
            {features.listPlugin && <ListPlugin />}
            {features.checkListPlugin && <CheckListPlugin />}
            {features.tablePlugin && (
              <TablePlugin
                hasCellMerge={tableCellMerge}
                hasCellBackgroundColor={tableCellBackgroundColor}
                hasHorizontalScroll={tableHorizontalScroll}
              />
            )}
            {features.tableCellResizer && <TableCellResizer />}
            {features.imagesPlugin && <ImagesPlugin />}
            {features.inlineImagePlugin && <InlineImagePlugin />}
            {features.linkPlugin && <LinkPlugin hasLinkAttributes={hasLinkAttributes} />}
            {features.pollPlugin && <PollPlugin />}
            {features.twitterPlugin && <TwitterPlugin />}
            {features.youtubePlugin && <YouTubePlugin />}
            {features.figmaPlugin && <FigmaPlugin />}
            {features.clickableLinkPlugin && <ClickableLinkPlugin disabled={isEditable} />}
            {features.horizontalRulePlugin && <HorizontalRulePlugin />}
            {features.equationsPlugin && <EquationsPlugin />}
            {features.tabFocusPlugin && <TabFocusPlugin />}
            {features.tabIndentationPlugin && <TabIndentationPlugin maxIndent={7} />}
            {features.collapsiblePlugin && <CollapsiblePlugin />}
            {features.pageBreakPlugin && <PageBreakPlugin />}
            {features.layoutPlugin && <LayoutPlugin />}
            {floatingAnchorElem && !isSmallWidthViewport && (
              <>
                {features.draggableBlockPlugin && (
                  <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
                )}
                {features.codeActionMenuPlugin && (
                  <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
                )}
                {features.floatingLinkEditorPlugin && (
                  <FloatingLinkEditorPlugin
                    anchorElem={floatingAnchorElem}
                    isLinkEditMode={isLinkEditMode}
                    setIsLinkEditMode={setIsLinkEditMode}
                    fieldName={props.fieldName}
                  />
                )}
                {features.tableCellActionMenuPlugin && (
                  <TableCellActionMenuPlugin anchorElem={floatingAnchorElem} cellMerge={true} />
                )}
                {features.tableHoverActionsPlugin && (
                  <TableHoverActionsPlugin anchorElem={floatingAnchorElem} />
                )}
                {features.floatingTextFormatToolbarPlugin && (
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
            {features.historyPlugin && <HistoryPlugin externalHistoryState={historyState} />}
          </>
        )}
        {(isCharLimit || isCharLimitUtf8) && (
          <CharacterLimitPlugin
            charset={isCharLimit ? 'UTF-16' : 'UTF-8'}
            maxLength={features.charLimit || 5}
          />
        )}
        {isAutocomplete && <AutocompletePlugin />}
        <div>{showTableOfContents && <TableOfContentsPlugin />}</div>
        {shouldUseLexicalContextMenu && <ContextMenuPlugin />}
        {shouldAllowHighlightingWithBrackets && <SpecialTextPlugin />}
        {features.actionsPlugin && (
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
