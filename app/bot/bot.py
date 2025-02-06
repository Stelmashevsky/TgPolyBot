import os 
import telebot
from telebot import types
from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = os.environ.get('BOT_TOKEN')

# print(BOT_TOKEN)
bot = telebot.TeleBot(BOT_TOKEN)

@bot.message_handler(commands = ['start'])
def send_welcome(message):

    bot.send_game(chat_id = message.chat.id, game_short_name = 'TestAppGame')

@bot.callback_query_handler(func = lambda callback_query : callback_query.game_short_name == 'TestAppGame')
def game(call):

    bot.answer_callback_query(callback_query_id = call.id, url = 'https://stelmashevsky.github.io/web_pong/')

# @bot.message_handler(func = lambda msg: True)
# def echo_all(message):
#     bot.reply_to(message, message.text)
 
if __name__ == "__main__":
    bot.infinity_polling()
