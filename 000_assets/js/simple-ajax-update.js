(function() {

  $(document).ready(function() {
    var read_data, show_error, update_data;
    read_data = function(target) {
      return $.ajax({
        url: target,
        type: 'GET',
        dataType: 'text',
        cache: false,
        error: function(jqXHR, textStatus, errorThrown) {
          return show_error(textStatus, '.debug');
        },
        success: function(data, textStatus, jqXHR) {
          return update_data(data, '.content');
        }
      });
    };
    update_data = function(data, holder) {
      var delay_time, items;
      delay_time = 0;
      items = data.split('\n');
      return $(items).each(function(item_num, item_value) {
        var item, _results;
        if (item_value) {
          item = "<p style='display:none'>" + item_value + "</p>";
          $("" + holder).append($(item).delay(delay_time).show('slow'));
          delay_time = delay_time + 1000;
        }
        _results = [];
        while ($("" + holder + " p").length > 5) {
          _results.push($("" + holder + " p:first").hide('slow', function() {
            return $(this).remove();
          }));
        }
        return _results;
      });
    };
    show_error = function(error, holder) {
      return $("" + holder).text("Error: " + error);
    };
    return setInterval((function() {
      return read_data('data/test');
    }), 5000);
  });

}).call(this);
