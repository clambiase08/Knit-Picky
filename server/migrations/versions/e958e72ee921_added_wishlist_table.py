"""added wishlist table

Revision ID: e958e72ee921
Revises: 53ac72067f2f
Create Date: 2023-09-15 10:37:21.299310

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e958e72ee921'
down_revision = '53ac72067f2f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('wishlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('customer_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['customer_id'], ['customers.id'], name=op.f('fk_wishlists_customer_id_customers')),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('styles', schema=None) as batch_op:
        batch_op.add_column(sa.Column('wishlist_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_styles_wishlist_id_wishlists'), 'wishlists', ['wishlist_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('styles', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_styles_wishlist_id_wishlists'), type_='foreignkey')
        batch_op.drop_column('wishlist_id')

    op.drop_table('wishlists')
    # ### end Alembic commands ###
