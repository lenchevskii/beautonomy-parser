# Import the module
import instaloader

# Create an instance of Instaloader class
bot = instaloader.Instaloader()

# Login with username and password in the script
bot.login(user="**",passwd="**")

# Interactive login on terminal
# bot.interactive_login("your username") # Asks for password in the terminal

# Load a new profile
profile = instaloader.Profile.from_username(bot.context, 'mariahlleonard')

# Get all posts in a generator object
posts = profile.get_posts()

# Iterate and download
for index, post in enumerate(posts, 1):
    bot.download_post(post, target=f"{profile.username}_{index}")
