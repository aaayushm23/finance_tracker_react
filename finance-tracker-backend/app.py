from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Expense

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.before_request
def create_tables():
    if not hasattr(app, 'tables_created'):
        db.create_all()
        app.tables_created = True

@app.route('/')
def home():
    return "Personal Finance Tracker API"

@app.route('/expenses', methods=['POST'])
def add_expense():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid input"}), 400
        
        new_expense = Expense(category=data['category'], amount=data['amount'], description=data['description'])
        db.session.add(new_expense)
        db.session.commit()
        return jsonify(new_expense.to_dict()), 201
    except Exception as e:
        print(f"Error adding expense: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

@app.route('/expenses', methods=['GET'])
def get_expenses():
    try:
        expenses = Expense.query.all()
        return jsonify([expense.to_dict() for expense in expenses]), 200
    except Exception as e:
        print(f"Error fetching expenses: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

@app.route('/expenses/<int:id>', methods=['DELETE'])
def delete_expense(id):
    try:
        expense = Expense.query.get(id)
        if expense:
            db.session.delete(expense)
            db.session.commit()
            return '', 204
        return jsonify({'error': 'Expense not found'}), 404
    except Exception as e:
        print(f"Error deleting expense: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

if __name__ == '__main__':
    app.run(debug=True)
