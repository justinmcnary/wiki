let searchTerm = '';
let state = [];
const search = () => {
  $.ajax({
    url: 'https://en.wikipedia.org/w/api.php',
    dataType: 'jsonp',
    data: {
      action: 'opensearch',
      format: 'json',
      search: searchTerm
    },
    success: function(data) {
      state = [];
      // console.log(data);
      $('.content').html(`<div></div>`);
      let mapping = {
        '1': 'title',
        '2': 'content',
        '3': 'link'
      };
      for (var i = 1; i < data.length; i++) {
        data[i].map((itm, index) => {
          if (!state[index]) {
            state[index] = {};
          }
          state[index][mapping[i]] = itm;
        });
      }
      render();
      $('.search-term').val('');
    }
  });
};

//update DOM
const render = () => {
  state.forEach(val => {
    $('.content').prepend(
      `<div class="item"><h3><a target="_blank" href=${val.link}>${val.title}</a></h3><p>${val.content}</div>`
    );
  });
};

//click handler
$('#basic-addon2').on('click', function() {
  searchTerm = $('.search-term').val();
  search();
  $('.header h1').css('margin-top', '40px');
});

$(document).keypress(function(e) {
  var keycode = e.keyCode ? e.keyCode : e.which;
  if (keycode == '13') {
    searchTerm = $('.search-term').val();
    search();
    $('.header h1').css('margin-top', '40px');
  }
});
