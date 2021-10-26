export const defaultNestedFormsOptions = {
  remover: '.remove',
  postfixes: '',
  afterRemoveForm: ($form) => {
    $form.remove();
  }
};

/* eslint-disable func-names */
$(function() {
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
    afterAddForm: ($container) => {
      $container.find('[id$="open"]').prop('checked', true);
    }
  });

  // media not nested in a content block, for example in events.
  // everything with classes here, because in content blocks nested-media will appear multiple times
  $('.nested-media').nestedForm({
    forms: '.nested-medium-form',
    adder: '.nested-add-medium',
    ...defaultNestedFormsOptions,
    beforeAddForm: ($container) => {
      $container.children('.nested-medium-form').removeClass('d-none');
    }
  });
});
/* eslint-enable func-names */
