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

    def tanh(self, x):
        return np.tanh(x)

    def forward(self, x_seq):
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

        y_t = np.dot(self.Wy, h_t) + self.by
        return y_t.flatten()

    def backward(self, x_seq, y_true):
        y_pred = self.forward(x_seq)
        loss = y_pred.reshape(-1, 1) - y_true.reshape(-1, 1)

        # Compute gradients for output layer
        dWy = np.dot(loss, np.zeros((self.hidden_dim, 1)).T)
        dby = np.sum(loss, axis=1, keepdims=True)

        # Gradient updates
        self.Wy -= self.learning_rate * dWy
        self.by -= self.learning_rate * dby
        return loss


def train_LSTM(X_train, y_train, type_predict):
    hidden_dim = 16
    output_dim = 1
    input_dim = X_train.shape[2] if type_predict == "dfi" else X_train.shape[1]

    lstm = CustomLSTM(input_dim, hidden_dim, output_dim, learning_rate=0.01)

    epochs = 10
    for epoch in range(epochs):
        total_loss = 0
        for i in range(len(X_train)):
            loss = lstm.backward(X_train[i], y_train[i])
            total_loss += np.sum(loss**2)
        print(f"Epoch {epoch + 1}/{epochs}, Loss: {total_loss / len(X_train):.4f}")
    return lstm


def main():
    rng = np.random.default_rng(42)

    num_samples = 100
    sequence_length = 7

    # DFI data
    input_dim_dfi = 8
    X_dfi = rng.standard_normal((num_samples, sequence_length, input_dim_dfi))
    y_dfi = rng.standard_normal((num_samples, 1))

    # Weight data
    input_dim_weight = 2
    X_weight = rng.standard_normal((num_samples, sequence_length, input_dim_weight))
    y_weight = rng.standard_normal((num_samples, 1))

    # Training
    lstm_dfi = train_LSTM(X_dfi, y_dfi, "dfi")
    lstm_weight = train_LSTM(X_weight, y_weight, "weight")

    # Prediction
    new_input_dfi = rng.randn(sequence_length, input_dim_dfi)
    new_input_weight = rng.randn(sequence_length, input_dim_weight)
    predicted_dfi = lstm_dfi.forward(new_input_dfi)
    predicted_weight = lstm_weight.forward(new_input_weight)

    print(f"Dự đoán DFI hôm nay: {predicted_dfi}")
    print(f"Dự đoán weight hôm nay: {predicted_weight}")


if __name__ == "__main__":
    main()
