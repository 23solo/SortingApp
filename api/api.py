
import logging # debug purpose

from ast import Return
from flask import Flask, request
from sorting_algos import *

app = Flask(__name__)

@app.route('/api/generate_array', methods=['POST'])
def call_generate_new_array():
  return generate_new_array()

@app.route('/api/bubble_sort', methods=['POST', 'GET'])
def call_bubble_sort():
  data = request.json
  app.logger.info(data)
  return do_bubble_sort(data['data'])

@app.route('/api/merge_sort', methods=['POST'])
def call_merge_sort():
  data = request.json
  app.logger.info(data)
  return do_merge_sort(data['data'])

@app.route('/', methods=['GET'])
def call_home():
  return '<h1>Hello ! The server is Up</h1>'

if __name__ == '__main__':
  app.run(debug=True)
