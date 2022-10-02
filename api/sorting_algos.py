import random

def generate_new_array():
  randomlist = []
  for i in range(50):
    n = random.randint(5,600)
    randomlist.append(n)
  return {
  'generate_array': randomlist
  }

def bubble_sort(data):
  sort_array = data
  animation_pair_index = []
  array_length = len(data)
  for i in range(0, array_length-1):
    for j in range(0, array_length-i-1):
      if (sort_array[j] > sort_array[j+1]):
        animation_pair_index.append([j, j+1])
        temp = sort_array[j]
        sort_array[j] = sort_array[j+1]
        sort_array[j+1] = temp
  return {
  'bubble_sort': animation_pair_index,
  'sorted_array': sort_array
  }
    