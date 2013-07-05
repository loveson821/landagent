$(document).ready(function () {

  // confirmations
  $('.confirm').submit(function (e) {
    e.preventDefault();
    var self = this;
    var msg = 'Are you sure?';
    bootbox.confirm(msg, 'cancel', 'Yes! I am sure', function (action) {
      if (action) {
        $(self).unbind('submit');
        $(self).trigger('submit');
      }
    });
  });

  $('#tags').tagsInput({
    'height':'60px',
    'width':'280px'
  });

  var resultset;
  $('#typeahead').typeahead({
    source: function(query, process){
      return $.ajax({
        url: '/api/properties/search/'+query,
        type: 'get',
        dataType: 'json',
        success: function(result){
          resultset = result;
          var resultList = result.map(function(item){
            var aItem = { lat: item.location.lat, lng: item.location.lng, name: item.cname };
            return JSON.stringify(aItem)
          });

          return process(resultList);
        }
      });
    },
    highlighter: function(obj){
      var item = JSON.parse(obj);
      return item.name;
    },
    updater: function(obj){
      alert(obj);
      var item = JSON.parse(obj);
      $("#latitude").val(item.lat);
      $("#longitude").val(item.lng);
      return item.name;
    }
    // },
    //     matcher: function(item){
    //       console.log('matcher');
    //       return true;
    //     },
    //     highlighter: function(id){
    //       console.log('highlighter');
    //       var p = _.find(resultset, function(d){
    //         return d.id == id;
    //       });
    //       return p.cname;
    //     }
    //   });
    // }
  });
});
