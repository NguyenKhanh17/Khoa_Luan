import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix

class LogisticRegression:
    def __init__(self, learning_rate=0.01, num_iterations=1000):
        self.learning_rate = learning_rate
        self.num_iterations = num_iterations
        self.weights = None
        self.bias = None

    def sigmoid(self, z):
        """Hàm sigmoid để chuyển đổi đầu ra thành xác suất."""
        return 1 / (1 + np.exp(-z))

    def fit(self, X, y):
        """Huấn luyện mô hình hồi quy logistic."""
        num_samples, num_features = X.shape
        self.weights = np.zeros(num_features)  # Khởi tạo trọng số
        self.bias = 0  # Khởi tạo bias

        # Huấn luyện mô hình
        for _ in range(self.num_iterations):
            # Tính toán đầu ra
            linear_model = np.dot(X, self.weights) + self.bias
            y_predicted = self.sigmoid(linear_model)

            # Tính toán gradient
            dw = (1 / num_samples) * np.dot(X.T, (y_predicted - y))
            db = (1 / num_samples) * np.sum(y_predicted - y)

            # Cập nhật trọng số và bias
            self.weights -= self.learning_rate * dw
            self.bias -= self.learning_rate * db

    def predict(self, X):
        """Dự đoán xác suất cho các mẫu mới."""
        linear_model = np.dot(X, self.weights) + self.bias
        y_predicted = self.sigmoid(linear_model)
        # Chuyển đổi xác suất thành nhãn (0 hoặc 1)
        y_predicted_class = [1 if i > 0.5 else 0 for i in y_predicted]
        return np.array(y_predicted_class)

# Ví dụ sử dụng
if __name__ == "__main__":
    # Tạo dữ liệu mẫu
    X, y = make_classification(n_samples=100, n_features=2, n_classes=2, n_informative=2, n_redundant=0, random_state=42)
    
    # Chia dữ liệu thành tập huấn luyện và tập kiểm tra
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Khởi tạo và huấn luyện mô hình hồi quy logistic tự xây dựng
    model = LogisticRegression(learning_rate=0.1, num_iterations=1000)
    model.fit(X_train, y_train)

    # Dự đoán
    predictions = model.predict(X_test)

    # Tính toán độ chính xác
    accuracy = accuracy_score(y_test, predictions)
    print("Độ chính xác của mô hình tự xây dựng:", accuracy)

    # So sánh với mô hình hồi quy logistic có sẵn
    from sklearn.linear_model import LogisticRegression as SklearnLogisticRegression

    # Khởi tạo và huấn luyện mô hình hồi quy logistic từ scikit-learn
    sklearn_model = SklearnLogisticRegression()
    sklearn_model.fit(X_train, y_train)

    # Dự đoán
    sklearn_predictions = sklearn_model.predict(X_test)

    # Tính toán độ chính xác
    sklearn_accuracy = accuracy_score(y_test, sklearn_predictions)
    print("Độ chính xác của mô hình scikit-learn:", sklearn_accuracy)

    # Hiển thị ma trận nhầm lẫn
    print("Ma trận nhầm lẫn (Mô hình tự xây dựng):")
    print(confusion_matrix(y_test, predictions))
    print("Ma trận nhầm lẫn (Mô hình scikit-learn):")
    print(confusion_matrix(y_test, sklearn_predictions))

    # Vẽ biểu đồ
    plt.scatter(X_test[:, 0], X_test[:, 1], c=y_test, cmap='coolwarm', edgecolors='k', s=50)
    plt.title("Dữ liệu kiểm tra")
    plt.xlabel("Feature 1")
    plt.ylabel("Feature 2")
    plt.show()
