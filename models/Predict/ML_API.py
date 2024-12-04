from flask import Flask, request, jsonify, send_from_directory, redirect, url_for, session, render_template, has_request_context, make_response, Response
import pandas as pd
import os
import json
import hashlib
import numpy as np
import matplotlib
import uuid
import threading
import mysql.connector
matplotlib.use('Agg')  # Sử dụng backend 'Agg' để không yêu cầu giao diện GUI
import matplotlib.pyplot as plt
import time

#from flask_sslify import SSLify
from threading import Thread

from ML_main import reject
from ML_main import test_data
from ML_main import Create_data_new

from ML_Database import read_data_from_mysql
from ML_Database import write_data_to_mysql
from ML_Database import check_table_exist
from ML_Database import drop_table

os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import tensorflow as tf
app = Flask(__name__, static_folder='static')
#sslify = SSLify(app)
app.secret_key = os.urandom(24)

stop_training_flags = {}


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

@app.route('/times_new_roman.js')
def times_new_roman():
    return app.send_static_file('times_new_roman.js')

@app.route('/simsun.js')    
def simsun():
    return app.send_static_file('simsun.js')

#************************************************************************************************************** */
#************************************************************************************************************** */
#************************************************************************************************************** */
#Thêm các route để phục vụ file HTML
@app.route('/')
def home():
    session_id = session.get('session_id')
    response = make_response(app.send_static_file('index.html'))
    
    # Nếu không có session ID, tạo session ID mới và đặt cookie
    if not session_id:
        session_id = str(uuid.uuid4())
        session['session_id'] = session_id  # Lưu vào session
        response.set_cookie('session_id', session_id, max_age=60*60*24, expires=int(time.time()) + 60*60*24)  # Cookie có thời gian sống là 24 giờ
    
    print("session_id: ", session_id)
    return response


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
        data_input = request.json
        print(data_input)

        pig_id = int(data_input['id']) if data_input['id'] else None
        first_day = int(data_input['first_day']) if data_input['first_day'] else None
        last_day = int(data_input['last_day']) if data_input['last_day'] else None
        algorithm = data_input['algorithm']

        if pig_id is None or first_day is None or last_day is None:
            return jsonify({"error": "ID, First Day, and Last Day must be provided."}), 400

        if not isinstance(first_day, int) or not isinstance(last_day, int) or first_day > last_day or last_day < 1 or first_day < 1:
            return jsonify({"error": "Error: First Day or Last Day is invalid"}), 400

        use_default = session.get('use_default_data', True)  # Mặc định sử dụng database mặc định

        session_id_mysql = None
        if not use_default:
            session_id = session.get('session_id')
            if session_id:
                session_id_mysql = get_session_id_mysql(session_id)
                if not check_table_exist(f"input_user_{session_id_mysql}"):
                    session_id_mysql = None
        else:
            print("Đang sử dụng database mặc định")
            
        status_result, barchart_data, donut_data = reject(pig_id, first_day, last_day, algorithm, session_id_mysql)
        
        if status_result == 400:
            return jsonify({"error": "Invalid input."}), 400

        result = show_all_chart(donut_data, barchart_data, pig_id, algorithm)
        return jsonify(result)

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 400

    
#************************************************************************************************************** */
#************************************************************************************************************** */
@app.route('/train_model', methods=['POST'])
def train_model():
    data = request.get_json()
    algorithms = data.get("algorithms", [])
    session_id = session.get('session_id')
    if not session_id:
        return jsonify({"error": "No session ID found."}), 400

    session_new_data = get_session_id_mysql(session_id)
    if not algorithms:
        return jsonify({"error": "No algorithms selected"}), 400

    # Khởi tạo trạng thái dừng nếu chưa có
    stop_training_flags[session_id] = False

    def generate_progress(algorithms, session_new_data):
        try:
            total_steps = 100
            first_day = 1
            last_day = 20
            time_step = 30

            if len(algorithms) == 1:
                time_step = 50
                
            # Giả lập tiến độ
            for progress in range(time_step):
                if stop_training_flags[session_id]:
                    yield "error: Training stopped by user.\n"
                    return
                time.sleep(0.1)
                yield f"{progress}\n"
                
            print("len(algorithms): ", len(algorithms))
                

            # Thực hiện training
            for algorithm in algorithms:
                if stop_training_flags[session_id]:
                    yield "error: Training stopped by user.\n"
                    return
                time_step_prev = time_step
                if time_step + int(50 / len(algorithms)) < 100:
                    time_step += int(50 / len(algorithms))
                    
                for progress in range(time_step_prev, time_step):
                    if stop_training_flags[session_id]:
                        yield "error: Training stopped by user.\n"
                        return
                    time.sleep(0.1)
                    yield f"{progress}\n"
                
                create_status = Create_data_new(first_day, last_day, algorithm, session_new_data)
                if create_status != 200:
                    if algorithm == "algorithm1":
                        name_algorithm = "Linear Regression"
                    elif algorithm == "algorithm2":
                        name_algorithm = "Gradient Boosting Regression"
                    elif algorithm == "algorithm3":
                        name_algorithm = "K Neighbors Regression"
                    elif algorithm == "algorithm4":
                        name_algorithm = "MLP Regressor"
                    elif algorithm == "algorithm5":
                        name_algorithm = "Support Vector Regression"
                    elif algorithm == "algorithm6":
                        name_algorithm = "Random Forest Regressor"
                    yield f"error: Training failed for {name_algorithm}. Please check your data again.\n"
                    return

            # Tiến độ hoàn thành
            for progress in range(time_step, 101):
                if stop_training_flags[session_id]:
                    yield "error: Training stopped by user.\n"
                    return
                time.sleep(0.1)
                yield f"{progress}\n"
        except Exception as e:
            yield f"error: {str(e)}\n"

    return Response(generate_progress(algorithms, session_new_data), content_type='text/plain')


@app.route('/stop_training', methods=['POST'])
def stop_training():
    session_id = session.get('session_id')
    if session_id in stop_training_flags:
        stop_training_flags[session_id] = True
        return jsonify({"message": "Training stopped."}), 200
    return jsonify({"error": "No training in progress."}), 400

#***********************************************************************************************************************


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
        return jsonify({"error": "No session ID found."}), 400

    session_id_mysql = get_session_id_mysql(session_id)
    file_path = os.path.join('includes', 'input_data', f'user_data_{session_id_mysql}.csv')

    # Xóa file cũ nếu tồn tại
    if os.path.exists(file_path):
        os.remove(file_path)

    file.save(file_path)

    # Ghi dữ liệu vào MySQL
    status = write_data_to_mysql("renew", "input", "user", "all", "all", "algorithm1", session_id_mysql, link_csv=file_path)
    if status == 401:
        if check_table_exist(f"input_user_{session_id_mysql}"):
            drop_table(f"input_user_{session_id_mysql}")
        return jsonify({"error": "Database error"}), 400
    os.remove(file_path)

    # Cập nhật trạng thái sử dụng database
    session['use_default_data'] = False
    return jsonify({
        "message": "Upload successful!",
        "use_default_data": session['use_default_data']
    }), 200


# Route để chuyển về database mặc định
@app.route('/set_default_data', methods=['POST'])
def set_default_data():
    use_default = session.get('use_default_data', True)
    session['use_default_data'] = not use_default  # Chuyển đổi trạng thái
    state_message = "Switched to default database" if not use_default else "Switched to uploaded database"
    return jsonify({"message": state_message}), 200

# Route để lấy trạng thái của dữ liệu mặc định
@app.route('/get_default_data_status', methods=['GET'])
def get_default_data_status():
    use_default = session.get('use_default_data', True)  # Lấy trạng thái từ session
    return jsonify({"use_default_data": use_default})

# @app.route('/clear_session', methods=['POST'])
# def clear_session():
#     session_id = session.pop('session_id', None)
#     if session_id:
#         user_file_path = os.path.join('includes', 'data', 'input_data', f'user_data_{session_id}.csv')
#         if os.path.exists(user_file_path):
#             os.remove(user_file_path)  # Xóa file dữ liệu của user

#     return jsonify({"message": "Session data cleared."})

@app.teardown_request
def cleanup_session(exception=None):
    # Kiểm tra xem session_id có tồn tại trong session không
    session_id = session.get('session_id')   
    session_id_mysql = get_session_id_mysql(session_id)
    if session_id_mysql is None:
        if check_table_exist(f"input_user_{session_id_mysql}"):
            print("end session => drop table")
            drop_table(f"input_user_{session_id_mysql}")
        session.pop('session_id', None)  # Xóa session ID khỏi session
        
# Route để lấy dữ liệu của cả đàn lợn trong giai đoạn

@app.route('/get_all_summaries', methods=['GET'])
def get_all_summaries():
    use_default = session.get('use_default_data', True)  # Mặc định sử dụng database mặc định
    session_id_mysql = None
    if not use_default:
        session_id = session.get('session_id')
        if session_id:
            session_id_mysql = get_session_id_mysql(session_id)
            if not check_table_exist(f"input_user_{session_id_mysql}"):
                session_id_mysql = None
    else:
        print("Đang sử dụng database mặc định")
        
    if session_id_mysql is None:
        summaries = {
            "tables": {},  # Đưa dữ liệu bảng vào lớp "tables"
            "dfi_error": {},  # Đưa dữ liệu lỗi DFI vào lớp riêng
            "weight_error": {}  # Đưa dữ liệu lỗi Weight vào lớp riêng
        }

        tables = [
            "output_summary_all_default_dfi",
            "output_summary_all_default_weight",
            "output_summary_mean_default_dfi",
            "output_summary_mean_default_weight",
        ]

        error_tables = {
            "weight_error": [
                "output_algorithm1_default_weight_error",
                "output_algorithm2_default_weight_error",
                "output_algorithm3_default_weight_error",
                "output_algorithm4_default_weight_error",
                "output_algorithm5_default_weight_error",
                "output_algorithm6_default_weight_error",
                "output_algorithm7_default_weight_error",
                "output_algorithm8_default_weight_error"
            ],
            "dfi_error": [
                "output_algorithm1_default_dfi_error",
                "output_algorithm2_default_dfi_error",
                "output_algorithm3_default_dfi_error",
                "output_algorithm4_default_dfi_error",
                "output_algorithm5_default_dfi_error",
                "output_algorithm6_default_dfi_error",
                "output_algorithm7_default_dfi_error",
                "output_algorithm8_default_dfi_error"
            ],
        }
        
    else:
        summaries = {
            "tables": {},  # Đưa dữ liệu bảng vào lớp "tables"
            "dfi_error": {},  # Đưa dữ liệu lỗi DFI vào lớp riêng
            "weight_error": {}  # Đưa dữ liệu lỗi Weight vào lớp riêng
        }

        tables = [
            f"output_summary_all_user_dfi_{session_id_mysql}",
            f"output_summary_all_user_weight_{session_id_mysql}",
            f"output_summary_mean_user_dfi_{session_id_mysql}",
            f"output_summary_mean_user_weight_{session_id_mysql}",
        ]

        error_tables = {
            "weight_error": [
                f"output_algorithm1_user_weight_error_{session_id_mysql}",
                f"output_algorithm2_user_weight_error_{session_id_mysql}",
                f"output_algorithm3_user_weight_error_{session_id_mysql}",
                f"output_algorithm4_user_weight_error_{session_id_mysql}",
                f"output_algorithm5_user_weight_error_{session_id_mysql}",
                f"output_algorithm6_user_weight_error_{session_id_mysql}",
                f"output_algorithm7_user_weight_error_{session_id_mysql}",
                f"output_algorithm8_user_weight_error_{session_id_mysql}"
            ],
            "dfi_error": [
                f"output_algorithm1_user_dfi_error_{session_id_mysql}",
                f"output_algorithm2_user_dfi_error_{session_id_mysql}",
                f"output_algorithm3_user_dfi_error_{session_id_mysql}",
                f"output_algorithm4_user_dfi_error_{session_id_mysql}",
                f"output_algorithm5_user_dfi_error_{session_id_mysql}",
                f"output_algorithm6_user_dfi_error_{session_id_mysql}",
                f"output_algorithm7_user_dfi_error_{session_id_mysql}",
                f"output_algorithm8_user_dfi_error_{session_id_mysql}"
            ],
        }
    
    # Lấy dữ liệu summary
    for table in tables:
        if check_table_exist(table):
            data = read_data_from_mysql(table)
            summaries["tables"][table] = data.to_dict(orient='records') if not data.empty else {"error": "No data found."}
        else:
            summaries["tables"][table] = None

    # Lấy dữ liệu lỗi theo thuật toán
    for error_type, error_table_list in error_tables.items():
        for idx, table in enumerate(error_table_list, start=1):
            if check_table_exist(table):
                data = read_data_from_mysql(table)
                summaries[error_type][f"algorithm{idx}"] = data.to_dict(orient='records') if not data.empty else {"error": "No data found."}
            else:
                summaries[error_type][f"algorithm{idx}"] = None

    return jsonify(summaries), 200
#************************************************************************************************************** */  
#************************************************************************************************************** */
#************************************************************************************************************** */
def get_session_id_mysql(session_id):
    if not session_id:
        return None
    else:   
        session_id_mysql = hashlib.md5(session_id.encode()).hexdigest()[:10]
        return session_id_mysql

def show_all_chart(donut_data, barchart_data, pig_id, algorithm):
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
    
    #Kết hợp sizes, labels, và colors lại để lọc đồng bộ
    labels_and_colors = [
        (size, label, color)
        for size, label, color in zip(sizes, [f'Below {point_1} Kg', f'{point_1} Kg to {point_2} Kg', f'Above {point_2} Kg'], ['#4285F4', '#FBBC05', '#EA4335'])
        if size > 0
    ]
    
    # labels_and_colors = [
    #     (size, label, color)
    #     for size, label, color in zip(sizes, [f'低于{point_1}公斤', f'{point_1}公斤到{point_2}公斤', f'高于{point_2}公斤'], ['#4285F4', '#FBBC05', '#EA4335'])
    #     if size > 0
    # ]
    
    # labels_and_colors = [
    #     (size, label, color)
    #     for size, label, color in zip(sizes, [f'Dưới {point_1} Kg', f'{point_1} Kg đến {point_2} Kg', f'Trên {point_2} Kg'], ['#4285F4', '#FBBC05', '#EA4335'])
    #     if size > 0
    # ]

    sizes, labels, colors = map(list, zip(*labels_and_colors))

    plt.figure(figsize=(10, 6))    
    plt.pie(sizes, labels=labels, colors=colors, autopct='%1.0f%%', startangle=140, pctdistance=0.85, wedgeprops={'width': 0.4})
    plt.axis('equal')  # Đảm bảo hình tròn
    
    plt.title(f"Growth of the Pig Herd Throughout the Period")
    # plt.title(f"整个时期猪群的增长")
    # plt.title(f"Sự phát triển của đàn lợn trong suốt thời kỳ")
    
    # Tạo legend với nhãn và màu sắc đúng   
    for i, label in enumerate(labels):
        labels[i] = f"{label} ({sizes[i]})"  # Thêm số lượng vào nhãn

    plt.legend(labels, title="Note", loc='upper right', bbox_to_anchor=(1, 1))
    #plt.legend(labels, title="注意", loc='upper right', bbox_to_anchor=(1, 1))
    # plt.legend(labels, title="Chú thích", loc='upper right', bbox_to_anchor=(1, 1))

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
    metrics_image = os.path.join('images', f'metrics_{algorithm}.png')  # Đường dẫn đến hình ảnh metrics

    return {
        'donut_image': os.path.join('images', f'donut_{pig_id}.png'),
        'barchart_image': os.path.join('images', f'barchart_{pig_id}.png'),
        'dfi_image': dfi_image,
        'weight_image': weight_image,
        'metrics_image': metrics_image
    }



#**************************************************************************************************************************

def run_https():
    app.run(
        host="0.0.0.0",
        port=443,
        ssl_context=(
            'C:\Certificate\khanhnv.id.vn-chain.pem',
            'C:\Certificate\khanhnv.id.vn-key.pem'
        )
    )

# App HTTP (chuyển hướng)
http_app = Flask(__name__, static_folder='static')

@http_app.route('/', defaults={'path': ''})
@http_app.route('/<path:path>')
def redirect_to_https(path):
    url = request.url.replace("http://", "https://", 1)
    return redirect(url, code=301)

def run_http():
    http_app.run(host="0.0.0.0", port=80)

# Chạy song song cả hai app
if __name__ == '__main__':
    # Thread(target=run_https).start()
    # Thread(target=run_http).start()
    app.run(debug=True)

#if __name__ == '__main__':
    #app.run(debug=True)
    #app.run(host="0.0.0.0", port=443, ssl_context=('C:\Certificate\khanhnv.id.vn-crt.pem', 'C:\Certificate\khanhnv.id.vn-key.pem'))
    #app.run(host="0.0.0.0", port=443, ssl_context=('C:\Certificate\khanhnv.id.vn-chain.pem', 'C:\Certificate\khanhnv.id.vn-key.pem')
#)
