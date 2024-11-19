#1. Dự đoán Trọng lượng (Weight Prediction)
#Mô tả: Sử dụng các thông số như DFI, CFI, và các yếu tố khác để dự đoán trọng lượng của lợn trong tương lai.
#Cách thực hiện: Huấn luyện một mô hình hồi quy (regression model) dựa trên dữ liệu lịch sử để dự đoán trọng lượng.

import pandas as pd
import random
import os
import mysql.connector
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import tensorflow as tf
from ML_Long_Term_Memory import train_LSTM
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.neighbors import KNeighborsRegressor
from sklearn.svm import SVR
#from xgboost import XGBRegressor
from sklearn.neural_network import MLPRegressor
import numpy as np

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
 
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

#Lọc lấy dữ liệu theo id con lợn cần dự đoán
#data ban đầu
def data_preprocessing(data, pig_id):
    pig_data = data[data['id'] == pig_id]
    
    # Kiểm tra nếu có dữ liệu cho con lợn này
    if pig_data.empty:
        return f"Không tìm thấy dữ liệu cho con lợn ID {pig_id}"
    return pig_data

#Chuẩn hóa data để lấy các cột cần thiết
def data_standardization(data_init):
    # Chuyển tất cả tên cột về chữ thường để kiểm tra
    data_init.columns = data_init.columns.str.lower()
    
    # Kiểm tra nếu data có đủ 4 cột cần thiết
    if all(column in data_init.columns for column in ['id', 'age', 'dfi', 'weight']):
        data = data_init[['id', 'age', 'dfi', 'weight']]
    elif all(column in data_init.columns for column in ['animal_id', 'age', 'feed_intake', 'weight']):
        data = data_init[['animal_id', 'age', 'feed_intake', 'weight']].rename(columns={
            'animal_id': 'id', 'age': 'age', 'feed_intake': 'dfi', 'weight': 'weight'
        })
    else:
        return data_init, False  # Trả về False nếu không có đủ cột cần thiết
    
    # Chuẩn hóa dữ liệu của các cột
    data['id'] = data['id'].astype(int)
    data['age'] = data['age'].astype(int)
    data['dfi'] = data['dfi'].astype(str).str.replace(',', '.').apply(lambda x: float(x.replace('"', '')) if x.replace('"', '') != '' else None)
    data['weight'] = data['weight'].astype(str).str.replace(',', '.').apply(lambda x: float(x) if x != '' else None)
    
    data = data[['id', 'age', 'dfi', 'weight']]
    return data, True

# Lựa chọn thuật toán
def Algorithm_Case(Algorithm, X_train, y_train, type_predict):
    if Algorithm == 'algorithm1':
        model = LinearRegression()
        model.fit(X_train, y_train)
    elif Algorithm == 'algorithm2':
        model = GradientBoostingRegressor(n_estimators=200, random_state=42, min_samples_leaf=1, max_features='auto', learning_rate=0.1)
        model.fit(X_train, y_train)
    elif Algorithm == 'algorithm3':
        model = KNeighborsRegressor(n_neighbors=2)
        model.fit(X_train, y_train)
    elif Algorithm == 'algorithm4':
        model = MLPRegressor(hidden_layer_sizes=(64, 32), max_iter=1000, random_state=42)
        model.fit(X_train, y_train)
    elif Algorithm == 'algorithm5':
        model = SVR(kernel='rbf', C=1e3, gamma=0.1)
        model.fit(X_train, y_train)
    elif Algorithm == 'algorithm6':
        model = RandomForestRegressor(n_estimators=200, random_state=42, min_samples_leaf=1, max_features='auto')
        model.fit(X_train, y_train)
    elif Algorithm == 'algorithm7' and type_predict == 'dfi':
        model = Sequential([
            LSTM(hidden_dim, input_shape=(7, input_dim)),  # input_dim: tuổi và DFI từng ngày
            Dense(1)  # Dự đoán DFI hiện tại
        ])
        model.fit(X_train, y_train, epochs=50, batch_size=32)
    elif Algorithm == 'algorithm7' and type_predict == 'weight':
        model = Sequential([
            LSTM(hidden_dim, input_shape=(1, input_dim)),  # input_dim: Weight hôm qua, DFI hôm nay
            Dense(1)  # Dự đoán Weight hiện tại
        ])
        model.fit(X_train, y_train, epochs=50, batch_size=32)
    elif Algorithm == 'algorithm8':
        model = train_LSTM(X_train, y_train, type_predict)
    else:
        return "Không có thuật toán phù hợp"
    return model

def predict_input_custom(model, input_model, algorithm):
    if algorithm == 'algorithm8':
        predictions = model.forward(input_model)
    else:
        predictions = model.predict(input_model)
    return predictions

#****************************************************   1   ************************************************************
#Cập nhật giá trị DFI mới
def update_Data_DFI(data, pig_id, predict_age, predict_dfi):
    #group = data[(data['id'] == pig_id) & (data['age'] < predict_age)]['Fattening_group.Pen'].iloc[0]
    #today_CFI = data[(data['id'] == pig_id) & (data['age'] == predict_age - 1)]['cfi'].values[0]  # Lấy trọng lượng trước ngày age_to_predict
    #predict_cfi = today_CFI + predict_dfi
    
    new_row = {
        'id': pig_id,
    #    'Fattening_group.Pen': group,
        'age': predict_age,  # Ngày tuổi cần dự đoán
        'weight': None,
        'dfi': predict_dfi,
    #    'cfi': predict_cfi,  # CFI có thể được cập nhật sau
        'previous_weight': None  # Trọng lượng trước đó sẽ được cập nhật sau
    }   
    
    data.loc[len(data)] = new_row
    return data
    
#Lấy data gồm dữ liệu đầu vào đảm bảo cho việc huấn luyện DFI (1 cột age và 7 cột dfi của 7 ngày trước)
def data_preprocessing_DFI(data):
    dfi_data = pd.DataFrame(columns=['dfi', 'age'])  # Thêm cột dfi và age
    dfi_data['dfi'] = data['dfi']
    dfi_data['age'] = data['age']
    
    for i in range(1, 8):  # Lấy giá trị DFI và tuổi của 7 ngày trước
        dfi_data[f'pre_dfi_{i}'] = data.groupby('id')['dfi'].shift(i)  # Lấy giá trị DFI trước cùng pig_id
    dfi_data = dfi_data.dropna()  # Loại bỏ các hàng có giá trị NaN
    return dfi_data

#data: data_preprocessing_DFI(data)
#đảm bảo đủ 7 giá trị đầu vào thì mới huấn luyện
#OUT: model đã huấn luyện, độ chính xác của model
def model_training_DFI(data, algorithm):
    data = data.dropna()
    
    X = data[['age'] + [f'pre_dfi_{i}' for i in range(1, 8)]]  # Sử dụng 7 giá trị DFI trước và tuổi hiện tại
    y = data['dfi']  # Cột DFI
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
    #Khởi tạo và huấn luyện mô hình
    model_dfi = Algorithm_Case(algorithm, X_train, y_train, 'dfi') 
    #Dự đoán với bộ test
    predictions = predict_input_custom(model_dfi, X_test, algorithm)
    
    mae = mean_absolute_error(y_test, predictions)
    mse = mean_squared_error(y_test, predictions)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, predictions)
    # Tính độ chính xác và lưu vào một biến
    metrics_DFI = pd.DataFrame({
        'mae': [mae],
        'mse': [mse],
        'rmse': [rmse],
        'r2': [r2]
    })
    print(f"Độ chính xác dfi: (Mean Absolute Error (MAE)): {mae:.2f}")
    print(f"Độ chính xác dfi: (Mean Squared Error (MSE)): {mse:.2f}")
    print(f"Độ chính xác dfi: (Root Mean Squared Error (RMSE)): {rmse:.2f}")
    print(f"Độ chính xác dfi: (R-squared (R²)): {r2:.2f}")
    
    return model_dfi, metrics_DFI  

#data: data ban đầu hoặc data đã update
#pig_id: int
#predict_age: int
#OUT: float, update data đã điền sau khi dự đoán dfi
def predict_DFI(data, pig_id, predict_age, algorithm):
    dfi_data = data_preprocessing_DFI(data) 
    model, metrics_DFI  = model_training_DFI(dfi_data, algorithm)
    pig_data = data_preprocessing(data, pig_id)
    
    min_age = pig_data['age'].min()
    
    total_dfi = pig_data['dfi'].notnull().sum()
    if total_dfi <= 7 or (predict_age - min_age) < 7:
        dfi_value = pig_data[pig_data['age'] == predict_age]['dfi']
        return dfi_value.values[0] if not dfi_value.empty else None
    else:
        #data: pig_data
        #age_input: int
        #out: dataframe(int,float(7))
        def input_model_DFI(data_input, age_input):
            input_model_df = pd.DataFrame({'age': [age_input]}, columns=['age'] + [f'pre_dfi_{i}' for i in range(1, 8)])  # Tạo DataFrame với 8 cột, gán giá trị age hàng đầu tiên là age_input
            for i in range(1, 8):
                previous_dfi = data_input[data_input['age'] == (age_input - i)]['dfi'].values
                if previous_dfi.size == 0:
                    break
                input_model_df[f'pre_dfi_{i}'] = previous_dfi[0]  # Gán giá trị DFI trước đó   
            return input_model_df
        
        #Dự đoán
        max_age = pig_data['age'].max()
            
        if predict_age > max_age:
            age_temp = predict_age
            
            while age_temp - max_age > 0:
                max_age += 1 
                
                #lấy dữ liệu đầu vào phù hợp
                pig_data = data_preprocessing(data, pig_id)
                
                input_model = input_model_DFI(pig_data, max_age)
                
                if input_model.isnull().any().any():
                    return None
                
                print(f"Ngày {predict_age}:")
                predict_dfi = float(predict_input_custom(model, input_model, algorithm).round(3))
                data = update_Data_DFI(data, pig_id, max_age, predict_dfi)
    
            return predict_dfi
        else:
            #lấy dữ liệu đầu vào phù hợp
            
            input_model = input_model_DFI(pig_data, predict_age)
            
            if input_model.shape[0] < 7:
                dfi_value = pig_data[pig_data['age'] == predict_age]['dfi'].values
                if dfi_value.size > 0:
                    return dfi_value[0]
                else:
                    return None
            print(f"Ngày {predict_age}:")
            predict_dfi = float(predict_input_custom(model, input_model, algorithm).round(3))
        return predict_dfi
    
#****************************************************   2   ************************************************************
def update_Data_Weight(data, pig_id, predict_age, predict_weight):
    # Lấy trọng lượng trước đó
    pre_weight = data[(data['id'] == pig_id) & (data['age'] == predict_age - 1)]['weight'].values[0]
    
    # Cập nhật trọng lượng trước đó và trọng lượng dự đoán
    data.loc[(data['id'] == pig_id) & (data['age'] == predict_age), 'previous_weight'] = pre_weight
    data.loc[(data['id'] == pig_id) & (data['age'] == predict_age), 'weight'] = predict_weight
    return data

#Chuẩn bị dữ liệu huấn luyện    
def data_preprocessing_Weight(data):
    data['previous_weight'] = data.groupby('id')['weight'].shift(1)  # Trọng lượng ngày trước cùng pig_id
    return data
    
def model_training_Weight(data, algorithm):
    data = data.dropna()
    
    X = data[['age', 'dfi', 'previous_weight']]  # Sử dụng trọng lượng ngày trước, dfi và cfi
    y = data['weight']  # Cột trọng lượng
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    
    model_weight = Algorithm_Case(algorithm, X_train, y_train, 'weight')
         
    if algorithm == 'algorithm8':
        predictions = model_weight.forward(X_test)
    else:   
        predictions = model_weight.predict(X_test)
    # Tính độ chính xác
    mae = mean_absolute_error(y_test, predictions)
    mse = mean_squared_error(y_test, predictions)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, predictions)
    # Tạo 1 biến lưu 4 độ chính xác này
    accuracy_metrics_weight = pd.DataFrame({
        "mae": [mae],
        "mse": [mse],
        "rmse": [rmse],
        "r2": [r2]
    })
    print(f"Độ chính xác weight: (Mean Absolute Error (MAE)): {mae:.2f}")
    print(f"Độ chính xác weight: (Mean Squared Error (MSE)): {mse:.2f}")  
    print(f"Độ chính xác weight: (Root Mean Squared Error (RMSE)): {rmse:.2f}")
    print(f"Độ chính xác weight: (R-squared (R²)): {r2:.2f}")
    return model_weight, accuracy_metrics_weight

#OUT: float
def predict_Weight(data, pig_id, predict_age, max_age, algorithm):
    pig_data = data_preprocessing(data, pig_id)
    data = data_preprocessing_Weight(data)
    model, accuracy_metrics_weight = model_training_Weight(data, algorithm)
    
    
    def input_Model_Weight(data_input, predict_age_input):
        # Lấy trọng lượng ngày trước đó
        previous_weight = data_input[data_input['age'] == predict_age_input - 1]['weight']
        if previous_weight.empty:
            return f"Không có dữ liệu trọng lượng cho ngày tuổi {predict_age_input - 1} của con lợn ID {pig_id}"
        
        # Lấy DFI hiện tại
        input_model_weight = data_input[data_input['age'] == predict_age_input][['dfi']]
        if input_model_weight.empty:
            return f"Không có dữ liệu cho dfi ngày {predict_age_input} của con lợn ID {pig_id}"

        # Đảm bảo thứ tự cột đúng
        input_model_weight['previous_weight'] = previous_weight.values[0]
        input_model_weight['age'] = predict_age_input
        input_model_weight = input_model_weight[['age', 'dfi', 'previous_weight']]  # Đảm bảo thứ tự cột
        return input_model_weight
    
    if predict_age > max_age:
        age_temp = predict_age  
        while age_temp - max_age > 0:
            max_age += 1
            pig_data = data_preprocessing(data, pig_id)
            
            input_model = input_Model_Weight(pig_data, max_age)
            print(f"Ngày {predict_age}:")
            predict_weight = round(float(predict_input_custom(model, input_model, algorithm)), 3)
                  
            data = update_Data_Weight(data, pig_id, max_age, predict_weight)
             
        return predict_weight
    else:
        
        input_model = input_Model_Weight(pig_data, predict_age)
        print(f"Ngày {predict_age}:")
        predict_weight = round(float(predict_input_custom(model, input_model, algorithm)), 3) 
    return predict_weight

#****************************************************   3   ************************************************************        
def multi_predict_DFI(data, pig_id, first_day, last_day, algorithm):
    dfi_data = data_preprocessing_DFI(data) 
    model, metrics_DFI = model_training_DFI(dfi_data, algorithm)
    pig_data = data_preprocessing(data, pig_id)
    
    min_age = pig_data['age'].min()
    
    if not isinstance(first_day, int) or not isinstance(last_day, int) or first_day > last_day or last_day < min_age:
        print("Lỗi: first_day hoặc last_day không hợp lệ")
        return None, metrics_DFI  # Đảm bảo trả về 2 giá trị
    
    if first_day < min_age:
        first_day = min_age
    elif first_day > pig_data['age'].max():
        first_day = pig_data['age'].max()
    
    total_dfi = pig_data['dfi'].notnull().sum()
    if total_dfi <= 7 or last_day - min_age < 7:
        results = pd.DataFrame()
        for age in range(first_day, last_day + 1):
            dfi_value = pig_data[pig_data['age'] == age]['dfi'].values[0] if not pig_data[pig_data['age'] == age]['dfi'].isnull().all() else None
            results = results.append({'age': age, 'dfi': dfi_value}, ignore_index=True)
            
        results['age'] = results['age'].astype(int)
        print("Hoàn thành hàm Multi_predict_DFI case 1")
        return results, metrics_DFI
    else:
        #data: pig_data
        #age_input: int
        #out: dataframe(int,float(7))
        def input_model_DFI(data_input, age_input):
            input_model_df = pd.DataFrame({'age': [age_input]}, columns=['age'] + [f'pre_dfi_{i}' for i in range(1, 8)])  # Tạo DataFrame với 8 cột, gán giá trị age hàng đầu tiên là age_input
            for i in range(1, 8):
                if (age_input - i <= 0):
                    input_model_df[f'pre_dfi_{i}'] = None
                    continue
                previous_dfi = data_input[data_input['age'] == (age_input - i)]['dfi'].values
                if previous_dfi.size == 0:
                    input_model_df[f'pre_dfi_{i}'] = None
                    continue
                input_model_df[f'pre_dfi_{i}'] = previous_dfi[0]  # Gán giá trị DFI trước đó   
            return input_model_df
            
        age_end = last_day
        age_start = first_day - 1
        results = pd.DataFrame()
            
        while age_end - age_start > 0:
            age_start += 1
                
            #lấy dữ liệu đầu vào phù hợp
            pig_data = data_preprocessing(data, pig_id)
                
            input_model = input_model_DFI(pig_data, age_start)
            
            if input_model.iloc[0, 1:].isnull().any():
                dfi_value = pig_data[pig_data['age'] == age_start]['dfi'].values
                if dfi_value.size > 0:
                    results = results.append({'age': age_start, 'dfi': dfi_value[0]}, ignore_index=True)
                    continue
                else:
                    results = results.append({'age': age_start, 'dfi': None}, ignore_index=True)
                    continue
            print(f"Ngày {age_start}:")
            predict_dfi = float(predict_input_custom(model, input_model, algorithm).round(3))
            data = update_Data_DFI(data, pig_id, age_start, predict_dfi)
            results = results.append({'age': age_start, 'dfi': predict_dfi}, ignore_index=True)

        results['age'] = results['age'].astype(int)
        print("Hoàn thành hàm Multi_predict_DFI case 2")
        return results, metrics_DFI
    

def multi_predict_Weight(data, pig_id, first_day, last_day, algorithm):
    pig_data = data_preprocessing(data, pig_id)
    data = data_preprocessing_Weight(data)
    model, accuracy_metrics_weight = model_training_Weight(data, algorithm)
    
    min_age = pig_data['age'].min()
    
    if not isinstance(first_day, int) or not isinstance(last_day, int) or first_day > last_day or last_day < min_age:
        print("Lỗi: first_day hoặc last_day không hợp lệ")
        return None, accuracy_metrics_weight  # Đảm bảo trả về 2 giá trị
    
    if first_day < min_age:
        first_day = min_age
    elif first_day > pig_data['age'].max():
        first_day = pig_data['age'].max()
    
    def input_Model_Weight(data_input, predict_age_input):
        # Lấy trọng lượng ngày trước đó
        previous_weight = data_input[data_input['age'] == predict_age_input - 1]['weight']
        if previous_weight.empty:
            print(f"Không có dữ liệu trọng lượng cho ngày tuổi {predict_age_input - 1} của con lợn ID {pig_id}")
            return None
        
        # Lấy DFI hiện tại
        predict_dfi_input = data_input[data_input['age'] == predict_age_input]['dfi']
        input_model_weight = pd.DataFrame(columns=['age', 'dfi', 'previous_weight'])
        
        if predict_dfi_input.empty:
            total_dfi = pig_data['dfi'].notnull().sum()
            if total_dfi <= 7:
                print(f"Không có dữ liệu cho dfi ngày {predict_age_input} của con lợn ID {pig_id}")
                return None
            predict_dfi_input = predict_DFI(data, pig_id, predict_age_input, algorithm)
        
        # Đảm bảo thứ tự cột đúng
        input_model_weight = input_model_weight.append({
            'age': predict_age_input,
            'dfi': predict_dfi_input,
            'previous_weight': previous_weight.values[0]
        }, ignore_index=True)
        return input_model_weight
    
    age_end = int(last_day)
    age_start = int(first_day - 1)
    results = pd.DataFrame(columns=['age', 'weight'])
    results['age'] = results['age'].astype(int)
    results['weight'] = results['weight'].astype(float)

    
    while age_end - age_start > 0:
        age_start += 1
        
        pig_data = data_preprocessing(data, pig_id)
        if age_start == min_age:
            predict_weight = float(pig_data[pig_data['age'] == age_start]['weight'].values[0])
            results = results.append({'age': int(age_start), 'weight': predict_weight}, ignore_index=True)
            continue
        
        input_model = input_Model_Weight(pig_data, age_start)
        
        if input_model is None or input_model.isnull().any(axis=1).any():
            results = results.append({'age': int(age_start), 'weight': None}, ignore_index=True)
            continue
                
        print(f"ID {pig_id} - Ngày {age_start}:")
        predict_weight = round(float(predict_input_custom(model, input_model, algorithm)), 3)
              
        data = update_Data_Weight(data, pig_id, age_start, predict_weight)
        results = results.append({'age': int(age_start), 'weight': predict_weight}, ignore_index=True)
    
    print('*****************thông tin*****************')
    results['age'] = results['age'].astype(int)
    results.info()
    return results, accuracy_metrics_weight

#****************************************************   4   ************************************************************
#Dự đoán cân nặng của con lợn trong 1 ngày được chỉ định
#data: data ban đầu
#pig_id: int
#predict_age: int
#OUT: float
def predict_Data(data, pig_id, predict_age, algorithm):
    #data = optimization_Data(data, pig_id)
    optimization_Data_link = os.path.join("includes", "data", "output_data", "optimization_Data.csv")
    data.to_csv(optimization_Data_link, index=False)
    
    pig_data = data_preprocessing(data, pig_id)
    min_age = pig_data['age'].min()
    
    if predict_age < min_age or not isinstance(predict_age, int):
        return f"Ngày tuổi dự đoán không hợp lệ"
    
    if predict_age == min_age:
        return float(data[(data['id'] == pig_id) & (data['age'] == predict_age)]['weight'].values[0])
    
    total_dfi = pig_data['dfi'].notnull().sum()
    if total_dfi <= 7:
        max_age_with_dfi = pig_data[pig_data['dfi'].notnull()]['age'].max()
        if predict_age > max_age_with_dfi:
            return pig_data[pig_data['age'] == predict_age]['weight'].values[0] if not pig_data[pig_data['age'] == predict_age]['weight'].isnull().all() else None
    else:     
        max_age = pig_data['age'].max()
        if predict_age > max_age:
            
            # Kiểm tra xem có giá trị dfi của con lợn pig_id vào ngày predict_age không
            # if pig_data[pig_data['age'] == predict_age]['dfi'].empty:
            predict_DFI(data, pig_id, predict_age, algorithm)
            
            predict_weight = predict_Weight(data, pig_id, predict_age, max_age, algorithm)
            
        else:
            predict_weight = predict_Weight(data, pig_id, predict_age, max_age, algorithm)
      
        return predict_weight   

#****************************************************   5   ************************************************************
#hàm này xử lý việc con lợn có dữ liệu nhưng bị thiếu dữ liệu dfi hoặc weight nhiều
def optimization_Data(data, pig_id):
    pig_data = data_preprocessing(data, pig_id)
    min_age = pig_data['age'].min()
    if pig_data[(pig_data['age'] == min_age)]['dfi'].isnull().values[0] or pig_data[(pig_data['age'] == min_age)]['weight'].isnull().values[0]:
        return f"Ngày đầu tiên của con lợn ID {pig_id} thiếu dữ liệu DFI hoặc trọng lượng."
    
    missing_days = sorted(data[(data['dfi'].isnull()) | (data['weight'].isnull())]['age'].unique())
    
    if not missing_days:
        return data
    
    for day in missing_days:
        max_age = pig_data[(pig_data['weight'].notnull()) & (pig_data['age'] < day)]['age'].max()
        day_data = pig_data[pig_data['age'] == day]
        
        if not day_data.empty and day_data['dfi'].isnull().values[0]:
            predict_DFI(data, pig_id, day)
        if not day_data.empty and day_data['weight'].isnull().values[0]:
            predict_Weight(data, pig_id, day, max_age)
        # if pig_data[(pig_data['age'] == day)]['dfi'].isnull() and pig_data[(pig_data['age'] == day)]['weight'].isnull():
        #     predict_DFI(data, pig_id, day)
        #     predict_Weight(data, pig_id, day, max_age)
            
    return data

#****************************************************   6   ************************************************************
#hàm này nhận vào giá trị dfi và weight của ngày đầu tiên sau đó thêm id
def new_id_data(data, dfi_values, weight_values):

    # Tạo một id ngẫu nhiên chưa có trong data
    new_id = random.randint(1, 10000)
    while new_id in data['id'].values:
        new_id = random.randint(1, 10000)

    # Tạo một giá trị ngẫu nhiên cho Fattening_group.Pen
    #new_pen = f"202001-{random.randint(1, 1000)}"

    # Tạo một giá trị ngẫu nhiên cho cfi trong khoảng 40-65
    #new_cfi = random.randint(40, 65)

    # Chuẩn hóa lại giá trị của weight và dfi là float, (cái nào None thì là giá trị None)
    max_length = max(len(dfi_values), len(weight_values))
    min_age = data['age'].min()
    for age in range(min_age, max_length + min_age):
        new_weight = float(weight_values[age - 1]) if age <= len(weight_values) and weight_values[age - 1] is not None else None
        new_dfi = float(dfi_values[age - 1]) if age <= len(dfi_values) and dfi_values[age - 1] is not None else None

        # Thêm dữ liệu mới vào data
        new_row = {
            'id': new_id,
    #        'Fattening_group.Pen': new_pen,
            'age': age,  # Ngày của con lợn
            'weight': new_weight,
            'dfi': new_dfi,
    #        'cfi': new_cfi,  # CFI ngẫu nhiên trong khoảng 40-65
        }

        data.loc[len(data)] = new_row

    return data, new_id
    
    
    
    
