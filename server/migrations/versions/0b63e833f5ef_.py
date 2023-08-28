"""empty message

Revision ID: 0b63e833f5ef
Revises: 9fc51f47edee
Create Date: 2023-08-28 08:15:04.460413

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0b63e833f5ef'
down_revision = '9fc51f47edee'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('fighters', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image_cycle', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('sprite_pose', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('sprite_punch', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('sprite_kick', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('sprite_block', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('sprite_loss', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('sprite_win', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('fighters', schema=None) as batch_op:
        batch_op.drop_column('sprite_win')
        batch_op.drop_column('sprite_loss')
        batch_op.drop_column('sprite_block')
        batch_op.drop_column('sprite_kick')
        batch_op.drop_column('sprite_punch')
        batch_op.drop_column('sprite_pose')
        batch_op.drop_column('image_cycle')

    # ### end Alembic commands ###
