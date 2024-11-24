import pandas as pd
import mysql.connector
import os
from io import StringIO

import numpy as np

# Kết nối đến MySQL
def get_mysql_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="172002",
        database="pig_model_data_full"
    )
    
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

# Tạo tên bảng dựa trên thông số
def generate_table_name(type_data, type_user, type_predict, pig_id, algorithm, session_id):
    # Tạo tên bảng theo quy ước đã có, trả về tên bảng và trạng thái
    # type_data: input, output, error, donut, barchart, summary_all, summary_mean
    # type_user: user, default
    # type_predict: dfi, weight
    
    if type_data == "input":
        name_table = f"input_{type_user}_{session_id}" if type_user == "user" else "input_default_data_3"
        return name_table, 0 if type_user == "default" else 1

    if type_data == "output":
        name_table = f"output_{algorithm}_{type_user}_{type_predict}_{pig_id}_{session_id if type_user == 'user' else ''}".rstrip("_")
        return name_table, 2 if type_user == "default" else 3

    if type_data == "error":
        name_table = f"output_{algorithm}_{type_user}_{type_predict}_error_{session_id if type_user == 'user' else ''}".rstrip("_")
        return name_table, 4 if type_user == "default" else 5

    if type_data in ["donut", "barchart"]:
        name_table = f"output_{type_data}_{type_user}_{session_id if type_user == 'user' else ''}".rstrip("_")
        return name_table, 6 + ["donut", "barchart"].index(type_data) * 2 + (1 if type_user == "user" else 0)

    if type_data in ["summary_all", "summary_mean"]:
        name_table = f"output_{type_data}_{type_user}_{type_predict}_{session_id if type_user == 'user' else ''}".rstrip("_")
        return name_table, 10 + ["summary_all", "summary_mean"].index(type_data) * 2 + (1 if type_user == "user" else 0)

    print("Error: Không xác định được loại bảng cần tạo.")
    return None, -1

# Tạo bảng MySQL nếu chưa tồn tại
def create_table_if_not_exists(name_table, status, type_predict):
    conn = get_mysql_connection()
    cursor = conn.cursor()

    # Định nghĩa câu lệnh tạo bảng
    table_definitions = {
        0: f"CREATE TABLE IF NOT EXISTS {name_table} (id INT, fattening_group.pen VARCHAR(255), age INT, weight FLOAT, dfi FLOAT);",
        1: f"CREATE TABLE IF NOT EXISTS {name_table} (id INT, age INT, dfi FLOAT, weight FLOAT);",
        2: f"CREATE TABLE IF NOT EXISTS {name_table} (age INT, {type_predict} FLOAT);",
        3: f"CREATE TABLE IF NOT EXISTS {name_table} (age INT, {type_predict} FLOAT);",
        4: f"CREATE TABLE IF NOT EXISTS {name_table} (mae FLOAT, mse FLOAT, rmse FLOAT, r2 FLOAT);",
        5: f"CREATE TABLE IF NOT EXISTS {name_table} (mae FLOAT, mse FLOAT, rmse FLOAT, r2 FLOAT);",
        6: f"CREATE TABLE IF NOT EXISTS {name_table} (value FLOAT);",
        8: f"CREATE TABLE IF NOT EXISTS {name_table} (age INT, value FLOAT);",
        9: f"CREATE TABLE IF NOT EXISTS {name_table} (age INT, value FLOAT);",
        10: f"CREATE TABLE IF NOT EXISTS {name_table} (id INT, min FLOAT, max FLOAT, mean FLOAT, sd FLOAT);",
        11: f"CREATE TABLE IF NOT EXISTS {name_table} (id INT, min FLOAT, max FLOAT, mean FLOAT, sd FLOAT);",
        12: f"CREATE TABLE IF NOT EXISTS {name_table} (min FLOAT, max FLOAT, mean FLOAT, sd FLOAT);",
        13: f"CREATE TABLE IF NOT EXISTS {name_table} (min FLOAT, max FLOAT, mean FLOAT, sd FLOAT);"
    }

    # Tạo bảng
    print("bảng loại: ", status)
    create_table_query = table_definitions.get(status)
    if create_table_query:
        cursor.execute(create_table_query)
        conn.commit()
        print(f"Bảng '{name_table}' đã được tạo thành công hoặc đã tồn tại.")
    else:
        print("Error: Không xác định được cấu trúc bảng để tạo.")

    cursor.close()
    conn.close()

# Kiểm tra và chỉ lấy các cột cần thiết
def validate_and_select_columns(data, status):
    # Định nghĩa cấu trúc cột cần thiết cho từng status
    required_columns = {
        0: ["id", "fattening_group.pen", "age", "weight", "dfi"],
        1: ["id", "age", "dfi", "weight"],
        2: ["age", "dfi"],
        3: ["age", "weight"],
        4: ["mae", "mse", "rmse", "r2"],
        5: ["mae", "mse", "rmse", "r2"],
        6: ["value"],
        7: ["value"],
        8: ["age", "value"],
        9: ["age", "value"],
        10: ["id", "min", "max", "mean", "sd"],
        11: ["id", "min", "max", "mean", "sd"],
        12: ["min", "max", "mean", "sd"],
        13: ["min", "max", "mean", "sd"]
    }

    # Lấy cấu trúc cột cần thiết cho status hiện tại
    columns_needed = required_columns.get(status)
    if not columns_needed:
        print(f"Lỗi: Status {status} không hợp lệ.")
        return None  # Trả về None nếu status không hợp lệ

    # Chuyển tên cột của data và columns_needed về chữ thường để so sánh
    data_columns = [col.lower() for col in data.columns]
    columns_needed = [col.lower() for col in columns_needed]

    # Kiểm tra xem các cột cần thiết có trong data không
    missing_columns = [col for col in columns_needed if col not in data_columns]
    if missing_columns:
        print(f"Lỗi: Thiếu các cột cần thiết: {', '.join(missing_columns)}")
        return None

    # Chỉ lấy các cột cần thiết, bỏ qua các cột thừa
    optimized_data = data[[col for col in data.columns if col.lower() in columns_needed]]
    
    # Đặt lại thứ tự cột theo đúng loại status
    optimized_data = optimized_data[columns_needed]  # Đặt lại thứ tự cột
    return optimized_data

def optimize_data(data, status):
    optimized_data = validate_and_select_columns(data, status)
    if optimized_data is None:
        return None  # Return None if data is invalid
    
    # Define desired column types
    column_types = {
        'id': int,
        'fattening_group.pen': str,
        'age': int,
        'dfi': float,
        'weight': float,
        'mae': float,
        'mse': float,
        'rmse': float,
        'r2': float,
        'value': float,
        'min': float,
        'max': float,
        'mean': float,
        'sd': float
    }

    # Convert NaN to None for MySQL compatibility
    optimized_data = optimized_data.where(pd.notnull(optimized_data), None)

    # Apply specified data types, converting to native Python types
    for column, dtype in column_types.items():
        if column in optimized_data.columns:
            # Convert column to native Python type
            optimized_data[column] = optimized_data[column].apply(lambda x: dtype(x) if x is not None else None)
    return optimized_data



# Hàm nhập dữ liệu từ CSV vào bảng
def import_csv_to_mysql(csv_path, name_table, status, type_predict):
    data = read_csv_file(csv_path)
    if data is not None:
        optimized_data = optimize_data(data, status)
        print("optimized_data: ", optimized_data)
        append_data_to_mysql(name_table, optimized_data, status, type_predict)
    else:
        print(f"Error: Không thể đọc file CSV {csv_path} - {status}")
        return 401
    return 200

# Hàm ghi thêm dữ liệu vào bảng MySQL
def append_data_to_mysql(name_table, data, status, type_predict):
    conn = get_mysql_connection()
    cursor = conn.cursor()
    
    

    # Định nghĩa các câu lệnh INSERT tương ứng với từng trạng thái
    insert_statements = {
        0: f"INSERT INTO {name_table} (id, fattening_group.pen, age, weight, dfi) VALUES (%s, %s, %s, %s, %s)",
        1: f"INSERT INTO {name_table} (id, age, dfi, weight) VALUES (%s, %s, %s, %s)",
        2: f"INSERT INTO {name_table} (age, {type_predict}) VALUES (%s, %s)",
        3: f"INSERT INTO {name_table} (age, {type_predict}) VALUES (%s, %s)",
        4: f"INSERT INTO {name_table} (mae, mse, rmse, r2) VALUES (%s, %s, %s, %s)",
        5: f"INSERT INTO {name_table} (mae, mse, rmse, r2) VALUES (%s, %s, %s, %s)",
        6: f"INSERT INTO {name_table} (value) VALUES (%s)",
        7: f"INSERT INTO {name_table} (value) VALUES (%s)",
        8: f"INSERT INTO {name_table} (age, value) VALUES (%s, %s)",
        9: f"INSERT INTO {name_table} (age, value) VALUES (%s, %s)",
        10: f"INSERT INTO {name_table} (id, min, max, mean, sd) VALUES (%s, %s, %s, %s, %s)",
        11: f"INSERT INTO {name_table} (id, min, max, mean, sd) VALUES (%s, %s, %s, %s, %s)",
        12: f"INSERT INTO {name_table} (min, max, mean, sd) VALUES (%s, %s, %s, %s)",
        13: f"INSERT INTO {name_table} (min, max, mean, sd) VALUES (%s, %s, %s, %s)"    
    }

    # Lấy câu lệnh INSERT phù hợp với status
    insert_query = insert_statements.get(status)
    if not insert_query:
        print(f"Lỗi: Status {status} không hợp lệ.")
        return

    for _, row in data.iterrows():
        # Chuyển dòng dữ liệu thành tuple để sử dụng với câu lệnh INSERT
        data_tuple = tuple(map(lambda x: round(float(x), 8) if isinstance(x, float) else x, row.values))

        # Kiểm tra số lượng giá trị trong data_tuple và số lượng placeholder trong insert_query
        required_params = insert_query.count("%s")
        if len(data_tuple) != required_params:
            print(f"Lỗi: Số lượng giá trị ({len(data_tuple)}) không khớp với yêu cầu ({required_params}) cho bảng '{name_table}'")
            continue

        try:
            cursor.execute(insert_query, data_tuple)
        except Exception as e:
            print(f"Error inserting data into {name_table}: {e}")

    # Lưu thay đổi và đóng kết nối
    conn.commit()
    cursor.close()
    conn.close()
    print(f"Đã ghi thêm dữ liệu vào bảng '{name_table}' thành công!")


# Hàm chính để viết hoặc nhập dữ liệu từ CSV vào MySQL
def write_data_to_mysql(type_write, type_data, type_user, type_predict, pig_id, algorithm, session_id, link_csv=None, data=None):
    name_table, status = generate_table_name(type_data, type_user, type_predict, pig_id, algorithm, session_id)
    if status == -1:
        return 401

    if type_write == "insert":
        create_table_if_not_exists(name_table, status, type_predict)
    if type_write == "renew":
        drop_table(name_table)
        create_table_if_not_exists(name_table, status, type_predict)
    
    if link_csv:
        error_status = import_csv_to_mysql(link_csv, name_table, status, type_predict)
        print("Error status: ", error_status)
        if error_status == 401:
            return 401
    elif data is not None:
        append_data_to_mysql(name_table, data, status, type_predict)
    return 200

def read_data_from_mysql(name_table):
    conn = get_mysql_connection()
    cursor = conn.cursor(buffered=True)  # Thêm buffered=True để tránh lỗi chưa đọc hết kết quả
    cursor.execute(f"SELECT * FROM {name_table}")
    data = cursor.fetchall()
    if not data:
        print(f"Bảng '{name_table}' không có dữ liệu.")
        return pd.DataFrame()
    else:
        df = pd.DataFrame(data, columns=cursor.column_names)
        cursor.close()
        conn.close()
        return df
    

def check_table_exist(name_table):
    conn = get_mysql_connection()
    cursor = conn.cursor(buffered=True)
    cursor.execute(f"SHOW TABLES LIKE '{name_table}'")
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    return bool(result)

def list_table_contains_multiple_phrase(include_word_1, include_word_2):
    conn = get_mysql_connection()
    cursor = conn.cursor(buffered=True)
    
    try:
        # Lấy danh sách tất cả các bảng
        cursor.execute("SHOW TABLES")
        tables = cursor.fetchall()
        if not tables:
            print("Không có bảng nào trong cơ sở dữ liệu.")
            return []

        # Lọc các bảng có chứa cả hai từ
        filtered_tables = [
            row[0] for row in tables
            if include_word_1 in row[0] and include_word_2 in row[0]
        ]
        
        print("Danh sách các bảng: ", filtered_tables)
        return filtered_tables
    except Exception as e:
        print(f"Lỗi trong hàm list_table_contains_multiple_phrase: {str(e)}")
        return []
    finally:
        cursor.close()
        conn.close()

def list_table_contains_phrase(include_word):
    conn = get_mysql_connection()  # Hàm kết nối đến MySQL
    cursor = conn.cursor(buffered=True)
    # Tìm các bảng có tên chứa cụm từ
    cursor.execute(f"SHOW TABLES LIKE '%{include_word}%'")
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    
    # Trả về danh sách các bảng
    return [row[0] for row in result]


def drop_table(name_table):
    """Xóa bảng nếu tồn tại"""
    conn = get_mysql_connection()
    cursor = conn.cursor()
    if check_table_exist(name_table):
        cursor.execute(f"DROP TABLE {name_table}")
        conn.commit()
        print(f"Bảng '{name_table}' đã được xóa thành công.")
    else:
        print(f"Bảng '{name_table}' không tồn tại.")
    cursor.close()
    conn.close()

def main():
    # Thực hiện tạo bảng và nhập dữ liệu từ CSV
    status = write_data_to_mysql("renew", "input", "user", "dfi", 1 , "algorithm1", "session2", link_csv=os.path.join("includes", "data", "data_test.csv"))
    if status == 401:
        print("Error: Không thể đọc file CSV")
    if check_table_exist("input_user_session2"):
        data = read_data_from_mysql("input_user_session2")
        print(data)

# if __name__ == "__main__":
#     main()
