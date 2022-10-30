from os import environ
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
db_username = environ.get("DB_USERNAME")
db_password = environ.get("DB_PASSWORD")
db_name = environ.get("DB_NAME")
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{db_username}:{db_password}@localhost/{db_name}"
db = SQLAlchemy(app=app)


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.VARCHAR(10))
    lastName = db.Column(db.Text)


class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    productName = db.Column(db.VARCHAR(10))
    price = db.Column(db.Integer)


class Payments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer)
    productId = db.Column(db.Integer)


with app.app_context():
    db.create_all()


@app.route("/tables")
def get_tables():
    tables = list(db.metadata.tables.keys())
    return tables


@app.route("/table/columns")
def get_table_columns(tableName):
    with db.engine.connect() as conn:
        result = conn.execute(f"""
        SELECT *
        FROM {tableName};
        """)
    columns = list(result.keys())
    return columns


@app.route("/table/metrics")
def get_table_metrics():
    """
    1. Get all column names for the table.
    2. Get all data of the table.
    3. Create a dictionary where keys will be column names
    and value will be another dictionary consisting all metrics 
    such as unique, null etc in key-value pairs.
    4. Iterate through data and count null values.
    5. Create a dictionary in which keys will be column names and
    value will be another dictionary consisting data and whether its 
    unique or not (boolean).
    """
    
    tableName = request.args.get("tableName")
    columns = get_table_columns(tableName)

    table_name_to_schema_map = {
        "users": Users,
        "products": Products,
        "payments": Payments
    }
    table_data = table_name_to_schema_map[tableName].query.all()
    column_size = len(columns)
    row_size = len(table_data)

    numbers_metrics_obj = {
        column: {"null": 0, "unique": 0, "value_count": 0} for column in columns}
    column_uniqueness = {column: {} for column in columns}
    for row_obj in table_data:
        for (column_name, cell_value) in row_obj.__dict__.items():
            if column_name in numbers_metrics_obj:
                if cell_value == None:
                    numbers_metrics_obj[column_name]["null"] += 1
                numbers_metrics_obj[column_name]["value_count"] += 1
                is_cell_value_unique = column_uniqueness[column_name].get(
                    cell_value, None)
                if is_cell_value_unique == None:
                    column_uniqueness[column_name][cell_value] = True
                elif is_cell_value_unique == True:
                    column_uniqueness[column_name][cell_value] = False
    for (column_key, uniqueness_obj) in column_uniqueness.items():
        for (_, value) in uniqueness_obj.items():
            if value:
                numbers_metrics_obj[column_key]["unique"] += 1
    percent_metrics_obj = {
        column: {"null": 0, "unique": 0, "value_count": 0} for column in columns}
    for (column_key, column_numbers) in numbers_metrics_obj.items():
        for (metric_key, metric_number) in column_numbers.items():
            percent_metrics_obj[column_key][metric_key] = metric_number if metric_key == "value_count" else round(
                (metric_number/(column_numbers["value_count"] or 1))*100, 2)
    return {"column_fields_metrics": percent_metrics_obj, "column_size": column_size, "row_size": row_size}


@app.route("/user", methods=["POST"])
def create_users():
    with db.engine.connect() as conn:
        result = conn.execute("""
        INSERT INTO users
        VALUES(3,'Rahul3','Chouhan2');
        """)
    return result


app.run(port="3000", host="localhost", debug=True)
