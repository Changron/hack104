function appendMsg() {
  var reply = document.getElementById("reply").value;
  document.getElementById('msg').innerHTML += '\
  <div class="msg-send-group">\
      <div class="d-flex align-items-end flex-column bd-highlight">\
        <div class="p-2 bd-highlight">\
          <div class="card text-white bg-primary">\
            <div class="card-body">\
              '+ reply +'\
            </div>\
          </div>\
        </div>\
      </div>\
    </div>';
    document.getElementById("reply").value = '';
}