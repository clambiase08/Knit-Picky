from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

# from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt


class TimestampMixin:
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())


class Customer(db.Model, SerializerMixin):
    __tablename__ = "customers"
    serialize_rules = (
        "-orders.customer",
        "-orders.orderitem",
        "-wishlist_items.customer",
    )

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    shipping_address = db.Column(db.Text)
    billing_address = db.Column(db.Text)

    def __repr__(self):
        return f"User {self.username}, ID {self.id}"

    @hybrid_property
    def password_hash(self):
        raise AttributeError("password hashes may not be viewed")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))

    @validates(email)
    def validate_signup(self, key, value):
        if not len(value) > 0:
            raise ValueError("Must provide at least one character to sign up")
        return value

    orders = db.relationship("Order", backref="customer", cascade="delete")
    orderitems = association_proxy("orders", "orderitem")
    wishlist_items = db.relationship(
        "WishlistItem", backref="customer", cascade="delete"
    )


class Order(db.Model, SerializerMixin, TimestampMixin):
    __tablename__ = "orders"
    serialize_rules = ("-orderitems.order",)

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String, nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey("customers.id"))

    orderitems = db.relationship("OrderItem", backref="order", cascade="delete")


class OrderItem(db.Model, SerializerMixin):
    __tablename__ = "orderitems"
    serialize_rules = (
        "-order.orderitems",
        "-style.orderitems",
    )

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)
    subtotal = db.Column(db.Float)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"))
    style_id = db.Column(db.Integer, db.ForeignKey("styles.id"))
    sku_id = db.Column(db.Integer, db.ForeignKey("skus.id"))


class Style(db.Model, SerializerMixin):
    __tablename__ = "styles"
    serialize_rules = (
        "-orderitems.style",
        "-orderitems.order",
        "-skus.style",
        "-wishlist_items.style",
        "-category.styles",
    )

    id = db.Column(db.Integer, primary_key=True)
    style_name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    stock_quantity = db.Column(db.Integer)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"))

    orderitems = db.relationship("OrderItem", backref="style", cascade="delete")
    skus = db.relationship("Sku", backref="style", cascade="delete")


class Category(db.Model, SerializerMixin):
    __tablename__ = "categories"
    serialize_rules = ("-styles.category",)

    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String, nullable=False)

    styles = db.relationship("Style", backref="category", cascade="delete")


class Sku(db.Model, SerializerMixin):
    __tablename__ = "skus"
    serialize_rules = ("-style.orderitems",)

    id = db.Column(db.Integer, primary_key=True)
    sku = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    color_id = db.Column(db.Integer, db.ForeignKey("colors.id"))
    style_id = db.Column(db.Integer, db.ForeignKey("styles.id"))


class Color(db.Model, SerializerMixin):
    __tablename__ = "colors"
    serialize_rules = ("-skus.color",)

    id = db.Column(db.Integer, primary_key=True)
    color = db.Column(db.String, nullable=False)


class WishlistItem(db.Model, SerializerMixin):
    __tablename__ = "wishlist_items"
    serialize_rules = (
        "-style.wishlist_items",
        "-customer.wishlist_items",
        "-styles.orderitems",
    )

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey("customers.id"))
    style_id = db.Column(db.Integer, db.ForeignKey("styles.id"))
