// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require('@rails/ujs').start();
require('@rails/activestorage').start();
require('jquery');
require('jquery.easing');
require('bootstrap/dist/js/bootstrap.bundle.min.js');
require('@fortawesome/fontawesome-free/js/all.js');
var DataTable = require('datatables.net/js/jquery.dataTables.js');
require('datatables.net-bs4/js/dataTables.bootstrap4.js');
require('channels');
require('@kanety/jquery-nested-form');

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

/* eslint-disable func-names */
$(function() {
  document.querySelectorAll('.html-editor').forEach((htmlEditor) =>
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
      })
  );

  const defaultNestedFormsOptions = {
    remover: '.remove',
    postfixes: '',
    afterRemoveForm: ($form) => {
      $form.remove();
    }
  };

  $('#nested-event-dates').nestedForm({
    forms: '.nested-event-date-form',
    adder: '#nested-add-event-dates',
    ...defaultNestedFormsOptions
  });

  $('#nested-event-contacts').nestedForm({
    forms: '.nested-event-contact-form',
    adder: '#nested-add-event-contacts',
    ...defaultNestedFormsOptions
  });

  $('#nested-event-prices').nestedForm({
    forms: '.nested-event-price-form',
    adder: '#nested-add-event-prices',
    ...defaultNestedFormsOptions
  });

  $('#nested-web-urls').nestedForm({
    forms: '.nested-web-url-form',
    adder: '#nested-add-web-urls',
    ...defaultNestedFormsOptions,
    associations: 'urls' // needed to correctly increment ids of added sections
  });

  // media not nested in a content block, for example in events.
  // everything with classes here, because in content blocks nested-media will appear multiple times
  $('.nested-media').nestedForm({
    forms: '.nested-medium-form',
    adder: '.nested-add-medium',
    ...defaultNestedFormsOptions
  });

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
      }
    });
  }

  // Init DataTables for all tables with css-class 'data_table'
  $.fn.dataTable = DataTable;
  $.fn.dataTableSettings = DataTable.settings;
  $.fn.dataTableExt = DataTable.ext;
  DataTable.$ = $;
  $.fn.DataTable = function(opts) {
    return $(this)
      .dataTable(opts)
      .api();
  };

  $('.data_table').DataTable({
    searching: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/German.json'
    }
  });

  // Toggle the side navigation
  $('#sidebarToggle, #sidebarToggleTop').on('click', function(e) {
    $('body').toggleClass('sidebar-toggled');
    $('.sidebar').toggleClass('toggled');
    if ($('.sidebar').hasClass('toggled')) {
      $('.sidebar .collapse').collapse('hide');
    }
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    }
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body')
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr('href')).offset().top
        },
        1000,
        'easeInOutExpo'
      );
    e.preventDefault();
  });
});
