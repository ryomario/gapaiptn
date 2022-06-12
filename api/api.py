import time
from wsgiref import headers
from flask import Flask, request, jsonify
import requests
from flask_cors import cross_origin, CORS
import joblib

app = Flask(__name__)
app.config['SECRET_KEY'] = 'rahasia umum'
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={r"/rasionalisasi":{"origins":"http://localhost:3000"}})

@app.route("/time")
def get_time():
  return {'time':time.time()}

@cross_origin(origins="localhost",headers=["Content-Type","Authorization"])
@app.route("/rasionalisasi",methods=['POST'])
def rasionalisasi():
  print("request ",request.method)
  if request.method == 'POST':
    # file = open("test/naivebayes.pkl","rb")
    model = joblib.load("test/naivebayes.pkl")
    # user_input = request.form.get('nbind', 'nbing', 'nmtk', 'nkim', 'nfis', 'nbio', 'nsert', 'nakre')
    # user_input = [0,0,0,0,0,0,10,30]
    # print("request ",dict(request.json))
    data = dict(request.json)
    input = [
      data['ind'],
      data['ing'],
      data['mtk'],
      data['kim'],
      data['fsk'],
      data['bio'],
      data['sertifikat'],
      data['akreditasi']
    ]
    # data['pilihan-1']['ptn'] # data ptn 1 
    # data['pilihan-1']['prodi'] # data prodi 1 
    # data['pilihan-2']['ptn'] # data ptn 2
    # data['pilihan-2']['prodi'] # data prodi 2 
    print("input ",input)
    prdiction = model.predict([input])
    print('Hasil dari rasionaliasimu adalah ', prdiction[0])
    # hitung prosentase
    response = jsonify(
      {
        'status':int(prdiction[0]),
        'prosentase-1':100,
        'prosentase-2':100,
      }
    )
    response.headers.add("Access-Control-Allow-Origin","*")
    return response


if __name__ == "__main__":
  app.run(host="0.0.0.0",port="5000", debug=True)