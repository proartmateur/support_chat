var socket = io();
var scroll_h = 400;

/**
 * Emite (envía) el mensaje al servidor y borra el input
 * Emit (send) the message to the server and clean the input
 */
$('form').submit(function() {
    socket.emit('agent/message', { message: $('#message').val(),
      usr: 'Guest' });
    $('#message').val('');

  return false;
});

/**
 * Dibuja un globo de texto en el chat (chat item)
 * Draws a chat message item
 * @param {String} user_name is a name of user
 * @param {String} message of chat item
 * @param {boolean} me if true, draws green item
 * @returns {String} html code that draws the item
 */
function draw_chat_item(user_name, message, me) {
    let item = '';

    if (me) {
        item = `<li class="me">
            <div class="item_id">
                ${user_name}
            </div>
            <div class="item_text">
                ${message}
            </div>
            
        </li>`;
    } else {
        item = `<li>
            <div class="item_id">
                ${user_name}
            </div>
            <div class="item_text">
                ${message}
            </div>
            
        </li>`;
    }

return item;

}

/**
 * Agrega un globo de texto a la pila de mensajes
 * Add a chat item to message stack
 * @param {String} item html code
 * @param {Object} msg from socket
 */
function append_chat_item(item, msg) {
  $('#messages').append($(item));
  let height_scroll = 300;

  if (msg.message.length > 500) {
      height_scroll = msg.message.length;
  }

  scroll_h += height_scroll;
  $('#messages').animate({ scrollTop: scroll_h }, 800);

}

/**
 * Recibe un mensaje y lo dibuja en la interfaz de usuario
 * Get a message and draw inside UI 
 */
socket.on('agent/message', function(msg) {
    console.log(msg);
    const $elem = $('#messages');

    let item = '';
    let me = false;

    if (msg.id) {
        if (msg.id === socket.id) {
            me = true;
        } else {
            me = false;
        }

        if (msg.message === '') {
            console.debug('Empty message');
        } else {
            let user_name = '';

            if (me) {
                user_name = 'Yo';
            } else {
                user_name = msg.usr;
            }
            item = draw_chat_item(user_name, msg.message, me);
            append_chat_item(item, msg);

        }
    }
});
