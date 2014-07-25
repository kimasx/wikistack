// Setting custom filters on Swig

module.exports = function(swig) {
  // page_link filter
  var page_link = function (doc) {
    var link_name;
    if (typeof doc.title !== "undefined" && doc.title !== "") {
      link_name = doc.title
    } else {
      link_name = "Page "+doc.url_name;
    }
    return "<a href='/wiki/"+doc.url_name+"/"+ doc._id.toString()+"'>"+link_name+"</a>";
  };
  page_link.safe = true;
  swig.setFilter('page_link', page_link);

  // marked filter
  var marked = function(body){
    var marked = require('marked');
    return marked(body);
  };
  // line 23 ensures that the filter can return code that runs, not just displays as text.
  marked.safe = true;
  swig.setFilter('marked', marked);

  var excerpt = function(page) {
    var body_excerpt = page.body.substring(0,100);
    return body_excerpt;
  }
  swig.setFilter('excerpt', excerpt);
};