#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session, abort
from flask_restful import Resource
from models import *
from werkzeug.exceptions import Unauthorized
import re

# Local imports
from config import app, db, api

# Add your model imports
from models import *


class Signup(Resource):
    def post(self):
        first_name = request.get_json()["first_name"]
        last_name = request.get_json()["last_name"]
        email = request.get_json()["email"]
        new_customer = Customer(
            email=email,
            first_name=first_name,
            last_name=last_name,
        )

        password = request.get_json()["password"]
        new_customer.password_hash = password
        db.session.add(new_customer)
        db.session.commit()
        session["customer_id"] = new_customer.id

        order = Order(
            status="created",
            customer_id=new_customer.id,
        )

        db.session.add(order)
        db.session.commit()

        return new_customer.to_dict()


api.add_resource(Signup, "/signup")


class Login(Resource):
    def post(self):
        email = request.get_json()["email"]
        customer = Customer.query.filter(Customer.email == email).first()

        password = request.get_json()["password"]
        if customer.authenticate(password):
            session["customer_id"] = customer.id
            return customer.to_dict(rules=("-_password_hash",))

        return {"error": "Invalid email or password"}, 401


api.add_resource(Login, "/login")


class CheckSession(Resource):
    def get(self):
        customer = Customer.query.filter(
            Customer.id == session.get("customer_id")
        ).first()
        if customer:
            return customer.to_dict(rules=("-_password_hash",))

        else:
            return {"message": "401: Not Authorized"}, 401


api.add_resource(CheckSession, "/check_session")


class Logout(Resource):
    def delete(self):
        session["customer_id"] = None
        return {"message": "204: No Content"}, 204


api.add_resource(Logout, "/logout")


class Styles(Resource):
    def get(self):
        styles = [
            style.to_dict(
                rules=(
                    "-orderitems",
                    "-category.styles",
                    # "-category.styles.orderitems",
                )
            )
            for style in Style.query.all()
        ]
        return make_response(styles, 200)


api.add_resource(Styles, "/styles")


class Customers(Resource):
    def get(self):
        customers = [c.to_dict() for c in Customer.query.all()]
        return make_response(customers, 200)


api.add_resource(Customers, "/customers")


class Colors(Resource):
    def get(self):
        colors = [color.to_dict() for color in Color.query.all()]
        return make_response(colors, 200)


api.add_resource(Colors, "/colors")


class Orders(Resource):
    def get(self):
        orders = [
            order.to_dict(rules=("-customer.orders",)) for order in Order.query.all()
        ]
        return make_response(orders, 200)

    def post(self):
        data = request.get_json()
        try:
            new_order = Order(**data)
        except:
            abort(422, errors=["Invalid Order"])
        db.session.add(new_order)
        db.session.commit()
        return make_response(new_order.to_dict(), 201)


api.add_resource(Orders, "/orders")


class OrderById(Resource):
    def patch(self, id):
        data = request.get_json()
        order = Order.query.filter_by(id=id).first()
        if not order:
            abort(404, "Order not found")
        for key in data:
            setattr(order, key, data[key])
        db.session.add(order)
        db.session.commit()
        return make_response(order.to_dict(), 202)


api.add_resource(OrderById, "/orders/<int:id>")


class OrderItemById(Resource):
    def delete(self, id):
        order_item = OrderItem.query.filter_by(id=id).first()
        if not order_item:
            return make_response({"error": "Order item not found"}, 404)
        db.session.delete(order_item)
        db.session.commit()
        return make_response({}, 204)

    def patch(self, id):
        data = request.get_json()
        order_item = OrderItem.query.filter_by(id=id).first()
        if not order_item:
            return make_response({"error": "Order item not found"}, 404)
        for key in data:
            setattr(order_item, key, data[key])
        db.session.add(order_item)
        db.session.commit()
        return make_response(order_item.to_dict(), 202)


api.add_resource(OrderItemById, "/order_items/<int:id>")


class OrderItems(Resource):
    def get(self):
        order_items = [
            o_i.to_dict(
                rules=(
                    "-order.orderitems",
                    "-style.category",
                    "-style.skus",
                )
            )
            for o_i in OrderItem.query.all()
        ]
        return make_response(order_items, 200)

    def post(self):
        data = request.get_json()
        try:
            new_item = OrderItem(**data)
        except:
            abort(422, errors=["Invalid Item"])
        db.session.add(new_item)
        db.session.commit()
        return make_response(new_item.to_dict(), 201)


api.add_resource(OrderItems, "/order_items")


class ColorNames(Resource):
    def get(self):
        color_ids = request.args.getlist("color_ids[]")
        colors = Color.query.filter(Color.id.in_(color_ids)).all()
        color_names = [color.color for color in colors]
        return {"color_names": color_names}


api.add_resource(ColorNames, "/color-names")


class Bestsellers(Resource):
    def get(self):
        styles = Style.query.all()

        style_info = []

        for style in styles:
            total_quantity = 0

            skus = Sku.query.filter_by(style_id=style.id).all()

            for order_item in OrderItem.query.filter_by(style_id=style.id).all():
                total_quantity += order_item.quantity

            style_data = {
                "id": style.id,
                "style_name": style.style_name,
                "description": style.description,
                "price": style.price,
                "stock_quantity": style.stock_quantity,
                "category_id": style.category_id,
                "total_quantity": total_quantity,
                "skus": [
                    {"id": sku.id, "color_id": sku.color_id, "image": sku.image}
                    for sku in skus
                ],
            }

            style_info.append(style_data)

        sorted_styles = sorted(
            style_info,
            key=lambda style_data: style_data["total_quantity"],
            reverse=True,
        )

        return sorted_styles


api.add_resource(Bestsellers, "/bestsellers")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
