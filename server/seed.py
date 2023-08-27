from config import app, db
from models import User, Fighter, Match


def create_mock_data():
    with app.app_context():

        User.query.delete()
        Fighter.query.delete()
        Match.query.delete()

        # Create mock users
        user1 = User(username='user1', password='hashed_password1')
        user2 = User(username='user2', password='hashed_password2')
        db.session.add_all([user1, user2])
        db.session.commit()

        # Create mock fighters
        fighter1 = Fighter(name='Ryu', hp=100, ap=20)
        fighter2 = Fighter(name='Chun-Li', hp=120, ap=15)
        fighter3 = Fighter(name='Sub-Zero', hp=110, ap=18)
        fighter4 = Fighter(name='Scorpion', hp=105, ap=19)
        fighter5 = Fighter(name='Mario', hp=90, ap=25)
        fighter6 = Fighter(name='Luigi', hp=95, ap=23)
        fighter7 = Fighter(name='Link', hp=105, ap=18)
        fighter8 = Fighter(name='Samus', hp=110, ap=16)
        fighter9 = Fighter(name='Sonic', hp=85, ap=28)
        fighter10 = Fighter(name='Mega Man', hp=95, ap=22)
        fighter11 = Fighter(name='Donkey Kong', hp=120, ap=14)
        fighter12 = Fighter(name='Pikachu', hp=80, ap=30)
        
        db.session.add_all([
            fighter1, fighter2, fighter3, fighter4,
            fighter5, fighter6, fighter7, fighter8,
            fighter9, fighter10, fighter11, fighter12
        ])
        db.session.commit()

        # Create mock matches
        match1 = Match(win_loss=True, user=user1, fighter1_id=fighter1.id, fighter2_id=fighter2.id)
        match2 = Match(win_loss=False, user=user2, fighter1_id=fighter2.id, fighter2_id=fighter1.id)
        match3 = Match(win_loss=True, user=user1, fighter1_id=fighter3.id, fighter2_id=fighter4.id)
        match4 = Match(win_loss=False, user=user2, fighter1_id=fighter4.id, fighter2_id=fighter3.id)
        match5 = Match(win_loss=True, user=user1, fighter1_id=fighter5.id, fighter2_id=fighter6.id)
        match6 = Match(win_loss=False, user=user2, fighter1_id=fighter6.id, fighter2_id=fighter5.id)
        match7 = Match(win_loss=True, user=user1, fighter1_id=fighter7.id, fighter2_id=fighter8.id)
        match8 = Match(win_loss=False, user=user2, fighter1_id=fighter8.id, fighter2_id=fighter7.id)
        match9 = Match(win_loss=True, user=user1, fighter1_id=fighter9.id, fighter2_id=fighter10.id)
        match10 = Match(win_loss=False, user=user2, fighter1_id=fighter10.id, fighter2_id=fighter9.id)
        match11 = Match(win_loss=True, user=user1, fighter1_id=fighter11.id, fighter2_id=fighter12.id)
        match12 = Match(win_loss=False, user=user2, fighter1_id=fighter12.id, fighter2_id=fighter11.id)
        
        db.session.add_all([
            match1, match2, match3, match4,
            match5, match6, match7, match8,
            match9, match10, match11, match12
        ])
        db.session.commit()


if __name__ == '__main__':
    create_mock_data()
    print('Test data seeded successfully.')