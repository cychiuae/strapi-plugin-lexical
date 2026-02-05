import { StrapiApp } from '@strapi/strapi/admin';
import { Initializer } from './components/Initializer';
import { LexicalIcon } from './components/LexicalIcon';
import { PLUGIN_ID } from './pluginId';
import { DEFAULT_FEATURE_OPTIONS } from './customization/featureConfig';

export default {
  register(app: StrapiApp) {
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });

    // Using 'as any' to bypass strict typing for custom field options
    // Strapi's CustomFieldOptionName type doesn't support custom option names
    (app.customFields.register as (config: unknown) => void)({
      name: 'lexical',
      pluginId: 'lexical',
      type: 'json',
      intlLabel: {
        id: 'lexical.plugin.label',
        defaultMessage: 'Lexical Editor',
      },
      intlDescription: {
        id: 'lexical.plugin.description',
        defaultMessage: 'Lexical advanced WYSIWYG editor',
      },
      icon: LexicalIcon,
      components: {
        Input: async () =>
          import(/* webpackChunkName: "lexical-input-component" */ './components/Input'),
      },
      options: {
        advanced: [
          // Text Formatting Section
          {
            sectionTitle: {
              id: 'lexical.options.formatting.title',
              defaultMessage: 'Text Formatting',
            },
            items: [
              {
                name: 'options.enableBold',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.formatting.bold',
                  defaultMessage: 'Bold',
                },
                description: {
                  id: 'lexical.options.formatting.bold.description',
                  defaultMessage: 'Enable bold text formatting',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableBold,
              },
              {
                name: 'options.enableItalic',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.formatting.italic',
                  defaultMessage: 'Italic',
                },
                description: {
                  id: 'lexical.options.formatting.italic.description',
                  defaultMessage: 'Enable italic text formatting',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableItalic,
              },
              {
                name: 'options.enableUnderline',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.formatting.underline',
                  defaultMessage: 'Underline',
                },
                description: {
                  id: 'lexical.options.formatting.underline.description',
                  defaultMessage: 'Enable underline text formatting',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableUnderline,
              },
              {
                name: 'options.enableStrikethrough',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.formatting.strikethrough',
                  defaultMessage: 'Strikethrough',
                },
                description: {
                  id: 'lexical.options.formatting.strikethrough.description',
                  defaultMessage: 'Enable strikethrough text formatting',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableStrikethrough,
              },
              {
                name: 'options.enableSubscript',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.formatting.subscript',
                  defaultMessage: 'Subscript',
                },
                description: {
                  id: 'lexical.options.formatting.subscript.description',
                  defaultMessage: 'Enable subscript text formatting',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableSubscript,
              },
              {
                name: 'options.enableSuperscript',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.formatting.superscript',
                  defaultMessage: 'Superscript',
                },
                description: {
                  id: 'lexical.options.formatting.superscript.description',
                  defaultMessage: 'Enable superscript text formatting',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableSuperscript,
              },
              {
                name: 'options.enableInlineCode',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.formatting.inlineCode',
                  defaultMessage: 'Inline Code',
                },
                description: {
                  id: 'lexical.options.formatting.inlineCode.description',
                  defaultMessage: 'Enable inline code formatting',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableInlineCode,
              },
              {
                name: 'options.enableClearFormatting',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.formatting.clearFormatting',
                  defaultMessage: 'Clear Formatting',
                },
                description: {
                  id: 'lexical.options.formatting.clearFormatting.description',
                  defaultMessage: 'Enable clear formatting button',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableClearFormatting,
              },
            ],
          },
          // Text Transform Section
          {
            sectionTitle: {
              id: 'lexical.options.transform.title',
              defaultMessage: 'Text Transform',
            },
            items: [
              {
                name: 'options.enableLowercase',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.transform.lowercase',
                  defaultMessage: 'Lowercase',
                },
                description: {
                  id: 'lexical.options.transform.lowercase.description',
                  defaultMessage: 'Enable lowercase text transform',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableLowercase,
              },
              {
                name: 'options.enableUppercase',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.transform.uppercase',
                  defaultMessage: 'Uppercase',
                },
                description: {
                  id: 'lexical.options.transform.uppercase.description',
                  defaultMessage: 'Enable uppercase text transform',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableUppercase,
              },
              {
                name: 'options.enableCapitalize',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.transform.capitalize',
                  defaultMessage: 'Capitalize',
                },
                description: {
                  id: 'lexical.options.transform.capitalize.description',
                  defaultMessage: 'Enable capitalize text transform',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableCapitalize,
              },
            ],
          },
          // Block Types Section
          {
            sectionTitle: {
              id: 'lexical.options.blocks.title',
              defaultMessage: 'Block Types',
            },
            items: [
              {
                name: 'options.enableParagraph',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.blocks.paragraph',
                  defaultMessage: 'Paragraph',
                },
                description: {
                  id: 'lexical.options.blocks.paragraph.description',
                  defaultMessage: 'Enable paragraph block type',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableParagraph,
              },
              {
                name: 'options.enableHeading1',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.blocks.heading1',
                  defaultMessage: 'Heading 1',
                },
                description: {
                  id: 'lexical.options.blocks.heading1.description',
                  defaultMessage: 'Enable heading 1 block type',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableHeading1,
              },
              {
                name: 'options.enableHeading2',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.blocks.heading2',
                  defaultMessage: 'Heading 2',
                },
                description: {
                  id: 'lexical.options.blocks.heading2.description',
                  defaultMessage: 'Enable heading 2 block type',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableHeading2,
              },
              {
                name: 'options.enableHeading3',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.blocks.heading3',
                  defaultMessage: 'Heading 3',
                },
                description: {
                  id: 'lexical.options.blocks.heading3.description',
                  defaultMessage: 'Enable heading 3 block type',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableHeading3,
              },
              {
                name: 'options.enableBulletList',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.blocks.bulletList',
                  defaultMessage: 'Bullet List',
                },
                description: {
                  id: 'lexical.options.blocks.bulletList.description',
                  defaultMessage: 'Enable bullet list block type',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableBulletList,
              },
              {
                name: 'options.enableNumberedList',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.blocks.numberedList',
                  defaultMessage: 'Numbered List',
                },
                description: {
                  id: 'lexical.options.blocks.numberedList.description',
                  defaultMessage: 'Enable numbered list block type',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableNumberedList,
              },
              {
                name: 'options.enableCheckList',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.blocks.checkList',
                  defaultMessage: 'Check List',
                },
                description: {
                  id: 'lexical.options.blocks.checkList.description',
                  defaultMessage: 'Enable check list block type',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableCheckList,
              },
              {
                name: 'options.enableQuote',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.blocks.quote',
                  defaultMessage: 'Quote',
                },
                description: {
                  id: 'lexical.options.blocks.quote.description',
                  defaultMessage: 'Enable quote block type',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableQuote,
              },
              {
                name: 'options.enableCodeBlock',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.blocks.codeBlock',
                  defaultMessage: 'Code Block',
                },
                description: {
                  id: 'lexical.options.blocks.codeBlock.description',
                  defaultMessage: 'Enable code block type with syntax highlighting',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableCodeBlock,
              },
            ],
          },
          // Alignment Section
          {
            sectionTitle: {
              id: 'lexical.options.alignment.title',
              defaultMessage: 'Alignment',
            },
            items: [
              {
                name: 'options.enableLeftAlign',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.alignment.left',
                  defaultMessage: 'Left Align',
                },
                description: {
                  id: 'lexical.options.alignment.left.description',
                  defaultMessage: 'Enable left alignment',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableLeftAlign,
              },
              {
                name: 'options.enableCenterAlign',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.alignment.center',
                  defaultMessage: 'Center Align',
                },
                description: {
                  id: 'lexical.options.alignment.center.description',
                  defaultMessage: 'Enable center alignment',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableCenterAlign,
              },
              {
                name: 'options.enableRightAlign',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.alignment.right',
                  defaultMessage: 'Right Align',
                },
                description: {
                  id: 'lexical.options.alignment.right.description',
                  defaultMessage: 'Enable right alignment',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableRightAlign,
              },
              {
                name: 'options.enableJustifyAlign',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.alignment.justify',
                  defaultMessage: 'Justify Align',
                },
                description: {
                  id: 'lexical.options.alignment.justify.description',
                  defaultMessage: 'Enable justify alignment',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableJustifyAlign,
              },
              {
                name: 'options.enableStartAlign',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.alignment.start',
                  defaultMessage: 'Start Align',
                },
                description: {
                  id: 'lexical.options.alignment.start.description',
                  defaultMessage: 'Enable start alignment (RTL aware)',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableStartAlign,
              },
              {
                name: 'options.enableEndAlign',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.alignment.end',
                  defaultMessage: 'End Align',
                },
                description: {
                  id: 'lexical.options.alignment.end.description',
                  defaultMessage: 'Enable end alignment (RTL aware)',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableEndAlign,
              },
              {
                name: 'options.enableIndent',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.alignment.indent',
                  defaultMessage: 'Indent',
                },
                description: {
                  id: 'lexical.options.alignment.indent.description',
                  defaultMessage: 'Enable indent functionality',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableIndent,
              },
              {
                name: 'options.enableOutdent',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.alignment.outdent',
                  defaultMessage: 'Outdent',
                },
                description: {
                  id: 'lexical.options.alignment.outdent.description',
                  defaultMessage: 'Enable outdent functionality',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableOutdent,
              },
            ],
          },
          // Links Section
          {
            sectionTitle: {
              id: 'lexical.options.links.title',
              defaultMessage: 'Links',
            },
            items: [
              {
                name: 'options.enableInsertLink',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.links.insertLink',
                  defaultMessage: 'Insert Link',
                },
                description: {
                  id: 'lexical.options.links.insertLink.description',
                  defaultMessage: 'Enable link insertion',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableInsertLink,
              },
              {
                name: 'options.enableExternalLinks',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.links.externalLinks',
                  defaultMessage: 'External Links',
                },
                description: {
                  id: 'lexical.options.links.externalLinks.description',
                  defaultMessage: 'Enable external URL links',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableExternalLinks,
              },
              {
                name: 'options.enableInternalLinks',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.links.internalLinks',
                  defaultMessage: 'Internal Links',
                },
                description: {
                  id: 'lexical.options.links.internalLinks.description',
                  defaultMessage: 'Enable links to Strapi content',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableInternalLinks,
              },
              {
                name: 'options.enableLinkAttributes',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.links.linkAttributes',
                  defaultMessage: 'Link Attributes',
                },
                description: {
                  id: 'lexical.options.links.linkAttributes.description',
                  defaultMessage: 'Enable target="_blank" and rel attributes',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableLinkAttributes,
              },
            ],
          },
          // Media Section
          {
            sectionTitle: {
              id: 'lexical.options.media.title',
              defaultMessage: 'Media',
            },
            items: [
              {
                name: 'options.enableStrapiImage',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.media.strapiImage',
                  defaultMessage: 'Strapi Image',
                },
                description: {
                  id: 'lexical.options.media.strapiImage.description',
                  defaultMessage: 'Enable images from Strapi media library',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableStrapiImage,
              },
              {
                name: 'options.enableExternalImage',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.media.externalImage',
                  defaultMessage: 'External Image',
                },
                description: {
                  id: 'lexical.options.media.externalImage.description',
                  defaultMessage: 'Enable images from external URLs',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableExternalImage,
              },
              {
                name: 'options.enableInlineImage',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.media.inlineImage',
                  defaultMessage: 'Inline Image',
                },
                description: {
                  id: 'lexical.options.media.inlineImage.description',
                  defaultMessage: 'Enable inline images with text wrap',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableInlineImage,
              },
            ],
          },
          // Tables Section
          {
            sectionTitle: {
              id: 'lexical.options.tables.title',
              defaultMessage: 'Tables',
            },
            items: [
              {
                name: 'options.enableInsertTable',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.tables.insertTable',
                  defaultMessage: 'Insert Table',
                },
                description: {
                  id: 'lexical.options.tables.insertTable.description',
                  defaultMessage: 'Enable table insertion',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableInsertTable,
              },
              {
                name: 'options.enableTableCellMerge',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.tables.cellMerge',
                  defaultMessage: 'Cell Merge',
                },
                description: {
                  id: 'lexical.options.tables.cellMerge.description',
                  defaultMessage: 'Enable merging table cells (requires tables)',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableTableCellMerge,
              },
              {
                name: 'options.enableTableCellBackgroundColor',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.tables.cellBackground',
                  defaultMessage: 'Cell Background',
                },
                description: {
                  id: 'lexical.options.tables.cellBackground.description',
                  defaultMessage: 'Enable table cell background color (requires tables)',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableTableCellBackgroundColor,
              },
              {
                name: 'options.enableTableHorizontalScroll',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.tables.horizontalScroll',
                  defaultMessage: 'Horizontal Scroll',
                },
                description: {
                  id: 'lexical.options.tables.horizontalScroll.description',
                  defaultMessage: 'Enable horizontal scrolling for wide tables',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableTableHorizontalScroll,
              },
            ],
          },
          // Embeds Section
          {
            sectionTitle: {
              id: 'lexical.options.embeds.title',
              defaultMessage: 'Embeds',
            },
            items: [
              {
                name: 'options.enableYoutubeEmbed',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.embeds.youtube',
                  defaultMessage: 'YouTube',
                },
                description: {
                  id: 'lexical.options.embeds.youtube.description',
                  defaultMessage: 'Enable YouTube video embeds',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableYoutubeEmbed,
              },
              {
                name: 'options.enableTwitterEmbed',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.embeds.twitter',
                  defaultMessage: 'Twitter',
                },
                description: {
                  id: 'lexical.options.embeds.twitter.description',
                  defaultMessage: 'Enable Twitter/X post embeds',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableTwitterEmbed,
              },
              {
                name: 'options.enableFigmaEmbed',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.embeds.figma',
                  defaultMessage: 'Figma',
                },
                description: {
                  id: 'lexical.options.embeds.figma.description',
                  defaultMessage: 'Enable Figma design embeds',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableFigmaEmbed,
              },
              {
                name: 'options.enableAutoEmbed',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.embeds.autoEmbed',
                  defaultMessage: 'Auto Embed',
                },
                description: {
                  id: 'lexical.options.embeds.autoEmbed.description',
                  defaultMessage: 'Automatically detect and embed URLs',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableAutoEmbed,
              },
            ],
          },
          // Advanced Inserts Section
          {
            sectionTitle: {
              id: 'lexical.options.inserts.title',
              defaultMessage: 'Advanced Inserts',
            },
            items: [
              {
                name: 'options.enableHorizontalRule',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.inserts.horizontalRule',
                  defaultMessage: 'Horizontal Rule',
                },
                description: {
                  id: 'lexical.options.inserts.horizontalRule.description',
                  defaultMessage: 'Enable horizontal rule insertion',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableHorizontalRule,
              },
              {
                name: 'options.enablePageBreak',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.inserts.pageBreak',
                  defaultMessage: 'Page Break',
                },
                description: {
                  id: 'lexical.options.inserts.pageBreak.description',
                  defaultMessage: 'Enable page break insertion',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enablePageBreak,
              },
              {
                name: 'options.enableColumnsLayout',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.inserts.columns',
                  defaultMessage: 'Columns Layout',
                },
                description: {
                  id: 'lexical.options.inserts.columns.description',
                  defaultMessage: 'Enable multi-column layouts',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableColumnsLayout,
              },
              {
                name: 'options.enableCollapsible',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.inserts.collapsible',
                  defaultMessage: 'Collapsible',
                },
                description: {
                  id: 'lexical.options.inserts.collapsible.description',
                  defaultMessage: 'Enable collapsible content blocks',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableCollapsible,
              },
              {
                name: 'options.enableEquation',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.inserts.equation',
                  defaultMessage: 'Equation',
                },
                description: {
                  id: 'lexical.options.inserts.equation.description',
                  defaultMessage: 'Enable LaTeX math equations',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableEquation,
              },
              {
                name: 'options.enablePoll',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.inserts.poll',
                  defaultMessage: 'Poll',
                },
                description: {
                  id: 'lexical.options.inserts.poll.description',
                  defaultMessage: 'Enable interactive polls',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enablePoll,
              },
              {
                name: 'options.enableStickyNote',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.inserts.stickyNote',
                  defaultMessage: 'Sticky Note',
                },
                description: {
                  id: 'lexical.options.inserts.stickyNote.description',
                  defaultMessage: 'Enable sticky note blocks',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableStickyNote,
              },
            ],
          },
          // Colors & Fonts Section
          {
            sectionTitle: {
              id: 'lexical.options.fonts.title',
              defaultMessage: 'Colors & Fonts',
            },
            items: [
              {
                name: 'options.enableFontColor',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.fonts.fontColor',
                  defaultMessage: 'Font Color',
                },
                description: {
                  id: 'lexical.options.fonts.fontColor.description',
                  defaultMessage: 'Enable text color picker',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableFontColor,
              },
              {
                name: 'options.enableBackgroundColor',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.fonts.backgroundColor',
                  defaultMessage: 'Background Color',
                },
                description: {
                  id: 'lexical.options.fonts.backgroundColor.description',
                  defaultMessage: 'Enable text background color picker',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableBackgroundColor,
              },
              {
                name: 'options.enableFontFamily',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.fonts.fontFamily',
                  defaultMessage: 'Font Family',
                },
                description: {
                  id: 'lexical.options.fonts.fontFamily.description',
                  defaultMessage: 'Enable font family selection',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableFontFamily,
              },
              {
                name: 'options.enableFontSize',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.fonts.fontSize',
                  defaultMessage: 'Font Size',
                },
                description: {
                  id: 'lexical.options.fonts.fontSize.description',
                  defaultMessage: 'Enable font size selection',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableFontSize,
              },
              {
                name: 'options.enableIncreaseFontSize',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.fonts.increaseFontSize',
                  defaultMessage: 'Increase Font Size',
                },
                description: {
                  id: 'lexical.options.fonts.increaseFontSize.description',
                  defaultMessage: 'Enable increase font size button',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableIncreaseFontSize,
              },
              {
                name: 'options.enableDecreaseFontSize',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.fonts.decreaseFontSize',
                  defaultMessage: 'Decrease Font Size',
                },
                description: {
                  id: 'lexical.options.fonts.decreaseFontSize.description',
                  defaultMessage: 'Enable decrease font size button',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableDecreaseFontSize,
              },
            ],
          },
          // Plugins Section
          {
            sectionTitle: {
              id: 'lexical.options.plugins.title',
              defaultMessage: 'Plugins',
            },
            items: [
              {
                name: 'options.enableMarkdownShortcuts',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.plugins.markdownShortcuts',
                  defaultMessage: 'Markdown Shortcuts',
                },
                description: {
                  id: 'lexical.options.plugins.markdownShortcuts.description',
                  defaultMessage: 'Enable markdown input shortcuts',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableMarkdownShortcuts,
              },
              {
                name: 'options.enableFloatingToolbar',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.plugins.floatingToolbar',
                  defaultMessage: 'Floating Toolbar',
                },
                description: {
                  id: 'lexical.options.plugins.floatingToolbar.description',
                  defaultMessage: 'Show floating toolbar on text selection',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableFloatingToolbar,
              },
              {
                name: 'options.enableDraggableBlock',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.plugins.draggableBlock',
                  defaultMessage: 'Draggable Blocks',
                },
                description: {
                  id: 'lexical.options.plugins.draggableBlock.description',
                  defaultMessage: 'Enable drag and drop for blocks',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableDraggableBlock,
              },
              {
                name: 'options.enableEmojiPicker',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.plugins.emojiPicker',
                  defaultMessage: 'Emoji Picker',
                },
                description: {
                  id: 'lexical.options.plugins.emojiPicker.description',
                  defaultMessage: 'Enable emoji picker with : trigger',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableEmojiPicker,
              },
              {
                name: 'options.enableAutoLink',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.plugins.autoLink',
                  defaultMessage: 'Auto Link',
                },
                description: {
                  id: 'lexical.options.plugins.autoLink.description',
                  defaultMessage: 'Automatically convert URLs to links',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableAutoLink,
              },
              {
                name: 'options.enableMentions',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.plugins.mentions',
                  defaultMessage: 'Mentions',
                },
                description: {
                  id: 'lexical.options.plugins.mentions.description',
                  defaultMessage: 'Enable @ mentions',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableMentions,
              },
              {
                name: 'options.enableHashtag',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.plugins.hashtag',
                  defaultMessage: 'Hashtags',
                },
                description: {
                  id: 'lexical.options.plugins.hashtag.description',
                  defaultMessage: 'Enable # hashtags',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableHashtag,
              },
              {
                name: 'options.enableShortcuts',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.plugins.shortcuts',
                  defaultMessage: 'Keyboard Shortcuts',
                },
                description: {
                  id: 'lexical.options.plugins.shortcuts.description',
                  defaultMessage: 'Enable keyboard shortcuts',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableShortcuts,
              },
              {
                name: 'options.enableAutoFocus',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.plugins.autoFocus',
                  defaultMessage: 'Auto Focus',
                },
                description: {
                  id: 'lexical.options.plugins.autoFocus.description',
                  defaultMessage: 'Auto focus editor on load',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableAutoFocus,
              },
            ],
          },
          // History Section
          {
            sectionTitle: {
              id: 'lexical.options.history.title',
              defaultMessage: 'History',
            },
            items: [
              {
                name: 'options.enableUndo',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.history.undo',
                  defaultMessage: 'Undo',
                },
                description: {
                  id: 'lexical.options.history.undo.description',
                  defaultMessage: 'Enable undo button',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableUndo,
              },
              {
                name: 'options.enableRedo',
                type: 'checkbox',
                intlLabel: {
                  id: 'lexical.options.history.redo',
                  defaultMessage: 'Redo',
                },
                description: {
                  id: 'lexical.options.history.redo.description',
                  defaultMessage: 'Enable redo button',
                },
                defaultValue: DEFAULT_FEATURE_OPTIONS.enableRedo,
              },
            ],
          },
        ],
      },
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
