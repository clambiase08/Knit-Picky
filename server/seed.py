#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import random

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import *

if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        print("Deleting table data...")
        Customer.query.delete()
        Order.query.delete()
        OrderItem.query.delete()
        Style.query.delete()
        Category.query.delete()
        Sku.query.delete()
        Color.query.delete()
        print("Tables empty, starting seed data...")

        print("Seeding customers...")
        christina = Customer(
            username="xtina08",
            first_name="Christina",
            last_name="Lambiase",
            email="christina.lambiase@gmail.com",
            shipping_address="100 West 5th Street Long Beach CA 90802",
            billing_address="100 West 5th Street Long Beach CA 90802",
        )
        christina.password_hash = "cubby123"

        gina = Customer(
            username="ginalamb",
            first_name="Gina",
            last_name="Dammann",
            email="gnlambiase@gmail.com",
            shipping_address="83 Wyckoff Street Brooklyn NY 11201",
            billing_address="83 Wyckoff Street Brooklyn NY 11201",
        )
        gina.password_hash = "chico123"

        sean = Customer(
            username="seancali18",
            first_name="Sean",
            last_name="Callaghan",
            email="seancallaghan18@gmail.com",
            shipping_address="100 West 5th Street Long Beach CA 90802",
            billing_address="100 West 5th Street Long Beach CA 90802",
        )
        sean.password_hash = "cubby123"
        db.session.add(christina)
        db.session.add(gina)
        db.session.add(sean)
        db.session.commit()
        print("Customers seeded...")

        print("Seeding orders...")
        order_list = []
        status_list = [
            "created",
            "paid",
            "shipped",
        ]
        for _ in range(10):
            status = random.choice(status_list)
            customer_id = randint(1, 3)

            order = Order(
                status=status,
                customer_id=customer_id,
            )
            db.session.add(order)
            db.session.commit()
        print("Orders seeded...")

        print("Seeding order items...")
        for _ in range(25):
            quantity = randint(1, 4)
            subtotal = random.uniform(10.00, 50.00)
            order_id = randint(1, 10)
            style_id = randint(1, 20)

            order_item = OrderItem(
                quantity=quantity,
                subtotal=subtotal,
                order_id=order_id,
                style_id=style_id,
            )
            db.session.add(order_item)
            db.session.commit()
        print("Order items seeded...")

        print("Seeding styles...")
        for _ in range(20):
            style_name = fake.text(max_nb_chars=10)
            description = fake.text(max_nb_chars=100)
            price = random.uniform(10.00, 25.00)
            stock_quantity = randint(1, 100)
            category_id = randint(1, 2)

            style = Style(
                style_name=style_name,
                description=description,
                price=price,
                stock_quantity=stock_quantity,
                category_id=category_id,
            )
            db.session.add(style)
            db.session.commit()
        print("Styles seeded...")

        print("Seeding categories...")
        yarns = Category(category_name="yarns")
        accessories = Category(category_name="accessories")
        db.session.add(yarns)
        db.session.add(accessories)
        db.session.commit()
        print("Categories seeded...")

        print("Seeding skus...")
        for _ in range(60):
            sku = fake.bothify(text="????-########")
            color_id = randint(1, 6)
            style_id = randint(1, 20)

            sku = Sku(
                sku=sku,
                color_id=color_id,
                style_id=style_id,
            )
            db.session.add(sku)
            db.session.commit()
        print("Skus seeded...")

        print("Seeding colors...")
        for _ in range(6):
            color = fake.color_name()

            color = Color(color=color)
            db.session.add(color)
            db.session.commit()
        print("Colors seeded...")
        print("Seeding complete. Let's boogie")
