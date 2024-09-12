import pandas as pd
import os
from ML_test_2 import predict_Data
import matplotlib.pyplot as plt  # Thêm thư viện vẽ đồ thị
import numpy as np

#******************************************************1*********************************************************
def plot_weight(pig_id, start_point, end_point, weight_predictions, data):
    # Lấy dữ liệu trọng lượng thực tế từ data
    actual_data = data[(data['id'] == pig_id) & (data['age'] >= start_point) & (data['age'] <= end_point)]
    actual_weights = actual_data['weight'].values  # Trọng lượng thực tế
    actual_ages = actual_data['age'].values  # Ngày tuổi thực tế

    # Tạo danh sách ngày tuổi dự đoán
    predicted_ages = list(range(start_point, end_point + 1))  # Ngày tuổi từ start_point đến end_point

    # Tạo danh sách trọng lượng thực tế và dự đoán với NaN cho những ngày không có dữ liệu
    all_weights = np.full(len(predicted_ages), np.nan)  # Khởi tạo danh sách với NaN
    for i, age in enumerate(predicted_ages):
        if age in actual_ages:
            all_weights[i] = actual_weights[np.where(actual_ages == age)[0][0]]  # Gán giá trị thực tế nếu có

    plt.figure(figsize=(10, 5))

    # Vẽ đường thực tế
    plt.plot(predicted_ages, all_weights, label='Trọng lượng thực tế', color='blue', marker='o')  # Đường thực tế
    
    # Vẽ đường dự đoán
    plt.plot(predicted_ages, weight_predictions, color='red', linestyle='--', label='Trọng lượng dự đoán')  # Đường dự đoán

    plt.title(f'Dự đoán trọng lượng cho con lợn ID {pig_id} từ ngày {start_point} đến {end_point}')
    plt.xlabel('Ngày tuổi')
    plt.ylabel('Trọng lượng')
    plt.xticks(rotation=45)  # Thêm dòng này để xoay nhãn trục x
    plt.yticks(range(0, 200, 5))  # Thiết lập các giá trị cho trục y: 0, 5, 10, 15,...
    plt.legend()
    plt.tight_layout()  # Thêm dòng này để tự động điều chỉnh bố cục
    plt.show()

#******************************************************2*********************************************************
def paint(pig_id, data):
    start_point = int(input("Nhập ngày tuổi bắt đầu: "))
    end_point = int(input("Nhập ngày tuổi kết thúc: "))
    
    if (start_point <=0 or end_point <=0 or start_point > end_point):
        print("Thông tin đầu vào không chính xác")
        return -2
    else: 
        ages = list(range(start_point, end_point + 1))  # Tạo danh sách ngày tuổi từ 1 đến end_point
        weight_predictions = []  # Khởi tạo danh sách để lưu kết quả dự đoán

        for age in ages:
            prediction = predict_weight(data, age, pig_id)  # Dự đoán trọng lượng cho từng ngày tuổi
            weight_predictions.append(prediction)  # Thêm kết quả dự đoán vào danh sách

        plot_weight(pig_id, start_point, end_point, weight_predictions, data)  # Vẽ đồ thị
    
#******************************************************3*********************************************************
def main():
    # Đọc dữ liệu từ file data_pig.csv
    
    #print(f"Đường dẫn đầy đủ của tệp hiện tại: {os.path.abspath(__file__)}")
    
    data_init = pd.read_csv("c:\\Users\\khanh\\OneDrive\\Máy tính\\Khoa Luan\\Project_old\\pig-farm-master\\includes\\data\\data.csv")
    data = data_init.copy()
    
    #Kịch bản 1: Dự đoán Trọng lượng
    while True:
        a = input("Nhập ID của con lợn cần dự đoán (nhập '0' để dừng): ")
        if a == "0":
            print("Bye!!!")
            break
        else:
            pig_id = int(a)  # ID của con lợn cần dự đoán
            while True:
                b = input("Nhập ngày tuổi để dự đoán trọng lượng (nhập '0' để dừng): ")
                if b == "0":
                    print("Bye")
                    break
                else:
                    predict_age = int(b)  # Chọn ngày tuổi để dự đoán trọng lượng
                    print("id: ",pig_id)
                    print("age: ",predict_age)
                    weight_predictions = predict_Data(data, pig_id, predict_age)  # Dự đoán trọng lượng cho con lợn cụ thể
                    print(f"Dự đoán trọng lượng cho con lợn ID {pig_id} ở ngày tuổi {predict_age}:", weight_predictions)  # In ra kết quả dự đoán
                    
            paint(pig_id, data)  # Gọi hàm paint để vẽ đồ thị
            
            
#******************************************************4*********************************************************
if __name__ == "__main__":
    main()