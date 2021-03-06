String.prototype.tpl = function(o) {
  var r = this ;
  for (var i in o) {
    r = r.replace(new RegExp("\\$"+i, 'g'),o[i])
  }
  return r
}

var listItemTpl = `<li><a href='#' onclick='load("$url")'>$label</a></li>`

$(document).ready(main);

function main() {
  $.ajax({
    method: 'GET',
    url: 'assets/js/techArticlesList.json',
    success: function(d) {
      for (var i=0; i<d.length; i++) {
        $('#list').append(listItemTpl.tpl({url:d[i].url, label: d[i].label}))
      }
    },
    error: function() {
      alert('No document to show')
    }
  });


  $('#showasides').click(function() {
    if (this.checked)
      $('.aside').addClass('text-aside')
    else
      $('.aside').removeClass('text-aside')
  })
  $('#showspeeches').click(function() {
    if (this.checked)
      $('q.speech').addClass('text-speeches')
    else
      $('q.speech').removeClass('text-speeches')
  })
  $('#showquotes').change(function() {
    if (this.checked)
      $('q:not(.speech)').addClass('text-quotes')
    else
      $('q:not(speech)').removeClass('text-quotes')
  })
}

function load(file) {
  $.ajax({
    method: 'GET',
    url: file,
    success: function(d) {
      $('#file').html(d)
      $('.show').prop("checked", false)
      addIds()
      filltabs()
      $('#title').html($('#file h1'))
    },
    error: function() {
      alert('Could not load file '+file)
    }
  });
}

function addIds() {
  addId('.aside','aside')
  addId('q.speech', 'speech')
  addId('q:not(.speech)', 'quote')
}

function addId(what, prefix) {
  var id = '0'
  var elements = $(what);
  for (var i=0; i<elements.length; i++) {
    elements[i].id = prefix + "-" + id++
  }
}

function filltabs(){
  fillInfo("#file", "#info")
  fillPerson("#file .person","list-person","#person")
  fillPlaces("#file .place","list-place","#place")
}

function fillInfo(from, where) {
  var item = `
    <p class="list title"><b>Title: </b>$title</p>
    <p class="list author"><b>Author: </b>$author</p>
    <p class="list author"><b>Headings: </b><ul>$headings</ul></p>
    <p class="list author"><b>Keywords: </b><ul>$keywords</ul></p>
    ` ;
  $(where).empty();

  var title = $(from + ' h1')[0].innerText
  var author = $(from + ' .byline')[0].innerText
  var headingList = $(from + ' h2')
  var keywordList = $(from + ' meta[name="keywords"]').prop('content').split(', ')
  var headings = ""
  var keywords = ""
  for (var i=0; i<headingList.length; i++) {
    headings += "<li class='small'>"+headingList[i].innerHTML+"</li>"
  }
  for (var i=0; i<keywordList.length; i++) {
    keywords += "<li class='small'>"+keywordList[i]+"</li>"
  }
  $(where).append(item.tpl( {
    author: author,
    title: title,
    headings: headings,
    keywords: keywords
  }))
}

function fillPerson(what,style,where) {
  var list = `<li class="list $style"> $content</li>`
  var elements = $(what);
  $(where+' ul').empty();
  for (var i=0; i<elements.length; i++) {
    $(where+' ul').append(list.tpl({
      style:style,
      place: '#'+elements[i].id,
      content: elements[i].innerHTML
    }) )
  }
}

function fillPlaces(what,style,where) {
  var list = `<li class="list $style"> $content</li>`
  var elements = $(what);
  $(where+' ul').empty();
  for (var i=0; i<elements.length; i++) {
    $(where+' ul').append(list.tpl({
      style:style,
      place: '#'+elements[i].id,
      content: elements[i].innerHTML
    }) )
  }
}

// why they don't work?
// var date = $(from + ' .publicationDate')[0].innerText
// var source = $(from + ' meta[name="DC.identifier"]').prop('content')
// 
