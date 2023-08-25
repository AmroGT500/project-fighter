from config import app, db
from models import User, Fighter, Match


def create_mock_data():
    with app.app_context():
        # Create mock users
        user1 = User(username='user1', password_hash='hashed_password1')
        user2 = User(username='user2', password_hash='hashed_password2')
        db.session.add_all([user1, user2])
        db.session.commit()

        # Create mock fighters
        fighter1 = Fighter(name='fighter1', hp=100, ap=20)
        fighter2 = Fighter(name='fighter2', hp=120, ap=15)
        db.session.add_all([fighter1, fighter2])
        db.session.commit()

        # Create mock matches
        match1 = Match(win_loss=True, user=user1, fighter1_id=fighter1.id, fighter2_id=fighter2.id)
        match2 = Match(win_loss=False, user=user2, fighter1_id=fighter2.id, fighter2_id=fighter1.id)
        db.session.add_all([match1, match2])
        db.session.commit()

if __name__ == '__main__':
    create_mock_data()
    print('Test data seeded successfully.')

