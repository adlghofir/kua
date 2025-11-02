

var all_questions = [{
  question_string: "Jika terjadi perbedaan pendapat antara suami dan istri, sikap yang paling tepat untuk dilakukan adalah",
  choices: {
    correct: "Membicarakannya dengan tenang dan saling mendengarkan",
    wrong: ["Meninggikan suara agar pasangan mengerti", "Diam dan menghindari pembicaraan", "Meminta orang tua turun tangan setiap kali ada masalah"]
  }
}, {
  question_string: "Pernikahan disebut “mitsaqan ghalidzan” karena…",
  choices: {
    correct: "Merupakan perjanjian yang kuat, sakral, dan mengikat di hadapan Allah",
    wrong: ["Termasuk kontrak yang menguntungkan kedua belah pihak", "Dilakukan di hadapan pejabat negara", "Memerlukan pesta yang meriah"]
  }
},{
  question_string: "Salah satu prinsip pengelolaan keuangan yang baik adalah…",
  choices: {
    correct: "Menyisihkan sebagian pendapatan untuk tabungan dan dana darurat",
    wrong: ["Tidak membuat catatan keuangan", "Menggunakan pendapatan sesuai keinginan", "Menunda pembayaran utang"]
  }
},{
  question_string: "Salah satu prinsip pengasuhan anak dalam keluarga sakinah adalah",
  choices: {
    correct: "Memberikan kasih sayang dan menanamkan nilai-nilai agama sejak dini",
    wrong: ["Menjadikan anak sebagai sumber penghasilan", "Membiarkan anak tumbuh tanpa aturan", "Memberi fasilitas mewah tanpa kedekatan emosional"]
  }
},{
  question_string: "Jika terjadi konflik dengan suami, sikap terbaik seorang istri adalah",
  choices: {
    correct: "Berdiskusi secara terbuka dan mencari solusi bersama",
    wrong: ["Mendiamkan suami selama mungkin", "Langsung curhat ke media sosial", "Meninggalkan rumah agar suami menyadari kesalahannya"]
  }
},{
  question_string: "Berikut yang bukan termasuk bentuk intimasi dalam perkawinan adalah…",
  choices: {
    correct: "Menyembunyikan masalah dari pasangan",
    wrong: ["Saling menghargai perasaan pasangan", "Menyembunyikan masalah dari pasangan", "Menghabiskan waktu berkualitas bersama"]
  }
},{
  question_string: "Yang dimaksud intimasi fisik bukan hanya hubungan seksual, tetapi juga…",
  choices: {
    correct: "Sentuhan hangat, pelukan, atau genggaman tangan",
    wrong: ["Memberikan hadiah yang mahal", "Mengirim pesan singkat", "Membatasi interaksi sosial pasangan"]
  }
},{
  question_string: "Salah satu cara mengurangi konflik rumah tangga adalah…",
  choices: {
    correct: "Menyelesaikan masalah secara terbuka dan bersama",
    wrong: ["Memendam perasaan", "Menghindari pembahasan masalah", "Menyalahkan satu pihak"]
  }
},{
  question_string: "Salah satu penyebab utama perceraian yang berkaitan dengan tantangan perkawinan adalah…",
  choices: {
    correct: "Kurangnya komunikasi dan kepercayaan",
    wrong: ["Banyaknya waktu bersama", "Saling memberi perhatian", "Kesamaan tujuan hidup"]
  }
},{
  question_string: 'Dalam kehidupan rumah tangga, suami berkewajiban',
  choices: {
    correct: "Memberi nafkah lahir dan batin kepada istri",
    wrong: ["Membebani istri dengan seluruh pekerjaan rumah", "Mengatur keuangan istri tanpa diskusi", "Menentukan semua keputusan rumah tangga sendiri"]
  }
}];
var Quiz = function(quiz_name) {
  this.quiz_name = quiz_name;
  this.questions = [];
}
Quiz.prototype.add_question = function(question) {
  var index_to_add_question = Math.floor(Math.random() * this.questions.length);
  this.questions.splice(index_to_add_question, 0, question);
}
Quiz.prototype.render = function(container) {
  var self = this;
  $('#quiz-results').hide();
  $('#quiz-name').text(this.quiz_name);
  var question_container = $('<div>').attr('id', 'question').insertAfter('#quiz-name');
  function change_question() {
    self.questions[current_question_index].render(question_container);
    $('#prev-question-button').prop('disabled', current_question_index === 0);
    $('#next-question-button').prop('disabled', current_question_index === self.questions.length - 1);
    var all_questions_answered = true;
    for (var i = 0; i < self.questions.length; i++) {
      if (self.questions[i].user_choice_index === null) {
        all_questions_answered = false;
        break;
      }
    }
    $('#submit-button').prop('disabled', !all_questions_answered);
  }
  var current_question_index = 0;
  change_question();
  $('#prev-question-button').click(function() {
    if (current_question_index > 0) {
      current_question_index--;
      change_question();
    }
  });
 
  $('#next-question-button').click(function() {
    if (current_question_index < self.questions.length - 1) {
      current_question_index++;
      change_question();
    }
  });
  $('#submit-button').click(function() {
    var score = 0;
    for (var i = 0; i < self.questions.length; i++) {
      if (self.questions[i].user_choice_index === self.questions[i].correct_choice_index) {
        score++;
      }
    }
    var percentage = score / self.questions.length;
    console.log(percentage);
    var message;
    if (percentage === 1) {
      message = 'Lulus Maksimal'
    } else if (percentage >= .75) {
      message = 'Tidak ada salahnya untuk mencoba lagi.'
    } else if (percentage >= .5) {
      message = 'Bisa di coba lagi.'
    } else {
      message = 'Kamu tidak lulus, mohon diulang lagi'
    }
    $('#quiz-results-message').text(message);
    $('#quiz-results-score').html('Mendapatkan score <b>' + score + '/' + self.questions.length + '</b> pertanyaan. <br/> <br/> ');
    $('#quiz-results').slideDown();
    $('#quiz button').slideUp();
  });
  question_container.bind('user-select-change', function() {
    var all_questions_answered = true;
    for (var i = 0; i < self.questions.length; i++) {
      if (self.questions[i].user_choice_index === null) {
        all_questions_answered = false;
        break;
      }
    }
    $('#submit-button').prop('disabled', !all_questions_answered);
  });
}

var Question = function(question_string, correct_choice, wrong_choices) {
  // Private fields for an instance of a Question object.
  this.question_string = question_string;
  this.choices = [];
  this.user_choice_index = null; // Index of the user's choice selection
  
  // Random assign the correct choice an index
  this.correct_choice_index = Math.floor(Math.random() * wrong_choices.length + 1);
  
  // Fill in this.choices with the choices
  var number_of_choices = wrong_choices.length + 1;
  for (var i = 0; i < number_of_choices; i++) {
    if (i === this.correct_choice_index) {
      this.choices[i] = correct_choice;
    } else {
      // Randomly pick a wrong choice to put in this index
      var wrong_choice_index = Math.floor(Math.random(0, wrong_choices.length));
      this.choices[i] = wrong_choices[wrong_choice_index];
      
      // Remove the wrong choice from the wrong choice array so that we don't pick it again
      wrong_choices.splice(wrong_choice_index, 1);
    }
  }
}

Question.prototype.render = function(container) {

  var self = this;
  

  var question_string_h2;
  if (container.children('h2').length === 0) {
    question_string_h2 = $('<h2>').appendTo(container);
  } else {
    question_string_h2 = container.children('h2').first();
  }
  question_string_h2.text(this.question_string);
  

  if (container.children('input[type=radio]').length > 0) {
    container.children('input[type=radio]').each(function() {
      var radio_button_id = $(this).attr('id');
      $(this).remove();
      container.children('label[for=' + radio_button_id + ']').remove();
    });
  }
  for (var i = 0; i < this.choices.length; i++) {
    var choice_radio_button = $('<input>')
      .attr('id', 'choices-' + i)
      .attr('type', 'radio')
      .attr('name', 'choices')
      .attr('value', 'choices-' + i)
      .attr('checked', i === this.user_choice_index)
      .appendTo(container);
    

    var choice_label = $('<label>')
      .text(this.choices[i])
      .attr('for', 'choices-' + i)
      .appendTo(container);
  }
  
  
  $('input[name=choices]').change(function(index) {
    var selected_radio_button_value = $('input[name=choices]:checked').val();
    
 
    self.user_choice_index = parseInt(selected_radio_button_value.substr(selected_radio_button_value.length - 1, 1));
    
  
    container.trigger('user-select-change');
  });
}


$(document).ready(function() {

  var quiz = new Quiz('');
  
  for (var i = 0; i < all_questions.length; i++) {

    var question = new Question(all_questions[i].question_string, all_questions[i].choices.correct, all_questions[i].choices.wrong);

    quiz.add_question(question);
  }

  var quiz_container = $('#quiz');
  quiz.render(quiz_container);
});


