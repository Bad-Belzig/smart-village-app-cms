import { defaultNestedFormsOptions } from './_nested_forms';

/* eslint-disable func-names */
$(function() {
  if ($('#nested-content-blocks').length) {
    const initNestedMediaContents = ($form) => {
      const timestamp = Date.now();

      $form.find('.nested-media-content-block').addClass(`nested-media-content-block-${timestamp}`);
      $form.find('.nested-medium-form').addClass(`nested-medium-form-${timestamp}`);
      $form.find('.nested-add-medium').addClass(`nested-add-medium-${timestamp}`);

      $form.find(`.nested-media-content-block-${timestamp}`).nestedForm({
        forms: `.nested-medium-form-${timestamp}`,
        adder: `.nested-add-medium-${timestamp}`,
        ...defaultNestedFormsOptions,
        associations: 'media_contents' // needed to correctly increment ids of added sections
      });
    };

    $('#nested-content-blocks').nestedForm({
      forms: '.nested-content-block-form',
      adder: '#nested-add-content-block',
      remover: '.removeContent',
      postfixes: '',
      afterInitialize: function() {
        const $initialForms = $('.nested-content-block-form');

        $initialForms.each((index, form) => {
          initNestedMediaContents($(form));
        });
      },
      beforeAddForm: function($container, $form) {
        // we only want one initialized media content, so remove eventually created others
        $form.find('.nested-medium-form').each((index, form) => {
          if (index > 0) {
            $(form).remove();
          }
        });
      },
      afterAddForm: function($container, $form) {
        initNestedMediaContents($form);

        // init html editors for content block fields body and intro
        $form
          .get('0')
          .querySelectorAll('.html-editor')
          .forEach((htmlEditor) => initClassicEditor(htmlEditor));
      }
    });
  }
});
/* eslint-enable func-names */
