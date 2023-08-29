"""new schema, sprites and image strips

Revision ID: 681f51ea0301
Revises: 88799a3f5dec
Create Date: 2023-08-28 19:56:11.059846

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '681f51ea0301'
down_revision = '88799a3f5dec'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('fighters', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image_strip', sa.String(), nullable=True))
        batch_op.drop_column('sprite_punch')
        batch_op.drop_column('sprite_kick')
        batch_op.drop_column('sprite_block')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('fighters', schema=None) as batch_op:
        batch_op.add_column(sa.Column('sprite_block', sa.VARCHAR(), nullable=True))
        batch_op.add_column(sa.Column('sprite_kick', sa.VARCHAR(), nullable=True))
        batch_op.add_column(sa.Column('sprite_punch', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('image_strip')

    # ### end Alembic commands ###