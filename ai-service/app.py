from flask import Flask, request, jsonify
from flask_cors import CORS
from planner import generate_study_plan

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'AI Study Planner Service is running!'})

@app.route('/generate-plan', methods=['POST'])
def generate_plan():
    try:
        data = request.json
        
        subjects = data.get('subjects', [])
        available_hours = data.get('availableHours', 3)
        plan_days = data.get('planDays', 7)

        if not subjects:
            return jsonify({'error': 'No subjects provided'}), 400

        plan = generate_study_plan(subjects, available_hours, plan_days)
        
        return jsonify({
            'success': True,
            'plan': plan,
            'totalDays': plan_days,
            'dailyHours': available_hours
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)