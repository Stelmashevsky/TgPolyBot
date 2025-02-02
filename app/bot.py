import os 
import telebot
from telebot import types
from dotenv import load_dotenv

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
    miniApp = types.WebAppInfo("https://689cd992-42f7-4c0b-80ba-996f08286a4b.tunnel4.com")
    button1 = types.InlineKeyboardButton('Click Me!!!', web_app=miniApp)
    button2 = types.InlineKeyboardButton('Exit', callback_data = '1')
    keyboard.add(button1, button2)

    bot.send_message(message.chat.id, 'Hello, my name is Loid!\
                     \n''\
                     \nLet`s play something:',
                     reply_markup = keyboard)
                # \n''\
                # \n(and the last one string, xxdxd)',


@bot.callback_query_handler(func = lambda call : True)
def answer(callback):
    if callback.message:
        bot.send_message(callback.message.chat.id, 'Great choice!')
        


@bot.message_handler(func = lambda msg: True)
def echo_all(message):
    bot.reply_to(message, message.text)
 



bot.infinity_polling()
