import os 
import telebot # type: ignore
from telebot import types  # type: ignore
from dotenv import load_dotenv # type: ignore

load_dotenv()

BOT_TOKEN = os.environ.get('BOT_TOKEN')

# print(BOT_TOKEN)
bot = telebot.TeleBot(BOT_TOKEN)

@bot.message_handler(commands = ['start', 'hello'])
def send_welcome(message):
    # bot.send_message(message.chat.id, "Hello, virgin motherfucker!!!\
    #              \nnow choose one of available options\
    #              \n""\
    #              \n(and the last one string, xxdxd)")
    
    # bot.reply_to(message, "choose one of available options")

    keyboard = types.InlineKeyboardMarkup(row_width = 2)
    button1 = types.InlineKeyboardButton('Click Me!!!', callback_data = '0')
    button2 = types.InlineKeyboardButton('Exit', callback_data = '1')
    keyboard.add(button1, button2)

    bot.send_message(message.chat.id, 'Hello, virgin motherfucker!!!\
                 \nnow choose one of available options\
                 \n''\
                 \n(and the last one string, xxdxd)', 
                 reply_markup = keyboard)



@bot.callback_query_handler(func = lambda call : True)
def answer(callback):
    if callback.message:
        bot.send_message(callback.message.chat.id, 'Congratulations, there is nothing you can find. FUCK OFF!!!')



@bot.message_handler(func = lambda msg: True)
def echo_all(message):
    bot.reply_to(message, message.text)
 



bot.infinity_polling()
