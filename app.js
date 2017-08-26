let searchTerm = '';
let state = [];
const search = () => {
  $.ajax({
    url: 'http://en.wikipedia.org/w/api.php',
    dataType: 'jsonp',
    data: {
      action: 'opensearch',
      format: 'json',
      search: searchTerm
    },
    success: function(data) {
      state = [];
      $('.content').html(`<div></div>`);
      // console.log(data);
      for (var i = 0; i < data.length; i++) {
        state.push({ title: data[1][i], text: data[2][i], link: data[3][i] });
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
      `<div class="item"><h3><a target="_blank" href=${val.link}>${val.title}</a></h3><p>${val.text}</div>`
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
