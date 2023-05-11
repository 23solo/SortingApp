def do_bubble_sort(data):
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



def do_merge_sort(data):
  animation_pairs = []
  def merge(low, mid, high, data):
    left_array_length = mid - low + 1
    right_array_length = high - mid
    # Creating temp arrays for low to mid and mid to high
    left_array, right_array = [0]*left_array_length, [0]*right_array_length
    for i in range(0, left_array_length):
      left_array[i] = data[i + low]

    for i in range(0, right_array_length):
      right_array[i] = data[mid + i + 1]

    index_left_array = 0 
    index_right_array = 0
    merge_index = low

    while(index_left_array < left_array_length and index_right_array < right_array_length):
      animation_pairs.append([low + index_left_array, low + index_right_array])
      animation_pairs.append([low + index_left_array, low + index_right_array])
      if(left_array[index_left_array] <= right_array[index_right_array]):
        animation_pairs.append([merge_index, left_array[index_left_array]])
        data[merge_index] = left_array[index_left_array]
        index_left_array += 1
      else:
        animation_pairs.append([merge_index, right_array[index_right_array]])
        data[merge_index] = right_array[index_right_array]
        index_right_array += 1
      merge_index += 1


    while (index_left_array < left_array_length):
      animation_pairs.append([low + index_left_array, low + index_left_array])
      animation_pairs.append([low + index_left_array, low + index_left_array])
      animation_pairs.append([merge_index, left_array[index_left_array]])
      data[merge_index] = left_array[index_left_array]
      index_left_array += 1
      merge_index += 1
    
    while (index_right_array < right_array_length):
      animation_pairs.append([low + index_right_array, low + index_right_array])
      animation_pairs.append([low + index_right_array, low + index_right_array])
      animation_pairs.append([merge_index, right_array[index_right_array]])
      data[merge_index] = right_array[index_right_array]
      index_right_array += 1
      merge_index += 1
 
  def merge_sort(low, high, data):
    if low >= high:
      return
    
    mid = (low + high )//2
    merge_sort(low, mid, data)
    merge_sort(mid+1, high, data)
    merge(low, mid, high, data)

  merge_sort(0, len(data)-1, data)
  return {
    'merge_sort': animation_pairs,
    'sorted_array': data
  }

