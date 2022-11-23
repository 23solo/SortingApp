
import imp
import logging # debug purpose

from ast import Return
from flask import Flask, request
from sorting_algos import *
from generate_arrays import *
from solving_sde_sheet import *

app = Flask(__name__)

@app.route('/api/generate_array', methods=['POST'])
def call_generate_new_array():
  return generate_new_array()

@app.route('/api/generate_2darray', methods=['POST'])
def call_generate_new_2darray():
  return generate_new_2darray()

@app.route('/api/set_matrix_zero', methods=['POST'])
def call_set_matrix_zero():
  data = request.json
  app.logger.info(data)
  return do_set_matrix_zero(data['data'])

@app.route('/api/bubble_sort', methods=['POST'])
def call_bubble_sort():
  data = request.json
  app.logger.info(data)
  return do_bubble_sort(data['data'])

@app.route('/api/merge_sort', methods=['POST'])
def call_merge_sort():
  data = request.json
  app.logger.info(data)
  return do_merge_sort(data['data'])

if __name__ == '__main__':
  app.run(debug=True)
