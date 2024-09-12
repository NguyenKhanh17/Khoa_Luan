#1. Dự đoán Trọng lượng (Weight Prediction)
#Mô tả: Sử dụng các thông số như DFI, CFI, và các yếu tố khác để dự đoán trọng lượng của lợn trong tương lai.
#Cách thực hiện: Huấn luyện một mô hình hồi quy (regression model) dựa trên dữ liệu lịch sử để dự đoán trọng lượng.

import pandas as pd

from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.svm import SVR
from xgboost import XGBRegressor
from sklearn.neural_network import MLPRegressor
   
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

#Lọc lấy dữ liệu theo id con lợn cần dự đoán
def data_preprocessing(data, pig_id):
    pig_data = data[data['id'] == pig_id]
    
    # Kiểm tra nếu có dữ liệu cho con lợn này
    if pig_data.empty:
        return f"Không tìm thấy dữ liệu cho con lợn ID {pig_id}"
    return pig_data


#****************************************************   1   ************************************************************
def update_Data_DFI(data, pig_id, predict_age, predict_dfi):
    group = data[(data['id'] == pig_id) & (data['age'] < predict_age)]['Fattening_group.Pen'].iloc[0]
    today_CFI = data[(data['id'] == pig_id) & (data['age'] == predict_age - 1)]['cfi'].values[0]  # Lấy trọng lượng trước ngày age_to_predict
    predict_cfi = today_CFI + predict_dfi
    
    new_row = {
        'id': pig_id,
        'Fattening_group.Pen': group,
        'age': predict_age,  # Ngày tuổi cần dự đoán
        'weight': -1,
        'dfi': predict_dfi,
        'cfi': predict_cfi,  # CFI có thể được cập nhật sau
        'previous_weight': -1  # Trọng lượng trước đó sẽ được cập nhật sau
    }   
    
    data.loc[len(data)] = new_row
    return data
    
#Lấy data gồm dữ liệu đầu vào đảm bảo cho việc dự đoán DFI (1 cột age và 7 cột dfi của 7 ngày trước)
def data_preprocessing_DFI(data):
    dfi_data = pd.DataFrame(columns=['age', 'dfi'])  # Thêm cột dfi và age
    dfi_data['age'] = data['age']
    dfi_data['dfi'] = data['dfi']
    
    for i in range(1, 8):  # Lấy giá trị DFI và tuổi của 7 ngày trước
        dfi_data[f'pre_dfi_{i}'] = data['dfi'].shift(i)
    dfi_data = dfi_data.dropna()  # Loại bỏ các hàng có giá trị NaN
    return dfi_data
    
def model_training_DFI(data):
    data = data.dropna()
    
    X = data[['age'] + [f'pre_dfi_{i}' for i in range(1, 8)]]  # Sử dụng 7 giá trị DFI trước và tuổi hiện tại
    y = data['dfi']  # Cột DFI
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
    #Khởi tạo mô hình
    model_dfi = RandomForestRegressor(n_estimators=200, random_state=42)
    
    #Huấn luyện mô hình
    model_dfi.fit(X_train, y_train)
    
    #Dự đoán với bộ test
    predictions = model_dfi.predict(X_test)
    
    # Tính độ chính xác
    accuracy = r2_score(y_test, predictions)  
    print("Độ chính xác dfi:",accuracy)
    
    return model_dfi  

#Xử lý luôn việc dự đoán nếu tuổi lớn hơn max nhiều
def predict_DFI(data, pig_id, predict_age):
    dfi_data = data_preprocessing_DFI(data)
    model = model_training_DFI(dfi_data)
    pig_data = data_preprocessing(data, pig_id) 

    def input_model_DFI(data_input, age_input): 
        input_model_df = pd.DataFrame({'age': [age_input]}, columns=['age'] + [f'pre_dfi_{i}' for i in range(1, 8)])  # Tạo DataFrame với 8 cột, gán giá trị age hàng đầu tiên là age_input
        for i in range(1, 8):
            input_model_df[f'pre_dfi_{i}'] = data_input[data_input['age'] == (age_input - i)]['dfi'].values  # Gán giá trị DFI trước đó
        input_model_df.to_csv("c:\\Users\\khanh\\OneDrive\\Máy tính\\Khoa Luan\\Project_old\\pig-farm-master\\includes\\data\\input_DFI.csv", index=False)  # Xuất dữ liệu vào file out.csv   
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
            
            predict_dfi = model.predict(input_model)
            data = update_Data_DFI(data, pig_id, max_age, predict_dfi[0])
            data.to_csv("c:\\Users\\khanh\\OneDrive\\Máy tính\\Khoa Luan\\Project_old\\pig-farm-master\\includes\\data\\dfi_update_data.csv", index=False)  # Xuất dữ liệu vào file out.csv   
 
        return predict_dfi
    else:
        #lấy dữ liệu đầu vào phù hợp
        input_model = input_model_DFI(pig_data, predict_age)
        
        predict_dfi = model.predict(input_model)
    return predict_dfi[0]   
    
#****************************************************   2   ************************************************************
def update_Data_Weight(data, pig_id, predict_age, predict_weight):
    pre_weight = data[(data['id'] == pig_id) & (data['age'] == predict_age - 1)]['weight']
    data.loc[(data['id'] == pig_id) & (data['age'] == predict_age), 'previous_weight'] = pre_weight
    data.loc[(data['id'] == pig_id) & (data['age'] == predict_age), 'weight'] = predict_weight
    return data
    
def data_preprocessing_Weight(data):
    data['previous_weight'] = data['weight'].shift(1)  # Trọng lượng ngày trước
    return data
    
def model_training_Weight(data):
    data = data.dropna()
    
    X = data[['dfi', 'previous_weight']]  # Sử dụng trọng lượng ngày trước, dfi và cfi
    y = data['weight']  # Cột trọng lượng
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    #Độ chính xác: 0.8888274243114693
    #model = LinearRegression()
            
    #Độ chính xác: 0.9402764927176726
    model_weight = RandomForestRegressor(n_estimators=100, random_state=42)
            
    #Độ chính xác: 0.9424663005130192
    #model = GradientBoostingRegressor(n_estimators=100, random_state=42)
            
    #Độ chính xác: 0.864022443691673 (Thấy còn gần hơn LR)
    #model = SVR(kernel='rbf')
            
    #Độ chính xác: 0.9302588303386436
    #model = XGBRegressor(n_estimators=100, random_state=42)
            
    #Độ chính xác: 0.9279437770287591
    #model = MLPRegressor(hidden_layer_sizes=(100,), max_iter=1000, random_state=42)
            
    model_weight.fit(X_train, y_train)
    predictions = model_weight.predict(X_test)
    accuracy = r2_score(y_test, predictions)  # Tính độ chính xác
    print("Độ chính xác weight:",accuracy)
    return model_weight

def predict_Weight(data, pig_id, predict_age, max_age):
    pig_data = data_preprocessing(data, pig_id)
    data = data_preprocessing_Weight(data)
    model = model_training_Weight(data)
    
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
        input_model_weight = input_model_weight[['dfi', 'previous_weight']]  # Đảm bảo thứ tự cột
        return input_model_weight
    
    if predict_age > max_age:
        age_temp = predict_age 
        while age_temp - max_age > 0:
            max_age += 1
            input_model = input_Model_Weight(pig_data, max_age)
            predict_weight = model.predict(input_model)
            data = update_Data_Weight(data, pig_id, max_age, predict_weight[0])
            data.to_csv("c:\\Users\\khanh\\OneDrive\\Máy tính\\Khoa Luan\\Project_old\\pig-farm-master\\includes\\data\\last_weight_data.csv", index=False)  # Xuất dữ liệu vào file out.csv
             
        return predict_weight
    else:
        input_model = input_Model_Weight(pig_data, predict_age)
        predict_weight = model.predict(input_model)
    return predict_weight[0]

#****************************************************   3   ************************************************************        

def predict_Data(data_init, pig_id, predict_age):
    data = data_init.copy()
    pig_data = data_preprocessing(data, pig_id)
    max_age = pig_data['age'].max()
    if predict_age > max_age:
        predict_DFI(data, pig_id, predict_age)
        data.to_csv("c:\\Users\\khanh\\OneDrive\\Máy tính\\Khoa Luan\\Project_old\\pig-farm-master\\includes\\data\\pre_weight_data.csv", index=False)  # Xuất dữ liệu vào file out.csv
        predict_weight = predict_Weight(data, pig_id, predict_age, max_age)
        
    else:
        predict_weight = predict_Weight(data, pig_id, predict_age, max_age)
    
    data.to_csv("c:\\Users\\khanh\\OneDrive\\Máy tính\\Khoa Luan\\Project_old\\pig-farm-master\\includes\\data\\final_data.csv", index=False)  # Xuất dữ liệu vào file out.csv   

    return predict_weight    
    

def clear_data(data, data_init):
    data = data_init.copy()
    

