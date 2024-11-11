from flask import Flask, request, jsonify, send_from_directory, redirect, url_for, session, render_template, has_request_context
import pandas as pd
import os
import numpy as np
import matplotlib
matplotlib.use('Agg')  # Sử dụng backend 'Agg' để không yêu cầu giao diện GUI
import matplotlib.pyplot as plt

from ML_main import reject
from ML_main import test_data

os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import tensorflow as tf
app = Flask(__name__)
app.secret_key = os.urandom(24)

#************************************************************************************************************** */
#************************************************************************************************************** */
#************************************************************************************************************** */
# Thêm các route để phục vụ file CSS
@app.route('/styles.css')
def styles():
    return app.send_static_file('styles.css')

@app.route('/styles_dashboard.css')
def styles_dashboard():
    return app.send_static_file('styles_dashboard.css')

@app.route('/styles_contact.css')
def styles_contact():
    return app.send_static_file('styles_contact.css')

@app.route('/styles_docs.css')
def styles_docs():
    return app.send_static_file('styles_docs.css')

@app.route('/styles_solution.css')
def styles_solution():
    return app.send_static_file('styles_solution.css')

@app.route('/styles_resources.css')
def styles_resources():
    return app.send_static_file('styles_resources.css')

@app.route('/styles_support.css')
def styles_support():
    return app.send_static_file('styles_support.css')

#************************************************************************************************************** */
#************************************************************************************************************** */
#************************************************************************************************************** */
# Thêm các route để phục vụ file JS
@app.route('/scripts.js')
def scripts():
    return app.send_static_file('scripts.js')

@app.route('/scripts_dashboard.js')
def scripts_dashboard():
    return app.send_static_file('scripts_dashboard.js')

@app.route('/scripts_contact.js')
def scripts_contact():
    return app.send_static_file('scripts_contact.js')

@app.route('/scripts_solution.js')
def scripts_solution():
    return app.send_static_file('scripts_solution.js')

@app.route('/scripts_resources.js')
def scripts_resources():
    return app.send_static_file('scripts_resources.js')

@app.route('/scripts_support.js')
def scripts_support():
    return app.send_static_file('scripts_support.js')

@app.route('/scripts_docs.js')
def scripts_docs():
    return app.send_static_file('scripts_docs.js')

#************************************************************************************************************** */
#************************************************************************************************************** */
#************************************************************************************************************** */
#Thêm các route để phục vụ file HTML
@app.route('/')
def home():
    return app.send_static_file('index.html')

@app.route('/overview')
def overview():
    return app.send_static_file('index.html')

@app.route('/dashboard')
def index():
    return app.send_static_file('index_dashboard.html')

@app.route('/solutions')
def solutions():
    return app.send_static_file('index_solution.html')

@app.route('/resources')
def resources():
    return app.send_static_file('index_resources.html')

@app.route('/contact')
def contact():
    return app.send_static_file('index_contact.html')

@app.route('/docs')
def docs():
    return app.send_static_file('index_docs.html')

@app.route('/support')
def support():
    return app.send_static_file('index_support.html')

#************************************************************************************************************** */
#************************************************************************************************************** */
#************************************************************************************************************** */
# Tạo route để phục vụ hình ảnh
@app.route('/images/<path:filename>')
def serve_image(filename):
    return send_from_directory('static/images', filename)

#Route để chạy index
@app.route('/run', methods=['POST'])
def receive_data():
    global input_data
    input_data = request.json  # Lưu dữ liệu vào biến input_data
    inputs = np.array([[int(input_data.get("first_day", 0)), int(input_data.get("last_day", 0)), int(input_data.get("id", 0)), input_data.get("algorithm", 0)]])
    print("Dữ liệu gửi đi: ", inputs.tolist())
    return jsonify({"message": "Data received successfully!"})

@app.route('/run', methods=['GET'])
def send_data():
    global input_data
    inputs = np.array([[int(input_data.get("first_day", 0)), int(input_data.get("last_day", 0)), int(input_data.get("id", 0)), input_data.get("algorithm", 0)]])
    print("Dữ liệu nhận được: ", inputs.tolist())
    return jsonify(inputs.tolist())


#************************************************************************************************************** */
#************************************************************************************************************** */
#Route để chạy dashboard
@app.route('/run_dashboard', methods=['POST'])
def run_dashboard():
    try:
        data_input = request.json  # Lấy dữ liệu từ JSON
        print(data_input)  # Kiểm tra dữ liệu nhận được

        # Kiểm tra và chuyển đổi giá trị
        pig_id = int(data_input['id']) if data_input['id'] else None
        first_day = int(data_input['first_day']) if data_input['first_day'] else None
        last_day = int(data_input['last_day']) if data_input['last_day'] else None
        algorithm = data_input['algorithm']  # Lấy giá trị của thuật toán

        if pig_id is None or first_day is None or last_day is None:
            return jsonify({"error": "ID, First Day, and Last Day must be provided."}), 400

        if not isinstance(first_day, int) or not isinstance(last_day, int) or first_day > last_day or last_day < 1 or first_day < 1:
            return jsonify({"error": "Error: First Day or Last Day is invalid"}), 400

        session_id = session.get('session_id')
        if not session_id:
            session_new_data = None
        else:
            if os.path.exists(os.path.join('includes', 'data', 'input_data', f'user_data_{session_id}.csv')):   
                session_new_data = session_id
            else:
                session_new_data = None
            
        status_result, barchart_data, donut_data = reject(pig_id, first_day, last_day, algorithm, session_new_data)
        print("good")
        print(status_result)
        if status_result == 400:
            return jsonify({"error": "Invalid input."}), 400

        # # Gọi hàm để dự đoán và vẽ đồ thị
        result = show_all_chart(donut_data, barchart_data, pig_id)

        return jsonify(result)  # Trả về kết quả dưới dạng JSON
    except Exception as e:
        print(f"Error: {str(e)}")  # In ra lỗi
        return jsonify({"error": str(e)}), 400
    
#************************************************************************************************************** */
#************************************************************************************************************** */
# Route để tải lên file
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file selected."}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected."}), 400

    # Lưu file vào thư mục input_data và đổi tên thành data_new.csv
    session_id = session.get('session_id')
    if not session_id:
        session_id = os.urandom(8).hex()
        session['session_id'] = session_id
        
    file_path = os.path.join('includes', 'data', 'input_data', f'user_data_{session_id}.csv')
    
    # Xóa file cũ nếu tồn tại
    if os.path.exists(file_path):
        os.remove(file_path)
        
    file.save(file_path)
    
    status = test_data(file_path)
    print("status: ", status)
    if status == 401:
        os.remove(file_path)
        return jsonify({"error": "Database error"}), 400
    return jsonify({"message": "Upload successful!"}), 200

# Route để chuyển về database mặc định
@app.route('/set_default_data', methods=['POST'])
def set_default_data():
    session_id = session.get('session_id')
    if session_id:
        # Xóa file đã tải lên
        file_path = os.path.join('includes', 'data', 'input_data', f'user_data_{session_id}.csv')
        if os.path.exists(file_path):
            os.remove(file_path)
            session.pop('session_id', None)
            
    return jsonify({"message": "Switched to default database"}), 200

@app.route('/clear_session', methods=['POST'])
def clear_session():
    if has_request_context():
        session_id = session.pop('session_id', None)
        if session_id:
            user_file_path = os.path.join('includes', 'data', 'input_data', f'user_data_{session_id}.csv')
            if os.path.exists(user_file_path):
                os.remove(user_file_path)  # Xóa file dữ liệu của user

    return jsonify({"message": "Session data cleared."})

@app.teardown_appcontext
def cleanup_session(exception=None):
    if has_request_context() and 'session_id' in session:
        clear_session()

#************************************************************************************************************** */  
#************************************************************************************************************** */
#************************************************************************************************************** */
def show_all_chart(donut_data, barchart_data, pig_id):
    # Vẽ biểu đồ donut
    if 'value' not in donut_data.columns:
        print("Cột 'value' không tồn tại trong donut_data.")
        return  # Hoặc xử lý lỗi theo cách khác
    
    donut_values = donut_data['value'].tolist()  # Chuyển đổi thành danh sách
    
    # Kiểm tra kiểu dữ liệu của donut_values
    print(f"Kiểu dữ liệu của donut_values: {type(donut_values)}")
    print(f"Dữ liệu trong donut_values: {donut_values}")

    # Lấy giá trị lớn nhất trong donut_values
    max_value = max(donut_values)
    point_1 = int(max_value / 3)
    point_2 = point_1 * 2
    if min(donut_values) > point_2:
        point_1 = int(min(donut_values) + 5)
        point_2 = point_1 + int((max_value - point_1) * 2 / 5)
    
    # Tính toán kích thước cho biểu đồ
    sizes = [
        sum(value < point_1 for value in donut_values),
        sum(point_1 <= value < point_2 for value in donut_values),
        sum(value >= point_2 for value in donut_values)
    ]
    
    # Kết hợp sizes, labels, và colors lại để lọc đồng bộ
    labels_and_colors = [
        (size, label, color)
        for size, label, color in zip(sizes, [f'Below {point_1} Kg', f'{point_1} Kg to {point_2} Kg', f'Above {point_2} Kg'], ['#4285F4', '#FBBC05', '#EA4335'])
        if size > 0
    ]

    sizes, labels, colors = map(list, zip(*labels_and_colors))

    plt.figure(figsize=(10, 6))    
    plt.pie(sizes, labels=labels, colors=colors, autopct='%1.0f%%', startangle=140, pctdistance=0.85, wedgeprops={'width': 0.4})
    plt.axis('equal')  # Đảm bảo hình tròn
    
    plt.title(f"Growth of the Pig Herd Throughout the Period")

    # Tạo legend với nhãn và màu sắc đúng   
    for i, label in enumerate(labels):
        labels[i] = f"{label} ({sizes[i]})"  # Thêm số lượng vào nhãn

    plt.legend(labels, title="NOTE", loc='upper right', bbox_to_anchor=(1, 1))

    # Tạo thư mục nếu chưa tồn tại
    os.makedirs(os.path.join('models', 'Predict', 'static', 'images'), exist_ok=True)

    plt.savefig(os.path.join('models', 'Predict', 'static', 'images', f'donut_{pig_id}.png'))  # Lưu hình ảnh donut
    plt.close()


    # Vẽ biểu đồ barchart
    plt.figure(figsize=(10, 6))
    plt.bar(barchart_data['age'], barchart_data['value'], color='blue')
    plt.xlabel('Age')
    plt.ylabel('Error(Kg)')
    plt.title('Prediction Error')
    plt.savefig(os.path.join('models', 'Predict', 'static', 'images', f'barchart_{pig_id}.png'))  # Lưu hình ảnh barchart
    plt.close()

    dfi_image = os.path.join('images', f'dfi_{pig_id}.png')  # Đường dẫn đến hình ảnh dfi
    weight_image = os.path.join('images', f'weight_{pig_id}.png')  # Đường dẫn đến hình ảnh weight

    return {
        'donut_image': os.path.join('images', f'donut_{pig_id}.png'),
        'barchart_image': os.path.join('images', f'barchart_{pig_id}.png'),
        'dfi_image': dfi_image,
        'weight_image': weight_image
    }

if __name__ == '__main__':
    app.run(debug=True)
