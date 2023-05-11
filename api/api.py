
import imp
import logging # debug purpose
from flask_cors import CORS
from ast import Return
from flask import Flask, request, jsonify
from sorting_algos import *
from generate_arrays import *
from solving_sde_sheet import *

app = Flask(__name__)
CORS(app)
@app.route('/', methods=['GET'])
def hello():
  return '<h1>Hello! The server is Up</h1>'

@app.route('/app/generate_array', methods=['POST'])
def call_generate_new_array():
  return generate_new_array()

@app.route('/app/generate_2darray', methods=['POST'])
def call_generate_new_2darray():
  return generate_new_2darray()

@app.route('/app/set_matrix_zero', methods=['POST'])
def call_set_matrix_zero():
  data = request.json
  app.logger.info(data)
  return do_set_matrix_zero(data['data'])

@app.route('/app/bubble_sort', methods=['POST'])
def call_bubble_sort():
  data = request.json
  app.logger.info(data)
  return do_bubble_sort(data['data'])

@app.route('/app/merge_sort', methods=['POST'])
def call_merge_sort():
  data = request.json
  app.logger.info(data)
  return do_merge_sort(data['data'])

if __name__ == '__main__':
  app.run(debug=True)
