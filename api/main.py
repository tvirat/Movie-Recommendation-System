#!/usr/bin/env python
# coding: utf-8

# # Movie Recommendation System
# In this jupyter notebook, I aim to create a recommendation system that gives users a set of recommeded movies based on the input movie given.

# In[1]:


# Import the required libraries:

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os


# In[2]:


# Get the ratings data from data/dataset.csv into a pandas dataframe
column_names = ["user_id", "item_id", "rating", "timestamp"]
data_path = os.path.join(os.path.dirname(__file__), '../data/dataset.csv')
df = pd.read_csv(data_path, sep = '\t', names = column_names)
df.head()


# In[3]:


# Get the movie titles from movie titles csv file
data_path = os.path.join(os.path.dirname(__file__), '../data/MovieIdTitles.csv')
movie_titles = pd.read_csv(data_path)
movie_titles.head()


# In[4]:


# Merge the movie titles dataframe with ratings dataframe
df = pd.merge(left = df, right = movie_titles, on = 'item_id', copy = False)
df.head()


# ## Do some exploratory work

# In[5]:


# Calculating the average rating for each movie title sorted in descending order

df.groupby('title')['rating'].mean().sort_values(ascending = False).head()


# In[6]:


# Calculating the number of rating for each movie title sorted in descending order

df.groupby('title')['rating'].count().sort_values(ascending = False).head()


# In[7]:


# Create a dataframe containing the movie title and its average rating

ratings = pd.DataFrame(df.groupby('title')['rating'].mean())
ratings.head()


# In[8]:


# Add a column in ratings conataining the number of rating associated/available for the specific movie title

ratings = ratings.assign(num_of_rating = df.groupby('title')['rating'].count())
ratings.head()


# In[9]:


# Plot a histogram showing the num_of_rating
fig = plt.hist(ratings.num_of_rating, bins = 70, edgecolor = 'black')


# In[10]:


# Plot a histogram of rating in ratings df
fig2 = plt.hist(ratings.rating, bins = 70, edgecolor = 'black')


# In[11]:


# Create a joint plot of movie rating and num_of_rating using seaborn's jointplot
sns.jointplot(data = ratings, x = ratings.num_of_rating, y = ratings.rating)


#  Create the Recommendation System
#  Create a matrix that has the user ids on one axis and the movie title on the another axis. 
#  Each cell will then consist of the rating the user gave to that movie. 
#  Note there will be a lot of NaN values, because most people have not watched most of the movies.

# In[12]:


rating_matrix = df.pivot_table(index='user_id', columns='title', values='rating')
rating_matrix.head()


# In[13]:


# Most rated movies with their average rating
ratings.sort_values(by = 'num_of_rating', ascending = False).head(10)


#  Now we will create a correlation matrix of every movie with every other movie on user ratings. 
#  We will then use that correlation matrix to find top matches that relates the best for a particular movie (having atleast 100 ratings) and 
#  the result obtained (recommended movies) will then be added to the ratings dataframe of every movie. Those whose matches could not be obtained 
#  using correlation, their value will be converted to "-".

# In[14]:


# Create the correlation matrix first
movie_corr_matrix = rating_matrix.corr(method = 'pearson')
movie_corr_matrix.head()


# In[15]:


# Calculate the number of ratings for each movie
movie_ratings_count = df.groupby('title')['rating'].count()

# Filter the correlation matrix
movies_with_30_ratings = movie_ratings_count[movie_ratings_count >= 30].index
filtered_corr_matrix = movie_corr_matrix.loc[movies_with_30_ratings, movies_with_30_ratings]
filtered_corr_matrix.head()


# In[ ]:


def get_top_matches(movie_title, num_matches):
    # Get the correlations for the specific movie
    movie_corr = filtered_corr_matrix[movie_title]
    
    # Sort the correlations and get the top matches
    top_matches = movie_corr.sort_values(ascending=False).head(num_matches + 1) # +1 to exclude the movie itself
    return top_matches.index[1:].tolist()  # Exclude the movie itself






