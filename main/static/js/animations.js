$(document).ready(function(){

initialize_selected_entries();

$(window).load(function(){
  check_upload_progress();
  setTimeout(function() {
    $('#mainPreloader').fadeOut();
  }, 3000);
});

profile_options = 'closed'

$('#profile-options').hide();
$('#replyError').hide();
$('#replySuccess').hide();

$('.form-control.floatlabel').floatlabel({
    labelEndTop:'-2px'
});

$(".datepicker").datepicker({
    dateFormat: "MM dd, yy"
});

$('#user-icon-container').on('click', function () {
    var $this = jQuery(this);
    if ($this.data('activated')) return false;  // Pending, return
    $this.data('activated', true);
    setTimeout(function() {
      $this.data('activated', false)
    }, 500); // Freeze for 500ms

    if ((typeof profile_options === 'undefined') || (profile_options == 'closed')){
        var travel_width = $('#profile-options').width();
        $('#user-icon-container').animate({'margin-right':travel_width+2});
        profile_options = 'open'
        setTimeout(function() {
            $('#profile-options').fadeIn();
        }, 500); // Freeze for 500ms
    }
    else{
        $('#profile-options').fadeOut();
        profile_options = 'closed'
        setTimeout(function() {
            $('#user-icon-container').animate({'margin-right':'0'});
        }, 500); // Freeze for 500ms
    }
});

$('#composeMessage').on('click', function (e) {
    $('#messageContainer').show();
    $('#messageContainer').removeClass('minimized');
    $('#messageBody').focus();
});

$('#file').on('change', function (e) {
  if ($(this).get(0).files.length === 0) {
    $('#sendReminderBtn').attr('disabled', true);
  }
  else {
    $('#sendReminderBtn').attr('disabled', false);
  }
});

$('#contactsFile').on('change', function (e) {
  if ($(this).get(0).files.length === 0) {
    $('#uploadContactsBtn').attr('disabled', true);
  }
  else {
    $('#uploadContactsBtn').attr('disabled', false);
  }
});

$('#minimizeMessage').on('click', function (e) {
    $('#messageContainer').addClass('minimized');
});

$('#closeMessage').on('click', function (e) {
    $('#messageContainer').hide();
    initialize_recipients();
});

(function() {
  $('.message-header div').on('click', function(e){
    if (e.target == this){
      $('#messageContainer').toggleClass('minimized');
    }
  });
})();

(function() {
  $('.contact-type-picker').on('click', function(e){
    $('.contact-type-picker').removeClass('selected');
    $(this).toggleClass('selected');
  });
})();

(function() {
  $('.profile-settings-btn').on('click', function(e){
    alert('This feature will be available on paid version.');
  });
})();

(function() {
  $('#closeReplyError').on('click', function(e){
    $('#replyError').fadeOut();
  });
})();

(function() {
  $('#closeReplySuccess').on('click', function(e){
    $('#replySuccess').fadeOut();
  });
})();

$('#createGroupModal').on('shown.bs.modal', function () {
    $('#addGroupName').focus();
});

$('#changePasswordModal').on('shown.bs.modal', function () {
    $('#changePasswordText').focus();
});

$('#addUserModal').on('shown.bs.modal', function () {
    $('#addUserName').focus();
});

$('#resetPasswordModal').on('shown.bs.modal', function () {
    $('#resetPasswordText').focus();
});

$('#addContactModal').on('shown.bs.modal', function () {
    $('#addContactName').focus();
});

$('#saveContactModal').on('hidden.bs.modal', function () {
  $('#saveContactModal .form-control').val('');
  $('#saveContactModal .form-control').change();
  $('#saveContactModal .contact-type-picker.selected').removeClass('selected');
  $('#saveContactModal .group-picker-save.selected').removeClass('selected');
  setTimeout(function() {
    $('#saveContactBtn').attr('disabled', true);
  }, 500);
});

$('#addUserModal').on('hidden.bs.modal', function () {
  $('#addUserModal .form-control').val('');
  $('#addUserModal .form-control').change();
  $('#addUserModal .error-icon-container').addClass('hidden');
  $('#addUserModal .form-control').css('border-bottom','1px solid #999');
});

$('#addReminderModal').on('hidden.bs.modal', function () {
  $('#file').val('');
});

$('#uploadContactsModal').on('hidden.bs.modal', function () {
  $('#contactsFile').val('');
});

$('#groupMembersModal').on('hidden.bs.modal', function () {
  $('#saveGroupEditBtn').attr('disabled', true);
});

$('#createGroupModal').on('hidden.bs.modal', function () {
  $('#addGroupName').val('');
  $('#addGroupName').change();
  $('#createGroupModal .error-icon-container').addClass('hidden');
  $('#createGroupModal .form-control').css('border-bottom','1px solid #999');
  $('#saveGroupBtn').attr('disabled', true);
});

$('#addContactModal').on('hidden.bs.modal', function () {
  $('#addContactModal .form-control').val('');
  $('#addContactModal .form-control').change();
  $('#addContactModal .contact-type-picker.selected').removeClass('selected');
  $('#addContactModal .group-picker-add.selected').removeClass('selected');
  $('#addContactModal .error-icon-container').addClass('hidden');
  $('#addContactModal .form-control').css('border-bottom','1px solid #999');
  setTimeout(function() {
    $('#addContactBtn').attr('disabled', true);
    }, 500);
});

svg = $('#loaderSVG').drawsvg({
  callback: function() {
    animate();
  }
});

function animate() {
  svg.drawsvg('animate');  
}

animate();

$('.search-conversations').keypress(function(e){
    if (e.which == 13) {
      search_conversations($(this).attr('id'));
    }
});

$('#searchGroupFromContact').keypress(function(e){
    if (e.which == 13) {
      search_groups_from_contact($(this).val());
    }
});

$('#searchGroupFromContactSave').keypress(function(e){
    if (e.which == 13) {
      search_groups_from_save($(this).val());
    }
});

$('#addNumberRecipient').keyup(function(e){
  if (($(this).val() != '') && ($(this).val().length == 11) && (!isNaN($(this).val()))) {
    $('#addNumberRecipientBtn').attr('disabled',false);
  }
  else {
    $('#addNumberRecipientBtn').attr('disabled',true);
  }
});

$('#changePasswordModal .form-control').keyup(function(e){
  password = $('#changePasswordText').val();
  password_confirm = $('#changePasswordConfirmText').val();

  if ((password != '') && (password_confirm != '') && (password == password_confirm)) {
    $('#savePasswordBtn').attr('disabled',false);
  }
  else {
    $('#savePasswordBtn').attr('disabled',true);
  }
});

$('#searchContactGroups').keypress(function(e){
    if (e.which == 13) {
      search_contact_groups();
    }
});

$('#searchRecipientName').keypress(function(e){
    if (e.which == 13) {
      search_contact_recipients();
    }
});

$('.conversations-check').on('click', function () {
  var entry_id = $(this).attr('data-id');
  if ($(this).hasClass('checked')) {
    $(this).removeClass('checked');
    $(this).html('&#xE835;');
    deselect_conversation(entry_id);
  }
  else {
    $(this).addClass('checked');
    $(this).html('&#xE834;');
    select_conversation(entry_id);
  }
});

$('.conversations-star').on('click', function () {
  if ($(this).hasClass('checked')) {
    $(this).removeClass('checked');
    $(this).html('&#xE83A;');
  }
  else {
    $(this).addClass('checked');
    $(this).html('&#xE838;');
  }
});

$('.blasts-check').on('click', function () {
  var entry_id = $(this).attr('data-id');
  if ($(this).hasClass('checked')) {
    $(this).removeClass('checked');
    $(this).html('&#xE835;');
    deselect_blast(entry_id);
  }
  else {
    $(this).addClass('checked');
    $(this).html('&#xE834;');
    select_blast(entry_id);
  }
});

$('.reminders-check').on('click', function () {
  var entry_id = $(this).attr('data-id');
  if ($(this).hasClass('checked')) {
    $(this).removeClass('checked');
    $(this).html('&#xE835;');
    deselect_reminder(entry_id);
  }
  else {
    $(this).addClass('checked');
    $(this).html('&#xE834;');
    select_reminder(entry_id);
  }
});

$('.contacts-check').on('click', function () {
  var entry_id = $(this).attr('data-id');
  if ($(this).hasClass('checked')) {
    $(this).removeClass('checked');
    $(this).html('&#xE835;');
    deselect_contact(entry_id);
  }
  else {
    $(this).addClass('checked');
    $(this).html('&#xE834;');
    select_contact(entry_id);
  }
});

$('.groups-check').on('click', function () {
  var entry_id = $(this).attr('data-id');
  if ($(this).hasClass('checked')) {
    $(this).removeClass('checked');
    $(this).html('&#xE835;');
    deselect_group(entry_id);
  }
  else {
    $(this).addClass('checked');
    $(this).html('&#xE834;');
    select_group(entry_id);
  }
});

$('#addUserModal .form-control').on('keyup', function () {
  name = $('#addUserName').val();
  email = $('#addUserEmail').val();
  temp_pw = $('#addUserPassword').val();
  temp_pw_confirm = $('#addUserPasswordConfirm').val();
  role = $('#addUserRole').val();

  if ((name != '') && (email != '') && (temp_pw != '') && (temp_pw_confirm != '') && (temp_pw_confirm == temp_pw) && (role != undefined)) {
    $('#saveUserBtn').attr('disabled',false);
  }
  else {
    $('#saveUserBtn').attr('disabled',true);
  }
});

$('#addUserModal .form-control').on('change', function () {
  name = $('#addUserName').val();
  email = $('#addUserEmail').val();
  temp_pw = $('#addUserPassword').val();
  role = $('#addUserRole').val();

  if ((name != '') && (email != '') && (temp_pw != '') && (role != undefined)) {
    $('#saveUserBtn').attr('disabled',false);
  }
  else {
    $('#saveUserBtn').attr('disabled',true);
  }
});

$('#resetPasswordModal .form-control').on('keyup', function () {
  temp_pw = $('#resetPasswordText').val();
  temp_pw_confirm = $('#resetPasswordConfirmText').val();
  role = $('#addUserRole').val();

  if ((temp_pw != '') && (temp_pw_confirm != '') && (temp_pw_confirm == temp_pw)) {
    $('#resetPasswordBtn').attr('disabled',false);
  }
  else {
    $('#resetPasswordBtn').attr('disabled',true);
  }
});

});