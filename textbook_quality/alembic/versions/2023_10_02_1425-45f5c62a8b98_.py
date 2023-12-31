"""empty message

Revision ID: 45f5c62a8b98
Revises: 319c7bd1d8b7
Create Date: 2023-10-02 14:25:16.740000

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel
import app


# revision identifiers, used by Alembic.
revision = '45f5c62a8b98'
down_revision = '319c7bd1d8b7'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('course', sa.Column('queries', sa.JSON(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('course', 'queries')
    # ### end Alembic commands ###
