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
import { useFeaturesConfig } from '../../context/FeaturesContext';

export default function CustomizableShortcutsPlugin({
  editor,
  setIsLinkEditMode,
}: {
  editor: LexicalEditor;
  setIsLinkEditMode: Dispatch<boolean>;
}): null {
  const features = useFeaturesConfig();
  const { toolbarState } = useToolbarState();

  useEffect(() => {
    const keyboardShortcutsHandler = (payload: KeyboardEvent) => {
      const event: KeyboardEvent = payload;

      if (features.paragraph && isFormatParagraph(event)) {
        event.preventDefault();
        formatParagraph(editor);
      } else if (
        (features.heading1 || features.heading2 || features.heading3) &&
        isFormatHeading(event)
      ) {
        event.preventDefault();
        const { code } = event;
        const headingSize = `h${code[code.length - 1]}` as HeadingTagType;
        // Only process if the heading is enabled
        if (
          (headingSize === 'h1' && features.heading1) ||
          (headingSize === 'h2' && features.heading2) ||
          (headingSize === 'h3' && features.heading3)
        ) {
          formatHeading(editor, toolbarState.blockType, headingSize);
        }
      } else if (features.bulletList && isFormatBulletList(event)) {
        event.preventDefault();
        formatBulletList(editor, toolbarState.blockType);
      } else if (features.numberedList && isFormatNumberedList(event)) {
        event.preventDefault();
        formatNumberedList(editor, toolbarState.blockType);
      } else if (features.checkList && isFormatCheckList(event)) {
        event.preventDefault();
        formatCheckList(editor, toolbarState.blockType);
      } else if (features.codeBlock && isFormatCode(event)) {
        event.preventDefault();
        formatCode(editor, toolbarState.blockType);
      } else if (features.quote && isFormatQuote(event)) {
        event.preventDefault();
        formatQuote(editor, toolbarState.blockType);
      } else if (features.strikethrough && isStrikeThrough(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
      } else if (features.lowercase && isLowercase(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'lowercase');
      } else if (features.uppercase && isUppercase(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'uppercase');
      } else if (features.capitalize && isCapitalize(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'capitalize');
      } else if (features.indent && isIndent(event)) {
        event.preventDefault();
        editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
      } else if (features.outdent && isOutdent(event)) {
        event.preventDefault();
        editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
      } else if (features.centerAlign && isCenterAlign(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
      } else if (features.leftAlign && isLeftAlign(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
      } else if (features.rightAlign && isRightAlign(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
      } else if (features.justifyAlign && isJustifyAlign(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
      } else if (features.subscript && isSubscript(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript');
      } else if (features.superscript && isSuperscript(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript');
      } else if (features.inlineCode && isInsertCodeBlock(event)) {
        event.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
      } else if (features.increaseFontSize && isIncreaseFontSize(event)) {
        event.preventDefault();
        updateFontSize(editor, UpdateFontSizeType.increment, toolbarState.fontSizeInputValue);
      } else if (features.decreaseFontSize && isDecreaseFontSize(event)) {
        event.preventDefault();
        updateFontSize(editor, UpdateFontSizeType.decrement, toolbarState.fontSizeInputValue);
      } else if (features.clearFormatting && isClearFormatting(event)) {
        event.preventDefault();
        clearFormatting(editor);
      } else if (features.insertLink && isInsertLink(event)) {
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
