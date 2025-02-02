import pygame
import asyncio

pygame.init()

pygame.display.set_mode((600, 400))

# while 1:
#     for event in pygame.event.get():
#         if event.type == pygame.QUIT:
#             exit()

async def main():
    global COUNT_DOWN
    # COUNT_DOWN = 3

    while True:
        while 1:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    exit()



asyncio.run(main())