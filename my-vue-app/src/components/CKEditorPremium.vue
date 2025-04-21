<template>
  <div class="main-container">
    <div
      class="editor-container editor-container_document-editor editor-container_include-style editor-container_include-word-count editor-container_include-fullscreen"
      ref="editorContainerElement"
    >
      <div class="editor-container__menu-bar" ref="editorMenuBarElement"></div>
      <div class="editor-container__toolbar" ref="editorToolbarElement"></div>
      <div class="editor-container__editor-wrapper">
        <!-- <div class="editor-container__sidebar" ref="editorOutlineElement"></div> -->
        <div class="editor-container__editor">
          <div ref="editorElement">
            <ckeditor
              v-if="editor && config"
              :editor="editor"
              :config="config"
              @ready="onReady"
              v-model="computedValue"
            />
          </div>
        </div>
      </div>
      <div
        class="editor_container__word-count"
        ref="editorWordCountElement"
      ></div>
    </div>
  </div>
</template>

<script setup>
/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/?redirect=portal#installation/NoDgNARATAdArDADBSUSMXEcDMcBscALAIx45H6lFwCcOiA7NjiFBYrbYySLYkRQQApgDsUOMMBJgZiWQsQBdSPwCGtfABNaEJUA
 */

import {
  computed,
  ref,
  onMounted,
  watchEffect,
  useTemplateRef,
  watch,
} from 'vue';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';

import {
  DecoupledEditor,
  Plugin,
  ButtonView,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  CloudServices,
  Code,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Fullscreen,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageEditing,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  ImageUtils,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Markdown,
  PageBreak,
  Paragraph,
  PasteFromMarkdownExperimental,
  PasteFromOffice,
  PictureEditing,
  RemoveFormat,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  // Title,
  TodoList,
  Underline,
  WordCount,
} from 'ckeditor5';
import {
  getEmailInlineStylesTransformations,
  CaseChange,
  DocumentOutline,
  ExportInlineStyles,
  ExportPdf,
  ExportWord,
  FormatPainter,
  ImportWord,
  MultiLevelList,
  PasteFromOfficeEnhanced,
  SourceEditingEnhanced,
  TableOfContents,
  Template,
  // Uploadcare,
  // UploadcareImageEdit,
} from 'ckeditor5-premium-features';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

const LICENSE_KEY =
  'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDU5NzExOTksImp0aSI6IjFkNjliYWYwLTA5MTMtNDJiNS05NGU1LTgyOGMxNzYyM2I1NSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImJhYWM0YTU0In0.A1TEh-KkuhF_gcwgduOsHYkEfEqJPGOrRF-bSYXrb2SX-RaIU1E5iwDGxICJklIej9_0aZ_uwTKRwOKTa5d-Vg';

/**
 * Create a free account to test Uploadcare with a trial: https://app.uploadcare.com/accounts/signup/
 *
 * If you are interested in using Uploadcare on production, contact us: https://ckeditor.com/contact-sales/
 */
// const UPLOADCARE_PUBKEY = '<YOUR_UPLOADCARE_PUBKEY>';

const editorToolbar = useTemplateRef('editorToolbarElement');
const editorMenuBar = useTemplateRef('editorMenuBarElement');
const editorOutline = useTemplateRef('editorOutlineElement');
const editorWordCount = useTemplateRef('editorWordCountElement');

const isLayoutReady = ref(false);

const editor = DecoupledEditor;

const config = computed(() => {
  if (!isLayoutReady.value) {
    return null;
  }

  return {
    toolbar: {
      items: [
        'sourceEditingEnhanced',
        'formatPainter',
        'fullscreen',
        '|',
        'heading',
        'style',
        '|',
        'fontSize',
        'fontFamily',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        '|',
        'link',
        'insertImage',
        'insertTable',
        'highlight',
        'blockQuote',
        '|',
        'alignment',
        '|',
        'bulletedList',
        'numberedList',
        'multiLevelList',
        'todoList',
        'outdent',
        'indent',
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      Alignment,
      Autoformat,
      AutoImage,
      AutoLink,
      Autosave,
      BalloonToolbar,
      BlockQuote,
      Bold,
      CaseChange,
      CloudServices,
      Code,
      // DocumentOutline,
      Essentials,
      ExportInlineStyles,
      ExportPdf,
      ExportWord,
      FindAndReplace,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      FormatPainter,
      Fullscreen,
      GeneralHtmlSupport,
      Heading,
      Highlight,
      HorizontalLine,
      ImageBlock,
      ImageCaption,
      ImageEditing,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      ImageUtils,
      ImportWord,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Markdown,
      MultiLevelList,
      PageBreak,
      Paragraph,
      PasteFromMarkdownExperimental,
      PasteFromOffice,
      PasteFromOfficeEnhanced,
      PictureEditing,
      RemoveFormat,
      SourceEditingEnhanced,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Style,
      Subscript,
      Superscript,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableOfContents,
      TableProperties,
      TableToolbar,
      Template,
      TextPartLanguage,
      TextTransformation,
      // Title,
      TodoList,
      Underline,
      // Uploadcare,
      // UploadcareImageEdit,
      WordCount,
    ],
    balloonToolbar: [
      'bold',
      'italic',
      '|',
      'link',
      'insertImage',
      '|',
      'bulletedList',
      'numberedList',
    ],
    // documentOutline: {
    //   container: editorOutline.value,
    // },
    exportInlineStyles: {
      stylesheets: [
        /* This path should point to the content stylesheets on your assets server. */
        /* See: https://ckeditor.com/docs/ckeditor5/latest/features/export-with-inline-styles.html */
        './export-style.css',
        /* Export inline styles needs access to stylesheets that style the content. */
        'https://cdn.ckeditor.com/ckeditor5/45.0.0/ckeditor5.css',
        'https://cdn.ckeditor.com/ckeditor5-premium-features/45.0.0/ckeditor5-premium-features.css',
      ],
    },
    exportPdf: {
      stylesheets: [
        /* This path should point to the content stylesheets on your assets server. */
        /* See: https://ckeditor.com/docs/ckeditor5/latest/features/converters/export-pdf.html */
        './export-style.css',
        /* Export PDF needs access to stylesheets that style the content. */
        'https://cdn.ckeditor.com/ckeditor5/45.0.0/ckeditor5.css',
        'https://cdn.ckeditor.com/ckeditor5-premium-features/45.0.0/ckeditor5-premium-features.css',
      ],
      fileName: 'export-pdf-demo.pdf',
      converterOptions: {
        format: 'A4',
        margin_top: '20mm',
        margin_bottom: '20mm',
        margin_right: '12mm',
        margin_left: '12mm',
        page_orientation: 'portrait',
      },
    },
    exportWord: {
      stylesheets: [
        /* This path should point to the content stylesheets on your assets server. */
        /* See: https://ckeditor.com/docs/ckeditor5/latest/features/converters/export-word.html */
        './export-style.css',
        /* Export Word needs access to stylesheets that style the content. */
        'https://cdn.ckeditor.com/ckeditor5/45.0.0/ckeditor5.css',
        'https://cdn.ckeditor.com/ckeditor5-premium-features/45.0.0/ckeditor5-premium-features.css',
      ],
      fileName: 'export-word-demo.docx',
      converterOptions: {
        document: {
          orientation: 'portrait',
          size: 'A4',
          margins: {
            top: '20mm',
            bottom: '20mm',
            right: '12mm',
            left: '12mm',
          },
        },
      },
    },
    fontFamily: {
      supportAllValues: true,
    },
    fontSize: {
      options: [10, 12, 14, 'default', 18, 20, 22],
      supportAllValues: true,
    },
    fullscreen: {
      onEnterCallback: (container) =>
        container.classList.add(
          'editor-container',
          'editor-container_document-editor',
          'editor-container_include-outline',
          'editor-container_include-style',
          'editor-container_include-word-count',
          'editor-container_include-fullscreen',
          'main-container'
        ),
    },
    heading: {
      options: [
        {
          model: 'paragraph',
          title: 'Paragraph',
          class: 'ck-heading_paragraph',
        },
        {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1',
        },
        {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2',
        },
        {
          model: 'heading3',
          view: 'h3',
          title: 'Heading 3',
          class: 'ck-heading_heading3',
        },
        {
          model: 'heading4',
          view: 'h4',
          title: 'Heading 4',
          class: 'ck-heading_heading4',
        },
        {
          model: 'heading5',
          view: 'h5',
          title: 'Heading 5',
          class: 'ck-heading_heading5',
        },
        {
          model: 'heading6',
          view: 'h6',
          title: 'Heading 6',
          class: 'ck-heading_heading6',
        },
      ],
    },
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true,
        },
      ],
    },
    image: {
      toolbar: [
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'imageStyle:inline',
        'imageStyle:wrapText',
        'imageStyle:breakText',
        '|',
        'resizeImage',
        // '|',
        // 'uploadcareImageEdit',
      ],
    },
    initialData: '',
    licenseKey: LICENSE_KEY,
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file',
          },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    placeholder: 'Type or paste your content here!',
    style: {
      definitions: [
        {
          name: 'Article category',
          element: 'h3',
          classes: ['category'],
        },
        {
          name: 'Title',
          element: 'h2',
          classes: ['document-title'],
        },
        {
          name: 'Subtitle',
          element: 'h3',
          classes: ['document-subtitle'],
        },
        {
          name: 'Info box',
          element: 'p',
          classes: ['info-box'],
        },
        {
          name: 'CTA Link Primary',
          element: 'a',
          classes: ['button', 'button--green'],
        },
        {
          name: 'CTA Link Secondary',
          element: 'a',
          classes: ['button', 'button--black'],
        },
        {
          name: 'Marker',
          element: 'span',
          classes: ['marker'],
        },
        {
          name: 'Spoiler',
          element: 'span',
          classes: ['spoiler'],
        },
      ],
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableProperties',
        'tableCellProperties',
      ],
    },
    template: {
      definitions: [
        {
          title: 'Introduction',
          description: 'Simple introduction to an article',
          icon: '<svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <g id="icons/article-image-right">\n        <rect id="icon-bg" width="45" height="45" rx="2" fill="#A5E7EB"/>\n        <g id="page" filter="url(#filter0_d_1_507)">\n            <path d="M9 41H36V12L28 5H9V41Z" fill="white"/>\n            <path d="M35.25 12.3403V40.25H9.75V5.75H27.7182L35.25 12.3403Z" stroke="#333333" stroke-width="1.5"/>\n        </g>\n        <g id="image">\n            <path id="Rectangle 22" d="M21.5 23C21.5 22.1716 22.1716 21.5 23 21.5H31C31.8284 21.5 32.5 22.1716 32.5 23V29C32.5 29.8284 31.8284 30.5 31 30.5H23C22.1716 30.5 21.5 29.8284 21.5 29V23Z" fill="#B6E3FC" stroke="#333333"/>\n            <path id="Vector 1" d="M24.1184 27.8255C23.9404 27.7499 23.7347 27.7838 23.5904 27.9125L21.6673 29.6268C21.5124 29.7648 21.4589 29.9842 21.5328 30.178C21.6066 30.3719 21.7925 30.5 22 30.5H32C32.2761 30.5 32.5 30.2761 32.5 30V27.7143C32.5 27.5717 32.4391 27.4359 32.3327 27.3411L30.4096 25.6268C30.2125 25.451 29.9127 25.4589 29.7251 25.6448L26.5019 28.8372L24.1184 27.8255Z" fill="#44D500" stroke="#333333" stroke-linejoin="round"/>\n            <circle id="Ellipse 1" cx="26" cy="25" r="1.5" fill="#FFD12D" stroke="#333333"/>\n        </g>\n        <rect id="Rectangle 23" x="13" y="13" width="12" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 24" x="13" y="17" width="19" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 25" x="13" y="21" width="6" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 26" x="13" y="25" width="6" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 27" x="13" y="29" width="6" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 28" x="13" y="33" width="16" height="2" rx="1" fill="#B4B4B4"/>\n    </g>\n    <defs>\n        <filter id="filter0_d_1_507" x="9" y="5" width="28" height="37" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n            <feFlood flood-opacity="0" result="BackgroundImageFix"/>\n            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n            <feOffset dx="1" dy="1"/>\n            <feComposite in2="hardAlpha" operator="out"/>\n            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.29 0"/>\n            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_507"/>\n            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_507" result="shape"/>\n        </filter>\n    </defs>\n</svg>\n',
          data: "<h2>Introduction</h2><p>In today's fast-paced world, keeping up with the latest trends and insights is essential for both personal growth and professional development. This article aims to shed light on a topic that resonates with many, providing valuable information and actionable advice. Whether you're seeking to enhance your knowledge, improve your skills, or simply stay informed, our comprehensive analysis offers a deep dive into the subject matter, designed to empower and inspire our readers.</p>",
        },
      ],
    },
    // uploadcare: {
    //   pubkey: UPLOADCARE_PUBKEY,
    // },
  };
});

onMounted(() => {
  isLayoutReady.value = true;
});

watchEffect(() => {
  if (config.value) {
    configUpdateAlert(config.value);
  }
});

function onReady(editor) {
  [...editorWordCount.value.children].forEach((child) => child.remove());
  [...editorToolbar.value.children].forEach((child) => child.remove());
  [...editorMenuBar.value.children].forEach((child) => child.remove());

  const wordCount = editor.plugins.get('WordCount');
  editorWordCount.value.appendChild(wordCount.wordCountContainer);
  editorToolbar.value.appendChild(editor.ui.view.toolbar.element);
  editorMenuBar.value.appendChild(editor.ui.view.menuBarView.element);
}

/**
 * This function exists to remind you to update the config needed for premium features.
 * The function can be safely removed. Make sure to also remove call to this function when doing so.
 */
function configUpdateAlert(config) {
  if (configUpdateAlert.configUpdateAlertShown) {
    return;
  }

  const isModifiedByUser = (currentValue, forbiddenValue) => {
    if (currentValue === forbiddenValue) {
      return false;
    }

    if (currentValue === undefined) {
      return false;
    }

    return true;
  };

  const valuesToUpdate = [];

  configUpdateAlert.configUpdateAlertShown = true;

  if (!isModifiedByUser(config.licenseKey, '<YOUR_LICENSE_KEY>')) {
    valuesToUpdate.push('LICENSE_KEY');
  }

  // if (
  //   !isModifiedByUser(config.uploadcare?.pubkey, '<YOUR_UPLOADCARE_PUBKEY>')
  // ) {
  //   valuesToUpdate.push('UPLOADCARE_PUBKEY');
  // }

  if (valuesToUpdate.length) {
    window.alert(
      [
        'Please update the following values in your editor config',
        'to receive full access to Premium Features:',
        '',
        ...valuesToUpdate.map((value) => ` - ${value}`),
      ].join('\n')
    );
  }
}
////////////////////////my custom code
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

/* 
  We keep a local copy of the content for convenience, 
  or we can just rely on the editor's getData().
*/

const computedValue = computed({
  get: () => props.modelValue,
  set: (newVal) => {
    emit('update:modelValue', newVal);
  },
});
</script>
