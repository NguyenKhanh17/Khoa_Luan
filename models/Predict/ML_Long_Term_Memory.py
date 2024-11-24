import tensorflow as tf
import pandas as pd
import numpy as np
import os

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

def train_LSTM(X_train, y_train, input_features, output_features):
    import numpy as np

    # Chuyển đổi X_train và y_train nếu cần
    if isinstance(X_train, pd.DataFrame) or isinstance(X_train, pd.Series):
        X_train = X_train.to_numpy()
    if isinstance(y_train, pd.DataFrame) or isinstance(y_train, pd.Series):
        y_train = y_train.to_numpy()
    
    # Reshape dữ liệu: (samples, time_steps, features)
    # Đảm bảo rằng X_train đã được xử lý thành dạng time series trước khi vào hàm này
    if len(X_train.shape) != 3:
        raise ValueError(f"X_train phải có shape (samples, time_steps, features). Hiện tại: {X_train.shape}")
    
    print("X_train shape:", X_train.shape)

    # Xây dựng mô hình LSTM
    model = Sequential()
    model.add(LSTM(64, activation='relu', input_shape=(X_train.shape[1], input_features), return_sequences=True))
    model.add(LSTM(32, activation='relu'))
    model.add(Dense(output_features))

    # Compile mô hình
    model.compile(optimizer='adam', loss='mse', metrics=['mae'])

    # Huấn luyện mô hình
    model.fit(X_train, y_train, epochs=50, batch_size=16, verbose=1)

    return model



def create_time_series_for_LSTM(X, y, time_steps):
    import numpy as np
    
    X_series, y_series = [], []
    for i in range(len(X) - time_steps + 1):
        # Lấy `time_steps` dữ liệu liên tiếp
        X_series.append(X.iloc[i:i+time_steps].values if isinstance(X, pd.DataFrame) else X[i:i+time_steps])
        y_series.append(y.iloc[i+time_steps-1] if isinstance(y, pd.Series) else y[i+time_steps-1])
    
    X_series = np.array(X_series)
    y_series = np.array(y_series)

    # Debug
    print(f"X_series shape: {X_series.shape}, y_series shape: {y_series.shape}")
    
    return X_series, y_series


