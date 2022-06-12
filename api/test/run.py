from crypt import methods
from flask import Flask, render_template, request
import pickle

app = Flask(__name__)

@app.route('/')
@app.route('/index', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        model = pickle.load(open('naivebayes.pkl', 'rb'))
        user_input = request.form.get('nbind', 'nbing', 'nmtk', 'nkim', 'nfis', 'nbio', 'nsert', 'nakre')
        print(user_input, type(user_input))
        user_input = float(user_input)
        prdiction = model.predict([[user_input]])
        print('Hasil dari rasionaliasimu adalah ', prdiction)
        return render_template('index.html', prediction=prdiction)

if __name__ == '__main__':
    app.run(debug=True)    
