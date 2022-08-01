export const defaultNestedFormsOptions = {
  remover: '.remove',
  postfixes: '',
  afterRemoveForm: ($form) => {
    $form.remove();
  }
};

export const initClassicEditor = (htmlEditor) => {
  ClassicEditor.create(htmlEditor, {
    toolbar: [
      'heading',
      '|',
      'bulletedList',
      'numberedList',
      'link',
      'bold',
      'italic',
      '|',
      'undo',
      'redo'
    ]
  })
    .then((editor) => {
      // console.log(Array.from(editor.ui.componentFactory.names()));
    })
    .catch((error) => {
      console.error(error);
    });
};

$(function () {
  $('#nested-categories').nestedForm({
    forms: '.nested-category-form',
    adder: '#nested-add-category',
    ...defaultNestedFormsOptions,
    beforeAddForm: ($container) => {
      $container.children('.nested-category-form').removeClass('d-none');
    }
  });

  $('#nested-dates').nestedForm({
    forms: '.nested-date-form',
    adder: '#nested-add-dates',
    ...defaultNestedFormsOptions,
    beforeAddForm: ($container) => {
      $container.children('.nested-date-form').removeClass('d-none');
    }
  });

  $('#nested-contacts').nestedForm({
    forms: '.nested-contact-form',
    adder: '#nested-add-contacts',
    ...defaultNestedFormsOptions,
    beforeAddForm: ($container) => {
      $container.children('.nested-contact-form').removeClass('d-none');
    }
  });

  $('#nested-price_informations').nestedForm({
    forms: '.nested-price_information-form',
    adder: '#nested-add-price_information',
    ...defaultNestedFormsOptions,
    beforeAddForm: ($container) => {
      $container.children('.nested-price_information-form').removeClass('d-none');
    }
  });

  $('#nested-restrictions').nestedForm({
    forms: '.nested-restriction-form',
    adder: '#nested-add-restriction',
    ...defaultNestedFormsOptions,
    beforeAddForm: ($container) => {
      $container.children('.nested-restriction-form').removeClass('d-none');
    }
  });

  $('#nested-web-urls').nestedForm({
    forms: '.nested-web-url-form',
    adder: '#nested-add-web-urls',
    ...defaultNestedFormsOptions,
    beforeAddForm: ($container) => {
      $container.children('.nested-web-url-form').removeClass('d-none');
    },
    associations: 'urls' // needed to correctly increment ids of added sections
  });

  $('#nested-opening-hours').nestedForm({
    forms: '.nested-opening-hour-form',
    adder: '#nested-add-opening-hour',
    ...defaultNestedFormsOptions,
    beforeAddForm: ($container) => {
      $container.children('.nested-opening-hour-form').removeClass('d-none');
    },
    afterAddForm: (_, $form) => {
      $form.find('[id$="open"]').prop('checked', true);
    }
  });

  $('#nested-tour-stops').nestedForm({
    forms: '.nested-tour-stop-form',
    adder: '#nested-add-tour-stop',
    ...defaultNestedFormsOptions,
    beforeAddForm: ($container) => {
      $container.children('.nested-tour-stop-form').removeClass('d-none');
    },
    afterAddForm: (_$container, $form) => {
      // init html editors for content block fields body and intro
      $form
        .get('0')
        .querySelectorAll('.html-editor')
        .forEach((htmlEditor) => initClassicEditor(htmlEditor));
    }
  });

  // We need to know the amount of forms at DOM load to know which classes we have to fix,
  // see below in afterAddForm callback
  const nestedMediaFormCount = $('.nested-medium-form').length;

  // media not nested in a content block, for example in events.
  // everything with classes here, because in content blocks nested-media will appear multiple times
  $('.nested-media').nestedForm({
    forms: '.nested-medium-form',
    adder: '.nested-add-medium',
    ...defaultNestedFormsOptions,
    beforeAddForm: ($container) => {
      $container.children('.nested-medium-form').removeClass('d-none');
    },
    afterAddForm: function (_, $form) {
      // Increment the index on all elements of the new form by 100
      let oldFormIndex = nestedMediaFormCount - 1;
      let formIndex = $('.nested-medium-form').length - 1;

      $form.find('.upload-toggle').attr('data-target', '.file-upload-collapse-' + formIndex);
      $form.find('[data-index]').attr('data-index', formIndex);

      const classNamesToFix = [
        'file-upload-collapse',
        'file-input',
        'upload-progress',
        'upload-progress-bar',
        'image-preview-wrapper',
        'image-preview'
      ];

      classNamesToFix.forEach((className) => {
        let $el = $form.find('.' + className);
        $el.removeClass(className + '-' + oldFormIndex);
        $el.addClass(className + '-' + formIndex);
      });

      window.bindFileUploadEvents();
    }
  });
});
