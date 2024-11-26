import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from sklearn.model_selection import train_test_split
import pandas as pd
import os

# Bước 1: Tạo dữ liệu giả lập
def generate_fake_data(num_samples=1000):
    """
    Tạo dữ liệu giả lập: DFI và tuổi
    """
    data = []
    labels = []
    for _ in range(num_samples):
        # DFI 7 ngày trước (giá trị ngẫu nhiên từ 1.0 đến 3.0)
        dfi_last_7_days = np.round(np.random.uniform(1.0, 3.0, 7), 2)
        # Tuổi hiện tại (giá trị ngẫu nhiên từ 100 đến 200)
        age = np.random.randint(100, 200)
        # DFI hôm nay (nhãn dự đoán): một hàm giả lập
        dfi_today = np.round(dfi_last_7_days.mean() + (age % 10) * 0.05, 2)
        
        # Tạo dữ liệu đầu vào (7 ngày DFI + tuổi)
        input_features = [[dfi, age] for dfi in dfi_last_7_days]
        data.append(input_features)
        labels.append(dfi_today)
    
    return np.array(data), np.array(labels)

# Tạo dữ liệu
X, y = generate_fake_data(num_samples=1000)
print("Dữ liệu X:", X.shape)  # (1000, 7, 2)
print("Dữ liệu y:", y.shape)  # (1000,)

# Chuyển đổi dữ liệu thành mảng 2D
data_reshaped = np.reshape(X, (X.shape[0] * X.shape[1], X.shape[2]))

# Tạo DataFrame từ mảng 2D
data_frame = pd.DataFrame(data_reshaped, columns=['dfi_last_7_days', 'age'])

# Lưu DataFrame vào file CSV
data_frame.to_csv(os.path.join('includes', 'data_LSTM.csv'), index=False)

# Bước 2: Chia dữ liệu train/test
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Bước 3: Xây dựng mô hình LSTM
model = Sequential([
    LSTM(64, activation='relu', return_sequences=True, input_shape=(7, 2)),
    LSTM(32, activation='relu'),
    Dense(1)  # Dự đoán DFI hôm nay
])
model.compile(optimizer='adam', loss='mse', metrics=['mae'])

# Bước 4: Huấn luyện mô hình
print("Bắt đầu huấn luyện...")
history = model.fit(X_train, y_train, epochs=20, batch_size=32, validation_split=0.2)

# Bước 5: Đánh giá mô hình
print("\nĐánh giá trên tập test:")
test_loss, test_mae = model.evaluate(X_test, y_test)
print(f"Test Loss: {test_loss}, Test MAE: {test_mae}")

# Bước 6: Dự đoán
print("\nDự đoán với mẫu test đầu tiên:")
sample_input = X_test[0:1]  # Lấy một mẫu test
predicted_dfi = model.predict(sample_input)
print("DFI thực tế:", y_test[0])
print("DFI dự đoán:", predicted_dfi[0][0])
