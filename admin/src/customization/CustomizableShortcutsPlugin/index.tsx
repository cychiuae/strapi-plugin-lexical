import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { HeadingTagType } from '@lexical/rich-text';
import {
  COMMAND_PRIORITY_NORMAL,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  KEY_MODIFIER_COMMAND,
  LexicalEditor,
  OUTDENT_CONTENT_COMMAND,
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
import {
  ENABLE_BULLET_LIST,
  ENABLE_CAPITALIZE,
  ENABLE_CENTER_ALIGN,
  ENABLE_CHECK_LIST,
  ENABLE_CLEAR_FORMATTING,
  ENABLE_CODE_BLOCK,
  ENABLE_DECREASE_FONT_SIZE,
  ENABLE_HEADING_1,
  ENABLE_HEADING_2,
  ENABLE_HEADING_3,
  ENABLE_INCREASE_FONT_SIZE,
  ENABLE_INDENT,
  ENABLE_INSERT_LINK,
  ENABLE_INLINE_CODE,
  ENABLE_ITALIC,
  ENABLE_JUSTIFY_ALIGN,
  ENABLE_LEFT_ALIGN,
  ENABLE_LOWERCASE,
  ENABLE_NUMBERED_LIST,
  ENABLE_OUTDENT,
  ENABLE_PARAGRAPH,
  ENABLE_QUOTE,
  ENABLE_RIGHT_ALIGN,
  ENABLE_STRIKETHROUGH,
  ENABLE_SUBSCRIPT,
  ENABLE_SUPERSCRIPT,
  ENABLE_UPPERCASE,
} from '../features';

export default function CustomizableShortcutsPlugin({
  editor,
  setIsLinkEditMode,
}: {
  editor: LexicalEditor;
  setIsLinkEditMode: Dispatch<boolean>;
}): null {
  const { toolbarState } = useToolbarState();

  useEffect(() => {
    const keyboardShortcutsHandler = (payload: KeyboardEvent) => {
      const event: KeyboardEvent = payload;

      if (ENABLE_PARAGRAPH && isFormatParagraph(event)) {
        event.preventDefault();
        formatParagraph(editor);
      } else if (
        (ENABLE_HEADING_1 || ENABLE_HEADING_2 || ENABLE_HEADING_3) &&
        isFormatHeading(event)
      ) {
        event.preventDefault();
        const { code } = event;
        const headingSize = `h${code[code.length - 1]}` as HeadingTagType;
        // Only process if the heading is enabled
        if (
          (headingSize === 'h1' && ENABLE_HEADING_1) ||
          (headingSize === 'h2' && ENABLE_HEADING_2) ||
          (headingSize === 'h3' && ENABLE_HEADING_3)
        ) {
          formatHeading(editor, toolbarState.blockType, headingSize);
        }
      } else if (ENABLE_BULLET_LIST && isFormatBulletList(event)) {
        event.preventDefault();
        formatBulletList(editor, toolbarState.blockType);
      } else if (ENABLE_NUMBERED_LIST && isFormatNumberedList(event)) {
        event.preventDefault();
        formatNumberedList(editor, toolbarState.blockType);
      } else if (ENABLE_CHECK_LIST && isFormatCheckList(event)) {
        event.preventDefault();
        formatCheckList(editor, toolbarState.blockType);
      } else if (ENABLE_CODE_BLOCK && isFormatCode(event)) {
        event.preventDefault();
        formatCode(editor, toolbarState.blockType);
      } else if (ENABLE_QUOTE && isFormatQuote(event)) {
        event.preventDefault();
        formatQuote(editor, toolbarState.blockType);
      } else if (ENABLE_STRIKETHROUGH && isStrikeThrough(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
      } else if (ENABLE_LOWERCASE && isLowercase(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'lowercase');
      } else if (ENABLE_UPPERCASE && isUppercase(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'uppercase');
      } else if (ENABLE_CAPITALIZE && isCapitalize(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'capitalize');
      } else if (ENABLE_INDENT && isIndent(event)) {
        event.preventDefault();
        editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
      } else if (ENABLE_OUTDENT && isOutdent(event)) {
        event.preventDefault();
        editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
      } else if (ENABLE_CENTER_ALIGN && isCenterAlign(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
      } else if (ENABLE_LEFT_ALIGN && isLeftAlign(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
      } else if (ENABLE_RIGHT_ALIGN && isRightAlign(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
      } else if (ENABLE_JUSTIFY_ALIGN && isJustifyAlign(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
      } else if (ENABLE_SUBSCRIPT && isSubscript(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript');
      } else if (ENABLE_SUPERSCRIPT && isSuperscript(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript');
      } else if (ENABLE_INLINE_CODE && isInsertCodeBlock(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
      } else if (ENABLE_INCREASE_FONT_SIZE && isIncreaseFontSize(event)) {
        event.preventDefault();
        updateFontSize(editor, UpdateFontSizeType.increment, toolbarState.fontSizeInputValue);
      } else if (ENABLE_DECREASE_FONT_SIZE && isDecreaseFontSize(event)) {
        event.preventDefault();
        updateFontSize(editor, UpdateFontSizeType.decrement, toolbarState.fontSizeInputValue);
      } else if (ENABLE_CLEAR_FORMATTING && isClearFormatting(event)) {
        event.preventDefault();
        clearFormatting(editor);
      } else if (ENABLE_INSERT_LINK && isInsertLink(event)) {
        event.preventDefault();
        const url = toolbarState.isLink ? null : sanitizeUrl('https://');
        setIsLinkEditMode(!toolbarState.isLink);

        editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
      }

      return false;
    };

    return editor.registerCommand(
      KEY_MODIFIER_COMMAND,
      keyboardShortcutsHandler,
      COMMAND_PRIORITY_NORMAL
    );
  }, [
    editor,
    toolbarState.isLink,
    toolbarState.blockType,
    toolbarState.fontSizeInputValue,
    setIsLinkEditMode,
  ]);

  return null;
}
