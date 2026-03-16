from datetime import datetime

def generate_study_plan(subjects, available_hours_per_day, plan_days):
    today = datetime.now()
    schedule = {}

    # Calculate priority for each subject
    for subject in subjects:
        exam_date = datetime.strptime(subject['examDate'], '%Y-%m-%d')
        days_until_exam = max((exam_date - today).days, 1)
        urgency = 1 / days_until_exam
        priority = subject['difficulty'] * urgency
        subject['priority'] = priority

    # Normalize priorities
    total_priority = sum(s['priority'] for s in subjects)

    for subject in subjects:
        subject['daily_hours'] = round(
            (subject['priority'] / total_priority) * available_hours_per_day, 1
        )

    # Build day by day schedule
    for day in range(1, plan_days + 1):
        schedule[f'Day {day}'] = []
        for subject in subjects:
            if subject['daily_hours'] > 0:
                schedule[f'Day {day}'].append({
                    'subject': subject['name'],
                    'hours': subject['daily_hours'],
                    'difficulty': subject['difficulty']
                })

    return schedule