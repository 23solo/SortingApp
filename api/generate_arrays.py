import random, math

def generate_new_array():
  randomlist = []
  for i in range(150):
    n = random.randint(5,600)
    randomlist.append(n)
  return {
  'generate_array': randomlist
  }


def generate_new_2darray():
  row = random.randint(2,5)
  collumn = random.randint(2,5)
  random2Dlist = [[random.randint(0,100) for i in range(collumn)] for j in range(row)]
  num_of_zeros = random.randint(1,row*collumn - int(math.sqrt(row*collumn)))
  for i in range(num_of_zeros):
    random_row = random.randint(0,row-1)
    random_collumn = random.randint(0, collumn-1)
    random2Dlist[random_row][random_collumn] = 0
  return {
  'generate_2darray': random2Dlist
  }
