import numpy as np

class CustomLSTM:
    def __init__(self, input_dim, hidden_dim, output_dim, learning_rate=0.01):
        self.input_dim = input_dim
        self.hidden_dim = hidden_dim
        self.output_dim = output_dim
        self.learning_rate = learning_rate

        # Initialize weights and biases
        self.Wf = np.random.randn(hidden_dim, input_dim + hidden_dim) * 0.01
        self.bf = np.zeros((hidden_dim, 1))
        self.Wi = np.random.randn(hidden_dim, input_dim + hidden_dim) * 0.01
        self.bi = np.zeros((hidden_dim, 1))
        self.Wc = np.random.randn(hidden_dim, input_dim + hidden_dim) * 0.01
        self.bc = np.zeros((hidden_dim, 1))
        self.Wo = np.random.randn(hidden_dim, input_dim + hidden_dim) * 0.01
        self.bo = np.zeros((hidden_dim, 1))
        self.Wy = np.random.randn(output_dim, hidden_dim) * 0.01
        self.by = np.zeros((output_dim, 1))

    def sigmoid(self, x):
        return 1 / (1 + np.exp(-x))

    def sigmoid_derivative(self, x):
        sig = self.sigmoid(x)
        return sig * (1 - sig)

    def tanh(self, x):
        return np.tanh(x)

    def tanh_derivative(self, x):
        return 1 - np.tanh(x) ** 2

    def forward(self, x_seq):
        self.h_states = []
        self.C_states = []
        self.gates = {'f': [], 'i': [], 'o': [], 'C~': []}

        h_t = np.zeros((self.hidden_dim, 1))
        C_t = np.zeros((self.hidden_dim, 1))

        for x_t in x_seq:
            x_t = x_t.reshape(-1, 1)
            concat = np.vstack((h_t, x_t))

            f_t = self.sigmoid(np.dot(self.Wf, concat) + self.bf)
            i_t = self.sigmoid(np.dot(self.Wi, concat) + self.bi)
            o_t = self.sigmoid(np.dot(self.Wo, concat) + self.bo)
            C_hat_t = self.tanh(np.dot(self.Wc, concat) + self.bc)

            C_t = f_t * C_t + i_t * C_hat_t
            h_t = o_t * self.tanh(C_t)

            self.h_states.append(h_t)
            self.C_states.append(C_t)
            self.gates['f'].append(f_t)
            self.gates['i'].append(i_t)
            self.gates['o'].append(o_t)
            self.gates['C~'].append(C_hat_t)

        y_t = np.dot(self.Wy, h_t) + self.by
        return y_t.flatten()

    def backward(self, x_seq, y_true):
        y_pred = self.forward(x_seq)
        loss = y_pred - y_true.reshape(-1, 1)

        dWy = np.dot(loss, self.h_states[-1].T)
        dby = loss

        dC_next = np.zeros_like(self.C_states[-1])
        dh_next = np.zeros_like(self.h_states[-1])

        for t in reversed(range(len(x_seq))):
            dh = np.dot(self.Wy.T, loss) + dh_next

            o_t = self.gates['o'][t]
            dC = dh * o_t * self.tanh_derivative(self.C_states[t]) + dC_next

            i_t = self.gates['i'][t]
            C_hat_t = self.gates['C~'][t]
            dC_hat = dC * i_t * self.tanh_derivative(C_hat_t)

            f_t = self.gates['f'][t]
            dC_prev = dC * f_t

            concat = np.vstack((self.h_states[t - 1] if t > 0 else np.zeros_like(dh), x_seq[t].reshape(-1, 1)))
            dWf = np.dot((dC_prev * f_t * self.sigmoid_derivative(f_t)), concat.T)
            dWi = np.dot((dC_hat * i_t * self.sigmoid_derivative(i_t)), concat.T)
            dWo = np.dot((dh * o_t * self.sigmoid_derivative(o_t)), concat.T)

            dh_next = np.dot(self.Wf.T, dC_prev)[:self.hidden_dim]

            self.Wf -= self.learning_rate * dWf
            self.Wi -= self.learning_rate * dWi
            self.Wo -= self.learning_rate * dWo
            self.Wy -= self.learning_rate * dWy
            self.bf -= self.learning_rate * np.sum(dC_prev, axis=1, keepdims=True)
            self.bi -= self.learning_rate * np.sum(dC_hat, axis=1, keepdims=True)
            self.bo -= self.learning_rate * np.sum(dh, axis=1, keepdims=True)

        return loss



def train_LSTM(X_train, y_train, type_predict):
    hidden_dim = 16
    output_dim = 1
    input_dim_dfi = 8
    input_dim_weight = 2
    

    # Huấn luyện mô hình
    epochs = 10

    if type_predict == "dfi":
        lstm_dfi = CustomLSTM(input_dim_dfi, hidden_dim, output_dim, learning_rate=0.01)
        print("Huấn luyện DFI:")
        for epoch in range(epochs):
            total_loss_dfi = 0
            for i in range(len(X_train)):
                loss_dfi = lstm_dfi.backward(X_train[i], y_train[i])  # Backward pass
                total_loss_dfi += np.sum(loss_dfi**2)
            print(f"Epoch {epoch + 1}/{epochs}, Loss: {total_loss_dfi / len(X_train):.4f}")
        return lstm_dfi

    if type_predict == "weight":    
        lstm_weight = CustomLSTM(input_dim_weight, hidden_dim, output_dim, learning_rate=0.01)
        print("\nHuấn luyện Weight:")
        for epoch in range(epochs):
            total_loss_weight = 0
            for i in range(len(X_train)):
                loss_weight = lstm_weight.backward(X_train[i], y_train[i])  # Backward pass
                total_loss_weight += np.sum(loss_weight**2)
            print(f"Epoch {epoch + 1}/{epochs}, Loss: {total_loss_weight / len(X_train):.4f}")
        return lstm_weight
    
def main():
    # Giả lập dữ liệu
    np.random.seed(42)
    num_samples = 100

    # Dữ liệu dự đoán DFI
    sequence_length = 7
    input_dim_dfi = 8  # 1 (tuổi) + 7 (DFI ngày trước)
    X_dfi = np.random.randn(num_samples, sequence_length, input_dim_dfi - sequence_length)
    y_dfi = np.random.randn(num_samples, 1)

    # Dữ liệu dự đoán weight
    input_dim_weight = 2  # weight ngày hôm qua + DFI hôm nay
    X_weight = np.random.randn(num_samples, input_dim_weight)
    y_weight = np.random.randn(num_samples, 1)
    # Input: Tuổi và DFI 7 ngày trước
    new_input_dfi = np.random.randn(sequence_length, input_dim_dfi - sequence_length)
    new_input_weight = np.random.randn(input_dim_weight)
    # Output: Dự đoán DFI hôm nay
    
    lstm_dfi = train_LSTM(X_dfi, y_dfi, "dfi")
    lstm_weight = train_LSTM(X_weight, y_weight, "weight")
    predicted_dfi = lstm_dfi.forward(new_input_dfi)
    predicted_weight = lstm_weight.forward(new_input_weight)
    print(f"Dự đoán DFI hôm nay: {predicted_dfi}")
    print(f"Dự đoán weight hôm nay: {predicted_weight}")
if __name__ == "__main__":
    main()

