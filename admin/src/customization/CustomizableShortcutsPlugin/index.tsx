import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { HeadingTagType } from '@lexical/rich-text';
import { mergeRegister } from '@lexical/utils';
import {
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_NORMAL,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  KEY_MODIFIER_COMMAND,
  LexicalEditor,
  OUTDENT_CONTENT_COMMAND,
  TextFormatType,
} from 'lexical';
import { Dispatch, useEffect } from 'react';

import { useToolbarState } from '../../lexical/context/ToolbarContext';
import { sanitizeUrl } from '../../lexical/utils/url';
import {
  clearFormatting,
  formatBulletList,
  formatCheckList,
  formatCode,
  formatHeading,
  formatNumberedList,
  formatParagraph,
  formatQuote,
  updateFontSize,
  UpdateFontSizeType,
} from '../../lexical/plugins/ToolbarPlugin/utils';
import {
  isCapitalize,
  isCenterAlign,
  isClearFormatting,
  isDecreaseFontSize,
  isFormatBulletList,
  isFormatCheckList,
  isFormatCode,
  isFormatHeading,
  isFormatNumberedList,
  isFormatParagraph,
  isFormatQuote,
  isIncreaseFontSize,
  isIndent,
  isInsertCodeBlock,
  isInsertLink,
  isJustifyAlign,
  isLeftAlign,
  isLowercase,
  isOutdent,
  isRightAlign,
  isStrikeThrough,
  isSubscript,
  isSuperscript,
  isUppercase,
} from '../../lexical/plugins/ShortcutsPlugin/shortcuts';
import { useFeatureFlags } from '../FeatureContext';

export default function CustomizableShortcutsPlugin({
  editor,
  setIsLinkEditMode,
}: {
  editor: LexicalEditor;
  setIsLinkEditMode: Dispatch<boolean>;
}): null {
  const { toolbarState } = useToolbarState();
  const {
    bold,
    italic,
    underline,
    paragraph,
    heading1,
    heading2,
    heading3,
    bulletList,
    numberedList,
    checkList,
    codeBlock,
    quote,
    strikethrough,
    lowercase,
    uppercase,
    capitalize,
    indent,
    outdent,
    centerAlign,
    leftAlign,
    rightAlign,
    justifyAlign,
    subscript,
    superscript,
    inlineCode,
    increaseFontSize,
    decreaseFontSize,
    clearFormatting: clearFormattingEnabled,
    insertLink,
  } = useFeatureFlags();

  useEffect(() => {
    const keyboardShortcutsHandler = (payload: KeyboardEvent) => {
      const event: KeyboardEvent = payload;

      if (paragraph && isFormatParagraph(event)) {
        event.preventDefault();
        formatParagraph(editor);
      } else if ((heading1 || heading2 || heading3) && isFormatHeading(event)) {
        event.preventDefault();
        const { code } = event;
        const headingSize = `h${code[code.length - 1]}` as HeadingTagType;
        // Only process if the heading is enabled
        if (
          (headingSize === 'h1' && heading1) ||
          (headingSize === 'h2' && heading2) ||
          (headingSize === 'h3' && heading3)
        ) {
          formatHeading(editor, toolbarState.blockType, headingSize);
        }
      } else if (bulletList && isFormatBulletList(event)) {
        event.preventDefault();
        formatBulletList(editor, toolbarState.blockType);
      } else if (numberedList && isFormatNumberedList(event)) {
        event.preventDefault();
        formatNumberedList(editor, toolbarState.blockType);
      } else if (checkList && isFormatCheckList(event)) {
        event.preventDefault();
        formatCheckList(editor, toolbarState.blockType);
      } else if (codeBlock && isFormatCode(event)) {
        event.preventDefault();
        formatCode(editor, toolbarState.blockType);
      } else if (quote && isFormatQuote(event)) {
        event.preventDefault();
        formatQuote(editor, toolbarState.blockType);
      } else if (strikethrough && isStrikeThrough(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
      } else if (lowercase && isLowercase(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'lowercase');
      } else if (uppercase && isUppercase(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'uppercase');
      } else if (capitalize && isCapitalize(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'capitalize');
      } else if (indent && isIndent(event)) {
        event.preventDefault();
        editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
      } else if (outdent && isOutdent(event)) {
        event.preventDefault();
        editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
      } else if (centerAlign && isCenterAlign(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
      } else if (leftAlign && isLeftAlign(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
      } else if (rightAlign && isRightAlign(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
      } else if (justifyAlign && isJustifyAlign(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
      } else if (subscript && isSubscript(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript');
      } else if (superscript && isSuperscript(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript');
      } else if (inlineCode && isInsertCodeBlock(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
      } else if (increaseFontSize && isIncreaseFontSize(event)) {
        event.preventDefault();
        updateFontSize(editor, UpdateFontSizeType.increment, toolbarState.fontSizeInputValue);
      } else if (decreaseFontSize && isDecreaseFontSize(event)) {
        event.preventDefault();
        updateFontSize(editor, UpdateFontSizeType.decrement, toolbarState.fontSizeInputValue);
      } else if (clearFormattingEnabled && isClearFormatting(event)) {
        event.preventDefault();
        clearFormatting(editor);
      } else if (insertLink && isInsertLink(event)) {
        event.preventDefault();
        const url = toolbarState.isLink ? null : sanitizeUrl('https://');
        setIsLinkEditMode(!toolbarState.isLink);

        editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
      }

      return false;
    };

    return mergeRegister(
      editor.registerCommand(
        KEY_MODIFIER_COMMAND,
        keyboardShortcutsHandler,
        COMMAND_PRIORITY_NORMAL
      ),
      // Block disabled native text format shortcuts (Ctrl+B, Ctrl+I, Ctrl+U)
      // registered by Lexical's RichTextPlugin
      editor.registerCommand(
        FORMAT_TEXT_COMMAND,
        (format: TextFormatType) => {
          if (format === 'bold' && !bold) return true;
          if (format === 'italic' && !italic) return true;
          if (format === 'underline' && !underline) return true;
          return false;
        },
        COMMAND_PRIORITY_HIGH
      )
    );
  }, [
    editor,
    toolbarState.isLink,
    toolbarState.blockType,
    toolbarState.fontSizeInputValue,
    setIsLinkEditMode,
    bold,
    italic,
    underline,
  ]);

  return null;
}
