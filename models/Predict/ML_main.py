import pandas as pd
import os
import csv
import time
import requests  # Thêm thư viện requests để gửi yêu cầu
import subprocess

from itertools import product
from concurrent.futures import ThreadPoolExecutor
from ML_function import predict_DFI
from ML_function import predict_Data
from ML_function import multi_predict_Weight
from ML_function import multi_predict_DFI
from ML_function import data_standardization
import matplotlib.pyplot as plt  # Thêm thư viện vẽ đồ thị
import numpy as np
from io import StringIO
link_data = os.path.join("includes", "data", "data.csv")
#link_data = os.path.join("includes", "data", "unknown-perturbation.csv")


# Thiết lập biến môi trường
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import tensorflow as tf

#******************************************************1*********************************************************
def plot_weight(data, pig_id, first_day, last_day, weight_predictions_data, prediction_type):
    # Lấy dữ liệu trọng lượng thực tế từ data
    actual_data = data[(data['id'] == pig_id) & (data['age'] >= first_day) & (data['age'] <= last_day)]
    if prediction_type == 'weight':
        actual_values = actual_data['weight'].values  # Trọng lượng thực tế
        text_screen = "Trọng lượng"
    elif prediction_type == 'dfi':
        actual_values = actual_data['dfi'].values  # DFI thực tế
        text_screen = "DFI"
    actual_ages = actual_data['age'].values  # Ngày tuổi thực tế

    # Tạo danh sách ngày tuổi dự đoán
    predicted_ages = list(range(first_day, last_day + 1))  # Ngày tuổi từ start_point đến end_point

    # Tạo danh sách trọng lượng thực tế và dự đoán với NaN cho những ngày không có dữ liệu
    all_weights = np.full(len(predicted_ages), np.nan)

    # Gán giá trị trọng lượng thực tế cho những ngày tương ứng
    for i, age in enumerate(predicted_ages):
        if age in actual_ages:
            idx = np.where(actual_ages == age)[0][0]  # Tìm chỉ số của ngày trong actual_ages
            all_weights[i] = actual_values[idx]  # Gán trọng lượng thực tế

    # Chuyển weight_predictions thành mảng nếu cần
    weight_predictions_data = np.array(weight_predictions_data)

    # Đảm bảo kích thước của actual_values và weight_predictions_data khớp nhau
    actual_values_full = np.full(len(predicted_ages), np.nan)
    for i, age in enumerate(predicted_ages):
        if age in actual_ages:
            idx = np.where(actual_ages == age)[0][0]
            actual_values_full[i] = actual_values[idx]

    # Tạo một DataFrame để lưu trữ độ chênh lệch giữa giá trị dự đoán và giá trị thực tế
    difference_df = pd.DataFrame({
        'age': predicted_ages,
        'value': [abs(weight_predictions_data[i] - actual_values_full[i]) if i < len(weight_predictions_data) and i < len(actual_values_full) else np.nan for i in range(len(predicted_ages))]
    })

    plt.figure(figsize=(10, 5))

    # Vẽ đường thực tế
    plt.plot(predicted_ages, all_weights, label=f'{text_screen} thực tế', color='blue', marker='o')  # Đường thực tế
    
    # Vẽ đường dự đoán
    plt.plot(predicted_ages, weight_predictions_data, color='red', linestyle='--', label=f'{text_screen} dự đoán')  # Đường dự đoán

    plt.title(f'Dự đoán {prediction_type} cho con lợn ID {pig_id} từ ngày {first_day} đến {last_day}')
    plt.xlabel('Ngày tuổi')
    plt.ylabel(f'{text_screen}')
    plt.xticks(rotation=45)  # Thêm dòng này để xoay nhãn trục x
    if prediction_type == 'weight':
        plt.yticks(range(0, 200, 20))  # Thiết lập các giá trị cho trục y: 0, 20, 40, 60,...
    elif prediction_type == 'dfi':
        plt.yticks(range(0, 10, 1))  # Thiết lập các giá trị cho trục y: 0, 1, 2, 3,...
    plt.legend()
    plt.tight_layout()  # Thêm dòng này để tự động điều chỉnh bố cục

    # Lưu hình ảnh vào thư mục
    image_path = os.path.join('models', 'Predict', 'static', 'images', f'{prediction_type}_{pig_id}.png')
    if os.path.exists(image_path):
        os.remove(image_path)  # Xóa ảnh trùng tên nếu tồn tại
    plt.savefig(image_path)  # Tạo lại hình ảnh sau khi xóa
    #plt.show()
    return difference_df

#******************************************************2*********************************************************
def paint(data, data_new, pig_id, first_day, last_day, prediction_type):

    # Chuyển đổi first_day và last_day thành số nguyên
    try:
        first_day = int(first_day)
        last_day = int(last_day)
    except ValueError as e:
        print(f"Lỗi chuyển đổi: {e}")
        return -1  # Trả về mã lỗi nếu không thể chuyển đổi


    if (first_day <= 0 or last_day <= 0 or first_day > last_day):
        print("Thông tin đầu vào không chính xác")
        return -2
    else: 
        ages = list(range(first_day, last_day + 1))  # Tạo danh sách ngày tuổi từ 1 đến end_point
        weight_predictions_data = []  # Khởi tạo danh sách để lưu kết quả dự đoán

        # Kiểm tra xem data_new có phải là None không
        if data_new is None:
            print("Dữ liệu mới không hợp lệ")
            return -1  # Trả về mã lỗi nếu data_new là None

        for age in ages:
            # In ra giá trị của age và kiểu dữ liệu
            if prediction_type == "dfi":
                prediction = data_new[data_new['age'] == age]['dfi'].values[0]  # Lấy giá trị đfi nếu có cột dfi
            elif prediction_type == "weight":
                prediction = data_new[data_new['age'] == age]['weight'].values[0]  # Lấy giá trị trọng lượng nếu có cột weight
            weight_predictions_data.append(prediction)  # Thêm kết quả dự đoán vào danh sách

        difference_df = plot_weight(data, pig_id, first_day, last_day, weight_predictions_data, prediction_type)  # Vẽ đồ thị
        return difference_df
    
#******************************************************3*********************************************************
def complete_data(pig_id, first_day, last_day, algorithm, status_new_data, session_new_data):
    if not isinstance(first_day, int) or not isinstance(last_day, int) or first_day > last_day or last_day < 1 or first_day < 1:
        print("Lỗi: first_day hoặc last_day không hợp lệ")
        return 400
    if status_new_data:
        all_weight_file_path = os.path.join("includes", "data", "output_data_user", algorithm, "weight")
        weight_file_init = pd.DataFrame(columns=['age', 'weight'])
        weight_file_init.to_csv(os.path.join(all_weight_file_path, f"weight_{pig_id}.csv"), index=False)
    else:   
        all_weight_file_path = os.path.join("includes", "data", "output_data", algorithm, "weight")
    
    pig_file_weight = f"weight_{pig_id}.csv"
    if not os.path.isfile(os.path.join(all_weight_file_path, pig_file_weight)):
        print(f"Không có file weight dự đoán cho con lợn {pig_id}")
        return 400
    
    if status_new_data:
        all_dfi_file_path = os.path.join("includes", "data", "output_data_user", algorithm, "dfi")
        dfi_file_init = pd.DataFrame(columns=['age', 'dfi'])
        dfi_file_init.to_csv(os.path.join(all_dfi_file_path, f"dfi_{pig_id}.csv"), index=False)
    else:
        all_dfi_file_path = os.path.join("includes", "data", "output_data", algorithm, "dfi")
    
    pig_file_dfi = f"dfi_{pig_id}.csv"
    if not os.path.isfile(os.path.join(all_dfi_file_path, pig_file_dfi)):
        print(f"Không có file dfi dự đoán cho con lợn {pig_id}")
        return 400
    
    dfi_file_path = os.path.join(all_dfi_file_path, pig_file_dfi)
    weight_file_path = os.path.join(all_weight_file_path, pig_file_weight)
    dfi_data = pd.read_csv(dfi_file_path)
    weight_data = pd.read_csv(weight_file_path)
    
    if status_new_data:
        Create_data_new(first_day, last_day, algorithm, session_new_data)
    else:
        if last_day > weight_data['age'].max() or last_day > dfi_data['age'].max():
            Create_single_data(dfi_data, weight_data, pig_id, first_day, last_day, algorithm, status_new_data)
    return 200

def read_csv_file(data_path):
    # Kiểm tra xem file có dòng chú thích không
    has_comments = False
    with open(data_path, 'r', encoding='utf-8') as f:
        for line in f:
            if line.startswith('//'):
                has_comments = True
                break
    
    # Đọc file tùy thuộc vào có chú thích hay không
    if has_comments:
        with open(data_path, 'r', encoding='utf-8') as f:
            lines = [line for line in f if not line.startswith('//')]
        data_init = pd.read_csv(StringIO(''.join(lines)))
    else:
        data_init = pd.read_csv(data_path)
    
    return data_init

def test_data(data_path):
    data_init = read_csv_file(data_path)
    data, status = data_standardization(data_init)
    if not status:
        return 401
    elif data.empty:
        return 401
    return 200

#***************************************************************************************************************************
#Hàm khởi tạo dữ liệu cho data mới
def Create_data_new(first_day, last_day, algorithm, session_new_data):
    if session_new_data is not None:
        link_data_new = os.path.join("includes", "data", "input_data", f"user_data_{session_new_data}.csv")
        data_init = read_csv_file(link_data_new)
    
        data, status_data = data_standardization(data_init)
        if not status_data:
            print("Không có cột cần thiết")
            return 400
        if data.empty:
            print("Data NULL")
            return 400
        
        Create_dfi_ALL_data_begin(data, algorithm, first_day, last_day)
        Create_weight_ALL_data_begin(data, algorithm, first_day, last_day)
        return 200
    else:
        return 400
#***************************************************************************************************************************
#***************************************************************************************************************************
    
def reject(pig_id, first_day, last_day, algorithm, session_new_data):
    status_new_data = False
    link_directory_data_new = os.path.join("includes", "data", "input_data")
    if session_new_data is not None:
        link_data_new = os.path.join(link_directory_data_new, f"user_data_{session_new_data}.csv")
        if os.path.exists(link_data_new):
            data_init = read_csv_file(link_data_new)
            status_new_data = True
        else:
            data_init = read_csv_file(link_data)
            status_new_data = False     
    else:
        data_init = read_csv_file(link_data)
    data, status_data = data_standardization(data_init)
    if not status_data:
        return 400, None, None
    
    if pig_id not in data['id'].values:
        return 400, None, None  # Trả về mã lỗi nếu pig_id không hợp lệ
    
    # hoàn thiện data
    data_status = complete_data(pig_id, first_day, last_day, algorithm, status_new_data, session_new_data)
    
    if data_status == 400:
        return 400, None, None

    if status_new_data:
        link_data_predict = os.path.join("includes", "data", "output_data_user", algorithm)
        link_pdf = os.path.join("includes", "data", "output_data_user", "PDF")
    else:
        link_data_predict = os.path.join("includes", "data", "output_data", algorithm)
        link_pdf = os.path.join("includes", "data", "output_data", "PDF")
        
    all_weight_file_path = os.path.join(link_data_predict, "weight")
    weight_file_path = os.path.join(all_weight_file_path, f"weight_{pig_id}.csv")
    all_dfi_file_path = os.path.join(link_data_predict, "dfi")
    dfi_file_path = os.path.join(all_dfi_file_path, f"dfi_{pig_id}.csv")
    
    
    

    if os.path.exists(dfi_file_path):
        data_dfi = pd.read_csv(dfi_file_path)
    else:
        data_dfi = None
    if os.path.exists(weight_file_path):
        data_weight = pd.read_csv(weight_file_path)
    else:
        data_weight = None
    paint(data, data_dfi, pig_id, first_day, last_day, "dfi")
    difference_weight_data = paint(data, data_weight, pig_id, first_day, last_day, "weight")
    
    barchart_data = difference_weight_data  # Gán barchart_data từ difference_df

    # Tạo donut_data từ growth_weight_data
    growth_weight_data = []
    for file in os.listdir(all_weight_file_path):
        if file.endswith('.csv'):
            file_path = os.path.join(all_weight_file_path, file)
            weight_file = pd.read_csv(file_path)
            print(file_path)
            if not weight_file[weight_file['age'] == first_day].empty:
                first_day_weight = weight_file[weight_file['age'] == first_day]['weight'].iloc[0]  
            else:
                min_age = weight_file[weight_file['weight'].notna()]['age'].min()
                first_day_weight = weight_file[weight_file['age'] == min_age]['weight'].iloc[0]
                
            if not weight_file[weight_file['age'] == last_day].empty:
                last_day_weight = weight_file[weight_file['age'] == last_day]['weight'].iloc[0]  
            else: 
                max_age = weight_file[weight_file['weight'].notna()]['age'].max()
                last_day_weight = weight_file[weight_file['age'] == max_age]['weight'].iloc[0]
                
            weight_diff = last_day_weight - first_day_weight
            growth_weight_data.append({'id': file.split('_')[1].split('.')[0], 'value': weight_diff})
            
    donut_data = pd.DataFrame(growth_weight_data)
    donut_data['id'] = donut_data['id'].astype(np.int64)

    #Tính toán giá trị toàn bộ đàn lợn 
    
    summary_weight_data = pd.DataFrame(columns=['id', 'min', 'max', 'mean', 'sd'])
    for file in os.listdir(all_weight_file_path):
        if file.endswith('.csv'):
            each_file_path = os.path.join(all_weight_file_path, file)
            weight_file = pd.read_csv(each_file_path)
            filtered_weights = weight_file[(weight_file['age'] >= first_day) & (weight_file['age'] <= last_day)]
            if not filtered_weights.empty:
                min_weight = filtered_weights['weight'].min()
                max_weight = filtered_weights['weight'].max()
                mean_weight = filtered_weights['weight'].mean()
                sd_weight = filtered_weights['weight'].std()
            else:
                min_weight = None
                max_weight = None
                mean_weight = None
                sd_weight = None
                
            summary_weight_data = summary_weight_data.append({
                'id': file.split('_')[1].split('.')[0],
                'min': min_weight,
                'max': max_weight,
                'mean': mean_weight,
                'sd': sd_weight
            }, ignore_index=True)
     
    summary_all_weight_data = pd.DataFrame(columns=['min', 'max', 'mean', 'sd'])
    summary_all_weight_data = summary_all_weight_data.append({
        'min': summary_weight_data['min'].mean(),
        'max': summary_weight_data['max'].mean(),
        'mean': summary_weight_data['mean'].mean(),
        'sd': summary_weight_data['sd'].mean()
    }, ignore_index=True)
    
    summary_weight_data.to_csv(os.path.join(link_pdf, "weight_summary.csv"), index=False)
    summary_all_weight_data.to_csv(os.path.join(link_pdf, "weight_summary_all.csv"), index=False)
    
    

    
    summary_dfi_data = pd.DataFrame(columns=['id', 'min', 'max', 'mean', 'sd'])
    for file in os.listdir(all_dfi_file_path):
        if file.endswith('.csv'):
            each_file_path = os.path.join(all_dfi_file_path, file)
            dfi_file = pd.read_csv(each_file_path)
            filtered_dfi = dfi_file[(dfi_file['age'] >= first_day) & (dfi_file['age'] <= last_day)]
            if not filtered_dfi.empty:
                min_dfi = filtered_dfi['dfi'].min()
                max_dfi = filtered_dfi['dfi'].max()
                mean_dfi = filtered_dfi['dfi'].mean()
                sd_dfi = filtered_dfi['dfi'].std()
            else:
                min_dfi = None
                max_dfi = None
                mean_dfi = None
                sd_dfi = None
                
            summary_dfi_data = summary_dfi_data.append({
                'id': file.split('_')[1].split('.')[0],
                'min': min_dfi,
                'max': max_dfi,
                'mean': mean_dfi,
                'sd': sd_dfi
            }, ignore_index=True)
    
    summary_all_dfi_data = pd.DataFrame(columns=['min', 'max', 'mean', 'sd'])
    summary_all_dfi_data = summary_all_dfi_data.append({
        'min': summary_dfi_data['min'].mean(),
        'max': summary_dfi_data['max'].mean(),
        'mean': summary_dfi_data['mean'].mean(),
        'sd': summary_dfi_data['sd'].mean()
    }, ignore_index=True)
    
    summary_dfi_data.to_csv(os.path.join(link_pdf, "dfi_summary.csv"), index=False)
    summary_all_dfi_data.to_csv(os.path.join(link_pdf, "dfi_summary_all.csv"), index=False)

    
    if barchart_data is None or donut_data is None:
        print("data null")
    else:
        link_barchart_data = os.path.join("includes", "data", "output_data", "Diff_Data.csv")
        barchart_data.to_csv(link_barchart_data, index=False)
        link_donut_data = os.path.join("includes", "data", "output_data", "weight_Diff_Data.csv")
        donut_data.to_csv(link_donut_data, index=False)
    
    return 200, barchart_data, donut_data  # Trả về mã thành công và dữ liệu        
        
        
        
        
#***************************************************************************************************************************
#***************************************************************************************************************************
#**************************************************    4    ****************************************************************
#***************************************************************************************************************************
#***************************************************************************************************************************

#Hàm tạo dữ liệu 100 ngày đầu tiên cho tất cả các con lợn(từ ngày min đến ngày 100)
def Create_ALL_data_begin(algorithm, type_predict):
    data_init = read_csv_file(link_data)
    data, status_data = data_standardization(data_init)
    if not status_data:
        print("Không có cột cần thiết")
    elif data.empty:
        print("data NULL")
    else:
        id_data = data['id'].unique()
        for pig_id in id_data:
            min_age = int(data[data['id'] == pig_id]['age'].min())
            max_age = min_age + 100
            
            if type_predict == 'dfi':
                dfi_results, metrics_DFI = multi_predict_DFI(data, pig_id, min_age, max_age, algorithm)
                
                if isinstance(dfi_results, pd.DataFrame) and not dfi_results.empty:
                    link_dfi_output = os.path.join("includes", "data", "output_data", algorithm, "dfi", f"dfi_{pig_id}.csv")
                    dfi_results.to_csv(link_dfi_output, index=False)
                
                if isinstance(metrics_DFI, pd.DataFrame) and not metrics_DFI.empty:
                    link_dfi_output = os.path.join("includes", "data", "output_data", algorithm, "Metrics", "dfi", "metrics_dfi.csv")
                    metrics_DFI.to_csv(link_dfi_output, index=False)
                    print(f"Hoàn thành giai đoạn 1 thêm 100 ngày đầu tiên cho tất cả con lợn {pig_id} (dfi)")
            elif type_predict == 'weight':
                weight_results, metrics_weight = multi_predict_Weight(data, pig_id, min_age, max_age, algorithm)
                
                if isinstance(weight_results, pd.DataFrame) and not weight_results.empty:
                    link_weight_output = os.path.join("includes", "data", "output_data", algorithm, "weight", f"weight_{pig_id}.csv")
                    weight_results.to_csv(link_weight_output, index=False)
                    
                if isinstance(metrics_weight, pd.DataFrame) and not metrics_weight.empty:
                    link_weight_output = os.path.join("includes", "data", "output_data", algorithm, "Metrics", "weight", "metrics_weight.csv")
                    metrics_weight.to_csv(link_weight_output, index=False)
                    print(f"Hoàn thành giai đoạn 2 thêm 100 ngày đầu tiên cho tất cả con lợn {pig_id} (weight)")

# 100 dfi đầu tiên
def Create_dfi_ALL_data_begin(data, algorithm, first_day, last_day):
    id_data = data['id'].unique()
    for pig_id in id_data:
        min_age = data[data['id'] == pig_id]['age'].min()
        if min_age > first_day: 
            min_age = first_day
        max_age = last_day
            
        dfi_results, metrics_DFI = multi_predict_DFI(data, pig_id, min_age, max_age, algorithm)
            
        if isinstance(dfi_results, pd.DataFrame) and not dfi_results.empty:
            link_dfi_output = os.path.join("includes", "data", "output_data_user", algorithm, "dfi", f"dfi_{pig_id}.csv")
            dfi_results.to_csv(link_dfi_output, index=False)
            
        if isinstance(metrics_DFI, pd.DataFrame) and not metrics_DFI.empty:
            link_dfi_output = os.path.join("includes", "data", "output_data_user", algorithm, "Metrics", "dfi", "metrics_dfi.csv")
            metrics_DFI.to_csv(link_dfi_output, index=False)
                
            
    print(f"Hoàn thành thêm dfi từ ngày {first_day} đến ngày {last_day}")
        
# 100 weight đầu tiên        
def Create_weight_ALL_data_begin(data, algorithm, first_day, last_day):
    id_data = data['id'].unique()
    for pig_id in id_data:
        min_age = data[data['id'] == pig_id]['age'].min()
        if min_age > first_day: 
            min_age = first_day
        max_age = last_day
                
        weight_results, metrics_weight = multi_predict_Weight(data, pig_id, min_age, max_age, algorithm)
            
        if isinstance(weight_results, pd.DataFrame) and not weight_results.empty:
            link_weight_output = os.path.join("includes", "data", "output_data_user", algorithm, "weight", f"weight_{pig_id}.csv")
            weight_results.to_csv(link_weight_output, index=False)
        
        if isinstance(metrics_weight, pd.DataFrame) and not metrics_weight.empty:
            link_weight_output = os.path.join("includes", "data", "output_data_user", algorithm, "Metrics", "weight", "metrics_weight.csv")
            metrics_weight.to_csv(link_weight_output, index=False)
            
    print(f"Hoàn thành thêm weight từ ngày {first_day} đến ngày {last_day}")


#***************************************************************************************************************************
#***************************************************************************************************************************
#Tạo thêm dữ liệu cho con lợn riêng lẻ
def Create_single_data(dfi_data, weight_data, pig_id, first_day, last_day, algorithm, status_new_data):
    
    data = pd.merge(dfi_data, weight_data, on='age')
    data['id'] = pig_id
    data['previous_weight'] = data['weight'].shift(1)
    data['previous_weight'] = data['previous_weight'].where(data['previous_weight'].notna(), None)
    data = data[['id', 'age', 'weight', 'dfi', 'previous_weight']]
    
    start_day_dfi = int(first_day)
    last_day = int(last_day)
    #Tính DFI
    dfi_max_age = dfi_data['age'].max()
    if start_day_dfi <= dfi_max_age:
        start_day_dfi = int(dfi_max_age + 1)
        
    dfi_results, metrics_DFI = multi_predict_DFI(data, pig_id, start_day_dfi, last_day, algorithm)
        
    if isinstance(dfi_results, pd.DataFrame) and not dfi_results.empty:
        if status_new_data:
            link_dfi_output = os.path.join("includes", "data", "output_data_user", algorithm, "dfi", f"dfi_{pig_id}.csv")
        else:
            link_dfi_output = os.path.join("includes", "data", "output_data", algorithm, "dfi", f"dfi_{pig_id}.csv")
        dfi_results.to_csv(link_dfi_output, mode='a', index=False, header=not os.path.exists(link_dfi_output))
    
    #Tính weight
    start_day_weight = int(first_day)
    
    weight_max_age = weight_data['age'].max()
    if start_day_weight <= weight_max_age:
        start_day_weight = int(weight_max_age + 1)
        
    weight_results, metrics_weight = multi_predict_Weight(data, pig_id, start_day_weight, last_day, algorithm)
        
    if isinstance(weight_results, pd.DataFrame) and not weight_results.empty:
        if status_new_data:
            link_weight_output = os.path.join("includes", "data", "output_data_user", algorithm, "weight", f"weight_{pig_id}.csv")
        else:   
            link_weight_output = os.path.join("includes", "data", "output_data", algorithm, "weight", f"weight_{pig_id}.csv")
        weight_results.to_csv(link_weight_output, mode='a', index=False, header=not os.path.exists(link_weight_output))
        
    print(f"Hoàn thành thêm dữ liệu cho con lợn {pig_id} từ ngày {first_day} đến ngày {last_day}")     


#**************************************************    5    ****************************************************************       
def main():
    # Create_ALL_data_begin('algorithm5', 'dfi')
    Create_ALL_data_begin('algorithm5', 'weight')
        
            
#******************************************************6*********************************************************
if __name__ == "__main__":
     main()


#int: id, age
#object Fattening_group.Pen
#float64: weight, dfi, cfi

