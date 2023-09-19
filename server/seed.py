#!/usr/bin/env python3

# Standard library imports
from random import randint, shuffle
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

        print("Deleting table data...")
        Customer.query.delete()
        Order.query.delete()
        OrderItem.query.delete()
        Style.query.delete()
        Category.query.delete()
        Sku.query.delete()
        Color.query.delete()
        WishlistItem.query.delete()
        print("Tables empty, starting seed data...")

        print("Seeding customers...")
        christina = Customer(
            first_name="Christina",
            last_name="Lambiase",
            email="christina.lambiase@gmail.com",
            shipping_address="100 West 5th Street Long Beach CA 90802",
            billing_address="100 West 5th Street Long Beach CA 90802",
        )
        christina.password_hash = "cubby123"

        gina = Customer(
            first_name="Gina",
            last_name="Dammann",
            email="gnlambiase@gmail.com",
            shipping_address="83 Wyckoff Street Brooklyn NY 11201",
            billing_address="83 Wyckoff Street Brooklyn NY 11201",
        )
        gina.password_hash = "chico123"

        sean = Customer(
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
        status_list = ["paid", "shipped"]
        for _ in range(10):
            customer_id = randint(1, 3)

            existing_order = Order.query.filter_by(
                customer_id=customer_id, status="created"
            ).first()

            if existing_order:
                status = random.choice(status_list)
            else:
                status = "created"

            order = Order(
                status=status,
                customer_id=customer_id,
            )
            db.session.add(order)
            db.session.commit()
        print("Orders seeded...")

        print("Seeding styles...")
        styles = [
            {
                "style_name": "Alpaca",
                "description": "Medium-weight alpaca wool sourced from our free range alpacas in South America. Perfect for a project to transition you from summer to fall.",
                "price": 15.00,
                "category_id": 1,
            },
            {
                "style_name": "Cotton",
                "description": "Light-weight cotton fibre sourced from organic, fair trade cotton farms. Use for your summer blankets, sweaters, and baby gifts!",
                "price": 12.50,
                "category_id": 1,
            },
            {
                "style_name": "Merino Wool",
                "description": "Heavier-weight merino wool sourced from our sheep that live on the same farm as our alpacas in South America. Ideal for mittens, beanies, or scarves.",
                "price": 18.00,
                "category_id": 1,
            },
            {
                "style_name": "The Tote",
                "description": "The perfect carry-all for all your knitting odds and ends.",
                "price": 33.50,
                "category_id": 2,
            },
            {
                "style_name": "Stitch Markers",
                "description": "Never lose your place again!",
                "price": 5.50,
                "category_id": 2,
            },
            {
                "style_name": "Knitting Needles",
                "description": 'Birch 7" straight knitting needles. US 8, 5.0mm',
                "price": 7.50,
                "category_id": 2,
            },
            {
                "style_name": "Sir Knits-a-lot",
                "description": "Plush toy version of our mascot, Sir Knits-a-lot!",
                "price": 30.00,
                "category_id": 2,
            },
        ]

        for style in styles:
            style = Style(
                style_name=style["style_name"],
                description=style["description"],
                price=style["price"],
                stock_quantity=randint(1, 100),
                category_id=style["category_id"],
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
        sku_list = [
            {
                "image": "assets/khaki-alpaca.png",
                "color_id": 1,
                "style_id": 1,
            },
            {
                "image": "assets/seagreen-alpaca.png",
                "color_id": 5,
                "style_id": 1,
            },
            {
                "image": "assets/blue-alpaca.png",
                "color_id": 6,
                "style_id": 1,
            },
            {
                "image": "assets/khaki-cotton.png",
                "color_id": 1,
                "style_id": 2,
            },
            {
                "image": "assets/bisque-cotton.png",
                "color_id": 2,
                "style_id": 2,
            },
            {
                "image": "assets/coral-cotton.png",
                "color_id": 3,
                "style_id": 2,
            },
            {
                "image": "assets/seagreen-cotton.png",
                "color_id": 5,
                "style_id": 2,
            },
            {
                "image": "assets/khaki-wool.png",
                "color_id": 1,
                "style_id": 3,
            },
            {
                "image": "assets/coral-wool.png",
                "color_id": 3,
                "style_id": 3,
            },
            {
                "image": "assets/darkgreen-wool.png",
                "color_id": 4,
                "style_id": 3,
            },
            {
                "image": "assets/seagreen-wool.png",
                "color_id": 5,
                "style_id": 3,
            },
            {
                "image": "assets/blue-wool.png",
                "color_id": 6,
                "style_id": 3,
            },
            {
                "image": "assets/khaki-tote.png",
                "color_id": 1,
                "style_id": 4,
            },
            {
                "image": "assets/bisque-tote.png",
                "color_id": 2,
                "style_id": 4,
            },
            {
                "image": "assets/coral-markers.png",
                "color_id": 3,
                "style_id": 5,
            },
            {
                "image": "assets/coral-needles.png",
                "color_id": 3,
                "style_id": 6,
            },
            {
                "image": "assets/darkgreen-needles.png",
                "color_id": 4,
                "style_id": 6,
            },
            {
                "image": "assets/khaki-plush.png",
                "color_id": 1,
                "style_id": 7,
            },
            {
                "image": "assets/darkgreen-plush.png",
                "color_id": 4,
                "style_id": 7,
            },
            {
                "image": "assets/blue-plush.png",
                "color_id": 6,
                "style_id": 7,
            },
        ]

        for sku in sku_list:
            sku = Sku(
                sku=fake.bothify(text="????-########"),
                image=sku["image"],
                color_id=sku["color_id"],
                style_id=sku["style_id"],
            )
            db.session.add(sku)
            db.session.commit()
        print("Skus seeded...")

        print("Seeding colors...")
        colors = [
            "khaki",
            "bisque",
            "coral",
            "darkgreen",
            "seagreen",
            "lightsteelblue",
        ]
        for color in colors:
            color = Color(color=color)
            db.session.add(color)
            db.session.commit()
        print("Colors seeded...")

        print("Seeding order items...")

        order_ids = list(range(1, 11))
        shuffle(order_ids)

        order_id_index = 0

        for _ in range(25):
            quantity = randint(1, 4)
            style_id = randint(1, 7)

            style = Style.query.get(style_id)
            subtotal = style.price * quantity

            skus = Sku.query.filter_by(style_id=style_id).all()
            sku = random.choice(skus)

            order_id = order_ids[order_id_index]

            order_id_index = (order_id_index + 1) % len(order_ids)

            order_item = OrderItem(
                quantity=quantity,
                subtotal=subtotal,
                order_id=order_id,
                style_id=style_id,
                sku_id=sku.id,
            )
            db.session.add(order_item)
            db.session.commit()
        print("Order items seeded...")

        print("Seeding wishlist items...")
        cust_ids = list(range(1, 4))
        shuffle(cust_ids)

        style_ids = list(range(1, 8))
        shuffle(style_ids)

        cust_id_index = 0
        style_id_index = 0
        for _ in range(10):
            customer_id = cust_ids[cust_id_index]
            cust_id_index = (cust_id_index + 1) % len(cust_ids)

            style_id = style_ids[style_id_index]
            style_id_index = (style_id_index + 1) % len(style_ids)

            wishlist_items = WishlistItem(
                customer_id=customer_id,
                style_id=style_id,
            )

            db.session.add(wishlist_items)
            db.session.commit()
        print("Wishlist seeded...")

        print("Seeding complete. Let's boogie")
