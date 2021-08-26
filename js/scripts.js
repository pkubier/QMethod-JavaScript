var blockRelations = [
  23,
  14,
  7,
  1,
  0,
  2,
  8,
  15,
  24,
  32,
  21,
  12,
  5,
  3,
  6,
  13,
  22,
  33,
  42,
  30,
  19,
  10,
  4,
  11,
  20,
  31,
  43,
  50,
  40,
  28,
  17,
  9,
  18,
  29,
  41,
  51,
  58,
  48,
  38,
  26,
  16,
  27,
  39,
  49,
  59,
  64,
  56,
  46,
  36,
  25,
  37,
  47,
  57,
  65,
  68,
  62,
  54,
  44,
  34,
  45,
  55,
  63,
  69,
  70,
  66,
  60,
  52,
  35,
  53,
  61,
  67,
  71
];

var randomize = [];
var randomPos = 0;
var revert = 0;
var sortedData = {
  'n4': [],
  'n3': [],
  'n2': [],
  'n1': [],
  'z': [],
  'p1': [],
  'p2': [],
  'p3': [],
  'p4': []
};
var explanations = {};
var surveyData = {
  'year': null,
  'gender': null,
  'politics': null,
  'religion': null,
  'ethnicity': null,
  'location': null,
  'comments': null
};

var boxSize = [176, 126];

/*****************************************
  Continue button text
*****************************************/
var continueButton = "Continue...";


/*****************************************
  Welcome popup text (title and message)
*****************************************/
var welcomeTitle = 'Welcome!';
var welcomeMessage = 'Thank you for participating in this experiment. This sort works best in the newest version of Chrome, Firefox, or Internet Explorer. Please make sure JavaScript is enabled. If you do not see a thank you message at the end, please restart or retry the survey.';


/*****************************************
  Intro popup text (title and message)
*****************************************/
var introTitle = 'Introduction';
var introMessage = 'This study is about how society views Jesus. We are interested to see if people create Jesus from a Biblical standpoint or personal standpoint.<br/><br/>Please maximize your browser window and click on the continue-button to start the survey.';


/*****************************************
  Step 1 explanation (title and message)
*****************************************/
var step1Title = 'Step 1 of 5';
var step1Message = 'Read the folowing statements carefully and split them up into three piles: a pile for statements you tend to disagree with, a pile for cards you tend to agree with, and a pile for the rest.<br/><br/>You can drag the cards into one of the three piles. Changes can be made later. If a white box appears instead of the word, drage the box back to the top and release and try again.<br/><br/>If you want to read this instruction a second time, press the help-button at the bottom left corner.';


/*****************************************
  Step 1 options (column titles)
*****************************************/
var step1Column1 = 'Disagree';
var step1Column2 = 'Neutral';
var step1Column3 = 'Agree';


/*****************************************
  Step 2 explanation (title and message)
*****************************************/
var step2Title = 'Step 2 of 5';
var step2Message = 'Take the cards from the "AGREE"-pile and read them again. You can scroll through the statements by using the scroll bar. Next, select the two statements you most agree with and place them on right side of the score sheet below the "+2".<br/><br/>Now read the cards in the "DISAGREE"-pile again. Just like before, select the two statements you most disagree with and place them on the left side of the score sheet below the "-2".<br/><br/>Next, select the statements you second most agree/disagree with and place them under "+1"/"-1". Follow this procedure for all cards in the "AGREE"- and "DISAGREE"-pile.<br/><br/>Finally, read the "NEUTRAL"-cards again and arange them in the remaining open boxes of the score sheet.';


/*****************************************
  Step 3 explanation (title and message)
*****************************************/
var step3Title = 'Step 3 of 5';
var step3Message = 'Now you have placed all cards on the score sheet. Please go over your distribution once more and shift cards if you want to.';


/*****************************************
  Step 4 explanation (title and message)
*****************************************/
var step4Title = 'Step 4 of 5';
var step4Message = 'Please explain why you agree most or disagree most with the following statements you have placed below "+4" or "-4".';


/*****************************************
  Step 5 explanation (title and message)
*****************************************/
var step5Title = 'Step 5 of 5';
var step5Message = 'Finally, please answer the following questions regarding your background.';


/*****************************************
  Thank You / End of Survey Message
*****************************************/
var endMessage = 'Thank you for participating in this study. This study was designed to determine how people view Jesus, and how people create their idea of Jesus. If you have quesions regarding this survey, please email pkubier@uco.edu. This page will redirect in 5 seconds and credit will be granted automatically. If credit is not granted immediately, please email pkubier@uco.edu';


/*****************************************
  Begin survey scripting
*****************************************/
$(function() {
  $('.issues-message').hide();
  
  // Trace steps through survey
  var step = 0;
  
  // Resize timer variable
  var resize = null;
  
  // Initial dialog render
  $('body').append('<div id="dialog" title="' + welcomeTitle + '"><p>' + welcomeMessage + '</p><p><a href="#">' + continueButton + '</a></p></div>');
  
  // jQueryUI dialog options
  $('#dialog').dialog({
    draggable: false,
    closeOnEscape: false,
    minWidth: 600
  });
  
  // Continue button click listener
  $('#dialog a').button().click(function(event) {
    event.preventDefault();
    nextStep(step);
  });
  
  // Window resize handler
  $(window).resize(function() {
    clearTimeout(resize);
    resize = setTimeout(function() {
      if($('#dialog').length > 0 && $('#dialog').is(':visible')) {
        $('#dialog').dialog({ position: { my: 'center', at: 'center', of: window } });
      }
    }, 250);
  });
    
  // Step controller function
  function nextStep(current) {
    step = current + 1;
    switch(step) {
      case 1:
        // Update dialog message
        $('#dialog p:first-child').html(introMessage);
        $('#dialog').dialog('option', 'title', introTitle).dialog({ position: { my: 'center', at: 'center', of: window } });
        break;
      case 2:
        // Update dialog message
        $('#dialog p:first-child').html(step1Message);
        $('#dialog').dialog('option', 'title', step1Title).dialog({ position: { my: 'center', at: 'center', of: window } });
        // Initialize three column sort
        initThreeColSort();
        break;
      case 3:
        // Hide dialog message and begin display of items to sort
        if($('#dialog').dialog('isOpen')) {
          $('#dialog').dialog('close');
          $('#drag-boxes').css('display', 'block');
        } else {
          $('#dialog').dialog('open');
        }
        $('.issues-message').show();
        break;
      case 4:
        // Remove progress display
        $('#progress').remove();
        // Update dialog message
        $('#dialog p:first-child').html(step2Message);
        $('#dialog').dialog('option', 'title', step2Title).dialog({ position: { my: 'center', at: 'center', of: window } });
        // Resize three column sort
        $('#three-column-sort .drop-zone').animate({
          height: '108px'
        }, 500);
        $('#three-column-sort').animate({
          marginTop: '640px'
        }, 500);
        // Initialize table sort
        initTableSort();
        break;
      case 5:
        // Hide dialog message and begin display of items to sort
        if($('#dialog').dialog('isOpen')) {
          $('#dialog').dialog('close');
          $('#drag-boxes').css('display', 'block');
        } else {
          $('#dialog').dialog('open');
        }
        break;
      case 6:
        // Remove three column sort
        $('#three-column-sort').animate({
          opacity: 0
        }, function() {
          $(this).remove();
        });
        // Update dialog message
        $('#dialog p:first-child').html(step3Message);
        $('#dialog').dialog('option', 'title', step3Title).dialog({ position: { my: 'center', at: 'center', of: window } });
        // Initialize swappable table
        initTableSwap();
        break;
      case 7:
        // Hide dialog message and begin display of items to sort
        if($('#dialog').dialog('isOpen')) {
          $('#dialog').dialog('close');
          $('#drag-boxes').css('display', 'block');
        } else {
          $('#dialog').dialog('open');
        }
        break;
      case 8:
        // Store table data and remove table display
        storeTableData();
        // Update dialog message
        $('#dialog p:first-child').html(step4Message);
        $('#dialog').dialog('option', 'title', step4Title).dialog({ position: { my: 'center', at: 'center', of: window } });
        break;
      case 9:
        // Hide dialog message and begin display of items to sort
        if($('#dialog').dialog('isOpen')) {
          $('#dialog').dialog('close');
          $('#drag-boxes').css('display', 'block');
        } else {
          $('#dialog').dialog('open');
        }
        break;
      case 10:
        // Store answer data and remove answer field display
        storeAgreeDisagree();
        // Update dialog message
        $('#dialog p:first-child').html(step5Message);
        $('#dialog').dialog('option', 'title', step5Title).dialog({ position: { my: 'center', at: 'center', of: window } });
        break;
      case 11:
        // Hide dialog message and begin display of items to sort
        if($('#dialog').dialog('isOpen')) {
          $('#dialog').dialog('close');
          $('#drag-boxes').css('display', 'block');
        } else {
          $('#dialog').dialog('open');
        }
        break;
      case 12:
        endSurvey();
        break;
    }
  }
  
  // Three column sorting code
  function initThreeColSort() {
    $('body').prepend('<div id="three-column-sort"><div class="column-1"><h2>' + step1Column1 + ' (#1)</h2><ul class="drop-zone"></ul></div><div class="column-2"><h2>' + step1Column2 + ' (#2)</h2><ul class="drop-zone"></ul></div><div class="column-3"><h2>' + step1Column3 + ' (#3)</h2><ul class="drop-zone"></ul></div></div><div id="survey-progress">Step 1 of 5</div>');
    $('body').prepend('<ul id="drag-boxes"></ul>');
    $('#drag-boxes').css('display', 'none');
    for(var i = 0; i < data.length; i += 1) {
      $('#drag-boxes').append('<li><strong>(' + (i + 1) + ')</strong> ' + data[i] + '</li>');
      randomize.push(i + 1);
    }
    randomize = shuffle(randomize);
    $('#drag-boxes li').draggable({
      helper: 'clone',
      connectToSortable: '.drop-zone',
      revert: 'invalid',
      revertDuration: 200
    });
    $('.drop-zone').sortable({
      forcePlaceholderSize: true,
      update: function(event, ui) {
        var textContent = ui.item.context.innerText;
        if(textContent === undefined) {
          textContent = ui.item.context.textContent;
        }
        if($('#drag-boxes li:contains("' + textContent + '")').is(':visible')) {
          $('#drag-boxes li:contains("' + textContent + '")').animate({
            opacity: 0
          }, 200, function() {
            $(this).css('display', 'none');
            displayNextBlock();
          });
        }
      }
    });
    $('.column-1 .drop-zone').sortable({
      connectWith: '.drop-zone',
      over: function(event, ui) {
        ui.item.removeClass('highlight-2 highlight-3');
        ui.helper.removeClass('highlight-2 highlight-3');
        ui.helper.width(boxSize[0]); 
        ui.helper.height(boxSize[1]);
        ui.helper.addClass('highlight-1');
        ui.item.addClass('highlight-1');
      },
      start: function(event, ui) {
        ui.item.removeClass('highlight-2 highlight-3');
        ui.helper.removeClass('highlight-2 highlight-3');
        ui.helper.width(boxSize[0]); 
        ui.helper.height(boxSize[1]);
        ui.helper.addClass('highlight-1');
        ui.item.addClass('highlight-1');
      }
    });
    $('.column-2 .drop-zone').sortable({
      connectWith: '.drop-zone',
      over: function(event, ui) {
        ui.item.removeClass('highlight-1 highlight-3');
        ui.helper.removeClass('highlight-1 highlight-3');
        ui.helper.width(boxSize[0]); 
        ui.helper.height(boxSize[1]);
        ui.helper.addClass('highlight-2');
        ui.item.addClass('highlight-2');
      },
      start: function(event, ui) {
        ui.item.removeClass('highlight-1 highlight-3');
        ui.helper.removeClass('highlight-1 highlight-3');
        ui.helper.width(boxSize[0]); 
        ui.helper.height(boxSize[1]);
        ui.helper.addClass('highlight-2');
        ui.item.addClass('highlight-2');
      }
    });
    $('.column-3 .drop-zone').sortable({
      connectWith: '.drop-zone',
      over: function(event, ui) {
        ui.item.removeClass('highlight-1 highlight-2');
        ui.helper.removeClass('highlight-1 highlight-2');
        ui.helper.width(boxSize[0]); 
        ui.helper.height(boxSize[1]);
        ui.helper.addClass('highlight-3');
        ui.item.addClass('highlight-3');
      },
      start: function(event, ui) {
        ui.item.removeClass('highlight-1 highlight-2');
        ui.helper.removeClass('highlight-1 highlight-2');
        ui.helper.width(boxSize[0]); 
        ui.helper.height(boxSize[1]);
        ui.helper.addClass('highlight-3');
        ui.item.addClass('highlight-3');
      }
    });
    $('body').prepend('<div id="progress">1/' + data.length + '</div>');
    displayNextBlock();
  }
  
  function displayNextBlock() {
    if(randomPos !== randomize.length) {
      $('#progress').html((randomPos + 1) + '/' + randomize.length);
      var incoming = $('#drag-boxes li:nth-child(' + (randomize[randomPos]) + ')');
      incoming.css({
        display: 'block',
        opacity: 0,
        left: ($(window).width() - 186) / 2
      }).animate({
        top: '20px',
        opacity: 1
      }, 500);
      randomPos += 1;
    } else {
      nextStep(step);
    }
  }
  
  // Table sorting code
  function initTableSort() {
    boxSize = [84, 60];
    $('body').prepend('<table id="sort-table"><thead></thead><tbody></tbody></table>');
    var formatNum = null;
    var index = 1;
    var extra = '';
    for(var i = -4; i < 5; i += 1) {
      if(i > 0) {
        formatNum = '+' + i;
      } else {
        formatNum = i;
      }
      extra = '';
      if(i === -4) {
        extra = '<span class="disagree">DISAGREE</span>';
      }
      if(i === 4) {
        extra = '<span class="agree">AGREE</span>';
      }
      $('body table thead').append('<th class="header-' + index + '">' + formatNum + extra + '</th>');
      index += 1;
    }
    var rowData = '';
    var tdClass = '';
    var onBlock = 0;
    for(var i = 0; i < 8; i += 1) {
      rowData += '<tr>';
      for(var j = 0; j < 9; j += 1) {
        if(data[blockRelations[onBlock]] !== undefined && data[blockRelations[onBlock]] !== null && data[blockRelations[onBlock]] !== '') {
          tdClass = ' active';
        } else {
          tdClass = '';
        }
        rowData += '<td class="row-' + (i + 1) + ' col-' + (j + 1) + '' + tdClass + '"></td>';
        onBlock += 1;
      }
      rowData += '</tr>';
    }
    $('body table tbody').html(rowData);
    $('body table').css('margin-left', '-' + ($('body table').width() / 2) + 'px');
    setTimeout(function() {
      $('body table').css('margin-left', '-' + ($('body table').width() / 2) + 'px');
    }, 250);
    $('#survey-progress').html('Step 2 of 5');
    $('table .active').droppable({
      accept: '.drop-zone li, table .active',
      hoverClass: 'ui-state-hover',
      drop: function(event, ui) {
        if(ui.draggable.hasClass('highlight-1') === true) {
          $(this).addClass('highlight-1');
        }
        if(ui.draggable.hasClass('highlight-2') === true) {
          $(this).addClass('highlight-2');
        }
        if(ui.draggable.hasClass('highlight-3') === true) {
          $(this).addClass('highlight-3');
        }
        $(this).html(ui.draggable.context.innerHTML);
        $(this).droppable('option', 'disabled', true);
        $(this).draggable({
          helper: 'clone',
          connectWith: 'table .active',
          connectToSortable: '.drop-zone',
          revert: 'invalid',
          revertDuration: 200,
          stop: function(event, ui) {
            if(revert === 0) {
              if(ui.helper[0].className.indexOf('ui-sortable-helper') > -1) {
                $(this).droppable('option', 'disabled', false);
                $(this).removeClass('highlight-1 highlight-2 highlight-3');
                $(this).html('');
              }
            }
          },
          revert: function(socketObj) {
            if (socketObj === false) {
            	revert = 1;
            } else {
              revert = 0;
            }
          }
        });
        if($(ui.draggable.context).hasClass('active')) {
          $(ui.draggable).droppable('option', 'disabled', false);
          $(ui.draggable).removeClass('highlight-1 highlight-2 highlight-3');
          ui.draggable.context.innerHTML = '';
        } else {
          ui.draggable.remove();
        }
      }
    });
    $('.drop-zone').sortable({
      forcePlaceholderSize: true
    });
    $('.column-1 .drop-zone').sortable({
      connectWith: '.drop-zone, table .active',
      over: function(event, ui) {
        ui.item.removeClass('highlight-2 highlight-3');
        ui.helper.removeClass('highlight-2 highlight-3');
        ui.helper.width(boxSize[0]); 
        ui.helper.height(boxSize[1]);
        ui.helper.addClass('highlight-1');
        ui.item.addClass('highlight-1');
      },
      start: function(event, ui) {
        ui.item.removeClass('highlight-2 highlight-3');
        ui.helper.removeClass('highlight-2 highlight-3');
        ui.helper.width(boxSize[0]); 
        ui.helper.height(boxSize[1]);
        ui.helper.addClass('highlight-1');
        ui.item.addClass('highlight-1');
      },
      receive: function(event, ui) {
        $(this).children('td').replaceWith(function(i, html) {
          return '<li class="highlight-1">' + html + '</li>';
        })
      },
      update: function(event, ui) {
        if($('.column-1 ul li').length === 0 && $('.column-2 ul li').length === 0 && $('.column-3 ul li').length === 0) {
          nextStep(5)
        }
      }
    });
    $('.column-2 .drop-zone').sortable({
      connectWith: '.drop-zone, table .active',
      over: function(event, ui) {
        ui.item.removeClass('highlight-1 highlight-3');
        ui.helper.removeClass('highlight-1 highlight-3');
        ui.helper.width(boxSize[0]); 
        ui.helper.height(boxSize[1]);
        ui.helper.addClass('highlight-2');
        ui.item.addClass('highlight-2');
      },
      start: function(event, ui) {
        ui.item.removeClass('highlight-1 highlight-3');
        ui.helper.removeClass('highlight-1 highlight-3');
        ui.helper.width(boxSize[0]); 
        ui.helper.height(boxSize[1]);
        ui.helper.addClass('highlight-2');
        ui.item.addClass('highlight-2');
      },
      receive: function(event, ui) {
        $(this).children('td').replaceWith(function(i, html) {
          return '<li class="highlight-2">' + html + '</li>';
        })
      },
      update: function(event, ui) {
        if($('.column-1 ul li').length === 0 && $('.column-2 ul li').length === 0 && $('.column-3 ul li').length === 0) {
          nextStep(5)
        }
      }
    });
    $('.column-3 .drop-zone').sortable({
      connectWith: '.drop-zone, table .active',
      over: function(event, ui) {
        ui.item.removeClass('highlight-1 highlight-2');
        ui.helper.removeClass('highlight-1 highlight-2');
        ui.helper.width(boxSize[0]); 
        ui.helper.height(boxSize[1]);
        ui.helper.addClass('highlight-3');
        ui.item.addClass('highlight-3');
      },
      start: function(event, ui) {
        ui.item.removeClass('highlight-1 highlight-2');
        ui.helper.removeClass('highlight-1 highlight-2');
        ui.helper.width(boxSize[0]); 
        ui.helper.height(boxSize[1]);
        ui.helper.addClass('highlight-3');
        ui.item.addClass('highlight-3');
      },
      receive: function(event, ui) {
        $(this).children('td').replaceWith(function(i, html) {
          return '<li class="highlight-3">' + html + '</li>';
        })
      },
      update: function(event, ui) {
        if($('.column-1 ul li').length === 0 && $('.column-2 ul li').length === 0 && $('.column-3 ul li').length === 0) {
          nextStep(5);
        }
      }
    });
  }
  // Table swapping code
  function initTableSwap() {
    $('#survey-progress').before('<div class="continue-button"><button id="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button"><span class="ui-button-text">Continue</span></button></div>');
     $('.continue-button #button').unbind();
    $('.continue-button #button').click(function(e) {
      nextStep(7);
    });
    $('#survey-progress').html('Step 3 of 5');
    $('.ui-draggable').draggable('destroy');
    $('.ui-droppable').droppable('destroy');
    swappability();
  }
  // Table storage code
  function storeTableData() {
    var table = document.getElementById('sort-table');
    for (var i = 0, row; row = table.rows[i]; i++) {
      for (var j = 0, col; col = row.cells[j]; j++) {
        var textContent = col.innerText;
        if(textContent === undefined) {
          textContent = col.textContent;
        }
        if(textContent){
          switch(j) {
            case 0:
              sortedData.n4.push(textContent);
              break;
            case 1:
              sortedData.n3.push(textContent);
              break;
            case 2:
              sortedData.n2.push(textContent);
              break;
            case 3:
              sortedData.n1.push(textContent);
              break;
            case 4:
              sortedData.z.push(textContent);
              break;
            case 5:
              sortedData.p1.push(textContent);
              break;
            case 6:
              sortedData.p2.push(textContent);
              break;
            case 7:
              sortedData.p3.push(textContent);
              break;
            case 8:
              sortedData.p4.push(textContent);
              break;
          }
        }
      }
    }
    $('#sort-table').animate({
      opacity: 0
    }, 500, function() {
      $(this).remove();
      $('.continue-button').animate({
        marginTop: '20px'
      }, 500);
      agreeDisagree();
    });
  }
  // Agree most, disagree most
  function agreeDisagree() {
    $('body').prepend('<div class="agree-answers answers"></div><div class="disagree-answers answers"></div>');
    $('.agree-answers').append('<h2>Agree</h2>');
    for(var i = 0; i < sortedData.p4.length; i++) {
      $('.agree-answers').append('<h3>' + sortedData.p4[i] + '</h3>');
      $('.agree-answers').append('<textarea id="agree-' + i + '"></textarea>');
    }
    $('.disagree-answers').append('<h2>Disagree</h2>');
    for(var i = 0; i < sortedData.n4.length; i++) {
      $('.disagree-answers').append('<h3>' + sortedData.n4[i] + '</h3>');
      $('.disagree-answers').append('<textarea id="disagree-' + i + '"></textarea>');
    }    
    $('#survey-progress').html('Step 4 of 5');
    $('.continue-button #button').unbind();
    $('.continue-button #button').click(function(e) {
      nextStep(9);
    });
  }
  
  // Store agree, disagree answers
  function storeAgreeDisagree() {
    explanations = {
      'agree': [],
      'disagree': []
    };
    for(var i = 0; i < sortedData.p4.length; i++) {
      explanations.agree.push(sortedData.p4[i] + ': ' + $('#agree-' + i).val());
    }
    for(var i = 0; i < sortedData.n4.length; i++) {
      explanations.disagree.push(sortedData.n4[i] + ': ' + $('#disagree-' + i).val());
    }
    $('.answers').animate({
      opacity: 0
    }, 500, function() {
      $('.answers').remove();
      survey();
    })
  }
  
  // Display end survey
  function survey() {
    $('body').prepend('<div class="answers"><h2>Age</h2><h4>Please enter your age:</h4><input type="number" name="year" id="input-year" min="18" max="1996"></div><div class="answers"><h2>Gender</h2><h4>Please enter your gender</h4><input type="text" name="gender" id="input-gender" maxlength="10"></div><div class="answers"><h2>Political Affiliation</h2><input type="text" name="politics" id="input-politics"></div><div class="answers"><h2>Religious Belief (if you have a denomination enter that as well)</h2><input type="text" name="religion" id="input-religion"></div><div class="answers"><h2>Ethnicity/Race</h2><input type="text" name="ethnicity" id="input-ethnicity"></div><div class="answers"><h2>Enter your country, city, and state</h2><input type="text" name="location" id="input-location"></div><div class="answers"><h2>Comments</h2><textarea id="comments"></textarea></div>');
    $('#survey-progress').html('Step 5 of 5');
    $('#button .ui-button-text').html('Complete Survey');
    $('.continue-button #button').unbind();
    $('.continue-button #button').click(function(e) {
      nextStep(11);
    });
  }
  
  // Complete survey
  function endSurvey() {
    $('body').prepend('<div id="thank-you">Submitting survey data...</div>');
    $('#thank-you').hide();
    surveyData = {
      'year': $('#input-year').val(),
      'gender': $('#input-gender').val(),
      'politics': $('#input-politics').val(),
      'religion': $('#input-religion').val(),
      'ethnicity': $('#input-ethnicity').val(),
      'location': $('#input-location').val(),
      'comments': $('#comments').val(),
    };
    $('.continue-button #button').unbind();
    $('.continue-button').animate({
      opacity: 0
    }, 500, function() {
      $(this).remove();
    })
    $('#survey-progress').animate({
      opacity: 0
    }, 500, function() {
      $(this).remove();
    });
    $('.answers').animate({
      opacity: 0
    }, 500, function() {
      $(this).remove();
      $('#thank-you').show();
    });

    $.post('assets/scripts/submit.php', {'n4[]': sortedData.n4, 'n3[]': sortedData.n3, 'n2[]': sortedData.n2, 'n1[]': sortedData.n1, 'z[]': sortedData.z, 'p1[]': sortedData.p1, 'p2[]': sortedData.p2, 'p3[]': sortedData.p3, 'p4[]': sortedData.p4, 'agree[]': explanations.agree, 'disagree[]': explanations.disagree, 'year': surveyData.year, 'gender': surveyData.gender, 'politics': surveyData.politics, 'religion': surveyData.religion, 'ethnicity': surveyData.ethnicity, 'location': surveyData.location, 'comments': surveyData.comments}, function(result) {
      console.log(result);
      if(result.status === 'success') {
        thankYouMessage();
      }
    });
  }
  
  // End survey message
  function thankYouMessage() {
    $('#thank-you').html(endMessage);
    
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
    });
    
    setTimeout(function () {window.location.href = 'https://uco.sona-systems.com/webstudy_credit.aspx?experiment_id=426&credit_token=cca44604eb86499aa28dec16c536bff4&survey_code=' + vars['id'];}, 5000);
  }
});

function swappability() {
  $('.active').draggable({
    helper: 'clone'
  });
  $('.active').droppable({
    accept: '.active',
    drop: function(event, ui) {
      var droppedItem = $(ui.draggable).clone().replaceAll(this);
      $(this).replaceAll(ui.draggable);
      setTimeout(function() {
        swappability();
      }, 250);
    }
  });
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}