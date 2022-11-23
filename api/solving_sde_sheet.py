def do_set_matrix_zero(data):
  animation_pair_index = []
  row = len(data)
  collumns = len(data[0])
  for i in range(row):
    for j in range(collumns):
        animation_pair_index.append([[i,j], False])
        animation_pair_index.append([[i,j], False])
        if data[i][j] == 0:
            animation_pair_index.append([[i,j], False])
            for k in range(collumns):   
                animation_pair_index.append([[i,k], False])
                animation_pair_index.append([[i,k], False])
                if data[i][k] != 0:
                    data[i][k] = -1
                    animation_pair_index.append([[i,k], -1])
                else:
                    animation_pair_index.append([[i,j], True])
            for r in range(row):
                animation_pair_index.append([[r,j], False])
                animation_pair_index.append([[r,j], False])
                if data[r][j] != 0:
                    data[r][j] = -1
                    animation_pair_index.append([[r,j], -1])
                else :
                    animation_pair_index.append([[i,j], True])
        else :    
            animation_pair_index.append([[i,j], False])

  return {
    'set_matrix_zero': animation_pair_index,
    'set_matrix_data': data
  }


